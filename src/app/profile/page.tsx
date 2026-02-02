"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import { MapPin, Briefcase, BookOpen, MessageCircle, Dumbbell, Search, Film, PenTool } from 'lucide-react';
import styles from './page.module.css';

export default function ProfilePage() {
    const breadcrumbs = [{ label: '人物紹介', href: '' }];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="PERSON"
                    titleJa="人物紹介"
                    breadcrumbs={breadcrumbs}
                />

                <section className={styles.section}>
                    <div className={styles.container}>

                        <div className={styles.noteSection}>
                            <p className={styles.noteText}>
                                日々の思考や技術的なアウトプットはNoteにて発信しています。
                            </p>
                            <a href="https://note.com/jin_ai_system/all" target="_blank" rel="noopener noreferrer" className={styles.noteButton}>
                                <PenTool size={20} />
                                Noteを見る
                            </a>
                        </div>

                        {/* Other Experiences Section */}
                        <div className={styles.categoryBlock}>
                            <h2 className={styles.mainTitle}>その他の活動・実績</h2>
                            <p className={styles.intro}>多様な経験を通じて培った視点やスキルをご紹介します。</p>

                            <div className={styles.grid}>
                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <MapPin className={styles.icon} size={24} />
                                        <h3 className={styles.cardTitle}>居住・滞在経験</h3>
                                    </div>
                                    <ul className={styles.list}>
                                        <li>神奈川県（3年）、福岡県（7年）での居住・勤務経験</li>
                                        <li>カナダ・トロントへの留学（3ヶ月）：異文化理解と語学力の向上</li>
                                        <li>海外渡航歴（グアム、ロンドンなど）：グローバルな視点の醸成</li>
                                    </ul>
                                </div>

                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <Briefcase className={styles.icon} size={24} />
                                        <h3 className={styles.cardTitle}>実務経験（初期キャリア等）</h3>
                                    </div>
                                    <ul className={styles.list}>
                                        <li>セールスプロモーション：提案力・顧客折衝スキルの習得</li>
                                        <li>コールセンター：課題解決型コミュニケーション能力の向上</li>
                                        <li>流通・販売業務：業務効率化と現場オペレーションの理解</li>
                                        <li>物流・配送：チームワークと体力・持久力</li>
                                        <li>飲食・サービス：ホスピタリティと臨機応変な対応力</li>
                                        <li>ブライダル：高水準なサービス提供とマナーの習得</li>
                                    </ul>
                                </div>

                                <div className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <BookOpen className={styles.icon} size={24} />
                                        <h3 className={styles.cardTitle}>スキルアップ・自己研鑽</h3>
                                    </div>
                                    <ul className={styles.list}>
                                        <li>技術習得：AWS、Python（クラウド活用およびデータ分析）</li>
                                        <li>語学：実務レベルの英語コミュニケーション（海外チームとの連携）</li>
                                        <li>セキュリティ：最新の脅威動向および対策技術の継続的なキャッチアップ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* LIKE Section to Interests */}
                        <div className={styles.categoryBlock} style={{ marginTop: '80px' }}>
                            <h2 className={styles.likeTitle}>趣味・関心</h2>

                            <div className={styles.likeGrid}>
                                <div className={styles.likeCard}>
                                    <div className={styles.likeHeader}>
                                        <MessageCircle className={styles.likeIcon} size={20} />
                                        <h3 className={styles.likeHeading}>コミュニケーション</h3>
                                    </div>
                                    <p className={styles.likeText}>
                                        交流会やネットワーキングへの積極的な参加を通じて、多様なバックグラウンドを持つ人々との対話を大切にしています。国内外（トロント等）でのコミュニティ活動にも参加し、視野を広げています。
                                    </p>
                                </div>

                                <div className={styles.likeCard}>
                                    <div className={styles.likeHeader}>
                                        <Dumbbell className={styles.likeIcon} size={20} />
                                        <h3 className={styles.likeHeading}>フィットネス</h3>
                                    </div>
                                    <p className={styles.likeText}>
                                        自己規律と健康維持のため、筋力トレーニングを継続しています。学生時代はウエイトリフティング、空手、野球、テニス、水泳など多様な競技に打ち込み、目標達成に向けたプロセスを重視しています。
                                    </p>
                                </div>

                                <div className={styles.likeCard}>
                                    <div className={styles.likeHeader}>
                                        <Search className={styles.likeIcon} size={20} />
                                        <h3 className={styles.likeHeading}>テクノロジー・ガジェット検証</h3>
                                    </div>
                                    <p className={styles.likeText}>
                                        最新のハードウェアやソフトウェア（スマートホーム家電、生成AIツール、NFC活用など）を実際に導入・検証し、生活や業務の効率化への応用を常に模索しています。実体験に基づくユーザビリティの評価を得意としています。
                                    </p>
                                </div>

                                <div className={styles.likeCard}>
                                    <div className={styles.likeHeader}>
                                        <Film className={styles.likeIcon} size={20} />
                                        <h3 className={styles.likeHeading}>カルチャー・教養</h3>
                                    </div>
                                    <p className={styles.likeText}>
                                        日本のアニメーション文化への関心が高く、海外評価などの視点からも分析しています。また、読書、映画鑑賞、美術館巡りなどを通じて、感性やクリエイティビティの涵養に努めています。
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
