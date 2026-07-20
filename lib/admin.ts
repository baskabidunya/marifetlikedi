"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris?from=/admin");
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();
  if (!profile || profile.role !== "admin") redirect("/");
  return user;
}

// ── Sign Content ──

export async function getSignContent() {
  const supabase = await createClient();
  const { data } = await supabase.from("sign_content").select("*").order("sign");
  return data || [];
}

export async function getSignContentBySign(sign: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sign_content").select("*").eq("sign", sign).single();
  return data || null;
}

export async function updateSignContent(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const sign = formData.get("sign") as string;
  const description = formData.get("description") as string;
  const daily_prophecy = formData.get("daily_prophecy") as string;
  const lucky_color = formData.get("lucky_color") as string;
  const lucky_stone = formData.get("lucky_stone") as string;
  const lucky_activity = formData.get("lucky_activity") as string;
  const hero_image = formData.get("hero_image") as string;

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("sign_content").upsert({
    sign, description, daily_prophecy,
    lucky_color, lucky_stone, lucky_activity, hero_image,
    updated_by: user?.id,
    updated_at: new Date().toISOString(),
  }, { onConflict: "sign" });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/burclar");
  revalidatePath(`/burclar/${sign}`);
}

// ── Dashboard Stats ──

export async function getDashboardStats() {
  const supabase = await createClient();

  const { count: totalUsers } = await supabase
    .from("user_profiles").select("*", { count: "exact", head: true });

  const { count: totalPartners } = await supabase
    .from("partner_profiles").select("*", { count: "exact", head: true });

  const { data: signContent } = await supabase
    .from("sign_content").select("sign");

  const { count: blogCount } = await supabase
    .from("blog_posts").select("*", { count: "exact", head: true });

  const filledSigns = signContent?.filter(s =>
    s.sign?.length > 0
  ).length || 0;

  return { totalUsers, totalPartners, filledSigns, blogCount: blogCount || 0 };
}

// ── User Management ──

export async function getUsers() {
  const supabase = await createClient();
  const { data: profiles } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false });
  return (profiles || []).map(p => ({
    id: p.user_id,
    email: p.email || p.display_name || p.user_id.slice(0, 8),
    created_at: p.created_at,
    last_sign_in_at: null,
    display_name: p.display_name,
    role: p.role || "user",
    sun_sign: p.sun_sign,
  }));
}

export async function setUserRole(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const userId = formData.get("user_id") as string;
  const role = formData.get("role") as string;
  if (role !== "user" && role !== "admin") throw new Error("Invalid role");
  const { error } = await supabase
    .from("user_profiles")
    .update({ role })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/kullanicilar");
}

export async function deleteUser(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const userId = formData.get("user_id") as string;
  const { error } = await supabase
    .from("user_profiles")
    .update({ role: "user", display_name: null, sun_sign: null, birth_date: null, birth_time: null, birth_place: null })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/kullanicilar");
}

// ── Partners ──

export async function getPartners() {
  const supabase = await createClient();
  const { data } = await supabase.from("partner_profiles").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("partner_profiles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/partnerler");
}

// ── Site Settings ──

export async function getSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  const map: Record<string, string> = {};
  (data || []).forEach(s => { map[s.key] = s.value; });
  return map;
}

export async function updateSetting(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("site_settings").upsert({
    key, value, updated_by: user?.id, updated_at: new Date().toISOString(),
  }, { onConflict: "key" });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/ayarlar");
}

// ── Blog ──

export async function getBlogPosts() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getBlogPost(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  return data;
}

export async function saveBlogPost(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const cover_image = formData.get("cover_image") as string;
  const category = formData.get("category") as string;
  const published = formData.get("published") === "true";
  const author_name = formData.get("author_name") as string;
  const tagIds = formData.getAll("tags") as string[];
  const { data: { user } } = await supabase.auth.getUser();

  let postId = id;

  if (id) {
    const { error } = await supabase.from("blog_posts").update({
      title, slug, excerpt, content, cover_image, category, published, author_name,
      updated_at: new Date().toISOString(), updated_by: user?.id,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase.from("blog_posts").insert({
      title, slug, excerpt, content, cover_image, category, published, author_name,
      updated_by: user?.id,
    }).select("id").single();
    if (error) throw new Error(error.message);
    postId = data.id;
  }

  // Handle tags
  if (postId) {
    await supabase.from("blog_post_tags").delete().eq("post_id", postId);
    if (tagIds.length > 0) {
      const tagRows = tagIds.map(tagId => ({ post_id: postId, tag_id: tagId }));
      const { error: tagError } = await supabase.from("blog_post_tags").insert(tagRows);
      if (tagError) throw new Error(tagError.message);
    }
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

// ── Slider ──

export async function getSlides(type?: "home" | "burclar") {
  await requireAdmin();
  const supabase = await createClient();
  let query = supabase.from("site_slides").select("*").order("slide_index");
  if (type) query = query.eq("type", type);
  const { data } = await query;
  return data || [];
}

export async function saveSlide(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const type = formData.get("type") as string || "burclar";
  const slide_index = parseInt(formData.get("slide_index") as string) || 0;
  const sign = formData.get("sign") as string || null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image_url = formData.get("image_url") as string;
  const active = formData.get("active") === "true";
  const heading1 = formData.get("heading1") as string || "";
  const heading2 = formData.get("heading2") as string || "";
  const button1_text = formData.get("button1_text") as string || "";
  const button2_text = formData.get("button2_text") as string || "";
  const button1_link = formData.get("button1_link") as string || "";
  const button2_link = formData.get("button2_link") as string || "";

  if (id) {
    const { error } = await supabase.from("site_slides").update({
      type, slide_index, sign, title, description, image_url, active,
      heading1, heading2, button1_text, button2_text, button1_link, button2_link,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("site_slides").insert({
      type, slide_index, sign, title, description, image_url, active,
      heading1, heading2, button1_text, button2_text, button1_link, button2_link,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/slider");
  revalidatePath("/burclar");
  revalidatePath("/");
}

export async function deleteSlide(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("site_slides").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/slider");
  revalidatePath("/burclar");
  revalidatePath("/");
}

// ── FAQ ──

export async function getFaqItems() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("faq").select("*").order("sort_order");
  return data || [];
}

export async function saveFaqItem(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "true";

  if (id) {
    const { error } = await supabase.from("faq").update({
      question, answer, sort_order, active, updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("faq").insert({ question, answer, sort_order, active });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/sss");
}

export async function deleteFaqItem(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("faq").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/sss");
}

// ── Pages ──

export async function getPages() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("pages").select("*").order("title");
  return data || [];
}

export async function getPageBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("pages").select("*").eq("slug", slug).eq("published", true).single();
  return data;
}

export async function savePage(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const meta_title = formData.get("meta_title") as string || "";
  const meta_description = formData.get("meta_description") as string || "";
  const published = formData.get("published") === "true";
  const { data: { user } } = await supabase.auth.getUser();

  if (id) {
    const { error } = await supabase.from("pages").update({
      title, slug, content, meta_title, meta_description, published,
      updated_at: new Date().toISOString(), updated_by: user?.id,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("pages").insert({
      title, slug, content, meta_title, meta_description, published, updated_by: user?.id,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/sayfalar");
  revalidatePath(`/${slug}`);
}

export async function deletePage(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/sayfalar");
}

// ── Announcements ──

export async function getAnnouncements() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
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

export async function saveAnnouncement(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const type = formData.get("type") as string || "info";
  const link = formData.get("link") as string || "";
  const active = formData.get("active") === "true";
  const startRaw = formData.get("start_date") as string;
  const endRaw = formData.get("end_date") as string;
  const start_date = startRaw ? new Date(startRaw).toISOString() : new Date().toISOString();
  const end_date = endRaw ? new Date(endRaw).toISOString() : null;

  if (id) {
    const { error } = await supabase.from("announcements").update({
      title, message, type, link, active, start_date, end_date,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("announcements").insert({
      title, message, type, link, active, start_date, end_date,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/duyurular");
}

export async function deleteAnnouncement(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/duyurular");
}

export async function toggleAnnouncementActive(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const currentActive = formData.get("active") === "true";
  const { error } = await supabase
    .from("announcements")
    .update({ active: !currentActive })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/duyurular");
}

// ── Newsletter ──

export async function getNewsletterSubscribers() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false });
  return data || [];
}

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string || "";
  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").upsert(
    { email, name, active: true, subscribed_at: new Date().toISOString() },
    { onConflict: "email" }
  );
  if (error) throw new Error(error.message);
}

export async function toggleSubscriber(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const active = formData.get("active") === "true";
  const { error } = await supabase.from("newsletter_subscribers").update({
    active, unsubscribed_at: active ? null : new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/newsletter");
}

export async function deleteSubscriber(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/newsletter");
}

// ── Blog Categories ──

export async function getBlogCategories() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("blog_categories").select("*").order("sort_order");
  return data || [];
}

export async function getActiveBlogCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_categories").select("*").eq("active", true).order("sort_order");
  return data || [];
}

export async function saveBlogCategory(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string || "";
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "true";

  if (id) {
    const { error } = await supabase.from("blog_categories").update({
      name, slug, description, sort_order, active,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_categories").insert({ name, slug, description, sort_order, active });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/blog/kategoriler");
}

export async function deleteBlogCategory(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("blog_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog/kategoriler");
}

// ── Blog Tags ──

export async function getBlogTags() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("blog_tags").select("*").order("name");
  return data || [];
}

export async function saveBlogTag(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (id) {
    const { error } = await supabase.from("blog_tags").update({ name, slug }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_tags").insert({ name, slug });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/blog/etiketler");
}

export async function deleteBlogTag(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("blog_tags").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog/etiketler");
}

// ── Navigation Links ──

export async function getNavigationLinks() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("navigation_links").select("*").order("position").order("sort_order");
  return data || [];
}

export async function getPublicNavLinks(position: "header" | "footer") {
  const supabase = await createClient();
  const { data } = await supabase.from("navigation_links")
    .select("*").eq("active", true).eq("position", position).order("sort_order");
  return data || [];
}

export async function saveNavLink(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const label = formData.get("label") as string;
  const url = formData.get("url") as string;
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "true";
  const position = formData.get("position") as string || "header";

  if (id) {
    const { error } = await supabase.from("navigation_links").update({
      label, url, sort_order, active, position,
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("navigation_links").insert({ label, url, sort_order, active, position });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/menu");
}

export async function deleteNavLink(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("navigation_links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/menu");
}

// ── Tarot Cards ──

export async function getTarotCards() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("tarot_cards").select("*").order("sort_order");
  return data || [];
}

export async function getPublicTarotCards() {
  const supabase = await createClient();
  const { data } = await supabase.from("tarot_cards").select("*").eq("active", true).order("sort_order");
  return data || [];
}

export async function saveTarotCard(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const number = parseInt(formData.get("number") as string) || 0;
  const arcana = formData.get("arcana") as string || "major";
  const image_url = formData.get("image_url") as string || "";
  const upright_meaning = formData.get("upright_meaning") as string || "";
  const reversed_meaning = formData.get("reversed_meaning") as string || "";
  const description = formData.get("description") as string || "";
  const icon = formData.get("icon") as string || "auto_awesome";
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "true";

  if (id) {
    const { error } = await supabase.from("tarot_cards").update({
      name, number, arcana, image_url, upright_meaning, reversed_meaning, description, icon, sort_order, active,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("tarot_cards").insert({
      name, number, arcana, image_url, upright_meaning, reversed_meaning, description, icon, sort_order, active,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/tarot");
}

export async function deleteTarotCard(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("tarot_cards").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tarot");
}

// ── Trend Articles ──

function slugifyTrend(input: string): string {
  const map: Record<string, string> = { ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g", ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c" };
  return input
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getTrendArticles() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("trend_articles").select("*").order("sort_order");
  return data || [];
}

export async function saveTrendArticle(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugifyTrend(title);
  const tag = formData.get("tag") as string || "";
  const tag_color = formData.get("tag_color") as string || "text-tertiary";
  const excerpt = formData.get("excerpt") as string || "";
  const content = formData.get("content") as string || "";
  const cover_image = formData.get("cover_image") as string || "";
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "true";

  if (id) {
    const { error } = await supabase.from("trend_articles").update({
      title, slug, tag, tag_color, excerpt, content, cover_image, sort_order, active,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("trend_articles").insert({
      title, slug, tag, tag_color, excerpt, content, cover_image, sort_order, active,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/trend");
  revalidatePath("/trend");
}

export async function deleteTrendArticle(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("trend_articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/trend");
}

// ── Testimonials ──

export async function getTestimonials() {
  await requireAdmin();
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getApprovedTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("approved", true).order("created_at", { ascending: false });
  return data || [];
}

export async function saveTestimonial(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const name = formData.get("name") as string;
  const title = formData.get("title") as string || "";
  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string) || 5;

  const { error } = await supabase.from("testimonials").insert({
    user_id: user?.id, name, title, content, rating,
  });
  if (error) throw new Error(error.message);
}

export async function approveTestimonial(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const approved = formData.get("approved") === "true";
  const { error } = await supabase.from("testimonials").update({ approved }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/yorumlar");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/yorumlar");
}
