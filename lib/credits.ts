"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserCredits() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { credits: 0, authenticated: false as const };

  // Check if daily reset needed
  const today = new Date().toISOString().split("T")[0];

  let { data: uc } = await supabase
    .from("user_credits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!uc) {
    // First time — create credit row
    const { data: newUc } = await supabase
      .from("user_credits")
      .insert({ user_id: user.id, credits: 2, last_daily_reset: today })
      .select()
      .single();
    uc = newUc;
  } else if (uc.last_daily_reset < today) {
    // Daily reset
    const { data: resetUc } = await supabase
      .from("user_credits")
      .update({ credits: 2, last_daily_reset: today, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .select()
      .single();
    uc = resetUc;
  }

  return { credits: uc?.credits ?? 0, authenticated: true as const };
}

export async function spendCredit() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Giriş yapmalısınız." };

  const { data: uc } = await supabase
    .from("user_credits")
    .select("credits")
    .eq("user_id", user.id)
    .single();

  if (!uc || uc.credits <= 0) {
    return { success: false, error: "Krediniz kalmadı." };
  }

  const { error: updateError } = await supabase
    .from("user_credits")
    .update({ credits: uc.credits - 1, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);

  if (updateError) return { success: false, error: updateError.message };

  await supabase.from("credit_transactions").insert({
    user_id: user.id,
    amount: -1,
    type: "spend",
    description: "Tarot kartı açılımı",
  });

  return { success: true, credits: uc.credits - 1 };
}
