"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import styles from './AdminLayout.module.css';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    useEffect(() => {
        if (pathname === '/admin/login') {
            setLoading(false);
            return;
        }

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

            if (!session) {
                router.push('/admin/login');
            } else if (!adminEmail || session.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
                // Log unauthorized access
                await supabase.from('security_logs').insert([{
                    email: session.user.email,
                    action: 'unauthorized_admin_access',
                    user_agent: navigator.userAgent
                }]);
                
                await supabase.auth.signOut();
                alert('不正なアクセスとして記録されました。許可されたアカウントでログインしてください。');
                router.push('/admin/login');
            } else {
                setIsAuthorized(true);
            }
            setLoading(false);
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
            if (pathname !== '/admin/login') {
                if (!session || !adminEmail || session.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
                    router.push('/admin/login');
                } else {
                    setIsAuthorized(true);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [pathname, router]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    if (!isAuthorized) {
        return null;
    }

    const navItems = [
        { href: '/admin', label: 'ダッシュボード', icon: <LayoutDashboard size={20} /> },
        { href: '/admin/settings', label: 'サイト設定', icon: <Settings size={20} /> },
        { href: '/admin/news', label: 'ニュース管理', icon: <FileText size={20} /> },
        { href: '/admin/projects', label: '実績管理', icon: <FileText size={20} /> },
        { href: '/admin/careers', label: '経歴管理', icon: <FileText size={20} /> },
        { href: '/admin/inquiries', label: 'お問い合わせ一覧', icon: <FileText size={20} /> },
        { href: '/admin/security', label: 'セキュリティ監視', icon: <FileText size={20} /> },
    ];

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>ARISTA Admin</h2>
                </div>
                <nav className={styles.sidebarNav}>
                    {navItems.map(item => (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.navLink} style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', marginBottom: '10px' }}>
                        <LogOut size={20} />
                        <span>ログアウト</span>
                    </button>
                    <Link href="/" className={styles.navLink}>
                        <span>サイトに戻る</span>
                    </Link>
                </div>
            </aside>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
