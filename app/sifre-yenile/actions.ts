"use server";

import { createClient } from "@/lib/supabase/server";

export async function updatePassword(
  _prev: unknown,
  formData: FormData,
): Promise<{ error?: string; success?: string }> {
  const password = (formData.get("password") as string) || "";
  const confirm = (formData.get("confirm") as string) || "";

  if (!password || password.length < 6) return { error: "Şifre en az 6 karakter olmalı." };
  if (password !== confirm) return { error: "Şifreler eşleşmiyor." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  return { success: "Şifreniz güncellendi. Yeni şifrenizle giriş yapabilirsiniz." };
}
