-- site_settings: Key-Value store for general site texts (e.g. Hero subtitle, Company Address)
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Data for site_settings
INSERT INTO public.site_settings (setting_key, setting_value, description) VALUES
('hero_title_ja', '卓越したエンジニアと、\n理想の未来を。', 'Hero Title (Japanese)'),
('hero_title_en', 'With Outstanding Engineers,\nCreate Ideal Future.', 'Hero Title (English)'),
('hero_subtitle_ja', 'ARISTAは、頂点を極めるテクノロジーで世界を再定義し、\n選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。', 'Hero Subtitle (Japanese)'),
('hero_bg_image', '/images/hero-bg.jpg', 'Hero Background Image URL'),
('company_name', '株式会社ARISTA（アリスタ）', 'Company Name'),
('company_established', '2026年5月', 'Established Date'),
('company_representative', 'Jin Adaschi', 'Representative Name'),
('company_address', '〒810-0001 福岡県福岡市中央区天神2丁目2番12号T&Jビルディング7F', 'Company Address'),
('company_message', '私たちは、最先端のAI技術と独自のアルゴリズムを活用し、企業とエンジニアの最適なマッチングを実現します。単なるスキルマッチングにとどまらず、ビジョンやカルチャーの適合性を深く分析することで、双方が真に共鳴し、共に成長できる環境を創出します。', 'Company Message Text'),
('company_message_image', '/images/company-message.jpg', 'Company Message Image URL'),
('contact_email_recipient', 'jinadachi077@gmail.com', 'Contact Form Notification Email');

-- news: Table for News Items
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Initial Data for news
INSERT INTO public.news (date, category, title, url) VALUES
('2026.04.01', 'お知らせ', '株式会社ARISTAを設立しました', 'https://note.com/jin_ai_system/all');

-- Allow anon read access (You can adjust RLS policies in Supabase dashboard)
-- inquiries: Table for Contact Form Submissions
CREATE TABLE public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Enable write access for all users" ON public.site_settings FOR UPDATE USING (true); -- FOR DEMO PURPOSES. Restrict in production.
CREATE POLICY "Enable insert access for all users" ON public.site_settings FOR INSERT WITH CHECK (true);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.news FOR SELECT USING (true);
CREATE POLICY "Enable write access for all users" ON public.news FOR ALL USING (true); -- FOR DEMO PURPOSES. Restrict in production.

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
-- Allow anyone to insert (submit the contact form)
CREATE POLICY "Enable insert access for anon users" ON public.inquiries FOR INSERT WITH CHECK (true);
-- Only allow viewing/editing via admin panel (simplified for now, allow all for demo)
CREATE POLICY "Enable read access for all users" ON public.inquiries FOR SELECT USING (true);
CREATE POLICY "Enable write access for all users" ON public.inquiries FOR UPDATE USING (true);

-- Storage (画像アップロード用バケットの作成)
-- NOTE: Please run this manually in the Supabase SQL Editor if buckets are not created
INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true) ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'public-assets' );
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'public-assets' );
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'public-assets' );
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'public-assets' );
