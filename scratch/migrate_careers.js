
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const staticCareerData = [
    { year: '2025/09 ～ 現在', event: '通信会社のマーケティング戦略' },
    { year: '2025/05 ～ 2025/08', event: 'トロントでの活動（海外市場調査・語学学習）' },
    { year: '2022/06 ～ 2025/04', event: '外資通販会社のインフラセキュリティ（脆弱性対応・自動化リード）' },
    { year: '2018/04 ～ 2022/05', event: '大手病院のシステム営業・導入・保守（PJマネジメント）' },
    { year: '2016/09 ～ 2018/03', event: '自動車Webサイト Server保守・次期提案' },
    { year: '2015/04 ～ 2016/08', event: '銀行・証券システムのServer構築・保守（Ansible自動化等）' }
];

async function migrateCareers() {
    console.log('Migrating static career data to Supabase...');
    
    // Check if they already exist to avoid duplicates
    const { data: existing } = await supabase.from('careers').select('year, event');
    
    const toInsert = staticCareerData.filter(sc => 
        !existing.some(ex => ex.year === sc.year && ex.event === sc.event)
    );

    if (toInsert.length > 0) {
        const { error } = await supabase.from('careers').insert(toInsert);
        if (error) console.error('Error migrating careers:', error);
        else console.log(`Migrated ${toInsert.length} career items!`);
    } else {
        console.log('No new career items to migrate.');
    }
}

migrateCareers();
