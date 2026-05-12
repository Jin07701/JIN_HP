-- services: 事業内容の各項目を管理するテーブル
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    external_link TEXT,
    image_url TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLSポリシーの設定
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable all access for admin users" ON public.services FOR ALL USING (true);

-- 初期データの投入
INSERT INTO public.services (title, subtitle, description, icon_name, external_link, image_url, "order") VALUES
('ITダイレクトマッチA', 'エンジニア・企業マッチング', '中間マージンを排除した、透明性の高いダイレクトマッチングプラットフォーム。', 'Network', 'https://it-direct-match.vercel.app', '/images/direct-connect-match.png', 1),
('IT Consulting', '技術コンサルティング', 'インフラからアプリまで、最新技術でお客様の課題を解決します。', 'Cpu', '', '/images/hakata-bg-clean.jpg', 2),
('Security', 'セキュリティ診断・対策', '脆弱性診断から堅牢化支援まで、システムを守る包括的なセキュリティサービス。', 'Shield', '', '/images/company-profile-concept.jpg', 3),
('App Development', 'アプリ開発', '「おしゃべりスイッチ」や「娯楽ブレーキ」などのiOS向け自社アプリ開発・提供。', 'Smartphone', '', '/images/app-development.png', 4);
