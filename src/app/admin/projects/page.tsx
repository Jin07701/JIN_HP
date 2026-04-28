"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newLink, setNewLink] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        setLoading(true);
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setProjects(data || []);
        setLoading(false);
    }

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        if (!newTitle || !newCategory || !newDescription) return alert('タイトル、カテゴリ、説明は必須です。');

        setUploading(true);
        let imageUrl = null;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('public-assets').upload(fileName, imageFile);
            if (uploadError) {
                alert('画像アップロード失敗');
                setUploading(false);
                return;
            }
            const { data } = supabase.storage.from('public-assets').getPublicUrl(fileName);
            imageUrl = data.publicUrl;
        }

        const { error } = await supabase.from('projects').insert([{
            title: newTitle,
            category: newCategory,
            description: newDescription,
            link: newLink || null,
            image_url: imageUrl
        }]);

        if (error) {
            alert('追加に失敗しました。');
        } else {
            alert('追加しました！');
            setNewTitle(''); setNewCategory(''); setNewDescription(''); setNewLink(''); setImageFile(null);
            fetchProjects();
        }
        setUploading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('本当に削除しますか？')) return;
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) alert('削除に失敗しました。');
        else fetchProjects();
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>実績管理 (Projects)</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>新規追加</h2>
                <form onSubmit={handleAdd} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>タイトル</label>
                        <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>カテゴリ</label>
                        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="例: App Development" />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>説明</label>
                        <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '80px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>リンクURL (空でも可)</label>
                        <input type="text" value={newLink} onChange={e => setNewLink(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>画像</label>
                        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <button type="submit" disabled={uploading} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', opacity: uploading ? 0.7 : 1 }}>
                            {uploading ? '追加中...' : '追加する'}
                        </button>
                    </div>
                </form>
            </div>

            {loading ? <p>読み込み中...</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {projects.map(p => (
                        <div key={p.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            {p.image_url && <img src={p.image_url} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />}
                            <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>{p.category}</span>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0' }}>{p.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '10px' }}>{p.description}</p>
                            <button onClick={() => handleDelete(p.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>削除</button>
                        </div>
                    ))}
                    {projects.length === 0 && <p style={{ gridColumn: 'span 2' }}>実績がありません。</p>}
                </div>
            )}
        </div>
    );
}
