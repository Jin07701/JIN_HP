-- フッターのリンクが消える問題を修正するSQLスクリプト
-- SupabaseのSQL Editorで実行してください。

ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.footer_sections;
CREATE POLICY "Enable read access for all users" ON public.footer_sections FOR SELECT USING (true);

ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.footer_links;
CREATE POLICY "Enable read access for all users" ON public.footer_links FOR SELECT USING (true);

ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.site_sections;
CREATE POLICY "Enable read access for all users" ON public.site_sections FOR SELECT USING (true);
