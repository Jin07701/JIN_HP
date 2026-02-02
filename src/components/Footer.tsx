import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section: Links */}
                <div className={styles.linkSection}>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>事業内容</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/service">ラインナップ</Link></li>
                            <li><Link href="/service#consulting">ITコンサルティング</Link></li>
                            <li><Link href="/service#security">セキュリティ診断</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>企業情報</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/company">会社概要</Link></li>
                            <li><Link href="/company#message">代表メッセージ</Link></li>
                            <li><Link href="/news">ニュース</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>お問い合わせ</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="/contact">お問い合わせフォーム</Link></li>
                            <li><Link href="/contact#faq">よくあるご質問</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3 className={styles.colTitle}>関連リンク</h3>
                        <ul className={styles.linkList}>
                            <li><Link href="https://note.com/jin_ai_system/all" target="_blank">Note (公式)</Link></li>
                            <li><Link href="#" className={styles.externalLink}>DirectConnect Portal</Link></li>
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
                <Link href="#">ページトップへ</Link>
            </div>
        </footer>
    );
}
