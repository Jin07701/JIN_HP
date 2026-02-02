import styles from './Career.module.css';

const careerData = [
    {
        period: '2025/09 ～ 現在',
        role: '通信会社のマーケティング戦略',
        desc: '要望書や要件定義の作成、各部署（開発/法務/セキュリティ/サービスなど）との打ち合わせ、会議のファシリテートを担当。提案書の作成やプレゼンも実施。',
        highlight: true
    },
    {
        period: '2025/05 ～ 2025/08',
        role: 'トロントでの活動',
        desc: '海外市場調査および語学学習、異文化コミュニケーションスキルの向上。',
        highlight: false
    },
    {
        period: '2022/06 ～ 2025/04',
        role: '外資通販会社のインフラセキュリティ',
        desc: 'グローバルチームと連携し、1000件超の脆弱性対応やパッチ適用自動化をリード。',
        highlight: false
    },
    {
        period: '2018/04 ～ 2022/05',
        role: '大手病院のシステム営業・導入・保守',
        desc: '電子カルテシステムの導入プロジェクトマネジメントおよび保守運用を担当。',
        highlight: false
    },
    {
        period: '2016/09 ～ 2018/03',
        role: '自動車Webサイト Server保守・次期提案',
        desc: '高負荷対策および次期インフラ基盤の設計・提案を実施。',
        highlight: false
    },
    {
        period: '2015/04 ～ 2016/08',
        role: '銀行・証券システムのServer構築・保守',
        desc: '証券会社のDR環境構築、銀行システムの保守管理およびリプレース案件に従事。Ansible等を用いた自動化も経験。',
        highlight: false
    }
];

export default function Career() {
    return (
        <section className={styles.section} id="career">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>経歴</h2>
                </div>
                <div className={styles.timeline}>
                    {careerData.map((item, index) => (
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
