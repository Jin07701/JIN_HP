"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CareersAdminPage() {
    const [careers, setCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newYear, setNewYear] = useState('');
    const [newEvent, setNewEvent] = useState('');

    useEffect(() => {
        fetchCareers();
    }, []);

    async function fetchCareers() {
        setLoading(true);
        const { data, error } = await supabase.from('careers').select('*').order('year', { ascending: false });
        if (error) console.error(error);
        else setCareers(data || []);
        setLoading(false);
    }

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        if (!newYear || !newEvent) return alert('年と出来事は必須です。');

        const { error } = await supabase.from('careers').insert([{ year: newYear, event: newEvent }]);

        if (error) {
            alert('追加に失敗しました。');
        } else {
            alert('追加しました！');
            setNewYear(''); setNewEvent('');
            fetchCareers();
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('本当に削除しますか？')) return;
        const { error } = await supabase.from('careers').delete().eq('id', id);
        if (error) alert('削除に失敗しました。');
        else fetchCareers();
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>経歴・沿革管理</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>新規追加</h2>
                <form onSubmit={handleAdd} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '150px 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>年 (例: 2026)</label>
                        <input type="text" value={newYear} onChange={e => setNewYear(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>出来事</label>
                        <input type="text" value={newEvent} onChange={e => setNewEvent(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="株式会社ARISTA設立..." />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>追加する</button>
                    </div>
                </form>
            </div>

            {loading ? <p>読み込み中...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {careers.map(c => (
                        <div key={c.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ color: '#3b82f6', fontWeight: 'bold', marginRight: '15px', fontSize: '1.2rem' }}>{c.year}</span>
                                <span style={{ fontSize: '1.1rem' }}>{c.event}</span>
                            </div>
                            <button onClick={() => handleDelete(c.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>削除</button>
                        </div>
                    ))}
                    {careers.length === 0 && <p>経歴がありません。</p>}
                </div>
            )}
        </div>
    );
}
