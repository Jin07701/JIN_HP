"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Menu } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    // Simple state for demonstration. In a real app, use a context or i18n library.
    const [lang, setLang] = useState<'ja' | 'en'>('ja');

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Left: Logo */}
                <div className={styles.logoSection}>
                    <Link href="/" className={styles.logoLink}>
                        <div className={styles.logoText}>
                            KANAME
                        </div>
                    </Link>
                </div>

                {/* Center: Pill Navigation */}
                <div className={styles.centerNav}>
                    <ul className={styles.pillNav}>
                        <li>
                            <Link href="/" className={`${styles.pillItem} ${styles.active}`}>トップ</Link>
                        </li>
                        <li>
                            <Link href="/service" className={styles.pillItem}>事業内容</Link>
                        </li>
                        <li>
                            <Link href="/company" className={styles.pillItem}>企業情報</Link>
                        </li>
                        <li>
                            <Link href="/projects" className={styles.pillItem}>実績紹介</Link>
                        </li>
                    </ul>
                </div>

                {/* Right: CTAs */}
                <div className={styles.rightSection}>
                    <div className={styles.langToggle}>
                        <button
                            className={`${styles.langBtn} ${lang === 'en' ? styles.activeLang : ''}`}
                            onClick={() => setLang('en')}
                        >
                            English
                        </button>
                        <span className={styles.langSeparator}>/</span>
                        <button
                            className={`${styles.langBtn} ${lang === 'ja' ? styles.activeLang : ''}`}
                            onClick={() => setLang('ja')}
                        >
                            日本語
                        </button>
                    </div>
                    <Link href="/contact" className={styles.contactBtn}>
                        <Mail size={18} />
                        <span>お問い合わせ</span>
                    </Link>
                    <button className={styles.menuBtn} aria-label="メニュー">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
