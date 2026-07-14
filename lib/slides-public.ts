"use server";

import { createClient } from "@/lib/supabase/server";

export async function getActiveSlides(type?: "home" | "burclar") {
  const supabase = await createClient();
  let query = supabase
    .from("site_slides")
    .select("*")
    .eq("active", true)
    .order("slide_index");
  if (type) query = query.eq("type", type);
  const { data } = await query;
  return data || [];
}
