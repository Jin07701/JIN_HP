"use client";
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Mail, Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import styles from './Navbar.module.css';



export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [activeSection, setActiveSection] = useState('top');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const [sections, setSections] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any;

    useEffect(() => {
        async function fetchSections() {
            const { data } = await supabase.from('site_sections').select('*');
            if (data) setSections(data);
        }
        fetchSections();
    }, []);

    const navItems = useMemo(() => {
        const items = [
            { id: 'top', label: t('トップ', 'Top') },
            {
                id: 'service',
                label: t('事業内容', 'Service'),
                subItems: [
                    { id: 'service', label: t('事業内容', 'Service') }
                ]
            },
            {
                id: 'company',
                label: t('企業情報', 'Company'),
                subItems: [
                    { id: 'company', label: t('会社概要', 'About Us') },
                    { id: 'person', label: t('代表メッセージ', 'Message') },
                    { id: 'news', label: t('ニュース', 'News') }
                ]
            },
            { id: 'career', label: t('経歴', 'Career') },
            { id: 'projects', label: t('実績紹介', 'Projects') },
            { id: 'apps', label: t('アプリ', 'Apps') },
        ];

        // Filter based on database visibility
        if (sections.length > 0) {
            return items.filter(item => {
                const section = sections.find(s => s.section_key === item.id);
                return section ? section.is_visible : true;
            });
        }
        return items;
    }, [t, sections]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();

        // Close menu if open
        setIsMenuOpen(false);

        if (id === 'apps') {
            router.push('/apps');
            return;
        }

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
            setActiveSection('projects'); // eslint-disable-line
            return;
        }

        if (pathname.includes('/apps')) {
            setActiveSection('apps');
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
    }, [pathname, navItems]); // Dependent on navItems now as it recreates

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Left: Logo */}
                <div className={styles.logoSection}>
                    <Link
                        href="/"
                        className={styles.logoLink}
                        onClick={(e) => {
                            e.preventDefault();
                            if (pathname === '/') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setActiveSection('top');
                            } else {
                                router.push('/');
                            }
                            setIsMenuOpen(false);
                        }}
                    >
                        <div className={styles.logoText}>
                            <div className="whitespace-nowrap">ARISTA<span style={{ fontSize: '0.45em', marginLeft: '8px', letterSpacing: '0.05em', opacity: 0.8, fontWeight: 500 }}>アリスタ</span></div>
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
                    <div className={styles.langToggle}>
                        <button
                            className={`${styles.langBtn} ${language === 'en' ? styles.activeLang : ''}`}
                            onClick={() => setLanguage('en')}
                        >
                            EN
                        </button>
                        <span className={styles.langSeparator}>/</span>
                        <button
                            className={`${styles.langBtn} ${language === 'ja' ? styles.activeLang : ''}`}
                            onClick={() => setLanguage('ja')}
                        >
                            JP
                        </button>
                    </div>
                    <Link href="/contact" className={styles.contactBtn} aria-label={t('お問い合わせ', 'Contact')}>
                        <Mail size={22} />
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
                            {t('お問い合わせ', 'Contact')}
                        </Link>
                    </li>
                    <li className={styles.mobileDivider}></li>
                    <li>
                        <Link href="/contact#faq" className={styles.mobileSubLink} onClick={() => { setIsMenuOpen(false); }}>
                            {t('よくあるご質問', 'FAQ')}
                        </Link>
                    </li>
                    <li className={styles.mobileDivider}></li>
                    <li>
                        <Link href="/profile" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                            {t('人物紹介', 'Profile')}
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
