"use client";
import { useLanguage } from '@/context/LanguageContext';
import styles from './CompanyProfile.module.css';

export default function CompanyProfile() {
    const { t } = useLanguage();

    return (
        <section className={styles.section} id="company">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{t('会社概要', 'Company Profile')}</h2>
                </div>

                <div className={styles.infoSection}>
                    <dl className={styles.dl}>
                        <div className={styles.row}>
                            <dt>{t('会社名', 'Company Name')}</dt>
                            <dd>{t('合同会社KANAME', 'KANAME LLC')}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('設立日', 'Established')}</dt>
                            <dd>{t('2026年4月', 'April 2026')}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('代表者', 'Representative')}</dt>
                            <dd>Jin</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('所在地', 'Location')}</dt>
                            <dd>{t('〒812-0011 福岡県福岡市博多区博多駅前1-23-4 博多駅前ビル 5F', '1-23-4 Hakata Ekimae, Hakata-ku, Fukuoka 812-0011, Japan')}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('事業内容', 'Business Activities')}</dt>
                            <dd>
                                {t('・エンジニアマッチングプラットフォーム「DirectConnect」の運営', '・Operation of Engineer Matching Platform "DirectConnect"')}<br />
                                {t('・ITコンサルティング事業', '・IT Consulting Business')}<br />
                                {t('・セキュリティ監査・診断事業', '・Security Audit & Assessment Business')}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
