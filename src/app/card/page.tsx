"use client";

import { useState } from "react";
import { Mail, Phone, Github, Twitter, Instagram, Youtube, Globe, Download, Copy, Check } from "lucide-react";
import styles from "./page.module.css";

export default function CardPage() {
    const [copied, setCopied] = useState<string | null>(null);

    // Profile Information
    const profile = {
        name: "Jin Adachi",
        title: "CEO & Founder",
        company: "株式会社ARISTA",
        email: "jin@arista.jp",
        phone: "080-6376-1389", // Update with provided phone number
        bio: "テクノロジーと情熱で、正解のない未来を切り拓く。",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663139312224/Bek9WRiaAAzsXSMYFCkHaQ/profile-accent-9oSEzVp5tJZXw8oi2UfPRH.webp",
    };

    // Social Links
    const socials = [
        { name: "Email", icon: Mail, url: `mailto:${profile.email}`, styleClass: styles.email },
        { name: "Phone", icon: Phone, url: `tel:${profile.phone}`, styleClass: styles.phone },
        { name: "LINE", icon: Globe, url: "https://line.me/ti/p/jin_adachi", styleClass: styles.line },
        { name: "X (Twitter)", icon: Twitter, url: "https://twitter.com/jin_adachi", styleClass: styles.twitter },
        { name: "Instagram", icon: Instagram, url: "https://instagram.com/jin_adachi", styleClass: styles.instagram },
        { name: "YouTube", icon: Youtube, url: "https://youtube.com/@jin_adachi", styleClass: styles.youtube },
        { name: "Website", icon: Globe, url: "https://arista-hp.vercel.app", styleClass: styles.website },
        { name: "GitHub", icon: Github, url: "https://github.com/jin_adachi", styleClass: styles.github },
    ];

    // Generate vCard
    const generateVCard = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:${profile.company}
TITLE:${profile.title}
TEL:${profile.phone}
EMAIL:${profile.email}
ADR;TYPE=WORK:;;天神2丁目2番12号T&Jビルディング7F;福岡市中央区;福岡県;;日本
URL:https://arista-hp.vercel.app
NOTE:${profile.bio}
END:VCARD`;
        return vcard;
    };

    // Save contact to device
    const saveContact = () => {
        const vcard = generateVCard();
        const element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/vcard;charset=utf-8," + encodeURIComponent(vcard)
        );
        element.setAttribute("download", `${profile.name}.vcf`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        // Custom simple toast notification since sonner is not installed
        const toast = document.createElement("div");
        toast.innerText = "連絡先をダウンロードしました";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "#06b6d4";
        toast.style.color = "black";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "8px";
        toast.style.fontWeight = "bold";
        toast.style.zIndex = "9999";
        toast.style.animation = "fadeIn 0.3s";
        document.body.appendChild(toast);
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    };

    // Copy to clipboard
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        
        const toast = document.createElement("div");
        toast.innerText = `${label}をコピーしました`;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "#06b6d4";
        toast.style.color = "black";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "8px";
        toast.style.fontWeight = "bold";
        toast.style.zIndex = "9999";
        document.body.appendChild(toast);
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);

        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.bgPattern} />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatarInner}>
                            <span className={styles.avatarText}>JA</span>
                        </div>
                    </div>

                    <h1 className={styles.name}>{profile.name}</h1>
                    <p className={styles.title}>{profile.title}</p>
                    <p className={styles.company}>{profile.company}</p>
                    <p className={styles.bio}>{profile.bio}</p>

                    <div className={styles.actionButtons}>
                        <button onClick={saveContact} className={styles.btnPrimary}>
                            <Download size={20} />
                            連絡先に保存
                        </button>
                        <button
                            onClick={() => copyToClipboard(profile.email, "メールアドレス")}
                            className={styles.btnOutline}
                        >
                            {copied === "メールアドレス" ? (
                                <>
                                    <Check size={20} />
                                    コピーしました
                                </>
                            ) : (
                                <>
                                    <Copy size={20} />
                                    メールをコピー
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            <div className={styles.divider} />

            {/* Contact Information Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>連絡先情報</h2>
                    <div className={styles.grid2}>
                        <div className={styles.card}>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBox}>
                                    <Mail size={24} />
                                </div>
                                <div className={styles.contactInfo}>
                                    <h3 className={styles.contactLabel}>メールアドレス</h3>
                                    <p className={styles.contactValue}>{profile.email}</p>
                                    <button
                                        onClick={() => copyToClipboard(profile.email, "メールアドレス")}
                                        className={styles.btnSmall}
                                    >
                                        {copied === "メールアドレス" ? "コピーしました" : "コピー"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.contactItem}>
                                <div className={styles.iconBox}>
                                    <Phone size={24} />
                                </div>
                                <div className={styles.contactInfo}>
                                    <h3 className={styles.contactLabel}>電話番号</h3>
                                    <p className={styles.contactValue}>{profile.phone}</p>
                                    <button
                                        onClick={() => copyToClipboard(profile.phone, "電話番号")}
                                        className={styles.btnSmall}
                                    >
                                        {copied === "電話番号" ? "コピーしました" : "コピー"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Links Section */}
            <section className={styles.section} style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>ソーシャルリンク</h2>
                    <div className={styles.grid4}>
                        {socials.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.card} ${styles.socialCard} ${social.styleClass}`}
                                >
                                    <Icon size={32} className={styles.socialIcon} />
                                    <p className={styles.socialName}>{social.name}</p>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>プロフィール</h2>
                    <div className={`${styles.card} ${styles.profileCard}`}>
                        <div className={styles.profileContent}>
                            <p>
                                株式会社ARISTA代表のJin Adachiです。テクノロジーと情熱で、正解のない未来を切り拓くことをミッションとしています。
                            </p>

                            <h3>経歴</h3>
                            <ul>
                                <li><strong className={styles.highlight}>2026年5月</strong> - 株式会社ARISTA設立</li>
                                <li><strong className={styles.highlight}>2025年9月～現在</strong> - 通信会社のマーケティング戦略</li>
                                <li><strong className={styles.highlight}>2025年5月～8月</strong> - トロントでの活動</li>
                                <li><strong className={styles.highlight}>2022年6月～2025年4月</strong> - 外資通販会社のインフラセキュリティ</li>
                            </ul>

                            <h3>事業内容</h3>
                            <ul>
                                <li>• エンジニアマッチングプラットフォーム「ITダイレクトマッチ」の運営</li>
                                <li>• アプリ開発事業</li>
                                <li>• ITコンサルティング事業</li>
                                <li>• セキュリティ監査・診断事業</li>
                            </ul>

                            <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                                詳しい情報は
                                <a
                                    href="https://arista-hp.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#22d3ee', marginLeft: '0.5rem', textDecoration: 'none' }}
                                >
                                    会社HPをご覧ください
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} Jin Adachi. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem' }}>This is a digital business card portal.</p>
            </footer>
        </div>
    );
}
