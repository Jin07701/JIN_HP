"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Network, Shield, Cpu, Smartphone, Plus, Trash2, Save, MoveUp, MoveDown } from 'lucide-react';

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
        else fetchServices();
        setSaving(null);
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
            order: services.length + 1
        }]);
        if (!error) fetchServices();
    };

    if (loading) return <div className="p-8">読み込み中...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">事業内容</h1>
                <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <Plus size={18} /> 新規追加
                </button>
            </div>

            <div className="space-y-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">タイトル</label>
                                <input 
                                    className="w-full border p-2 rounded"
                                    defaultValue={service.title}
                                    onBlur={(e) => handleSave(service.id, { title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">サブタイトル</label>
                                <input 
                                    className="w-full border p-2 rounded"
                                    defaultValue={service.subtitle}
                                    onBlur={(e) => handleSave(service.id, { subtitle: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-1">説明文</label>
                            <textarea 
                                className="w-full border p-2 rounded h-24"
                                defaultValue={service.description}
                                onBlur={(e) => handleSave(service.id, { description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">アイコン名 (Network, Shield, Cpu, Smartphone)</label>
                                <input 
                                    className="w-full border p-2 rounded"
                                    defaultValue={service.icon_name}
                                    onBlur={(e) => handleSave(service.id, { icon_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">外部リンク (サービスサイトURL)</label>
                                <input 
                                    className="w-full border p-2 rounded"
                                    defaultValue={service.external_link}
                                    onBlur={(e) => handleSave(service.id, { external_link: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">画像パス/URL</label>
                                <input 
                                    className="w-full border p-2 rounded"
                                    defaultValue={service.image_url}
                                    onBlur={(e) => handleSave(service.id, { image_url: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => handleDelete(service.id)}
                                className="text-red-600 p-2 hover:bg-red-50 rounded"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
