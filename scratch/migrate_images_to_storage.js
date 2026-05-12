const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(envFile.split('\n').filter(line => line && !line.startsWith('#')).map(line => {
    const parts = line.split('=');
    return [parts[0].trim(), parts.slice(1).join('=').trim()];
}));

// Use SERVICE_ROLE_KEY for upload if available, otherwise ANON_KEY
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const IMAGES_DIR = './public/images';
const BUCKET_NAME = 'public-assets';

async function uploadImages() {
    const files = fs.readdirSync(IMAGES_DIR);
    const urlMap = {};

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        const fileContent = fs.readFileSync(filePath);
        
        console.log(`Uploading ${file}...`);
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(file, fileContent, {
                contentType: file.endsWith('.png') ? 'image/png' : 'image/jpeg',
                upsert: true
            });

        if (error) {
            console.error(`Failed to upload ${file}:`, error.message);
        } else {
            const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file);
            urlMap[file] = publicUrl;
            console.log(`Success: ${file} -> ${publicUrl}`);
        }
    }

    // Now update database with these URLs
    console.log('\nUpdating database records...');

    // 1. Services
    const { data: services } = await supabase.from('services').select('*');
    for (const s of services || []) {
        const filename = s.image_url.split('/').pop();
        if (urlMap[filename]) {
            await supabase.from('services').update({ image_url: urlMap[filename] }).eq('id', s.id);
            console.log(`Updated service: ${s.title}`);
        }
    }

    // 2. Projects
    const { data: projects } = await supabase.from('projects').select('*');
    for (const p of projects || []) {
        const filename = p.image_url.split('/').pop();
        if (urlMap[filename]) {
            await supabase.from('projects').update({ image_url: urlMap[filename] }).eq('id', p.id);
            console.log(`Updated project: ${p.title}`);
        }
    }

    // 3. Site Settings
    const { data: settings } = await supabase.from('site_settings').select('*');
    for (const st of settings || []) {
        if (typeof st.setting_value === 'string' && st.setting_value.startsWith('/images/')) {
            const filename = st.setting_value.split('/').pop();
            if (urlMap[filename]) {
                await supabase.from('site_settings').update({ setting_value: urlMap[filename] }).eq('id', st.id);
                console.log(`Updated setting: ${st.setting_key}`);
            }
        }
    }

    console.log('\nMigration completed!');
}

uploadImages();
