"use client";
import { useLanguage } from '@/context/LanguageContext';
import styles from './Philosophy.module.css';

export default function Philosophy() {
    const { t } = useLanguage();

    return (
        <section className={styles.section} id="philosophy">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t('経営理念', 'Our Philosophy')}</h2>
                    <p className={styles.subTitle}>PHILOSOPHY</p>
                </div>

                <div className={styles.mission}>
                    <h3 className={styles.missionTitle}>{t('ミッション', 'Mission')}</h3>
                    <p className={styles.missionStatement}>
                        {t('世界を、つなぐ。', 'Connect the World.')}
                    </p>
                    <p className={styles.missionDesc}>
                        {t('テクノロジーで世界をアップデートし、', 'Update the world with technology,')}<br />
                        {t('人と企業の新たな可能性を切り拓く。', 'and open up new possibilities for people and companies.')}
                    </p>
                </div>

                <div className={styles.values}>
                    <h3 className={styles.valueTitle}>{t('バリュー', 'Values')}</h3>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>01</div>
                            <h4 className={styles.cardTitle}>{t('ユーザーファースト', 'User First')}<br /><span className={styles.cardSubTitle}>User First</span></h4>
                            <p className={styles.cardDesc}>
                                {t('常にユーザーの視点に立ち、', 'Always standing from the user perspective,')}<br />
                                {t('本質的な価値を提供し続けます。', 'we continue to provide essential value.')}
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>02</div>
                            <h4 className={styles.cardTitle}>{t('プロフェッショナル', 'Professional')}<br /><span className={styles.cardSubTitle}>Be Professional</span></h4>
                            <p className={styles.cardDesc}>
                                {t('プロフェッショナルとして誇りを持ち、', 'Taking pride as professionals,')}<br />
                                {t('最高のパフォーマンスを発揮します。', 'we demonstrate the best performance.')}
                            </p>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>03</div>
                            <h4 className={styles.cardTitle}>{t('透明性', 'Transparency')}<br /><span className={styles.cardSubTitle}>Transparency</span></h4>
                            <p className={styles.cardDesc}>
                                {t('透明性を重んじ、', 'Valuing transparency,')}<br />
                                {t('信頼に基づいた関係を築きます。', 'we build relationships based on trust.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
