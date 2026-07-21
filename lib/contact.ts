"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactMessage(formData: FormData) {
  const honeypot = (formData.get("website") as string || "").trim();
  if (honeypot) {
    return { ok: true, error: "" };
  }

  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const subject = (formData.get("subject") as string || "").trim();
  const message = (formData.get("message") as string || "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Lütfen ad, e-posta ve mesaj alanlarını doldurun." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Geçerli bir e-posta adresi girin." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message,
  });

  if (error) {
    return { ok: false, error: "Mesaj gönderilemedi, lütfen tekrar deneyin." };
  }

  return { ok: true, error: "" };
}
