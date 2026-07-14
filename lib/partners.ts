"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { calculateAstroChart } from "./astro-utils";
import { calculateSynastry, type CompatibilityScores } from "./astro-synastry";

export async function getPartners() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("partner_profiles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function addPartner(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmalısınız." };

  const name = formData.get("name") as string;
  if (!name?.trim()) return { error: "Partner ismi gerekli." };

  const { error } = await supabase.from("partner_profiles").insert({
    user_id: user.id,
    name: name.trim(),
    birth_date: formData.get("birth_date") as string || null,
    birth_time: formData.get("birth_time") as string || null,
    birth_place: formData.get("birth_place") as string || null,
  });

  if (error) return { error: error.message };
  revalidatePath("/profil");
  return { success: "Partner eklendi." };
}

export async function updatePartner(_prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmalısınız." };

  const id = formData.get("id") as string;
  if (!id) return { error: "Partner ID gerekli." };

  const name = formData.get("name") as string;
  if (!name?.trim()) return { error: "Partner ismi gerekli." };

  const { error } = await supabase
    .from("partner_profiles")
    .update({
      name: name.trim(),
      birth_date: formData.get("birth_date") as string || null,
      birth_time: formData.get("birth_time") as string || null,
      birth_place: formData.get("birth_place") as string || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/profil");
  return { success: "Partner güncellendi." };
}

export async function deletePartner(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmalısınız." };

  const { error } = await supabase
    .from("partner_profiles")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/profil");
  return { success: "Partner silindi." };
}

export async function updatePartnerAvatar(partnerId: string, avatar: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapmalısınız." };

  const { error } = await supabase
    .from("partner_profiles")
    .update({ avatar, updated_at: new Date().toISOString() })
    .eq("id", partnerId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/profil");
  revalidatePath(`/profil/uyum/${partnerId}`);
  return { success: "Avatar güncellendi." };
}

export async function getSynastryForPartner(partnerId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("birth_date, birth_time, birth_place")
    .eq("user_id", user.id)
    .single();

  const { data: partnerProfile } = await supabase
    .from("partner_profiles")
    .select("*")
    .eq("id", partnerId)
    .eq("user_id", user.id)
    .single();

  if (!userProfile?.birth_date || !partnerProfile?.birth_date) return null;

  const userChart = calculateAstroChart(
    userProfile.birth_date,
    userProfile.birth_time,
    userProfile.birth_place,
  );

  return calculateSynastry(
    userChart,
    partnerProfile.birth_date,
    partnerProfile.birth_time,
    partnerProfile.birth_place,
  );
}

export async function getAllPartnerScores(): Promise<Record<string, CompatibilityScores>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("birth_date, birth_time, birth_place")
    .eq("user_id", user.id)
    .single();

  if (!userProfile?.birth_date) return {};

  const { data: partners } = await supabase
    .from("partner_profiles")
    .select("*")
    .eq("user_id", user.id);

  if (!partners) return {};

  const userChart = calculateAstroChart(
    userProfile.birth_date,
    userProfile.birth_time,
    userProfile.birth_place,
  );

  const scores: Record<string, CompatibilityScores> = {};
  for (const p of partners) {
    if (p.birth_date) {
      const synastry = calculateSynastry(userChart, p.birth_date, p.birth_time, p.birth_place);
      if (synastry) scores[p.id] = synastry.compatibilityScores;
    }
  }
  return scores;
}
