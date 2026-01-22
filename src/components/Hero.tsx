import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.headline}>
                    <span className={styles.gradientText}>つくる人と、</span><br />
                    <span className={styles.gradientText}>世界を</span>
                    <span className={styles.redAccent}>変える。</span>
                </h1>
                <p className={styles.subHeadline}>
                    つくる人がいなければ、何も生まれません。<br />
                    KANAMEは、テクノロジーで世界をアップデートし、<br />
                    人と企業の新たな可能性を切り拓きます。
                </p>
            </div>
        </section>
    );
}
