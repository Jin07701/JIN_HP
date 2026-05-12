"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Eye, EyeOff } from 'lucide-react';
import styles from '../services/AdminServices.module.css';

export default function AdminSectionsPage() {
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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>セクション管理 (ON/OFF)</h1>
            </div>
            <p style={{ marginBottom: '20px', color: '#666' }}>サイト上の各項目の表示・非表示を切り替えられます。OFFにするとメニューバーからも消えます。</p>

            <div className={styles.cardList}>
                {sections.map((section) => (
                    <div key={section.id} className={styles.card} style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ 
                                    backgroundColor: section.is_visible ? '#ecfdf5' : '#fef2f2', 
                                    color: section.is_visible ? '#059669' : '#ef4444',
                                    padding: '10px',
                                    borderRadius: '8px'
                                }}>
                                    {section.is_visible ? <Eye size={24} /> : <EyeOff size={24} />}
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{section.label}</h3>
                                    <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Key: {section.section_key}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => toggleVisibility(section.id, section.is_visible)}
                                style={{
                                    backgroundColor: section.is_visible ? '#10b981' : '#d1d5db',
                                    color: 'white',
                                    padding: '8px 20px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                {section.is_visible ? '表示中 (ON)' : '非表示 (OFF)'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
