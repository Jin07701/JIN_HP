import Link from 'next/link';
import styles from './Lineup.module.css';
import { Network, Shield, Cpu, Code } from 'lucide-react';

const lineupItems = [
    {
        id: 'connect',
        title: 'DirectConnect',
        subtitle: 'エンジニア・企業マッチング',
        description: '中間マージンを排除した、透明性の高いダイレクトマッチングプラットフォーム。',
        icon: <Network size={40} />,
        link: '/service#connect',
        image: '/images/direct-connect-match.png'
    },
    {
        id: 'consulting',
        title: 'IT Consulting',
        subtitle: '技術コンサルティング',
        description: 'インフラからアプリまで、最新技術でお客様の課題を解決します。',
        icon: <Cpu size={40} />,
        link: '/service#consulting',
        image: '/images/hakata-bg-clean.jpg'
    },
    {
        id: 'security',
        title: 'Security',
        subtitle: 'セキュリティ診断・対策',
        description: '脆弱性診断から堅牢化支援まで、システムを守る包括的なセキュリティサービス。',
        icon: <Shield size={40} />,
        link: '/service#security',
        image: '/images/company-profile-concept.jpg'
    }
];

export default function Lineup() {
    return (
        <section className={styles.section} id="service">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>サービス一覧</h2>
                </div>

                <div className={styles.grid}>
                    {lineupItems.map((item) => (
                        <Link href={item.link} key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className={styles.image} />
                                ) : (
                                    <div className={styles.placeholderImage}>
                                        {item.icon}
                                    </div>
                                )}
                                <div className={styles.overlayText}>
                                    <span className={styles.viewDetails}>詳細を見る</span>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardSubtitle}>{item.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.viewAll}>
                    <Link href="/service" className={styles.viewAllBtn}>
                        すべてのサービスを見る
                    </Link>
                </div>
            </div>
        </section>
    );
}
