
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
    envFile.split('\n')
        .filter(line => line && !line.startsWith('#'))
        .map(line => {
            const parts = line.split('=');
            return [parts[0].trim(), parts.slice(1).join('=').trim()];
        })
);

// Use ANON_KEY to update since we granted permission to all
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixImage() {
    console.log('Fixing broken image URL for project...');
    const { data, error } = await supabase
        .from('projects')
        .update({ image_url: '/images/abstract_security_infra_1778050259971.png' })
        .eq('title', 'セキュアな社内インフラ構築');

    if (error) {
        console.error('Error fixing image:', error);
    } else {
        console.log('Fixed image URL successfully!');
    }
}

fixImage();
