"use client";
import Link from 'next/link';
import { Network, Shield, Cpu, Smartphone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Lineup.module.css';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const ICON_MAP: Record<string, any> = {
    Network, Shield, Cpu, Smartphone
};

export default function Lineup() {
    const { t } = useLanguage();
    const [lineupItems, setLineupItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from('services').select('*').order('order', { ascending: true });
            if (data) {
                const formatted = data.map(item => {
                    const IconComponent = ICON_MAP[item.icon_name] || Network;
                    return {
                        ...item,
                        icon: <IconComponent size={40} />,
                        link: `/service#${item.id}`
                    };
                });
                setLineupItems(formatted);
            }
        }
        fetchServices();
    }, []);

    return (
        <section className={styles.section} id="service">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('事業内容', 'Business Details')}</h2>
                </div>

                <div className={styles.grid}>
                    {lineupItems.map((item) => (
                        <Link href={item.link} key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className={styles.image} />
                                ) : (
                                    <div className={styles.placeholderImage}>
                                        {item.icon}
                                    </div>
                                )}
                                <div className={styles.overlayText}>
                                    <span className={styles.viewDetails}>{t('詳細を見る', 'View Details')}</span>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardSubtitle}>{item.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link href="/service" className={styles.viewAllBtn}>
                        {t('すべてのサービスを見る', 'View All Services')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
