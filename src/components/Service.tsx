import Link from 'next/link';
import { Zap, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';
import styles from './Service.module.css';

export default function Service() {
    return (
        <section id="service" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>SERVICE</h2>
                    <span className={styles.subHeading}>事業内容</span>
                </div>

                <div className={styles.grid}>
                    {/* Main Feature: DirectConnect */}
                    <div className={styles.mainCard}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.serviceTitle}>DirectConnect</h3>
                            <p className={styles.serviceSubtitle}>
                                エンジニアと企業を、直接つなぐ。<br />
                                新時代のマッチングプラットフォーム。
                            </p>
                            <div className={styles.featureList}>
                                <div className={styles.featureItem}>
                                    <Zap className={styles.icon} size={24} />
                                    <span>スピードマッチング</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <ShieldCheck className={styles.icon} size={24} />
                                    <span>厳選された品質</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <Handshake className={styles.icon} size={24} />
                                    <span>中間マージンゼロ</span>
                                </div>
                            </div>
                            <p className={styles.description}>
                                DirectConnectは、従来のSESやフリーランス市場の課題を解決し、
                                透明性が高く、効率的なITプロフェッショナルのためのエコシステムを提供します。
                            </p>
                            <Link href="http://localhost:3001" className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
                                サービスサイトへ <ChevronRight size={16} />
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
                            <h4>ITコンサルティング</h4>
                            <p>プロジェクトのPMO、要件定義からマネジメントまで。</p>
                            <Link href="#" className={styles.textLink}>詳細 <ChevronRight size={14} /></Link>
                        </div>
                        <div className={styles.subCard}>
                            <h4>セキュリティ監査</h4>
                            <p>脆弱性診断、OSパッチ管理自動化など。</p>
                            <Link href="#" className={styles.textLink}>詳細 <ChevronRight size={14} /></Link>
                        </div>
                        <div className={styles.subCard}>
                            <h4>インフラ構築</h4>
                            <p>クラウド・オンプレミスのサーバー設計・構築。</p>
                            <Link href="#" className={styles.textLink}>詳細 <ChevronRight size={14} /></Link>
                        </div>
                        <div className={styles.subCard}>
                            <h4>グローバル支援</h4>
                            <p>海外拠点との連携・バイリンガルサポート。</p>
                            <Link href="#" className={styles.textLink}>詳細 <ChevronRight size={14} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

