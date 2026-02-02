import styles from './Philosophy.module.css';

export default function Philosophy() {
    return (
        <section className={styles.section} id="philosophy">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>経営理念</h2>
                    <p className={styles.subTitle}>PHILOSOPHY</p>
                </div>

                <div className={styles.mission}>
                    <h3 className={styles.missionTitle}>ミッション</h3>
                    <p className={styles.missionStatement}>
                        世界を、つなぐ。
                    </p>
                    <p className={styles.missionDesc}>
                        テクノロジーで世界をアップデートし、<br />
                        人と企業の新たな可能性を切り拓く。
                    </p>
                </div>

                <div className={styles.values}>
                    <h3 className={styles.valueTitle}>バリュー</h3>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>01</div>
                            <h4 className={styles.cardTitle}>ユーザーファースト<br /><span className={styles.cardSubTitle}>User First</span></h4>
                            <p className={styles.cardDesc}>
                                常にユーザーの視点に立ち、<br />
                                本質的な価値を提供し続けます。
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>02</div>
                            <h4 className={styles.cardTitle}>プロフェッショナル<br /><span className={styles.cardSubTitle}>Be Professional</span></h4>
                            <p className={styles.cardDesc}>
                                プロフェッショナルとして誇りを持ち、<br />
                                最高のパフォーマンスを発揮します。
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>03</div>
                            <h4 className={styles.cardTitle}>透明性<br /><span className={styles.cardSubTitle}>Transparency</span></h4>
                            <p className={styles.cardDesc}>
                                透明性を重んじ、<br />
                                信頼に基づいた関係を築きます。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
