"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsAdminPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('お知らせ');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [actionStatus, setActionStatus] = useState<{id: string, type: 'success' | 'error', msg: string} | null>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        setLoading(true);
        const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error(error);
            alert('ニュースの取得に失敗しました。');
        } else {
            setNews(data || []);
        }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!date || !title) return alert('日付とタイトルは必須です。');

        setSaving(true);
        const payload = {
            date,
            category,
            title,
            url: url || null
        };

        let error;
        if (editingId) {
            const res = await supabase.from('news').update(payload).eq('id', editingId);
            error = res.error;
        } else {
            const res = await supabase.from('news').insert([payload]);
            error = res.error;
        }

        if (error) {
            console.error(error);
            alert('操作に失敗しました。');
        } else {
            setEditingId(null);
            setDate('');
            setTitle('');
            setUrl('');
            fetchNews();
            const statusId = editingId || 'new';
            setActionStatus({ id: statusId, type: 'success', msg: editingId ? '更新しました' : '追加しました' });
            setTimeout(() => setActionStatus(null), 3000);
        }
        setSaving(false);
    }

    function handleEdit(n: any) {
        setEditingId(n.id);
        setDate(n.date);
        setCategory(n.category);
        setTitle(n.title);
        setUrl(n.url || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleCancel() {
        setEditingId(null);
        setDate('');
        setTitle('');
        setUrl('');
    }

    async function handleDelete(id: string) {
        if (!confirm('本当に削除しますか？')) return;
        
        setActionStatus({ id, type: 'success', msg: '削除中...' });
        const { error } = await supabase.from('news').delete().eq('id', id);
        
        if (error) {
            console.error(error);
            setActionStatus({ id, type: 'error', msg: '削除失敗' });
            setTimeout(() => setActionStatus(null), 3000);
        } else {
            fetchNews();
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>ニュース管理</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px', border: editingId ? '2px solid #3b82f6' : 'none' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>
                    {editingId ? '記事を編集' : '新規追加'}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>日付 (例: 2026.04.01)</label>
                        <input type="text" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="2026.05.06" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>カテゴリ</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                            <option value="お知らせ">お知らせ</option>
                            <option value="リリース">リリース</option>
                            <option value="イベント">イベント</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>タイトル</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>リンクURL (空でも可)</label>
                        <input type="text" value={url} onChange={e => setUrl(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="https://..." />
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

            {loading ? <p>読み込み中...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {news.map(n => (
                        <div key={n.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <span style={{ color: '#6b7280', marginRight: '10px' }}>{n.date}</span>
                                <span style={{ backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '4px', fontSize: '0.875rem', marginRight: '10px' }}>{n.category}</span>
                                <strong>{n.title}</strong>
                                {actionStatus && actionStatus.id === n.id && (
                                    <span style={{ marginLeft: '15px', color: actionStatus.type === 'success' ? '#10b981' : '#ef4444', fontSize: '0.875rem' }}>{actionStatus.msg}</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => handleEdit(n)} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>編集</button>
                                <button onClick={() => handleDelete(n.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>削除</button>
                            </div>
                        </div>
                    ))}
                    {news.length === 0 && <p>ニュースがありません。</p>}
                </div>
            )}
        </div>
    );
}
