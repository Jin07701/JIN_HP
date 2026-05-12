"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Smartphone, Plus, Trash2, ExternalLink } from 'lucide-react';
import styles from '../services/AdminServices.module.css';

export default function AdminAppsPage() {
    const [apps, setApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchApps();
    }, []);

    async function fetchApps() {
        const { data, error } = await supabase.from('apps').select('*').order('order', { ascending: true });
        if (!error) setApps(data || []);
        setLoading(false);
    }

    const handleSave = async (id: string, updates: any) => {
        setSaving(id);
        const { error } = await supabase.from('apps').update(updates).eq('id', id);
        if (error) alert("保存に失敗しました");
        else {
            setTimeout(() => setSaving(null), 1000);
            fetchApps();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("削除してもよろしいですか？")) return;
        await supabase.from('apps').delete().eq('id', id);
        fetchApps();
    };

    const handleAdd = async () => {
        const { error } = await supabase.from('apps').insert([{
            name: '新規アプリ',
            description: 'アプリの説明文',
            app_store_url: 'https://apps.apple.com/...',
            order: apps.length + 1,
            icon_url: '/images/default-app.png'
        }]);
        if (!error) fetchApps();
    };

    if (loading) return <div className={styles.container}>読み込み中...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>アプリ管理</h1>
                <button onClick={handleAdd} className={styles.addButton}>
                    <Plus size={18} /> 新規追加
                </button>
            </div>

            <div className={styles.cardList}>
                {apps.map((app) => (
                    <div key={app.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleArea}>
                                <div className={styles.iconPreview}>
                                    <Smartphone size={24} />
                                </div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{app.name || '無題のアプリ'}</h2>
                            </div>
                            {saving === app.id && <span className={styles.savingBadge}>保存中...</span>}
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.field}>
                                <label className={styles.label}>アプリ名</label>
                                <input 
                                    className={styles.input}
                                    defaultValue={app.name}
                                    onBlur={(e) => handleSave(app.id, { name: e.target.value })}
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>App Store URL</label>
                                <input 
                                    className={styles.input}
                                    defaultValue={app.app_store_url}
                                    onBlur={(e) => handleSave(app.id, { app_store_url: e.target.value })}
                                />
                            </div>
                            <div className={`${styles.field} ${styles.fullWidth}`}>
                                <label className={styles.label}>説明文</label>
                                <textarea 
                                    className={styles.textarea}
                                    defaultValue={app.description}
                                    onBlur={(e) => handleSave(app.id, { description: e.target.value })}
                                />
                            </div>
                            <div className={`${styles.field} ${styles.fullWidth}`}>
                                <label className={styles.label}>アイコンURL (App StoreのアイコンURLなど)</label>
                                <input 
                                    className={styles.input}
                                    defaultValue={app.icon_url}
                                    onBlur={(e) => handleSave(app.id, { icon_url: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.cardFooter}>
                            {app.app_store_url && (
                                <a href={app.app_store_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', textDecoration: 'none', marginRight: 'auto' }}>
                                    ストアで見る <ExternalLink size={14} />
                                </a>
                            )}
                            <button 
                                onClick={() => handleDelete(app.id)}
                                className={styles.deleteButton}
                                title="削除"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
