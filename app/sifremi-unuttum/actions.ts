"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function requestPasswordReset(
  _prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: string }> {
  const email = (formData.get("email") as string) || "";
  if (!email?.trim()) return { error: "E-posta adresi gerekli." };

  const h = await headers();
  const origin = h.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${origin}/auth/callback?next=/sifre-yenile`,
  });

  if (error) return { error: error.message };
  return {
    success:
      "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.",
  };
}
