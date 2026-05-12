"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Network, Shield, Cpu, Smartphone, Plus, Trash2, Save, MoveUp, MoveDown } from 'lucide-react';

import styles from './AdminServices.module.css';

const ICON_MAP: Record<string, any> = {
    Network, Shield, Cpu, Smartphone
};

export default function AdminServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        const { data, error } = await supabase.from('services').select('*').order('order', { ascending: true });
        if (!error) setServices(data || []);
        setLoading(false);
    }

    const handleSave = async (id: string, updates: any) => {
        setSaving(id);
        const { error } = await supabase.from('services').update(updates).eq('id', id);
        if (error) alert("保存に失敗しました");
        else {
            // Briefly show saving state
            setTimeout(() => setSaving(null), 1000);
            fetchServices();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("削除してもよろしいですか？")) return;
        await supabase.from('services').delete().eq('id', id);
        fetchServices();
    };

    const handleAdd = async () => {
        const { error } = await supabase.from('services').insert([{
            title: '新規サービス',
            subtitle: 'サブタイトル',
            description: '説明文',
            icon_name: 'Network',
            order: services.length + 1,
            image_url: '/images/default.png'
        }]);
        if (!error) fetchServices();
    };

    if (loading) return <div className={styles.container}>読み込み中...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>事業内容</h1>
                <button onClick={handleAdd} className={styles.addButton}>
                    <Plus size={18} /> 新規追加
                </button>
            </div>

            <div className={styles.cardList}>
                {services.map((service) => {
                    const Icon = ICON_MAP[service.icon_name] || Network;
                    return (
                        <div key={service.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitleArea}>
                                    <div className={styles.iconPreview}>
                                        <Icon size={24} />
                                    </div>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{service.title || '無題のサービス'}</h2>
                                </div>
                                {saving === service.id && <span className={styles.savingBadge}>保存中...</span>}
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>タイトル</label>
                                    <input 
                                        className={styles.input}
                                        defaultValue={service.title}
                                        onBlur={(e) => handleSave(service.id, { title: e.target.value })}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>サブタイトル</label>
                                    <input 
                                        className={styles.input}
                                        defaultValue={service.subtitle}
                                        onBlur={(e) => handleSave(service.id, { subtitle: e.target.value })}
                                    />
                                </div>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>説明文</label>
                                    <textarea 
                                        className={styles.textarea}
                                        defaultValue={service.description}
                                        onBlur={(e) => handleSave(service.id, { description: e.target.value })}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>アイコン名 (Network, Shield, Cpu, Smartphone)</label>
                                    <input 
                                        className={styles.input}
                                        defaultValue={service.icon_name}
                                        onBlur={(e) => handleSave(service.id, { icon_name: e.target.value })}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>外部リンク (サービスサイトURL)</label>
                                    <input 
                                        className={styles.input}
                                        defaultValue={service.external_link}
                                        onBlur={(e) => handleSave(service.id, { external_link: e.target.value })}
                                    />
                                </div>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>画像パス/URL</label>
                                    <input 
                                        className={styles.input}
                                        defaultValue={service.image_url}
                                        onBlur={(e) => handleSave(service.id, { image_url: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <button 
                                    onClick={() => handleDelete(service.id)}
                                    className={styles.deleteButton}
                                    title="削除"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
