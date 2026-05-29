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
('hero_title_ja', '卓越したエンジニアと、\n理想の未来を。', 'キャッチコピー（日本語）'),
('hero_title_en', 'With Outstanding Engineers,\nCreate Ideal Future.', 'キャッチコピー（英語）'),
('hero_subtitle_ja', 'ARISTAは、頂点を極めるテクノロジーで世界を再定義し、\n選ばれしエンジニアと企業が共鳴する、新たな頂を目指します。', 'サブキャッチコピー（日本語）'),
('hero_bg_image', '/images/hero-bg.jpg', 'トップ背景画像 (Hero Background Image URL)'),
('company_name', '株式会社ARISTA（アリスタ）', '会社名'),
('company_established', '2026年5月', '設立年月'),
('company_representative', 'Jin Adachi', '代表者名'),
('company_address', '〒810-0001 福岡県福岡市中央区天神2丁目2番12号T&Jビルディング7F', '所在地'),
('company_message', '私たちは、最先端のAI技術と独自のアルゴリズムを活用し、企業とエンジニアの最適なマッチングを実現します。単なるスキルマッチングにとどまらず、ビジョンやカルチャーの適合性を深く分析することで、双方が真に共鳴し、共に成長できる環境を創出します。', '代表メッセージテキスト'),
('company_message_image', '/images/company-message.jpg', '代表メッセージ画像 URL'),
('contact_email_recipient', 'jinadachi077@gmail.com', 'お問い合わせ通知先メールアドレス');

-- news: Table for News Items
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
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
-- FOR DEMO PURPOSES ONLY. IN PRODUCTION, REMOVE THESE TO RESTRICT WRITE ACCESS.
-- CREATE POLICY "Enable write access for all users" ON public.site_settings FOR UPDATE USING (true);
-- CREATE POLICY "Enable insert access for all users" ON public.site_settings FOR INSERT WITH CHECK (true);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.news FOR SELECT USING (true);
-- FOR DEMO PURPOSES ONLY.
-- CREATE POLICY "Enable write access for all users" ON public.news FOR ALL USING (true);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
-- Allow anyone to insert (submit the contact form)
CREATE POLICY "Enable insert access for anon users" ON public.inquiries FOR INSERT WITH CHECK (true);
-- Only allow viewing/editing via admin panel (simplified for now, allow all for demo)
-- CREATE POLICY "Enable read access for all users" ON public.inquiries FOR SELECT USING (true);
-- CREATE POLICY "Enable write access for all users" ON public.inquiries FOR UPDATE USING (true);

-- projects: Table for Projects/Achievements
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.projects (title, category, description, image_url) VALUES
('AIを駆使した求人プラットフォーム開発', 'App Development', 'ITダイレクトマッチAの開発と運用。AIによる高精度なマッチングを実現。', '/images/app-development.png'),
('セキュアな社内インフラ構築', 'Infrastructure', '金融機関向けの堅牢なインフラ設計とセキュリティ監査を実施。', '/images/hero-bg.jpg');

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.projects FOR SELECT USING (true);
-- CREATE POLICY "Enable write access for all users" ON public.projects FOR ALL USING (true);

-- careers: Table for Careers/History
CREATE TABLE public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year TEXT NOT NULL,
    event TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.careers (year, event) VALUES
('2026', '株式会社ARISTA設立。ITダイレクトマッチのベータ版リリース。');

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.careers FOR SELECT USING (true);
-- CREATE POLICY "Enable write access for all users" ON public.careers FOR ALL USING (true);

-- security_logs: Table for blocked access tracking
CREATE TABLE public.security_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    ip_address TEXT,
    user_agent TEXT,
    action TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anon users" ON public.security_logs FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable read for admin users" ON public.security_logs FOR SELECT USING (true);
-- Storage (画像アップロード用バケットの作成)
-- NOTE: Please run this manually in the Supabase SQL Editor if buckets are not created
INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true) ON CONFLICT DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'public-assets' );
-- CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'public-assets' );
-- CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'public-assets' );
-- CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'public-assets' );

-- apps: Table for App portfolio
CREATE TABLE public.apps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    app_store_url TEXT,
    web_url TEXT,
    icon_url TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.apps FOR SELECT USING (true);
-- CREATE POLICY "Enable write access for all users" ON public.apps FOR ALL USING (true);

-- site_sections: Table for managing section visibility
CREATE TABLE IF NOT EXISTS public.site_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title_ja TEXT NOT NULL,
    is_visible BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0
);
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.site_sections FOR SELECT USING (true);

-- footer_sections: Table for managing footer categories
CREATE TABLE IF NOT EXISTS public.footer_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    "order" INTEGER DEFAULT 0
);
ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.footer_sections FOR SELECT USING (true);

-- footer_links: Table for managing footer links
CREATE TABLE IF NOT EXISTS public.footer_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.footer_sections(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    "order" INTEGER DEFAULT 0
);
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.footer_links FOR SELECT USING (true);
