"use client";

import { MapPin, Briefcase, BookOpen, MessageCircle, Dumbbell, Search, Film, PenTool } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Personal.module.css';

export default function Personal() {
    const { t } = useLanguage();

    return (
        <section className={styles.section} id="person">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>PERSON</h2>
                    <span className={styles.subHeading}>{t('人物紹介', 'Profile')}</span>
                </div>

                <div className={styles.noteSection}>
                    <p className={styles.noteText}>
                        {t('日々の思考や技術的なアウトプットはNoteにて発信しています。', 'I publish my daily thoughts and technical outputs on Note.')}
                    </p>
                    <a href="https://note.com/jin_ai_system/all" target="_blank" rel="noopener noreferrer" className={styles.noteButton}>
                        <PenTool size={20} />
                        {t('Noteを見る', 'View Note')}
                    </a>
                </div>

                {/* Other Experiences Section */}
                <div className={styles.categoryBlock}>
                    <h2 className={styles.mainTitle}>{t('その他の活動・実績', 'Other Activities & Achievements')}</h2>
                    <p className={styles.intro}>{t('多様な経験を通じて培った視点やスキルをご紹介します。', 'Introducing perspectives and skills cultivated through diverse experiences.')}</p>

                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <MapPin className={styles.icon} size={24} />
                                <h3 className={styles.cardTitle}>{t('居住・滞在経験', 'Residence & Stay Experience')}</h3>
                            </div>
                            <ul className={styles.list}>
                                <li>{t('神奈川県（3年）、福岡県（7年）での居住・勤務経験', 'Living and working in Kanagawa (3 years) and Fukuoka (7 years)')}</li>
                                <li>{t('カナダ・トロントへの留学（3ヶ月）：異文化理解と語学力の向上', 'Study abroad in Toronto, Canada (3 months): Cross-cultural understanding and language improvement')}</li>
                                <li>{t('海外渡航歴（グアム、ロンドンなど）：グローバルな視点の醸成', 'Overseas travel history (Guam, London, etc.): Fostering a global perspective')}</li>
                            </ul>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <Briefcase className={styles.icon} size={24} />
                                <h3 className={styles.cardTitle}>{t('実務経験（初期キャリア等）', 'Work Experience (Early Career, etc.)')}</h3>
                            </div>
                            <ul className={styles.list}>
                                <li>{t('セールスプロモーション：提案力・顧客折衝スキルの習得', 'Sales Promotion: Acquisition of proposal and negotiation skills')}</li>
                                <li>{t('コールセンター：課題解決型コミュニケーション能力の向上', 'Call Center: Improvement of problem-solving communication skills')}</li>
                                <li>{t('流通・販売業務：業務効率化と現場オペレーションの理解', 'Distribution/Sales: Understanding of operational efficiency and field operations')}</li>
                                <li>{t('物流・配送：チームワークと体力・持久力', 'Logistics/Delivery: Teamwork and physical stamina/endurance')}</li>
                                <li>{t('飲食・サービス：ホスピタリティと臨機応変な対応力', 'Food Service: Hospitality and flexibility')}</li>
                                <li>{t('ブライダル：高水準なサービス提供とマナーの習得', 'Bridal: High-standard service delivery and manners')}</li>
                            </ul>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <BookOpen className={styles.icon} size={24} />
                                <h3 className={styles.cardTitle}>{t('スキルアップ・自己研鑽', 'Skill Up & Self-Improvement')}</h3>
                            </div>
                            <ul className={styles.list}>
                                <li>{t('技術習得：AWS、Python（クラウド活用およびデータ分析）', 'Technical Acquisition: AWS, Python (Cloud utilization and data analysis)')}</li>
                                <li>{t('語学：実務レベルの英語コミュニケーション（海外チームとの連携）', 'Language: Business-level English communication (Collaboration with overseas teams)')}</li>
                                <li>{t('セキュリティ：最新の脅威動向および対策技術の継続的なキャッチアップ', 'Security: Continuous catch-up on latest threat trends and countermeasure technologies')}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* LIKE Section to Interests */}
                <div className={styles.categoryBlock} style={{ marginTop: '80px' }}>
                    <h2 className={styles.likeTitle}>{t('趣味・関心', 'Hobbies & Interests')}</h2>

                    <div className={styles.likeGrid}>
                        <div className={styles.likeCard}>
                            <div className={styles.likeHeader}>
                                <MessageCircle className={styles.likeIcon} size={20} />
                                <h3 className={styles.likeHeading}>{t('コミュニケーション', 'Communication')}</h3>
                            </div>
                            <p className={styles.likeText}>
                                {t('交流会やネットワーキングへの積極的な参加を通じて、多様なバックグラウンドを持つ人々との対話を大切にしています。国内外（トロント等）でのコミュニティ活動にも参加し、視野を広げています。', 'We value dialogue with people from diverse backgrounds through active participation in exchange meetings and networking. We also participate in community activities domestically and internationally (Toronto, etc.) to broaden our horizons.')}
                            </p>
                        </div>

                        <div className={styles.likeCard}>
                            <div className={styles.likeHeader}>
                                <Dumbbell className={styles.likeIcon} size={20} />
                                <h3 className={styles.likeHeading}>{t('フィットネス', 'Fitness')}</h3>
                            </div>
                            <p className={styles.likeText}>
                                {t('自己規律と健康維持のため、筋力トレーニングを継続しています。学生時代はウエイトリフティング、空手、野球、テニス、水泳など多様な競技に打ち込み、目標達成に向けたプロセスを重視しています。', 'We continue weight training for self-discipline and health maintenance. In student days, we dedicated ourselves to various sports such as weightlifting, karate, baseball, tennis, swimming, empathizing the process towards goal achievement.')}
                            </p>
                        </div>

                        <div className={styles.likeCard}>
                            <div className={styles.likeHeader}>
                                <Search className={styles.likeIcon} size={20} />
                                <h3 className={styles.likeHeading}>{t('テクノロジー・ガジェット検証', 'Tech & Gadget Verification')}</h3>
                            </div>
                            <p className={styles.likeText}>
                                {t('最新のハードウェアやソフトウェア（スマートホーム家電、生成AIツール、NFC活用など）を実際に導入・検証し、生活や業務の効率化への応用を常に模索しています。実体験に基づくユーザビリティの評価を得意としています。', 'We actively introduce and verify the latest hardware and software (smart home appliances, generative AI tools, NFC utilization, etc.) and constantly explore applications for efficiency in life and work. We specialize in usability evaluation based on actual experience.')}
                            </p>
                        </div>

                        <div className={styles.likeCard}>
                            <div className={styles.likeHeader}>
                                <Film className={styles.likeIcon} size={20} />
                                <h3 className={styles.likeHeading}>{t('カルチャー・教養', 'Culture & Liberal Arts')}</h3>
                            </div>
                            <p className={styles.likeText}>
                                {t('日本のアニメーション文化への関心が高く、海外評価などの視点からも分析しています。また、読書、映画鑑賞、美術館巡りなどを通じて、感性やクリエイティビティの涵養に努めています。', 'We have a high interest in Japanese animation culture and analyze it from perspectives such as overseas evaluation. We also strive to cultivate sensibility and creativity through reading, watching movies, and visiting art museums.')}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
