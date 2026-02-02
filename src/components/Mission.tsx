import styles from './Mission.module.css';

export default function Mission() {
    return (
        <section className={styles.section} id="mission">
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>企業理念</h2>
                    <p className={styles.subtitle}>私たちが目指すもの</p>

                    <div className={styles.textBox}>
                        <h3 className={styles.mainMessage}>
                            技術と情熱で、<br />
                            正解のない未来を切り拓く。
                        </h3>
                        <p className={styles.description}>
                            テクノロジーの進化は止まることを知らず、世界は日々変化しています。<br />
                            KANAMEは、卓越した技術力を持つエンジニアとビジョンを持つ企業を繋ぎ、<br />
                            単なるマッチングを超えた「共鳴」を生み出します。<br /><br />
                            個の力が最大限に輝く社会へ。<br />
                            私たちは、エンジニアとともに新たな価値を創造し続けます。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
