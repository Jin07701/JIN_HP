"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function InquiriesAdminPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    async function fetchInquiries() {
        setLoading(true);
        const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setInquiries(data || []);
        setLoading(false);
    }

    async function handleStatusChange(id: string, newStatus: string) {
        const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
        if (error) alert('状態の更新に失敗しました。');
        else fetchInquiries();
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>お問い合わせ一覧</h1>

            {loading ? <p>読み込み中...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {inquiries.map(iq => (
                        <div key={iq.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: iq.status === 'unread' ? '5px solid #ef4444' : '5px solid #10b981' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{iq.name} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#6b7280' }}>({iq.email})</span></div>
                                <select 
                                    value={iq.status} 
                                    onChange={(e) => handleStatusChange(iq.id, e.target.value)}
                                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                                >
                                    <option value="unread">未読</option>
                                    <option value="read">既読/対応済</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <span style={{ backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '4px', fontSize: '0.875rem' }}>{iq.category}</span>
                                <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '10px' }}>{new Date(iq.created_at).toLocaleString()}</span>
                            </div>
                            <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                                {iq.message}
                            </div>
                        </div>
                    ))}
                    {inquiries.length === 0 && <p>お問い合わせはまだありません。</p>}
                </div>
            )}
        </div>
    );
}
