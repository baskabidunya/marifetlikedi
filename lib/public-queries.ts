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
    .or(`end_date.is.null,end_date.gte.${now}`);
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

export async function getTrendArticleBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("trend_articles").select("*").eq("slug", slug).eq("active", true).single();
  return data;
}
