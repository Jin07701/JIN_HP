"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Mail, Menu } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    // const [lang, setLang] = useState<'ja' | 'en'>('ja'); // Temporarily disabled
    const [activeSection, setActiveSection] = useState('top');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { id: 'top', label: 'トップ' },
        {
            id: 'service',
            label: '事業内容',
            subItems: [
                { id: 'service', label: 'ラインナップ' },
                { id: 'consulting', label: 'ITコンサルティング' },
                { id: 'security', label: 'セキュリティ診断' }
            ]
        },
        {
            id: 'company',
            label: '企業情報',
            subItems: [
                { id: 'company', label: '会社概要' },
                { id: 'message', label: '代表メッセージ' },
                { id: 'news', label: 'ニュース' }
            ]
        },
        { id: 'career', label: '経歴' },
        { id: 'projects', label: '実績紹介' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();

        // Close menu if open
        setIsMenuOpen(false);

        if (pathname !== '/') {
            router.push(`/#${id}`);
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        // If we are on /projects, set active to 'projects'
        if (pathname.includes('/projects')) {
            setActiveSection('projects');
            return;
        }

        if (pathname !== '/') return;

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Activate when section is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Left: Logo */}
                <div className={styles.logoSection}>
                    <Link
                        href="/"
                        className={styles.logoLink}
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setActiveSection('top');
                            }
                            setIsMenuOpen(false);
                        }}
                    >
                        <div className={styles.logoText}>
                            KANAME
                        </div>
                    </Link>
                </div>

                {/* Center: Pill Navigation */}
                <div className={styles.centerNav}>
                    <ul className={styles.pillNav}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`${styles.pillItem} ${activeSection === item.id ? styles.active : ''}`}
                                    onClick={(e) => scrollToSection(e, item.id)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: CTAs */}
                <div className={styles.rightSection}>
                    {/* Language Toggle - Temporarily Hidden
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
                    */}
                    <Link href="/contact" className={styles.contactBtn}>
                        <Mail size={18} />
                        <span>お問い合わせ</span>
                    </Link>
                    <button
                        className={styles.menuBtn}
                        aria-label="メニュー"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <ul className={styles.mobileNavList}>
                    {navItems.map((item) => (
                        <li key={item.id} className={styles.mobileNavItemContainer}>
                            <a
                                href={`#${item.id}`}
                                className={styles.mobileNavLink}
                                onClick={(e) => scrollToSection(e, item.id)}
                            >
                                {item.label}
                            </a>
                            {item.subItems && (
                                <ul className={styles.mobileSubList}>
                                    {item.subItems.map((sub) => (
                                        <li key={sub.id}>
                                            <a
                                                href={`#${sub.id}`}
                                                className={styles.mobileSubLink}
                                                onClick={(e) => scrollToSection(e, sub.id)}
                                            >
                                                - {sub.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li>
                        <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                            お問い合わせ
                        </Link>
                    </li>
                    <li className={styles.mobileDivider}></li>
                    <li>
                        <Link href="/contact#faq" className={styles.mobileSubLink} onClick={() => { setIsMenuOpen(false); }}>
                            よくあるご質問
                        </Link>
                    </li>
                    <li className={styles.mobileDivider}></li>
                    <li>
                        <Link href="/profile" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                            人物紹介
                        </Link>
                    </li>
                    <li>
                        <a href="#" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                            DirectConnect Portal
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
