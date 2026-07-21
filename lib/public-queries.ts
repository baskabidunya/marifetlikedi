"use server";

import { createClient } from "@/lib/supabase/server";

export async function getPublicNavLinks(position: "header" | "footer") {
  const supabase = await createClient();
  const { data } = await supabase.from("navigation_links")
    .select("*").eq("active", true).eq("position", position).order("sort_order");
  return data || [];
}

export async function getActiveAnnouncements() {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { data } = await supabase.from("announcements")
    .select("*")
    .eq("active", true)
    .lte("start_date", now)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("start_date", { ascending: true });
  return data || [];
}

// Featured announcement for the top banner. Rotates through the active pool once
// per ISO week (deterministic by date), so the banner refreshes automatically
// without manual edits.
export async function getFeaturedAnnouncement() {
  const pool = await getActiveAnnouncements();
  if (!pool || pool.length === 0) return null;
  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const idx = ((weekIndex % pool.length) + pool.length) % pool.length;
  return pool[idx];
}

export async function getAnnouncementById(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("announcements").select("*").eq("id", id).single();
  return data || null;
}

// All active announcements (including upcoming scheduled ones), for the
// announcements section listing.
export async function getAllAnnouncements() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .eq("active", true)
    .order("start_date", { ascending: true });
  return data || [];
}

export async function getActiveFaqItems() {
  const supabase = await createClient();
  const { data } = await supabase.from("faq").select("*").eq("active", true).order("sort_order");
  return data || [];
}

export async function getApprovedTestimonialsPublic() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("approved", true).order("created_at", { ascending: false });
  return data || [];
}

export async function getActiveBlogCategoriesPublic() {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_categories").select("*").eq("active", true).order("sort_order");
  return data || [];
}

export async function getPublicTarotCards() {
  const supabase = await createClient();
  const { data } = await supabase.from("tarot_cards").select("*").eq("active", true).order("sort_order");
  return data || [];
}

export async function getActiveTrendArticles() {
  const supabase = await createClient();
  const { data } = await supabase.from("trend_articles").select("*").eq("active", true).order("sort_order");
  return data || [];
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", key).single();
  return data?.value ?? null;
}

export async function searchTrendArticles(query: string) {
  const supabase = await createClient();
  const sanitized = `%${query.replace(/%/g, "")}%`;
  const { data } = await supabase
    .from("trend_articles")
    .select("*")
    .eq("active", true)
    .or(`title.ilike.${sanitized},summary.ilike.${sanitized},content.ilike.${sanitized}`)
    .order("sort_order")
    .limit(20);
  return data || [];
}

export async function getTrendArticleBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("trend_articles").select("*").eq("slug", slug).eq("active", true).single();
  return data;
}
