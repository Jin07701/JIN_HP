import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import styles from './page.module.css';

const newsItems = [
    { id: 1, date: '2026.01.21', category: 'お知らせ', title: 'コーポレートサイトをリニューアルしました (EnLink)', link: '#' },
    { id: 2, date: '2025.12.15', category: 'サービス', title: 'DirectConnectの登録エンジニア数が10,000名を突破', link: '#' },
    { id: 3, date: '2025.11.01', category: 'プレス', title: '「週刊ITトレンド」に弊社代表のインタビューが掲載されました', link: '#' },
    { id: 4, date: '2025.10.20', category: 'お知らせ', title: 'オフィス移転のお知らせ', link: '#' },
    { id: 5, date: '2025.09.01', category: 'サービス', title: 'セキュリティ診断サービスの提供を開始しました', link: '#' },
];

export default function NewsPage() {
    const breadcrumbs = [{ label: 'ニュース一覧', href: '' }];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="NEWS"
                    titleJa="ニュース一覧"
                    breadcrumbs={breadcrumbs}
                />

                <div className={styles.container}>
                    <div className={styles.newsList}>
                        {newsItems.map((item) => (
                            <a href={item.link} key={item.id} className={styles.newsItem}>
                                <div className={styles.meta}>
                                    <time className={styles.date}>{item.date}</time>
                                    <span className={styles.category}>{item.category}</span>
                                </div>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                            </a>
                        ))}
                    </div>
                    {/* Pagination Placeholder */}
                    <div className={styles.pagination}>
                        <span className={`${styles.pageBtn} ${styles.active}`}>1</span>
                        <span className={styles.pageBtn}>2</span>
                        <span className={styles.pageBtn}>3</span>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
