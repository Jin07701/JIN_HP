"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useLanguage();
    const [sections, setSections] = useState<any[]>([]);

    const [siteSections, setSiteSections] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const { data: fData } = await supabase.from('footer_sections').select('*, footer_links(*)').order('order', { ascending: true });
            const { data: sData } = await supabase.from('site_sections').select('*');
            if (fData && fData.length > 0) setSections(fData);
            if (sData) setSiteSections(sData);
        }
        fetchData();
    }, []);

    const defaultSections = [
        { title: t('事業内容', 'Our Services'), footer_links: [
            { label: t('ラインナップ', 'Lineup'), url: '/service' },
            { label: t('ITコンサルティング', 'IT Consulting'), url: '/service#consulting' },
            { label: t('セキュリティ診断', 'Security Audit'), url: '/service#security' }
        ]},
        { title: t('企業情報', 'Company'), footer_links: [
            { label: t('会社概要', 'About Us'), url: '/company' },
            { label: t('代表メッセージ', 'Message'), url: '/company#message' },
            { label: t('ニュース', 'News'), url: '/news' }
        ]},
        { title: t('お問い合わせ', 'Contact'), footer_links: [
            { label: t('お問い合わせフォーム', 'Contact Form'), url: '/contact' },
            { label: t('よくあるご質問', 'FAQ'), url: '/contact#faq' }
        ]},
        { title: t('関連リンク', 'Related Links'), footer_links: [
            { label: 'Note (公式)', url: 'https://note.com/jin_ai_system/all' },
            { label: t('管理者ログイン', 'Admin Login'), url: '/admin' }
        ]}
    ];

    const displaySections = (sections.length > 0 ? sections : defaultSections).map(section => {
        if (!section.footer_links || section.footer_links.length === 0) {
            const defaultSec = defaultSections.find(ds => ds.title === section.title);
            if (defaultSec) {
                return { ...section, footer_links: defaultSec.footer_links };
            }
        }
        return section;
    }).filter(section => {
        // Find matching global section visibility
        const keyMap: Record<string, string> = {
            '事業内容': 'service',
            'Business Details': 'service',
            'Our Services': 'service',
            '経歴': 'career',
            'Career': 'career',
            '実績紹介': 'projects',
            'Projects': 'projects',
            'ニュース': 'news',
            'News': 'news'
        };
        const key = keyMap[section.title];
        if (key && siteSections.length > 0) {
            const s = siteSections.find(ss => ss.section_key === key);
            return s ? s.is_visible : true;
        }
        return true;
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section: Links */}
                <div className={styles.linkSection}>
                    {displaySections.map((section, idx) => (
                        <div key={idx} className={styles.column}>
                            <h3 className={styles.colTitle}>{section.title}</h3>
                            <ul className={styles.linkList}>
                                {([...(section.footer_links || [])])
                                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                                    .map((link: any, lIdx: number) => (
                                    <li key={lIdx}>
                                        {link.url.startsWith('http') ? (
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                                        ) : (
                                            <Link href={link.url}>{link.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
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
