import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import { supabase } from '@/lib/supabase';
import { Smartphone, Globe } from 'lucide-react';
import styles from './Apps.module.css';

export const revalidate = 0;

export default async function AppsPage() {
    let { data: appsData } = await supabase.from('apps').select('*').order('order', { ascending: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appsData = appsData?.filter((app: any) => app.is_visible !== false) || [];
    const breadcrumbs = [{ label: 'アプリ一覧', href: '' }];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="APPS"
                    titleJa="アプリ一覧"
                    breadcrumbs={breadcrumbs}
                />

                <section className={styles.appsSection}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>プロダクト一覧</h2>
                            <p className={styles.subtitle}>
                                ARISTAが手掛けるiOSアプリおよびWebアプリケーションのラインナップです。
                            </p>
                        </div>

                        <div className={styles.grid}>
                            {appsData && appsData.length > 0 ? (
                                appsData.map((app) => (
                                    <div key={app.id} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.iconWrapper}>
                                                {app.icon_url && app.icon_url !== '/images/default-app.png' ? (
                                                    <img src={app.icon_url} alt={app.name} className={styles.iconImage} />
                                                ) : (
                                                    <Smartphone size={32} className={styles.defaultIcon} />
                                                )}
                                            </div>
                                            <h3 className={styles.appName}>{app.name}</h3>
                                        </div>
                                        <div className={styles.cardBody}>
                                            <p className={styles.appDescription}>{app.description}</p>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            {app.app_store_url && (
                                                <a href={app.app_store_url} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.appStoreBtn}`}>
                                                    <Smartphone size={16} /> App Storeで見る
                                                </a>
                                            )}
                                            {app.web_url && (
                                                <a href={app.web_url} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.webBtn}`}>
                                                    <Globe size={16} /> Webで開く
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noData}>現在公開されているアプリはありません。</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
