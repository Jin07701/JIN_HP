"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Projects.module.css';
import { Network, Cpu, Layout, FileText } from 'lucide-react';

export default function Projects({ projects = [] }: { projects?: any[] }) {
    const { t } = useLanguage();

    const staticProjectData = [
        {
            id: 1,
            image: '/images/abstract_security_infra_1778050259971.png',
            icon: <Network size={32} />,
            category: t('セキュリティ / インフラ', 'Security / Infrastructure'),
            client: t('外資通販会社・他', 'Foreign E-commerce Company, etc.'),
            title: t('脆弱性対応・セキュリティ自動化', 'Vulnerability Response & Security Automation'),
            desc: t(
                '脆弱性検知数が1000件を超える状態から、対応フロー整備とパッチ適用自動化を導入。Japanチームのセキュリティレベル向上に大きく貢献しました。',
                'Introduced response flow and automated patching from over 1000 detected vulnerabilities. Contributed to improving the security level for the Japan team.'
            ),
            tags: ['Vulnerability', 'Automation', 'Azure', 'PowerShell'],
            link: '',
            details: [
                {
                    heading: t('脆弱性対応', 'Vulnerability Response'),
                    items: [
                        t('ServerやNW機器の脆弱性調査&対策検討', 'Investigation & mitigation planning for Server/NW vulnerabilities'),
                        t('脆弱性の対応サマリ資料作成', 'Creation of vulnerability response summary documents'),
                        t('WindowsServerやLinuxServerを検証用に構築し、セキュリティテストを実施', 'Built Windows/Linux servers for verification and conducted security tests'),
                        t('対策立案資料の作成や提案業務', 'Proposal creation and suggestions for countermeasures')
                    ]
                }
            ]
        },
        {
            id: 2,
            image: '/images/abstract_pm_consulting_illu_1778050279493.png',
            icon: <Cpu size={32} />,
            category: t('PM / コンサルティング', 'PM / Consulting'),
            client: t('自動車関連・医療機関', 'Automotive / Medical Institutions'),
            title: t('大規模システム更新・PJ推進', 'Large-scale System Renewal & PJ Promotion'),
            desc: t(
                '次期システム更新PJにて、意思決定フローを可視化しファシリテーションを実施。計画通りのシステム稼働と対立構造の解消を実現しました。',
                'Visualized decision flows and facilitated to resolve stagnation in the next-gen system renewal PJ. Ensured on-time launch and resolved conflicts.'
            ),
            tags: ['PMO', 'Facilitation', 'Requirement Def'],
            link: '',
            details: [
                {
                    heading: t('病院へ自社システムの営業/提案', 'Sales/Proposal of proprietary system to hospitals'),
                    items: [
                        t('顧客要件のヒアリングと課題分析', 'Hearing client requirements and analyzing issues'),
                        t('インストール・初期設定・データ移行作業', 'Installation, initial setup, and data migration'),
                        t('導入後の動作確認・ユーザー向け操作説明会', 'Post-installation verification and user operation training')
                    ]
                },
                {
                    heading: t('障害対応（セキュリティ・パフォーマンス・製品不具合対応など）', 'Incident Response (Security, Performance, Product Defects, etc.)'),
                    items: [
                        t('障害発生時の原因調査と影響範囲の特定', 'Investigation of cause and identification of impact scope during incidents'),
                        t('セキュリティインシデント、パフォーマンス低下、製品不具合への対応', 'Response to security incidents, performance degradation, and product defects'),
                        t('顧客への状況説明・復旧見込み共有と恒久対策の提案', 'Explanation of situation to client, sharing recovery estimates, and proposing permanent measures')
                    ]
                },
                {
                    heading: t('その他', 'Others'),
                    items: [
                        t('導入業務ではPMやPMOの経験もございます。', 'Experience as PM/PMO in implementation projects.')
                    ]
                }
            ]
        },
        {
            id: 3,
            image: '/images/company-profile-concept.jpg',
            category: t('業務効率化 / 監査', 'Efficiency / Audit'),
            client: t('金融機関・銀行', 'Financial Institutions / Banks'),
            title: t('監査対応・業務プロセス改善', 'Audit Response & Process Improvement'),
            desc: t(
                '3ヶ月に1度20時間を要していた監査対応作業に対し、根本的な業務プロセスの見直しを実施。関係者調整の上で代替案を提示し、当該作業をゼロベースで削減。業務効率とガバナンスの両立を達成。',
                'Reviewed business processes for audit response that took 20h every 3 months. Proposed alternatives and reduced the work to zero, balancing efficiency and governance.'
            ),
            tags: ['Efficiency', 'Audit', 'Process Improvement'],
            link: ''
        },
        {
            id: 4,
            image: '/images/company-profile-concept.jpg',
            category: t('インフラ / サーバー', 'Infrastructure / Server'),
            client: t('金融機関・証券会社', 'Financial Institutions / Securities'),
            title: t('金融系サーバ設計・構築・保守', 'Financial Server Design, Build & Maintenance'),
            desc: t(
                '銀行や証券システムのサーバ設計・構築から保守運用までを担当。自動化ツール（Ansible）を用いた構築や、VBAによる業務効率化ツール作成、脆弱性調査など、インフラエンジニアとして幅広い業務に従事。',
                'Handled server design, build, and maintenance for bank/securities systems. Engaged in automation (Ansible), VBA tool creation, and vulnerability research.'
            ),
            tags: ['Linux', 'Windows Server', 'Ansible', 'Oracle', 'WebLogic'],
            link: '',
            details: [
                {
                    heading: t('証券会社の被災環境サーバ構築PJ (2016/3 - 2016/8)', 'Securities Co. Disaster Recovery Server Build PJ'),
                    items: [
                        t('ミドルウェア(Apache/WebLogic)の構築', 'Middleware (Apache/WebLogic) construction'),
                        t('Linuxサーバの構築、テスト', 'Linux server construction and testing'),
                        t('Senju(運用管理ツール)の設計', 'Design of Senju (Operation Management Tool)'),
                        t('環境: Linux, Oracle, Apache, WebLogic', 'Env: Linux, Oracle, Apache, WebLogic')
                    ]
                },
                {
                    heading: t('銀行システムの保守・管理PJ (2015/12 - 2016/2)', 'Bank System Maintenance/Management PJ'),
                    items: [
                        t('月次稼動報告、脆弱性と不具合の調査(OS/ミドル/NW/HW)', 'Monthly operation reports, vulnerability/defect investigation (OS/Middle/NW/HW)'),
                        t('システム変更案件（ストレージの増築など）', 'System change projects (e.g., storage expansion)'),
                        t('システム変更案件の計画～作業実施', 'Planning and execution of system change projects'),
                        t('環境: Linux, Windows2008, Shell', 'Env: Linux, Windows2008, Shell')
                    ]
                },
                {
                    heading: t('大手銀行向けサーバ リプレースPJ (2015/4 - 2015/11)', 'Major Bank Server Replacement PJ'),
                    items: [
                        t('自動構築ツール(Ansible)でのTP1を12面構築', 'Construction of 12 TP1 instances using automation tool (Ansible)'),
                        t('性能テスト実施と報告資料の作成', 'Execution of performance tests and creation of report documents'),
                        t('パフォーマンス評価用にVBAにてグラフ自動作成ツールを作成', 'Created automated graph creation tool in VBA for performance evaluation'),
                        t('環境: HP-UX, TP1, VBA, Ansible', 'Env: HP-UX, TP1, VBA, Ansible')
                    ]
                },
                {
                    heading: t('サーバ設計・構築・保守（概要）', 'Server Design/Build/Maintenance (Overview)'),
                    items: [
                        t('要件定義に基づくサーバ環境の設計（OS、ミドルウェア、ネットワーク構成）', 'Server environment design based on requirements (OS, middleware, network config)'),
                        t('サーバの構築・初期設定・セキュリティ対策の実施', 'Server build, initial setup, and security implementation'),
                        t('運用・監視・パッチ適用・障害対応による安定稼働の維持', 'Maintenance of stable operation through monitoring, patching, and incident response'),
                        t('※金融系の厳格なコンプライアンス基準にも対応可能です。', '*Capable of complying with strict financial compliance standards.')
                    ]
                }
            ]
        }
    ];

    const displayProjects = projects.length > 0 ? projects.map(p => ({
        id: p.id,
        image: p.image_url,
        category: p.category,
        title: p.title,
        desc: p.description,
        link: p.link,
        tags: [],
        client: ''
    })) : staticProjectData;

    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    return (
        <section className={styles.section} id="projects">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleArea}>
                        <h2 className={styles.title}>{t('実績紹介', 'Projects')}</h2>
                        <div className={styles.divider}></div>
                        <p className={styles.subTitle}>{t('技術と信頼の軌跡', 'Trace of Tech & Trust')}</p>
                    </div>
                    <Link href="/projects" className={styles.viewAll}>
                        {t('すべての実績を見る', 'View All Projects')} <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {displayProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={styles.card}
                            onClick={() => {
                                if (project.link) window.open(project.link, '_blank');
                                else setSelectedProject(project);
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={styles.cardNumber}>0{index + 1}</div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMain}>
                                    <div className={styles.meta}>
                                        <span className={styles.category}>{project.category}</span>
                                        {project.client && <span className={styles.client}>{project.client}</span>}
                                    </div>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDesc}>{project.desc}</p>
                                    <div className={styles.tags}>
                                        {project.tags?.map((tag: string, idx: number) => (
                                            <span key={idx} className={styles.tag}>#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.cardVisual}>
                                    <img src={project.image} alt="" className={styles.visualImage} />
                                    <div className={styles.blueprintOverlay}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedProject && (
                    <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>
                                <X size={24} />
                            </button>

                            <div className={styles.modalHeader}>
                                <span className={styles.modalCategory}>{selectedProject.category}</span>
                                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                            </div>

                            <div className={styles.modalBody}>
                                {selectedProject.details ? (
                                    selectedProject.details.map((section: any, idx: number) => (
                                        <div key={idx} className={styles.detailSection}>
                                            <h4 className={styles.detailHeading}>{section.heading}</h4>
                                            <ul className={styles.detailList}>
                                                {section.items.map((item: any, i: number) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <p>{selectedProject.desc}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
