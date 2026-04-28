"use client";
import { useLanguage } from '@/context/LanguageContext';
import styles from './Career.module.css';

export default function Career({ careers = [] }: { careers?: any[] }) {
    const { t } = useLanguage();

    const staticCareerData = [
        {
            period: '2025/09 ～ ' + t('現在', 'Present'),
            role: t('通信会社のマーケティング戦略', 'Marketing Strategy at Telecom Company'),
            desc: t(
                '要望書や要件定義の作成、各部署（開発/法務/セキュリティ/サービスなど）との打ち合わせ、会議のファシリテートを担当。提案書の作成やプレゼンも実施。',
                'Responsible for creating request documents and requirements definitions, meetings with various departments (development/legal/security/service, etc.), and facilitating meetings. also conducting proposals and presentations.'
            ),
            highlight: true
        },
        {
            period: '2025/05 ～ 2025/08',
            role: t('トロントでの活動', 'Activities in Toronto'),
            desc: t(
                '海外市場調査および語学学習、異文化コミュニケーションスキルの向上。',
                'Overseas market research, language learning, and improvement of cross-cultural communication skills.'
            ),
            highlight: false
        },
        {
            period: '2022/06 ～ 2025/04',
            role: t('外資通販会社のインフラセキュリティ', 'Infrastructure Security at Foreign E-commerce Company'),
            desc: t(
                'グローバルチームと連携し、1000件超の脆弱性対応やパッチ適用自動化をリード。',
                'Collaborated with global teams to lead vulnerability response for over 1000 cases and automation of patching.'
            ),
            highlight: false
        },
        {
            period: '2018/04 ～ 2022/05',
            role: t('大手病院のシステム営業・導入・保守', 'System Sales, Implementation & Maintenance at Major Hospital'),
            desc: t(
                '電子カルテシステムの導入プロジェクトマネジメントおよび保守運用を担当。',
                'Responsible for project management of electronic medical record system implementation and maintenance/operation.'
            ),
            highlight: false
        },
        {
            period: '2016/09 ～ 2018/03',
            role: t('自動車Webサイト Server保守・次期提案', 'Automotive Website Server Maintenance & Next-Gen Proposal'),
            desc: t(
                '高負荷対策および次期インフラ基盤の設計・提案を実施。',
                'Implemented high-load countermeasures and design/proposal of next-generation infrastructure.'
            ),
            highlight: false
        },
        {
            period: '2015/04 ～ 2016/08',
            role: t('銀行・証券システムのServer構築・保守', 'Server Build & Maintenance for Bank/Securities Systems'),
            desc: t(
                '証券会社のDR環境構築、銀行システムの保守管理およびリプレース案件に従事。Ansible等を用いた自動化も経験。',
                'Engaged in DR environment construction for securities companies, maintenance management and replacement projects for bank systems. Experienced in automation using Ansible etc.'
            ),
            highlight: false
        }
    ];

    const displayCareers = careers.length > 0 ? careers.map(c => ({
        period: c.year,
        role: c.event,
        desc: '',
        highlight: false
    })) : staticCareerData;

    return (
        <section className={styles.section} id="career">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{t('経歴', 'Career')}</h2>
                </div>
                <div className={styles.timeline}>
                    {displayCareers.map((item, index) => (
                        <div key={index} className={`${styles.item} ${item.highlight ? styles.highlight : ''}`}>
                            <div className={styles.period}>{item.period}</div>
                            <div className={styles.content}>
                                <h3 className={styles.role}>{item.role}</h3>
                                <p className={styles.desc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
