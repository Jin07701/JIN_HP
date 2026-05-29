-- Supabase RLS Fix Script
-- Supabase SQL Editor にこのスクリプトを貼り付けて実行してください。
-- 公開状態になっていた危険なポリシーを削除します。

DROP POLICY IF EXISTS "Enable write access for all users" ON public.site_settings;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.site_settings;

DROP POLICY IF EXISTS "Enable write access for all users" ON public.news;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.inquiries;
DROP POLICY IF EXISTS "Enable write access for all users" ON public.inquiries;

DROP POLICY IF EXISTS "Enable write access for all users" ON public.projects;

DROP POLICY IF EXISTS "Enable write access for all users" ON public.careers;

DROP POLICY IF EXISTS "Enable read for admin users" ON public.security_logs;

DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

-- これでSupabaseからの脆弱性警告（rls_disabled_in_public）が解消されます。
