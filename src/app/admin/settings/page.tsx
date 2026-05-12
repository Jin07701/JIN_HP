"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const TABS = [
    { id: 'basic', label: '基本設定' },
    { id: 'hero', label: 'トップ画面' },
    { id: 'company', label: '会社概要' },
];

const CATEGORY_MAP: Record<string, string[]> = {
    'basic': ['contact_email_recipient'],
    'hero': ['hero_title_ja', 'hero_title_en', 'hero_subtitle_ja', 'hero_bg_image'],
    'company': [
        'company_name', 
        'company_established', 
        'company_representative', 
        'company_address', 
        'company_message', 
        'company_message_image',
        'company_origin_ja',
        'company_business_activities'
    ],
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<Record<string, unknown>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('basic');
    const [uploadingImage, setUploadingImage] = useState<string | null>(null);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<string | null>(null);

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
        setSavingId(id);
        setSuccessId(null);
        try {
            const { error } = await supabase.from('site_settings').update({ setting_value: value }).eq('id', id);
            if (error) throw error;
            
            // Update local state
            setSettings(settings.map(s => String(s.id) === id ? { ...s, setting_value: value } : s));
            
            // Show success state briefly
            setSuccessId(id);
            setTimeout(() => setSuccessId(null), 3000);

            // Audit Log
            try {
                const { data: { session } } = await supabase.auth.getSession();
                const ipRes = await fetch('/api/get-ip');
                const { ip } = await ipRes.json();
                const setting = settings.find(s => String(s.id) === id);
                await supabase.from('security_logs').insert([{
                    email: session?.user.email,
                    ip_address: ip,
                    action: `setting_update: ${setting?.setting_key}`,
                    user_agent: navigator.userAgent
                }]);
            } catch (e) { console.error("Audit log failed", e); }
        } catch (err) {
            console.error(err);
            alert('保存に失敗しました。');
        } finally {
            setSavingId(null);
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

    const handleInitializeDefaults = async () => {
        setLoading(true);
        try {
            const defaults = [
                { setting_key: 'company_name', setting_value: '株式会社ARISTA（アリスタ）', description: '会社名' },
                { setting_key: 'company_established', setting_value: '2026年5月', description: '設立年月' },
                { setting_key: 'company_representative', setting_value: 'Jin Adachi', description: '代表者名' },
                { setting_key: 'company_address', setting_value: '〒810-0001 福岡県福岡市中央区天神2丁目2番12号T&Jビルディング7F', description: '所在地' },
                { setting_key: 'company_message', setting_value: '私たちは、最先端のAI技術と独自のアルゴリズムを活用し、企業とエンジニアの最適なマッチングを実現します。', description: '代表メッセージテキスト' },
                { setting_key: 'company_message_image', setting_value: '/images/hero-premium.png', description: '代表メッセージ画像 URL' },
                { setting_key: 'company_origin_ja', setting_value: '「ARISTA」はラテン語で「穂」や「先端・頂点」を意味する言葉です...', description: '社名の由来' },
                { setting_key: 'company_business_activities', setting_value: '・エンジニアマッチングプラットフォーム「ITダイレクトマッチ」の運営\\n・アプリ開発事業\\n・ITコンサルティング事業\\n・セキュリティ監査・診断事業', description: '事業内容' },
                { setting_key: 'contact_email_recipient', setting_value: 'jinadachi077@gmail.com', description: 'お問い合わせ通知先メールアドレス' },
                { setting_key: 'hero_title_ja', setting_value: '卓越したエンジニアと、\\n理想の未来を。', description: 'キャッチコピー（日本語）' },
                { setting_key: 'hero_title_en', setting_value: 'With Outstanding Engineers,\\nCreate Ideal Future.', description: 'キャッチコピー（英語）' },
                { setting_key: 'hero_subtitle_ja', setting_value: 'ARISTAは、頂点を極めるテクノロジーで世界を再定義し、\\n選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。', description: 'サブキャッチコピー（日本語）' },
                { setting_key: 'hero_bg_image', setting_value: '/images/hero-bg.jpg', description: 'トップ背景画像' }
            ];

            // Filter out existing settings
            const existingKeys = settings.map(s => s.setting_key);
            const toInsert = defaults.filter(d => !existingKeys.includes(d.setting_key));

            if (toInsert.length === 0) {
                alert('すべての設定項目は既に存在します。');
                return;
            }

            const { error } = await supabase.from('site_settings').insert(toInsert);
            if (error) throw error;

            alert(`${toInsert.length}件の項目を初期化しました。`);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('初期化に失敗しました。');
        } finally {
            setLoading(false);
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
                                ) : value.length > 50 || value.includes('\\n') || value.includes('\n') ? (
                                    <div>
                                        <textarea 
                                            defaultValue={value.replace(/\\n/g, '\n')}
                                            style={{ width: '100%', minHeight: '100px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '12px' }}
                                            id={`input-${String(setting.id)}`}
                                        />
                                        <button 
                                            onClick={() => {
                                                const el = document.getElementById(`input-${String(setting.id)}`) as HTMLTextAreaElement;
                                                const finalValue = el.value.replace(/\n/g, '\\n');
                                                handleSave(String(setting.id), finalValue);
                                            }}
                                            disabled={savingId === String(setting.id)}
                                            style={{ 
                                                backgroundColor: successId === String(setting.id) ? '#10b981' : '#3b82f6', 
                                                color: 'white', 
                                                padding: '6px 12px', 
                                                borderRadius: '4px', 
                                                border: 'none', 
                                                cursor: savingId === String(setting.id) ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {savingId === String(setting.id) ? '保存中...' : successId === String(setting.id) ? '✓ 保存しました' : '変更を保存'}
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
                                            disabled={savingId === String(setting.id)}
                                            style={{ 
                                                backgroundColor: successId === String(setting.id) ? '#10b981' : '#3b82f6', 
                                                color: 'white', 
                                                padding: '6px 12px', 
                                                borderRadius: '4px', 
                                                border: 'none', 
                                                cursor: savingId === String(setting.id) ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {savingId === String(setting.id) ? '保存中...' : successId === String(setting.id) ? '✓ 保存しました' : '変更を保存'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    
                    {currentSettings.length === 0 && !error && (
                        <div style={{ padding: '40px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.125rem', marginBottom: '10px' }}>このカテゴリの設定が見つかりません。</p>
                            <p style={{ color: '#6b7280', marginBottom: '24px' }}>データベースに初期データが存在しない可能性があります。</p>
                            <button 
                                onClick={handleInitializeDefaults}
                                style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                設定項目を初期化する（デフォルト値を投入）
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
