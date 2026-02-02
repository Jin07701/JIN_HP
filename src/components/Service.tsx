"use client";
import Link from 'next/link';
import { Zap, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Service.module.css';

export default function Service() {
    const { t } = useLanguage();

    return (
        <section id="service" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>SERVICE</h2>
                    <span className={styles.subHeading}>{t('事業内容', 'Our Services')}</span>
                </div>

                <div className={styles.grid}>
                    {/* Main Feature: DirectConnect */}
                    <div className={styles.mainCard}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.serviceTitle}>DirectConnect</h3>
                            <p className={styles.serviceSubtitle}>
                                {t('エンジニアと企業を、直接つなぐ。', 'Connecting Engineers and Companies Directly.')}<br />
                                {t('新時代のマッチングプラットフォーム。', 'A New Era Matching Platform.')}
                            </p>
                            <div className={styles.featureList}>
                                <div className={styles.featureItem}>
                                    <Zap className={styles.icon} size={24} />
                                    <span>{t('スピードマッチング', 'Speed Matching')}</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <ShieldCheck className={styles.icon} size={24} />
                                    <span>{t('厳選された品質', 'Selected Quality')}</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <Handshake className={styles.icon} size={24} />
                                    <span>{t('中間マージンゼロ', 'Zero Middle Margin')}</span>
                                </div>
                            </div>
                            <p className={styles.description}>
                                {t(
                                    'DirectConnectは、従来のSESやフリーランス市場の課題を解決し、透明性が高く、効率的なITプロフェッショナルのためのエコシステムを提供します。',
                                    'DirectConnect solves the challenges of traditional SES and freelance markets, providing a highly transparent and efficient ecosystem for IT professionals.'
                                )}
                            </p>
                            <Link href="http://localhost:3001" className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
                                {t('サービスサイトへ', 'Visit Service Site')} <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className={styles.cardImage}>
                            {/* Actual Platform Screenshot */}
                            <img
                                src="/images/direct-connect-match.png"
                                alt="DirectConnect Matching Concept"
                                className={styles.platformImage}
                            />
                        </div>
                    </div>

                    {/* Secondary Services Grid */}
                    <div className={styles.subGrid}>
                        <div className={styles.subCard}>
                            <h4>{t('ITコンサルティング', 'IT Consulting')}</h4>
                            <p>{t('プロジェクトのPMO、要件定義からマネジメントまで。', 'From project PMO and requirement definition to management.')}</p>
                            {/* <Link href="#" className={styles.textLink}>{t('詳細', 'Details')} <ChevronRight size={14} /></Link> */}
                        </div>
                        <div className={styles.subCard}>
                            <h4>{t('セキュリティ監査', 'Security Audit')}</h4>
                            <p>{t('脆弱性診断、OSパッチ管理自動化など。', 'Vulnerability assessment, OS patch management automation, etc.')}</p>
                            {/* <Link href="#" className={styles.textLink}>{t('詳細', 'Details')} <ChevronRight size={14} /></Link> */}
                        </div>
                        <div className={styles.subCard}>
                            <h4>{t('インフラ構築', 'Infrastructure Build')}</h4>
                            <p>{t('クラウド・オンプレミスのサーバー設計・構築。', 'Cloud/On-premise server design and construction.')}</p>
                            {/* <Link href="#" className={styles.textLink}>{t('詳細', 'Details')} <ChevronRight size={14} /></Link> */}
                        </div>
                        <div className={styles.subCard}>
                            <h4>{t('グローバル支援', 'Global Support')}</h4>
                            <p>{t('海外拠点との連携・バイリンガルサポート。', 'Collaboration with overseas bases and bilingual support.')}</p>
                            {/* <Link href="#" className={styles.textLink}>{t('詳細', 'Details')} <ChevronRight size={14} /></Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

