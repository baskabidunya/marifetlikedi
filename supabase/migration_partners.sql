CREATE TABLE IF NOT EXISTS public.partner_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE,
  birth_time TIME,
  birth_place TEXT,
  avatar TEXT NOT NULL DEFAULT 'auto_awesome',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.partner_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_read_own_partners"
  ON public.partner_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own_partners"
  ON public.partner_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_partners"
  ON public.partner_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "users_delete_own_partners"
  ON public.partner_profiles FOR DELETE
  USING (auth.uid() = user_id);
