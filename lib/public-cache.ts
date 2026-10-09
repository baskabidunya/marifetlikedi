import { unstable_cache } from "next/cache";
import { createPublicReadClient } from "@/lib/supabase/public-read";
import type { PostWithTags } from "@/lib/blog-public";

function mapTags(post: any): { slug: string; name: string }[] {
  const rows = post?.blog_post_tags || [];
  return rows
    .map((r: any) => r.tag)
    .filter(Boolean)
    .map((t: any) => ({ slug: t.slug, name: t.name }));
}

// Public (anon) okumalar için cache katmanı: her render'da Supabase'e
// gitmek yerine 5 dakika boyunca cache'ten döner. Admin değişiklikleri
// en geç 5 dakika içinde yayına yansır.

const REVALIDATE = 300;

export const getCachedNavLinks = unstable_cache(
  async (position: "header" | "footer") => {
    const supabase = createPublicReadClient();
    const { data } = await supabase
      .from("navigation_links")
      .select("*")
      .eq("active", true)
      .eq("position", position)
      .order("sort_order");
    return data || [];
  },
  ["public-nav-links"],
  { revalidate: REVALIDATE }
);

export const getCachedSiteSetting = unstable_cache(
  async (key: string) => {
    const supabase = createPublicReadClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();
    return data?.value ?? null;
  },
  ["public-site-setting"],
  { revalidate: REVALIDATE }
);

export const getCachedTrendArticles = unstable_cache(
  async () => {
    const supabase = createPublicReadClient();
    const { data } = await supabase
      .from("trend_articles")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });
    return data || [];
  },
  ["public-trend-articles"],
  { revalidate: REVALIDATE }
);

export const getCachedSlides = unstable_cache(
  async (type?: "home" | "burclar") => {
    const supabase = createPublicReadClient();
    let query = supabase
      .from("site_slides")
      .select("*")
      .eq("active", true)
      .order("slide_index");
    if (type) query = query.eq("type", type);
    const { data } = await query;
    return data || [];
  },
  ["public-site-slides"],
  { revalidate: REVALIDATE }
);

// Liste kartları için hafif test verisi (soru/sonuç JSON'u hariç).
export const getCachedFunTestsMeta = unstable_cache(
  async () => {
    const supabase = createPublicReadClient();
    const { data } = await supabase
      .from("fun_tests")
      .select("id, slug, title, description, icon")
      .eq("active", true)
      .order("created_at", { ascending: false });
    return (data || []).map((row: any) => ({
      id: row.slug,
      title: row.title,
      description: row.description,
      icon: row.icon || "📝",
    }));
  },
  ["public-fun-tests-meta"],
  { revalidate: REVALIDATE }
);

export const getCachedPublishedPosts = unstable_cache(
  async (): Promise<PostWithTags[]> => {
    const supabase = createPublicReadClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*, blog_post_tags(tag:blog_tags(slug, name))")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return (data || []).map((p: any) => ({ ...p, tags: mapTags(p) }));
  },
  ["public-published-posts"],
  { revalidate: REVALIDATE }
);
