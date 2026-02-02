"use client";
import Link from 'next/link';
import { Network, Shield, Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Lineup.module.css';

export default function Lineup() {
    const { t } = useLanguage();

    const lineupItems = [
        {
            id: 'connect',
            title: 'DirectConnect',
            subtitle: t('エンジニア・企業マッチング', 'Engineer & Company Matching'),
            description: t(
                '中間マージンを排除した、透明性の高いダイレクトマッチングプラットフォーム。',
                'A highly transparent direct matching platform that eliminates intermediate margins.'
            ),
            icon: <Network size={40} />,
            link: '/service#connect',
            image: '/images/direct-connect-match.png'
        },
        {
            id: 'consulting',
            title: 'IT Consulting',
            subtitle: t('技術コンサルティング', 'Technical Consulting'),
            description: t(
                'インフラからアプリまで、最新技術でお客様の課題を解決します。',
                'Solving client challenges with the latest technology, from infrastructure to applications.'
            ),
            icon: <Cpu size={40} />,
            link: '/service#consulting',
            image: '/images/hakata-bg-clean.jpg'
        },
        {
            id: 'security',
            title: 'Security',
            subtitle: t('セキュリティ診断・対策', 'Security Assessment & Measures'),
            description: t(
                '脆弱性診断から堅牢化支援まで、システムを守る包括的なセキュリティサービス。',
                'Comprehensive security services protecting systems, from vulnerability assessment to hardening support.'
            ),
            icon: <Shield size={40} />,
            link: '/service#security',
            image: '/images/company-profile-concept.jpg'
        }
    ];

    return (
        <section className={styles.section} id="service">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('サービス一覧', 'Our Services')}</h2>
                </div>

                <div className={styles.grid}>
                    {lineupItems.map((item) => (
                        <Link href={item.link} key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className={styles.image} />
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
