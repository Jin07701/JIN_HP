import styles from './Philosophy.module.css';

export default function Philosophy() {
    return (
        <section className={styles.section} id="philosophy">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>PHILOSOPHY</h2>
                    <p className={styles.subTitle}>経営理念</p>
                </div>

                <div className={styles.mission}>
                    <h3 className={styles.missionTitle}>Mission</h3>
                    <p className={styles.missionStatement}>
                        世界を、つなぐ。
                    </p>
                    <p className={styles.missionDesc}>
                        テクノロジーで世界をアップデートし、<br />
                        人と企業の新たな可能性を切り拓く。
                    </p>
                </div>

                <div className={styles.values}>
                    <h3 className={styles.valueTitle}>Values</h3>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>01</div>
                            <h4 className={styles.cardTitle}>User First</h4>
                            <p className={styles.cardDesc}>
                                常にユーザーの視点に立ち、<br />
                                本質的な価値を提供し続けます。
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>02</div>
                            <h4 className={styles.cardTitle}>Be Professional</h4>
                            <p className={styles.cardDesc}>
                                プロフェッショナルとして誇りを持ち、<br />
                                最高のパフォーマンスを発揮します。
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>03</div>
                            <h4 className={styles.cardTitle}>Transparency</h4>
                            <p className={styles.cardDesc}>
                                透明性を重じ、<br />
                                信頼に基づいた関係を築きます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
