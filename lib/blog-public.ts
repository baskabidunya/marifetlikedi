"use server";

import { createClient } from "@/lib/supabase/server";

export interface BlogTag {
  slug: string;
  name: string;
}

export type PostWithTags = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  author_name: string | null;
  created_at: string;
  updated_at: string | null;
  tags: BlogTag[];
};

function mapTags(post: any): BlogTag[] {
  const rows = post?.blog_post_tags || [];
  return rows
    .map((r: any) => r.tag)
    .filter(Boolean)
    .map((t: any) => ({ slug: t.slug, name: t.name }));
}

export async function getPublishedPosts(): Promise<PostWithTags[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*, blog_post_tags(tag:blog_tags(slug, name))")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data || []).map((p: any) => ({ ...p, tags: mapTags(p) }));
}

export async function getPublishedPostBySlug(slug: string): Promise<PostWithTags | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*, blog_post_tags(tag:blog_tags(slug, name))")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (!data) return null;
  return { ...data, tags: mapTags(data) };
}
