"use client";
import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
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
                        <h3 className={styles.colTitle}>{t('関連リンク', 'Links')}</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="https://note.com/jin_ai_system/all" target="_blank">Note {t('(公式)', '(Official)')}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Brand & Copyright */}
                <div className={styles.bottomSection}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            KANAME<span className={styles.tagline}>AI-Driven Intelligent Matching</span>
                        </Link>
                        <div className={styles.socials}>
                            <Link href="#" aria-label="Facebook"><Facebook size={20} /></Link>
                            <Link href="#" aria-label="Twitter"><Twitter size={20} /></Link>
                            <Link href="#" aria-label="YouTube"><Youtube size={20} /></Link>
                            <Link href="#" aria-label="Instagram"><Instagram size={20} /></Link>
                        </div>
                    </div>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} KANAME. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Back to Top Button style placeholder (often fixed) */}
            <div className={styles.backToTop}>
                <Link href="#">{t('ページトップへ', 'Back to Top')}</Link>
            </div>
        </footer>
    );
}
