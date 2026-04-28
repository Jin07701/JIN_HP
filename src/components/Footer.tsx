"use client";
import Link from 'next/link';

import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section: Links */}
                <div className={styles.linkSection}>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>{t('事業内容', 'Our Services')}</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/service">{t('ラインナップ', 'Lineup')}</Link></li>
                            <li><Link href="/service#consulting">{t('ITコンサルティング', 'IT Consulting')}</Link></li>
                            <li><Link href="/service#security">{t('セキュリティ診断', 'Security Audit')}</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>{t('企業情報', 'Company')}</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/company">{t('会社概要', 'About Us')}</Link></li>
                            <li><Link href="/company#message">{t('代表メッセージ', 'Message')}</Link></li>
                            <li><Link href="/news">{t('ニュース', 'News')}</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>{t('お問い合わせ', 'Contact')}</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/contact">{t('お問い合わせフォーム', 'Contact Form')}</Link></li>
                            <li><Link href="/contact#faq">{t('よくあるご質問', 'FAQ')}</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>{t('関連リンク', 'Related Links')}</h3>
                        <ul className={styles.linkList}>
                            <li><a href="https://note.com/jin_ai_system/all" target="_blank" rel="noopener noreferrer">Note (公式)</a></li>
                            <li><Link href="/admin">{t('管理者ログイン', 'Admin Login')}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Brand & Copyright */}
                <div className={styles.bottomSection}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            {t('株式会社ARISTA', 'ARISTA Inc.')}<span className={styles.tagline}>AI-Driven Intelligent Matching</span>
                        </Link>
                    </div>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} ARISTA. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <div className={styles.backToTop}>
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: 0 }}
                >
                    {t('ページトップへ', 'Back to Top')}
                </button>
            </div>
        </footer>
    );
}
