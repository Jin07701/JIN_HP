-- apps テーブルに is_visible カラムを追加（表示/非表示用）
ALTER TABLE public.apps ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- 作成済みのアイコン画像URLを設定します
-- （すでに登録済みのアプリに対して、生成したアイコンを割り当てます）

UPDATE public.apps SET icon_url = '/images/icon-chat.png' WHERE name LIKE '%おしゃべりスイッチ%';
UPDATE public.apps SET icon_url = '/images/icon-brake.png' WHERE name LIKE '%娯楽ブレーキ%';
UPDATE public.apps SET icon_url = '/images/icon-batsu.png' WHERE name = 'batsu';
UPDATE public.apps SET icon_url = '/images/icon-omega.png' WHERE name = 'yarukideranna-omega';
