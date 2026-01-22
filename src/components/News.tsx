import Link from 'next/link';
import styles from './News.module.css';

const newsItems = [
    { id: 1, date: '2026.01.21', category: 'お知らせ', title: 'コーポレートサイトをリニューアルしました (EnLink)', link: '/news/1' },
    { id: 2, date: '2025.12.15', category: 'サービス', title: 'DirectConnectの登録エンジニア数が10,000名を突破', link: '/news/2' },
    { id: 3, date: '2025.11.01', category: 'プレス', title: '「週刊ITトレンド」に弊社代表のインタビューが掲載されました', link: '/news/3' },
];

export default function News() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>NEWS</h2>
                    <Link href="/news" className={styles.viewAll}>ニュース一覧 {'>'}</Link>
                </div>
                <div className={styles.newsList}>
                    {newsItems.map((item) => (
                        <Link href={item.link} key={item.id} className={styles.newsItem}>
                            <div className={styles.meta}>
                                <time className={styles.date}>{item.date}</time>
                                <span className={styles.category}>{item.category}</span>
                            </div>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
