"use client";
import { useLanguage } from '@/context/LanguageContext';
import styles from './CompanyProfile.module.css';

export default function CompanyProfile({ settings }: { settings?: Record<string, string> }) {
    const { t } = useLanguage();

    return (
        <section className={styles.section} id="company">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{t('会社概要', 'Company Profile')}</h2>
                </div>

                <div className={styles.messageSection}>
                    <div className={styles.imageCol}>
                        <img 
                            src={settings?.company_message_image || '/images/hero-premium.png'} 
                            alt="Company Message" 
                            className={styles.conceptImage}
                        />
                    </div>
                    <div className={styles.textCol}>
                        <h3 className={styles.messageTitle}>Message</h3>
                        <p className={styles.bodyText} style={{ whiteSpace: 'pre-wrap' }}>
                            {settings?.company_message || '私たちは、最先端のAI技術と独自のアルゴリズムを活用し、企業とエンジニアの最適なマッチングを実現します。単なるスキルマッチングにとどまらず、ビジョンやカルチャーの適合性を深く分析することで、双方が真に共鳴し、共に成長できる環境を創出します。'}
                        </p>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <dl className={styles.dl}>
                        <div className={styles.row}>
                            <dt>{t('会社名', 'Company Name')}</dt>
                            <dd>{settings?.company_name || t('株式会社ARISTA（アリスタ）', 'ARISTA Inc.')}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('設立日', 'Established')}</dt>
                            <dd>{settings?.company_established || t('2026年5月', 'May 2026')}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('代表者', 'Representative')}</dt>
                            <dd>{settings?.company_representative || 'Jin Adaschi'}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('所在地', 'Location')}</dt>
                            <dd>{settings?.company_address || t('〒810-0001 福岡県福岡市中央区天神2丁目2番12号T&Jビルディング7F', '7F T&J Building, 2-2-12 Tenjin, Chuo-ku, Fukuoka 810-0001, Japan')}</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>{t('事業内容', 'Business Activities')}</dt>
                            <dd>
                                {t('・エンジニアマッチングプラットフォーム「ITダイレクトマッチA」の運営', '・Operation of Engineer Matching Platform "IT Direct Match A"')}<br />
                                {t('・アプリ開発事業', '・App Development Business')}<br />
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
