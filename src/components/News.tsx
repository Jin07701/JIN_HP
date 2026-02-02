"use client";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './News.module.css';

export default function News() {
    const { t } = useLanguage();

    // Single news item as requested, linking to Note
    const newsItems = [
        {
            date: '2026.04.01',
            category: t('お知らせ', 'Notice'),
            title: t('合同会社KANAMEを設立しました', 'Established KANAME LLC'),
            url: 'https://note.com/jin_ai_system/all' // Link to Note
        }
    ];

    return (
        <section className={styles.section} id="news">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{t('お知らせ', 'News')}</h2>
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
