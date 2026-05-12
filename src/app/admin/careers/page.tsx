"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CareersAdminPage() {
    const [careers, setCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState('');
    const [event, setEvent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [actionStatus, setActionStatus] = useState<{id: string, type: 'success' | 'error', msg: string} | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        fetchCareers();
    }, []);

    async function fetchCareers() {
        setLoading(true);
        setFetchError(null);
        const { data, error } = await supabase.from('careers').select('*').order('year', { ascending: false });
        if (error) {
            console.error(error);
            setFetchError(error.message);
        } else {
            setCareers(data || []);
        }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!year || !event) return alert('年と出来事は必須です。');

        setSaving(true);
        const payload = { year, event };

        let error;
        if (editingId) {
            const res = await supabase.from('careers').update(payload).eq('id', editingId);
            error = res.error;
        } else {
            const res = await supabase.from('careers').insert([payload]);
            error = res.error;
        }

        if (error) {
            console.error(error);
            alert('操作に失敗しました。');
        } else {
            setYear(''); setEvent('');
            setEditingId(null);
            fetchCareers();
            const statusId = editingId || 'new';
            setActionStatus({ id: statusId, type: 'success', msg: editingId ? '更新しました' : '追加しました' });
            setTimeout(() => setActionStatus(null), 3000);
        }
        setSaving(false);
    }

    function handleEdit(c: any) {
        setEditingId(c.id);
        setYear(c.year);
        setEvent(c.event);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleCancel() {
        setEditingId(null);
        setYear('');
        setEvent('');
    }

    async function handleDelete(id: string) {
        if (!confirm('本当に削除しますか？')) return;
        
        setActionStatus({ id, type: 'success', msg: '削除中...' });
        const { error } = await supabase.from('careers').delete().eq('id', id);
        
        if (error) {
            console.error(error);
            setActionStatus({ id, type: 'error', msg: '削除失敗' });
            setTimeout(() => setActionStatus(null), 3000);
        } else {
            fetchCareers();
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>経歴</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px', border: editingId ? '2px solid #3b82f6' : 'none' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>
                    {editingId ? '経歴を編集' : '新規追加'}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '150px 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>年 (例: 2026)</label>
                        <input type="text" value={year} onChange={e => setYear(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="2026" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>出来事</label>
                        <input type="text" value={event} onChange={e => setEvent(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="株式会社ARISTA設立..." />
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                        <button type="submit" disabled={saving} style={{ backgroundColor: editingId ? '#3b82f6' : '#10b981', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', flex: 1 }}>
                            {saving ? '保存中...' : editingId ? '更新する' : '追加する'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={handleCancel} style={{ backgroundColor: '#6b7280', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                                キャンセル
                            </button>
                        )}
                    </div>
                </form>
                {actionStatus && actionStatus.id === (editingId || 'new') && (
                    <p style={{ marginTop: '10px', color: actionStatus.type === 'success' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>{actionStatus.msg}</p>
                )}
            </div>

            {fetchError && (
                <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fecaca' }}>
                    <p><strong>データ取得エラー:</strong> {fetchError}</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '5px' }}>Supabaseのテーブル権限（RLS）を確認してください。</p>
                </div>
            )}

            {loading ? <p>読み込み中...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {careers.map(c => (
                        <div key={c.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <span style={{ color: '#3b82f6', fontWeight: 'bold', marginRight: '15px', fontSize: '1.2rem' }}>{c.year}</span>
                                <span style={{ fontSize: '1.1rem' }}>{c.event}</span>
                                {actionStatus && actionStatus.id === c.id && (
                                    <span style={{ marginLeft: '15px', color: actionStatus.type === 'success' ? '#10b981' : '#ef4444', fontSize: '0.875rem' }}>{actionStatus.msg}</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => handleEdit(c)} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>編集</button>
                                <button onClick={() => handleDelete(c.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>削除</button>
                            </div>
                        </div>
                    ))}
                    {careers.length === 0 && <p>経歴がありません。</p>}
                </div>
            )}
        </div>
    );
}
