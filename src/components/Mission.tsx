"use client";
import { useLanguage } from '@/context/LanguageContext';
import styles from './Mission.module.css';

export default function Mission() {
    const { t } = useLanguage();

    return (
        <section className={styles.section} id="mission">
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{t('企業理念', 'Our Mission')}</h2>
                    <p className={styles.subtitle}>{t('私たちが目指すもの', 'What We Aim For')}</p>

                    <div className={styles.textBox}>
                        <h3 className={styles.mainMessage}>
                            {t('技術と情熱で、', 'With Technology and Passion,')}<br />
                            {t('正解のない未来を切り拓く。', 'Carving out an Uncertain Future.')}
                        </h3>
                        <p className={styles.description}>
                            {t(
                                'テクノロジーの進化は止まることを知らず、世界は日々変化しています。',
                                'Technology never stops evolving, and the world is changing every day.'
                            )}<br />
                            {t(
                                'KANAMEは、卓越した技術力を持つエンジニアとビジョンを持つ企業を繋ぎ、',
                                'KANAME connects engineers with outstanding technical skills to visionary companies,'
                            )}<br />
                            {t(
                                '単なるマッチングを超えた「共鳴」を生み出します。',
                                'Creating "resonance" that goes beyond simple matching.'
                            )}<br /><br />
                            {t('個の力が最大限に輝く社会へ。', 'To a society where individual potential shines brightest.')}<br />
                            {t(
                                '私たちは、エンジニアとともに新たな価値を創造し続けます。',
                                'We continue to create new value together with engineers.'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
