"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsAdminPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newDate, setNewDate] = useState('');
    const [newCategory, setNewCategory] = useState('お知らせ');
    const [newTitle, setNewTitle] = useState('');
    const [newUrl, setNewUrl] = useState('');

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

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        if (!newDate || !newTitle) return alert('日付とタイトルは必須です。');

        const { error } = await supabase.from('news').insert([{
            date: newDate,
            category: newCategory,
            title: newTitle,
            url: newUrl || null
        }]);

        if (error) {
            console.error(error);
            alert('追加に失敗しました。');
        } else {
            alert('追加しました！');
            setNewDate('');
            setNewTitle('');
            setNewUrl('');
            fetchNews();
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('本当に削除しますか？')) return;
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) alert('削除に失敗しました。');
        else fetchNews();
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>ニュース管理</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>新規追加</h2>
                <form onSubmit={handleAdd} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>日付 (例: 2026.04.01)</label>
                        <input type="text" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>カテゴリ</label>
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}>
                            <option value="お知らせ">お知らせ</option>
                            <option value="リリース">リリース</option>
                            <option value="イベント">イベント</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>タイトル</label>
                        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>リンクURL (空でも可)</label>
                        <input type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="https://..." />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>追加する</button>
                    </div>
                </form>
            </div>

            {loading ? <p>読み込み中...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {news.map(n => (
                        <div key={n.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ color: '#6b7280', marginRight: '10px' }}>{n.date}</span>
                                <span style={{ backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '4px', fontSize: '0.875rem', marginRight: '10px' }}>{n.category}</span>
                                <strong>{n.title}</strong>
                            </div>
                            <button onClick={() => handleDelete(n.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>削除</button>
                        </div>
                    ))}
                    {news.length === 0 && <p>ニュースがありません。</p>}
                </div>
            )}
        </div>
    );
}
