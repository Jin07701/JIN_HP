import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>ダッシュボード</h1>
            <p style={{ marginBottom: '40px', color: '#4b5563' }}>ARISTA コンテンツ管理システムへようこそ。</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '10px' }}>サイト設定</h2>
                    <p style={{ color: '#6b7280', marginBottom: '20px' }}>サイトのテキスト、会社情報、トップ画面の文章などを編集します。</p>
                    <Link href="/admin/settings" style={{ display: 'inline-block', backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none' }}>
                        設定を管理する
                    </Link>
                </div>
                
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '10px' }}>ニュース管理</h2>
                    <p style={{ color: '#6b7280', marginBottom: '20px' }}>お知らせやニュース記事の投稿・編集を行います。</p>
                    <Link href="/admin/news" style={{ display: 'inline-block', backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none' }}>
                        ニュースを管理する
                    </Link>
                </div>
            </div>
        </div>
    );
}
