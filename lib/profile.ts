"use server";

import { createClient } from "@/lib/supabase/server";

type ProfileData = {
  display_name?: string;
  phone?: string;
  birth_date?: string;
  birth_time?: string;
  birth_place?: string;
  sun_sign?: string;
  moon_sign?: string;
  rising_sign?: string;
};

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return data;
}

export async function updateProfile(_prevState: { error?: string; success?: string } | undefined, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapmalısınız." };

  const profile: ProfileData = {
    display_name: formData.get("display_name") as string || undefined,
    phone: formData.get("phone") as string || undefined,
    birth_place: formData.get("birth_place") as string || undefined,
  };

  const birthDate = formData.get("birth_date") as string;
  if (birthDate) profile.birth_date = birthDate;

  const birthTime = formData.get("birth_time") as string;
  if (birthTime) profile.birth_time = birthTime;

  const sunSign = formData.get("sun_sign") as string;
  if (sunSign) profile.sun_sign = sunSign;

  const moonSign = formData.get("moon_sign") as string;
  if (moonSign) profile.moon_sign = moonSign;

  const risingSign = formData.get("rising_sign") as string;
  if (risingSign) profile.rising_sign = risingSign;

  const { error } = await supabase
    .from("user_profiles")
    .upsert(
      { user_id: user.id, ...profile, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );

  if (error) return { error: error.message };

  return { success: "Profil güncellendi." };
}

export async function getAstroChart() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("user_profiles")
    .select("birth_date, birth_time, birth_place")
    .eq("user_id", user.id)
    .single();

  if (!data?.birth_date) return null;

  const { calculateAstroChart } = await import("./astro-utils");
  return calculateAstroChart(data.birth_date, data.birth_time, data.birth_place);
}
