"use client";

import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './News.module.css';

export default function News({ news = [] }: { news?: any[] }) {
    const { t } = useLanguage();

    // Use dynamic news if available, otherwise fallback to static
    const newsItems = news.length > 0 ? news : [
        {
            date: '2026.04.01',
            category: t('お知らせ', 'Notice'),
            title: t('株式会社ARISTAを設立しました', 'Established ARISTA Inc.'),
            url: 'https://note.com/jin_ai_system/all' // Link to Note
        }
    ];

    // Get the most recent Monday to simulate a weekly update
    const getWeeklyDate = () => {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        return monday.getFullYear() + '.' + 
               String(monday.getMonth() + 1).padStart(2, '0') + '.' + 
               String(monday.getDate()).padStart(2, '0');
    };

    const updatedDate = getWeeklyDate();

    return (
        <section className={styles.section} id="news">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h2 className={styles.heading}>{t('お知らせ', 'News')}</h2>
                        <span className={styles.updateInfo}>更新日: {updatedDate}</span>
                    </div>
                    <a href="https://note.com/jin_ai_system/all" target="_blank" rel="noopener noreferrer" className={styles.viewAll}>
                        {t('Noteを見る', 'View Note')} <ChevronRight size={16} />
                    </a>
                </div>

                <div className={styles.list}>
                    {newsItems.map((item, index) => (
                        <article key={index} className={styles.item}>
                            <div className={styles.meta}>
                                <time className={styles.date}>{item.date}</time>
                                <span className={styles.category}>{item.category}</span>
                            </div>
                            <h3 className={styles.title}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.link}>{item.title}</a>
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
