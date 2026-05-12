"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import styles from '../services/AdminServices.module.css';

export default function AdminFooterPage() {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSection, setEditingSection] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { data: secData } = await supabase.from('footer_sections').select('*, footer_links(*)').order('order', { ascending: true });
        if (secData) setSections(secData);
        setLoading(false);
    }

    const handleAddSection = async () => {
        const title = prompt("セクション名を入力してください (例: 関連リンク)");
        if (!title) return;
        await supabase.from('footer_sections').insert([{ title, order: sections.length + 1 }]);
        fetchData();
    };

    const handleDeleteSection = async (id: string) => {
        if (!confirm("セクション内のリンクもすべて削除されます。よろしいですか？")) return;
        await supabase.from('footer_sections').delete().eq('id', id);
        fetchData();
    };

    const handleAddLink = async (sectionId: string) => {
        const label = prompt("リンク名を入力してください");
        const url = prompt("URLを入力してください (例: /service または https://...)");
        if (!label || !url) return;
        
        const section = sections.find(s => s.id === sectionId);
        const order = section?.footer_links?.length || 0;

        await supabase.from('footer_links').insert([{ 
            section_id: sectionId, 
            label, 
            url, 
            order: order + 1 
        }]);
        fetchData();
    };

    const handleDeleteLink = async (linkId: string) => {
        if (!confirm("削除しますか？")) return;
        await supabase.from('footer_links').delete().eq('id', linkId);
        fetchData();
    };

    if (loading) return <div className={styles.container}>読み込み中...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>フッター管理</h1>
                <button onClick={handleAddSection} className={styles.addButton}>
                    <Plus size={18} /> セクション追加
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {sections.map(section => (
                    <div key={section.id} className={styles.card} style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #f3f4f6', paddingBottom: '10px' }}>
                            <h3 style={{ fontWeight: 'bold' }}>{section.title}</h3>
                            <button onClick={() => handleDeleteSection(section.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {section.footer_links?.sort((a: any, b: any) => a.order - b.order).map((link: any) => (
                                <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontWeight: '600' }}>{link.label}</span>
                                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{link.url}</span>
                                    </div>
                                    <button onClick={() => handleDeleteLink(link.id)} style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <button 
                                onClick={() => handleAddLink(section.id)}
                                style={{ marginTop: '10px', width: '100%', padding: '8px', border: '1px dashed #d1d5db', borderRadius: '6px', background: 'none', color: '#6b7280', fontSize: '0.85rem', cursor: 'pointer' }}
                            >
                                + リンクを追加
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
