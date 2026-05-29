-- 既存のappsテーブルにWeb URL用のカラムを追加します
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS web_url TEXT;

-- RLSポリシーが設定されていない場合のために追加
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.apps;
CREATE POLICY "Enable read access for all users" ON public.apps FOR SELECT USING (true);

-- ご要望のあったWebアプリとApple Storeの開発者ページのデータを追加します
INSERT INTO public.apps (name, description, app_store_url, icon_url, "order") VALUES 
('Adachi Jin (iOS Developer)', 'Apple Storeで公開しているアプリ一覧', 'https://apps.apple.com/gb/developer/adachi-jin/id1891310044', '/images/default-app.png', 10);

INSERT INTO public.apps (name, description, web_url, icon_url, "order") VALUES 
('batsu', 'Webアプリケーション', 'https://batsu.vercel.app/', '/images/default-app.png', 11);

INSERT INTO public.apps (name, description, web_url, icon_url, "order") VALUES 
('yarukideranna-omega', 'Webアプリケーション', 'https://yarukideranna-omega.vercel.app/', '/images/default-app.png', 12);
