"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className={styles.hero} id="top">
            <div className={styles.content}>
                <h1 className={styles.headline}>
                    <span className={styles.gradientText}>{t('卓越したエンジニアと、', 'With Outstanding Engineers,')}</span><br />
                    <span className={styles.accentText}>{t('理想の未来を。', 'Create Ideal Future.')}</span>
                </h1>
                <p className={styles.subHeadline}>
                    {t(
                        'ARISTAは、頂点を極めるテクノロジーで世界を再定義し、',
                        'ARISTA redefines the world with peak technology,'
                    )}<br />
                    {t(
                        '選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。',
                        'Aiming for a new summit where selected engineers and companies resonate.'
                    )}
                </p>
                <div className={styles.ctaContainer}>
                    <Link href="/contact" className={styles.primaryButton}>
                        {t('お問い合わせ', 'Contact Us')}
                    </Link>
                    <Link href="/service" className={styles.secondaryButton}>
                        {t('サービスを見る', 'Our Services')}
                    </Link>
                </div>
                <div className={styles.scrollDown}>SCROLL</div>
            </div>
        </section>
    );
}
