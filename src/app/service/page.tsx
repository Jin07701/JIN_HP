"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import styles from './page.module.css';
import { Network, Shield, Cpu, Smartphone, ExternalLink } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    Network: <Network size={40} />,
    Shield: <Shield size={40} />,
    Cpu: <Cpu size={40} />,
    Smartphone: <Smartphone size={40} />
};

export default function ServicePage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from('services').select('*').order('order', { ascending: true });
            if (data) setServices(data);
            setLoading(false);
        }
        fetchServices();
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
