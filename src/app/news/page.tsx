import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import styles from './page.module.css';

const newsItems = [
    { id: 1, date: '2026.04.01', category: 'お知らせ', title: '合同会社KANAMEを設立しました', link: 'https://note.com/jin_ai_system/all' },
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
                            <a href={item.link} key={item.id} className={styles.newsItem} target="_blank" rel="noopener noreferrer">
                                <div className={styles.meta}>
                                    <time className={styles.date}>{item.date}</time>
                                    <span className={styles.category}>{item.category}</span>
                                </div>
                                <h3 className={styles.itemTitle}>{item.title}</h3>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
