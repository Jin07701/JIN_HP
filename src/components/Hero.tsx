import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.headline}>
                    <span className={styles.gradientText}>卓越したエンジニアと、</span><br />
                    <span className={styles.accentText}>理想の未来を。</span>
                </h1>
                <p className={styles.subHeadline}>
                    KANAMEは、頂点を極めるテクノロジーで世界を再定義し、<br />
                    選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。
                </p>
                <div className={styles.ctaContainer}>
                    <Link href="/contact" className={styles.primaryButton}>
                        PROJECT START
                    </Link>
                    <Link href="/service" className={styles.secondaryButton}>
                        OUR SERVICE
                    </Link>
                </div>
                <div className={styles.scrollDown}>SCROLL</div>
            </div>
        </section>
    );
}
