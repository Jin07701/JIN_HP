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

-- Insert initial data
INSERT INTO public.apps (name, description, app_store_url, icon_url, "order") VALUES 
('Adachi Jin (iOS Developer)', 'Apple Storeで公開しているアプリ一覧', 'https://apps.apple.com/gb/developer/adachi-jin/id1891310044', '/images/default-app.png', 1);

INSERT INTO public.apps (name, description, web_url, icon_url, "order") VALUES 
('batsu', 'Webアプリケーション', 'https://batsu.vercel.app/', '/images/default-app.png', 2);

INSERT INTO public.apps (name, description, web_url, icon_url, "order") VALUES 
('yarukideranna-omega', 'Webアプリケーション', 'https://yarukideranna-omega.vercel.app/', '/images/default-app.png', 3);
