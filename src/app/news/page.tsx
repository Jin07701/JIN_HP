"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function NewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const breadcrumbs = [{ label: 'ニュース一覧', href: '' }];

    useEffect(() => {
        async function fetchNews() {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('date', { ascending: false });
            
            if (error) {
                console.error('Error fetching news:', error);
            } else {
                setNews(data || []);
            }
            setLoading(false);
        }
        fetchNews();
    }, []);

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
                        {loading ? (
                            <p>読み込み中...</p>
                        ) : news.length > 0 ? (
                            news.map((item) => (
                                <a 
                                    href={item.url || '#'} 
                                    key={item.id} 
                                    className={styles.newsItem} 
                                    target={item.url ? "_blank" : undefined} 
                                    rel={item.url ? "noopener noreferrer" : undefined}
                                >
                                    <div className={styles.meta}>
                                        <time className={styles.date}>{item.date}</time>
                                        <span className={styles.category}>{item.category}</span>
                                    </div>
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                </a>
                            ))
                        ) : (
                            <p>現在、お知らせはありません。</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
