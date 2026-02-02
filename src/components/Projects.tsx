"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import styles from './Projects.module.css';

const projectData = [
    {
        id: 1,
        image: '/images/direct-connect-showcase.png',
        category: 'Security / Infra',
        client: '外資通販会社・他',
        title: '脆弱性対応・セキュリティ自動化',
        desc: '脆弱性検知数が1000件を超える状態から、対応フロー整備とパッチ適用自動化（PowerShell/Ansible）を導入。週次定例でのアクション明確化により、600件以上を解消し、Japanチームのセキュリティレベル向上に貢献。',
        tags: ['Vulnerability', 'Automation', 'Azure', 'PowerShell'],
        details: [
            {
                heading: '脆弱性対応',
                items: [
                    'ServerやNW機器の脆弱性調査&対策検討',
                    '脆弱性の対応サマリ資料作成',
                    'WindowsServerやLinuxServerを検証用に構築し、セキュリティテストを実施',
                    '対策立案資料の作成や提案業務'
                ]
            },
            {
                heading: 'Server構築・運用＆パッチ適用',
                items: [
                    'WindowsServerやLinux(RHELやOracle)Serverの設計・構築・運用',
                    'OSやMS製品関連・VM関連の定期的なパッチ適用(IvantiやAnsible、Azure)',
                    'dnf / yum を用いた Linux Serverのセキュリティパッチ適用と適用時エラーの調査・対応',
                    'アナウンスやサービス停止起動処理の自動化 (outlookやBitbucket)'
                ]
            },
            {
                heading: '老朽化・脆弱性の高いServerのリタイヤ対応',
                items: [
                    'EOLServerの移行/リタイヤ計画',
                    'Serverリタイヤに向けた各チームとの調整'
                ]
            },
            {
                heading: '新サーバ導入時のパッチ適用計画策定',
                items: [
                    '対象OS・ミドルウェアのパッチ適用方針の策定',
                    '適用手順書・スケジュールの作成',
                    '適用後の動作確認項目の定義'
                ]
            },
            {
                heading: 'BlueCoat廃止に伴うFW移行',
                items: [
                    'BlueCoat上のアクセス制御・ポリシー設定の棚卸・エクスポート',
                    'ファイアウォール (FW) への移行要件定義 (ポリシー/フィルタリングルール)',
                    '関係部署・システム担当者とのFW移行要件調整・承認取得'
                ]
            }
        ]
    },
    {
        id: 2,
        image: '/images/direct-connect-match.png',
        category: 'PM / Consulting',
        client: '自動車関連・医療機関',
        title: '大規模システム更新・PJ推進',
        desc: '次期システム更新PJにて、チーム間の連携停滞を解消するため、意思決定フローを可視化しファシリテーションを実施。「何をいつまでに決めるか」を明示し、対立構造を解消して計画通りのシステム稼働を実現。',
        tags: ['PMO', 'Facilitation', 'Requirement Def'],
        details: [
            {
                heading: '病院へ自社システムの営業/提案',
                items: [
                    '顧客要件のヒアリングと課題分析',
                    '自社システムの提案資料・デモ環境の作成',
                    '導入スケジュールや見積もりの提示・調整'
                ]
            },
            {
                heading: 'システムコンサルティング（要望確認・要件定義など）',
                items: [
                    '顧客ヒアリングによる業務課題と要望の整理',
                    '要件定義書・機能仕様書の作成',
                    '提案内容に基づくシステム化計画の策定'
                ]
            },
            {
                heading: '開発チームとの仕様検討',
                items: [
                    '開発チームとの仕様提案・設計調整',
                    'UI設計（画面レイアウト、操作フロー、ユーザビリティ検討）'
                ]
            },
            {
                heading: '自社パッケージシステム導入対応',
                items: [
                    '顧客との打ち合わせによる要件確認・導入計画策定',
                    'インストール・初期設定・データ移行作業',
                    '導入後の動作確認・ユーザー向け操作説明会'
                ]
            },
            {
                heading: '障害対応（セキュリティ・パフォーマンス・製品不具合対応など）',
                items: [
                    '障害発生時の原因調査と影響範囲の特定',
                    'セキュリティインシデント、パフォーマンス低下、製品不具合への対応',
                    '顧客への状況説明・復旧見込み共有と恒久対策の提案'
                ]
            },
            {
                heading: 'その他',
                items: [
                    '導入業務ではPMやPMOの経験もございます。'
                ]
            }
        ]
    },
    {
        id: 3,
        image: '/images/company-profile-concept.jpg',
        category: 'Efficiency / Audit',
        client: '金融機関・銀行',
        title: '監査対応・業務プロセス改善',
        desc: '3ヶ月に1度20時間を要していた監査対応作業に対し、根本的な業務プロセスの見直しを実施。関係者調整の上で代替案を提示し、当該作業をゼロベースで削減。業務効率とガバナンスの両立を達成。',
        tags: ['Efficiency', 'Audit', 'Process Improvement']
    },
    {
        id: 4,
        image: '/images/company-profile-concept.jpg',
        category: 'Infra / Server',
        client: '金融機関・証券会社',
        title: '金融系サーバ設計・構築・保守',
        desc: '銀行や証券システムのサーバ設計・構築から保守運用までを担当。自動化ツール（Ansible）を用いた構築や、VBAによる業務効率化ツール作成、脆弱性調査など、インフラエンジニアとして幅広い業務に従事。',
        tags: ['Linux', 'Windows Server', 'Ansible', 'Oracle', 'WebLogic'],
        details: [
            {
                heading: '証券会社の被災環境サーバ構築PJ (2016/3 - 2016/8)',
                items: [
                    'ミドルウェア(Apache/WebLogic)の構築',
                    'Linuxサーバの構築、テスト',
                    'Senju(運用管理ツール)の設計',
                    '環境: Linux, Oracle, Apache, WebLogic'
                ]
            },
            {
                heading: '銀行システムの保守・管理PJ (2015/12 - 2016/2)',
                items: [
                    '月次稼動報告、脆弱性と不具合の調査(OS/ミドル/NW/HW)',
                    'システム変更案件（ストレージの増築など）',
                    'システム変更案件の計画～作業実施',
                    '環境: Linux, Windows2008, Shell'
                ]
            },
            {
                heading: '大手銀行向けサーバ リプレースPJ (2015/4 - 2015/11)',
                items: [
                    '自動構築ツール(Ansible)でのTP1を12面構築',
                    '性能テスト実施と報告資料の作成',
                    'パフォーマンス評価用にVBAにてグラフ自動作成ツールを作成',
                    '環境: HP-UX, TP1, VBA, Ansible'
                ]
            },
            {
                heading: 'サーバ設計・構築・保守（概要）',
                items: [
                    '要件定義に基づくサーバ環境の設計（OS、ミドルウェア、ネットワーク構成）',
                    'サーバの構築・初期設定・セキュリティ対策の実施',
                    '運用・監視・パッチ適用・障害対応による安定稼働の維持',
                    '※金融系の厳格なコンプライアンス基準にも対応可能です。'
                ]
            }
        ]
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projectData[0] | null>(null);

    return (
        <section className={styles.section} id="projects">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>実績紹介</h2>
                    <p className={styles.subTitle}>プロジェクト事例</p>
                    <Link href="/projects" className={styles.viewAll}>
                        すべての実績を見る <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {projectData.map((project) => (
                        <div
                            key={project.id}
                            className={styles.card}
                            onClick={() => setSelectedProject(project)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.categoryBadge}>{project.category}</div>
                                <span className={styles.clientName}>{project.client} 様</span>
                            </div>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <p className={styles.projectDesc}>{project.desc}</p>
                            <div className={styles.tags}>
                                {project.tags.map((tag, idx) => (
                                    <span key={idx} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
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
                                selectedProject.details.map((section, idx) => (
                                    <div key={idx} className={styles.detailSection}>
                                        <h4 className={styles.detailHeading}>{section.heading}</h4>
                                        <ul className={styles.detailList}>
                                            {section.items.map((item, i) => (
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
        </section>
    );
}
