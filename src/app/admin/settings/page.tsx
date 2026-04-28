"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const TABS = [
    { id: 'basic', label: '基本設定' },
    { id: 'hero', label: 'トップ画面 (Hero)' },
    { id: 'company', label: '会社概要' },
];

const CATEGORY_MAP: Record<string, string[]> = {
    'basic': ['company_name', 'company_established', 'company_representative', 'company_address', 'contact_email_recipient'],
    'hero': ['hero_title_ja', 'hero_title_en', 'hero_subtitle_ja', 'hero_bg_image'],
    'company': ['company_message', 'company_message_image'],
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, unknown>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('basic');
    const [uploadingImage, setUploadingImage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase.from('site_settings').select('*');
                if (error) throw error;
                setSettings(data || []);
            } catch (err: unknown) {
                console.error("Error fetching settings:", err);
                setError("設定の取得に失敗しました。SupabaseのURLとKeyが正しく設定されているか確認してください。");
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleSave = async (id: string, value: string) => {
        try {
            const { error } = await supabase.from('site_settings').update({ setting_value: value }).eq('id', id);
            if (error) throw error;
            
            // Update local state
            setSettings(settings.map(s => String(s.id) === id ? { ...s, setting_value: value } : s));
            alert('保存しました！');
        } catch (err) {
            console.error(err);
            alert('保存に失敗しました。');
        }
    };

    const handleImageUpload = async (id: string, file: File) => {
        setUploadingImage(id);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to storage
            const { error: uploadError } = await supabase.storage
                .from('public-assets')
                .upload(filePath, file);

            if (uploadError) {
                console.error(uploadError);
                throw new Error('画像のアップロードに失敗しました。SQLでStorageバケットを作成したか確認してください。');
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('public-assets')
                .getPublicUrl(filePath);

            // Save URL to site_settings
            await handleSave(id, publicUrl);
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'アップロード中にエラーが発生しました。');
        } finally {
            setUploadingImage(null);
        }
    };

    const currentSettings = settings.filter(s => CATEGORY_MAP[activeTab].includes(String(s.setting_key)));

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>サイト設定</h1>
            
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                            color: activeTab === tab.id ? 'white' : '#4b5563',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '4px', marginBottom: '20px' }}>
                    {error}
                </div>
            )}

            {loading ? (
                <p>読み込み中...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {currentSettings.map((setting) => {
                        const isImage = String(setting.setting_key).includes('image');
                        const value = String(setting.setting_value);
                        
                        return (
                            <div key={String(setting.id)} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '4px' }}>{String(setting.description)}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '12px' }}>キー: {String(setting.setting_key)}</p>
                                
                                {isImage ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {value && value !== '' && (
                                            <img src={value} alt="Preview" style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        handleImageUpload(String(setting.id), e.target.files[0]);
                                                    }
                                                }}
                                            />
                                            {uploadingImage === String(setting.id) && <span style={{ color: '#3b82f6' }}>アップロード中...</span>}
                                        </div>
                                    </div>
                                ) : value.length > 50 || value.includes('\n') ? (
                                    <div>
                                        <textarea 
                                            defaultValue={value}
                                            style={{ width: '100%', minHeight: '100px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }}
                                            id={`input-${String(setting.id)}`}
                                        />
                                        <button 
                                            onClick={() => {
                                                const el = document.getElementById(`input-${String(setting.id)}`) as HTMLTextAreaElement;
                                                handleSave(String(setting.id), el.value);
                                            }}
                                            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                                        >
                                            変更を保存
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <input 
                                            type="text" 
                                            defaultValue={value}
                                            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }}
                                            id={`input-${String(setting.id)}`}
                                        />
                                        <button 
                                            onClick={() => {
                                                const el = document.getElementById(`input-${String(setting.id)}`) as HTMLInputElement;
                                                handleSave(String(setting.id), el.value);
                                            }}
                                            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                                        >
                                            変更を保存
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    
                    {currentSettings.length === 0 && !error && (
                        <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                            <p>このカテゴリの設定が見つかりません。</p>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '8px' }}>
                                SQLエディタで最新のデータベース構築スクリプト（supabase_schema.sql）を実行してください。
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
