"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero({ settings }: { settings?: Record<string, string> }) {
    const { t, language } = useLanguage();

    const title = language === 'ja' ? (settings?.hero_title_ja || t('卓越したエンジニアと、\n理想の未来を。', 'With Outstanding Engineers,\nCreate Ideal Future.')) : (settings?.hero_title_en || t('卓越したエンジニアと、\n理想の未来を。', 'With Outstanding Engineers,\nCreate Ideal Future.'));
    const subtitle = language === 'ja' ? (settings?.hero_subtitle_ja || t('ARISTAは、頂点を極めるテクノロジーで世界を再定義し、\n選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。', 'ARISTA redefines the world with peak technology,\nAiming for a new summit where selected engineers and companies resonate.')) : (settings?.hero_subtitle_en || t('ARISTAは、頂点を極めるテクノロジーで世界を再定義し、\n選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。', 'ARISTA redefines the world with peak technology,\nAiming for a new summit where selected engineers and companies resonate.'));

    // Fix literal \n coming from database
    const processedTitle = title.replace(/\\n/g, '\n');
    const processedSubtitle = subtitle.replace(/\\n/g, '\n');

    // split title by newline
    const titleLines = processedTitle.split('\n');

    return (
        <section className={styles.hero} id="top" style={settings?.hero_bg_image ? { backgroundImage: `url(${settings.hero_bg_image})` } : {}}>
            <div className={styles.content}>
                <h1 className={styles.headline}>
                    {titleLines[0] && <span className={styles.gradientText}>{titleLines[0]}</span>}
                    {titleLines[1] && <><br /><span className={styles.accentText}>{titleLines[1]}</span></>}
                </h1>
                <p className={styles.subHeadline} style={{ whiteSpace: 'pre-wrap' }}>
                    {processedSubtitle}
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
