import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import styles from './page.module.css';
import { Network, Shield, Cpu, Smartphone, ExternalLink } from 'lucide-react';

export default function ServicePage() {
    const breadcrumbs = [{ label: '事業内容', href: '' }];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="SERVICE LINEUP"
                    titleJa="事業内容"
                    breadcrumbs={breadcrumbs}
                />

                <div className={styles.container}>
                    <section id="connect" className={styles.serviceSection}>
                        <div className={styles.textCol}>
                            <div className={styles.iconWrapper}><Network size={40} /></div>
                            <h2 className={styles.serviceTitle}>ITダイレクトマッチA</h2>
                            <p className={styles.serviceSubtitle}>エンジニア・企業マッチングプラットフォーム</p>
                            <p className={styles.description}>
                                従来のエージェントモデルとは異なり、企業とエンジニアを直接つなぐ「ダイレクトマッチング」を実現。<br />
                                中間マージンを排除し、透明性の高い契約と報酬体系を提供します。<br />
                                AIによる最適マッチング機能により、スキルとカルチャーの両面で最適な出会いを創出します。
                                AIによる最適マッチング機能により、スキルとカルチャーの両面で最適な出会いを創出します。
                            </p>
                            <div style={{ marginTop: '1.5rem' }}>
                                <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '9999px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    transition: 'background-color 0.2s'
                                }}>
                                    サービスサイトへ <Network size={16} />
                                </a>
                            </div>
                        </div>
                        <div className={styles.imageCol}>
                            <img src="/images/direct-connect-match.png" alt="ITダイレクトマッチA" className={styles.serviceImage} />
                        </div>
                    </section>

                    <section id="consulting" className={styles.serviceSection}>
                        <div className={styles.textCol}>
                            <div className={styles.iconWrapper}><Cpu size={40} /></div>
                            <h2 className={styles.serviceTitle}>IT Consulting</h2>
                            <p className={styles.serviceSubtitle}>技術コンサルティング</p>
                            <p className={styles.description}>
                                クラウドインフラの設計から最新技術の導入支援まで、ビジネスの成長を加速させる技術戦略を提案します。<br />
                                経験豊富なアーキテクトが、現状の課題分析から解決策の実行までを伴走型で支援します。
                            </p>
                        </div>
                        <div className={styles.imageCol}>
                            <div className={styles.placeholderImg}>IT Consulting Image</div>
                        </div>
                    </section>

                    <section id="security" className={styles.serviceSection}>
                        <div className={styles.textCol}>
                            <div className={styles.iconWrapper}><Shield size={40} /></div>
                            <h2 className={styles.serviceTitle}>Security</h2>
                            <p className={styles.serviceSubtitle}>セキュリティ診断・対策</p>
                            <p className={styles.description}>
                                Webアプリケーションの脆弱性診断、ペネトレーションテスト、クラウド環境のセキュリティ設定監査など、<br />
                                多角的な視点からシステムのリスクを洗い出し、最適な対策を実施します。
                            </p>
                        </div>
                        <div className={styles.imageCol}>
                            <img src="/images/company-profile-concept.jpg" alt="Security" className={styles.serviceImage} />
                        </div>
                    </section>

                    <section id="app" className={styles.serviceSection}>
                        <div className={styles.textCol}>
                            <div className={styles.iconWrapper}><Smartphone size={40} /></div>
                            <h2 className={styles.serviceTitle}>App Development</h2>
                            <p className={styles.serviceSubtitle}>自社アプリ開発・提供</p>
                            <p className={styles.description}>
                                日常生活をより豊かに、そして面白くするiOS向け自社アプリを企画・開発しています。<br />
                                ユーザー視点に立ったUI/UX設計と、最新の技術トレンドを取り入れた開発を行っています。
                            </p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a href="https://apps.apple.com/jp/app/おしゃべりスイッチ/id6761762103" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: '#000',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    width: 'fit-content'
                                }}>
                                    おしゃべりスイッチ <ExternalLink size={16} />
                                </a>
                                <a href="https://apps.apple.com/jp/app/娯楽ブレーキ/id6761870163" target="_blank" rel="noopener noreferrer" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: '#000',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    width: 'fit-content'
                                }}>
                                    娯楽ブレーキ <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                        <div className={styles.imageCol}>
                            <div className={styles.placeholderImg}>App Development Images</div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
