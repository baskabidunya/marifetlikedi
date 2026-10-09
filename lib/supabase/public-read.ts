import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Oturumsuz (anon) okuma istemcisi. Cookie bağımlılığı olmadığı için
// unstable_cache ile cache'lenebilir; public sayfalar için yeterlidir.
export function createPublicReadClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
