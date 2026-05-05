"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [actionStatus, setActionStatus] = useState<{id: string, type: 'success' | 'error', msg: string} | null>(null);

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !category || !description) return alert('タイトル、カテゴリ、説明は必須です。');

        setUploading(true);
        let imageUrl = editingId ? projects.find(p => p.id === editingId)?.image_url : null;

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

        const payload = {
            title,
            category,
            description,
            link: link || null,
            image_url: imageUrl
        };

        let error;
        if (editingId) {
            const res = await supabase.from('projects').update(payload).eq('id', editingId);
            error = res.error;
        } else {
            const res = await supabase.from('projects').insert([payload]);
            error = res.error;
        }

        if (error) {
            console.error(error);
            alert('操作に失敗しました。');
        } else {
            setTitle(''); setCategory(''); setDescription(''); setLink(''); setImageFile(null);
            setEditingId(null);
            fetchProjects();
            const statusId = editingId || 'new';
            setActionStatus({ id: statusId, type: 'success', msg: editingId ? '更新しました' : '追加しました' });
            setTimeout(() => setActionStatus(null), 3000);
        }
        setUploading(false);
    }

    function handleEdit(p: any) {
        setEditingId(p.id);
        setTitle(p.title);
        setCategory(p.category);
        setDescription(p.description);
        setLink(p.link || '');
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleCancel() {
        setEditingId(null);
        setTitle(''); setCategory(''); setDescription(''); setLink(''); setImageFile(null);
    }

    async function handleDelete(id: string) {
        if (!confirm('本当に削除しますか？')) return;
        
        setActionStatus({ id, type: 'success', msg: '削除中...' });
        const { error } = await supabase.from('projects').delete().eq('id', id);
        
        if (error) {
            console.error(error);
            setActionStatus({ id, type: 'error', msg: '削除失敗' });
            setTimeout(() => setActionStatus(null), 3000);
        } else {
            fetchProjects();
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>実績管理 (Projects)</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px', border: editingId ? '2px solid #3b82f6' : 'none' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>
                    {editingId ? '実績を編集' : '新規追加'}
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>タイトル</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>カテゴリ</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} placeholder="例: App Development" />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>説明</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '80px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>リンクURL (空でも可)</label>
                        <input type="text" value={link} onChange={e => setLink(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>画像 {editingId && '(変更する場合のみ選択)'}</label>
                        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                    </div>
                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                        <button type="submit" disabled={uploading} style={{ backgroundColor: editingId ? '#3b82f6' : '#10b981', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', flex: 1, opacity: uploading ? 0.7 : 1 }}>
                            {uploading ? '保存中...' : editingId ? '更新する' : '追加する'}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {projects.map(p => (
                        <div key={p.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            {p.image_url && <img src={p.image_url} alt="" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} />}
                            <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>{p.category}</span>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0' }}>{p.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '10px' }}>{p.description}</p>
                            {actionStatus && actionStatus.id === p.id && (
                                <p style={{ color: actionStatus.type === 'success' ? '#10b981' : '#ef4444', fontSize: '0.875rem', marginBottom: '10px' }}>{actionStatus.msg}</p>
                            )}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => handleEdit(p)} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>編集</button>
                                <button onClick={() => handleDelete(p.id)} style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>削除</button>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && <p style={{ gridColumn: 'span 2' }}>実績がありません。</p>}
                </div>
            )}
        </div>
    );
}
