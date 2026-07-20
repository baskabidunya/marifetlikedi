"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function signIn(
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signUp(
  prevState: { error?: string; success?: string } | undefined,
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  return { success: "Hesabın oluşturuldu! E-postanı kontrol et ve giriş yap." };
}

export async function signInWithOAuth(provider: "google" | "apple") {
  const supabase = await createClient();

  const h = await headers();
  const origin = h.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (data.url) {
    const { redirect } = await import("next/navigation");
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  const { redirect } = await import("next/navigation");
  redirect("/");
}
