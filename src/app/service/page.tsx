"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';
import { Network, Shield, Cpu, Smartphone, ExternalLink } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    Network: <Network size={40} />,
    Shield: <Shield size={40} />,
    Cpu: <Cpu size={40} />,
    Smartphone: <Smartphone size={40} />
};

export default function ServicePage() {
    const { t } = useLanguage();
    const [services, setServices] = useState<any[]>([]);
    const [apps, setApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: sData } = await supabase.from('services').select('*').order('order', { ascending: true });
            const { data: aData } = await supabase.from('apps').select('*').order('order', { ascending: true });
            if (sData) setServices(sData);
            if (aData) setApps(aData);
            setLoading(false);

            // Scroll to hash after data is loaded and DOM is updated
            if (typeof window !== 'undefined' && window.location.hash) {
                const hash = window.location.hash.substring(1);
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
        fetchData();
    }, []);

    const breadcrumbs = [{ label: '事業内容', href: '' }];

    if (loading) return null;

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="SERVICE LINEUP"
                    titleJa="事業内容"
                    breadcrumbs={breadcrumbs}
                />

                <div className={styles.container}>
                    {services.map((service) => (
                        <section key={service.id} id={service.id} className={styles.serviceSection}>
                            <div className={styles.textCol}>
                                <div className={styles.iconWrapper}>
                                    {ICON_MAP[service.icon_name] || <Network size={40} />}
                                </div>
                                <h2 className={styles.serviceTitle}>{service.title}</h2>
                                <p className={styles.subtitle}>{service.subtitle}</p>
                                <p className={styles.description}>
                                    {service.description.split('\\n').map((line: string, i: number) => (
                                        <span key={i}>{line}<br /></span>
                                    ))}
                                </p>
                                {service.external_link && (
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <a href={service.external_link} target="_blank" rel="noopener noreferrer" style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            backgroundColor: '#2563eb',
                                            color: 'white',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '9999px',
                                            fontWeight: 'bold',
                                            textDecoration: 'none',
                                            transition: 'background-color 0.2s'
                                        }}>
                                            サービスサイトへ <ExternalLink size={16} />
                                        </a>
                                    </div>
                                )}

                                {/* Special section for App Development */}
                                {(service.title === 'App Development' || service.title === 'アプリ開発') && apps.length > 0 && (
                                    <div style={{ marginTop: '3rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                                            {t('開発アプリ一覧', 'Developed Apps')}
                                        </h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                            {apps.map((app) => (
                                                <a key={app.id} href={app.app_store_url} target="_blank" rel="noopener noreferrer" style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: '15px', 
                                                    padding: '15px', 
                                                    backgroundColor: '#f9fafb', 
                                                    borderRadius: '16px', 
                                                    textDecoration: 'none', 
                                                    color: 'inherit',
                                                    transition: 'transform 0.2s, background-color 0.2s'
                                                }} onMouseOver={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                }} onMouseOut={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                                    e.currentTarget.style.transform = 'none';
                                                }}>
                                                    <img src={app.icon_url || '/images/default-app.png'} alt={app.name} style={{ width: '64px', height: '64px', borderRadius: '14px', objectFit: 'cover', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                                    <div style={{ flex: 1 }}>
                                                        <h4 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '4px' }}>{app.name}</h4>
                                                        <p style={{ fontSize: '0.8rem', color: '#6b7280', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{app.description}</p>
                                                    </div>
                                                    <div style={{ backgroundColor: '#e5e7eb', color: '#2563eb', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>GET</div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.imageCol}>
                                {service.image_url ? (
                                    <img src={service.image_url} alt={service.title} className={styles.serviceImage} />
                                ) : (
                                    <div className={styles.placeholderImg}>{service.title} Image</div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
