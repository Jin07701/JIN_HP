import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './Projects.module.css';

const projectData = [
    {
        id: 1,
        image: '/images/project-finance.jpg', // Placeholder
        category: 'Development',
        client: '大手金融機関',
        title: '基幹システム クラウド移行・マイクロサービス化支援',
        desc: 'レガシーなオンプレミス環境からAWSへの完全移行を担当。コンテナ技術活用によりデプロイ頻度を月1回から日次へと短縮し、運用コストを40%削減。',
        tags: ['AWS', 'Docker', 'Go', 'Agile']
    },
    {
        id: 2,
        image: '/images/project-ai.jpg', // Placeholder
        category: 'AI / Data',
        client: 'Human Resources Tech',
        title: 'AIマッチングアルゴリズム開発・精度向上',
        desc: '求職者と企業の行動ログを解析し、独自のレコメンドエンジンを構築。マッチング成約率を導入前の1.5倍に向上させ、サービスのコア価値創出に貢献。',
        tags: ['Python', 'TensorFlow', 'BigQuery', 'MLOps']
    },
    {
        id: 3,
        image: '/images/project-security.jpg', // Placeholder
        category: 'Security',
        client: 'FinTech Startup',
        title: '金融セキュリティ監査・ISMS取得コンサルティング',
        desc: 'サービス立ち上げ期のセキュリティ要件定義から脆弱性診断までを包括的に支援。短期間でのISMS認証取得を実現し、事業提携の加速をサポート。',
        tags: ['Security Risk', 'ISMS', 'Penetration Test']
    }
];

export default function Projects() {
    return (
        <section className={styles.section} id="projects">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>PROJECTS</h2>
                    <p className={styles.subTitle}>実績紹介・プロジェクト事例</p>
                    <Link href="/projects" className={styles.viewAll}>
                        すべての実績を見る <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {projectData.map((project) => (
                        <div key={project.id} className={styles.card}>
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
        </section>
    );
}
