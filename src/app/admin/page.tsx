"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Settings, FileText, Smartphone, Eye, EyeOff, LayoutDashboard, MessageSquare, Briefcase, Award, Shield, Layers } from 'lucide-react';
import styles from './services/AdminServices.module.css';

export default function AdminDashboard() {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSections();
    }, []);

    async function fetchSections() {
        const { data, error } = await supabase.from('site_sections').select('*').order('order', { ascending: true });
        if (!error) setSections(data || []);
        setLoading(false);
    }

    const toggleVisibility = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase.from('site_sections').update({ is_visible: !currentStatus }).eq('id', id);
        if (error) alert("更新に失敗しました");
        else fetchSections();
    };

    if (loading) return <div className={styles.container}>読み込み中...</div>;

    const quickLinks = [
        { href: '/admin/settings', label: 'サイト基本設定', icon: <Settings size={24} />, color: '#3b82f6' },
        { href: '/admin/news', label: 'ニュース投稿', icon: <FileText size={24} />, color: '#10b981' },
        { href: '/admin/apps', label: 'アプリ管理', icon: <Smartphone size={24} />, color: '#8b5cf6' },
        { href: '/admin/inquiries', label: 'お問い合わせ確認', icon: <MessageSquare size={24} />, color: '#f59e0b' },
        { href: '/admin/projects', label: '実績管理', icon: <LayoutDashboard size={24} />, color: '#06b6d4' },
        { href: '/admin/careers', label: '経歴管理', icon: <Award size={24} />, color: '#ec4899' },
        { href: '/admin/services', label: '事業内容管理', icon: <Briefcase size={24} />, color: '#14b8a6' },
        { href: '/admin/footer', label: 'フッター管理', icon: <Layers size={24} />, color: '#6366f1' },
        { href: '/admin/security', label: 'セキュリティログ', icon: <Shield size={24} />, color: '#ef4444' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>ダッシュボード</h1>
            </div>
            
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', color: '#374151' }}>クイックアクセス</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={link.href} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            color: '#374151',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }} onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                        }} onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                        }}>
                            <div style={{ color: link.color, marginBottom: '10px' }}>{link.icon}</div>
                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151' }}>サイト構成 (ON/OFF)</h2>
                    <Link href="/admin/sections" style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}>詳細設定へ</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {sections.map((section) => (
                        <div key={section.id} style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: section.is_visible ? '#10b981' : '#9ca3af' }}>
                                    {section.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}
                                </div>
                                <span style={{ fontWeight: '600' }}>{section.label}</span>
                            </div>
                            <button 
                                onClick={() => toggleVisibility(section.id, section.is_visible)}
                                style={{
                                    backgroundColor: section.is_visible ? '#10b981' : '#d1d5db',
                                    color: 'white',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                {section.is_visible ? 'ON' : 'OFF'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
