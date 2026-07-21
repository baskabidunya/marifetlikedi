"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris");
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();
  if (profile?.role !== "admin") redirect("/");
}

export async function getFunTests() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("fun_tests")
    .select("*")
    .order("sort_order")
    .order("title");
  return data || [];
}

export async function saveFunTest(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();

  const id = formData.get("id") as string;
  const slug = (formData.get("slug") as string).trim();
  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const icon = (formData.get("icon") as string).trim() || "📝";
  const sort_order = parseInt(formData.get("sort_order") as string) || 0;
  const active = formData.get("active") === "on";

  let questions: string = formData.get("questions") as string;
  let results: string = formData.get("results") as string;

  if (questions && typeof questions === "string") {
    try { JSON.parse(questions); } catch { questions = "[]"; }
  } else {
    questions = "[]";
  }
  if (results && typeof results === "string") {
    try { JSON.parse(results); } catch { results = "[]"; }
  } else {
    results = "[]";
  }

  const payload: Record<string, unknown> = {
    slug, title, description, icon,
    questions: JSON.parse(questions),
    results: JSON.parse(results),
    sort_order, active,
  };

  if (id) {
    await supabase.from("fun_tests").update(payload).eq("id", id);
  } else {
    await supabase.from("fun_tests").insert(payload);
  }

  revalidatePath("/admin/eglenceli-testler");
  revalidatePath("/eglenceli-testler");
}

export async function deleteFunTest(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();
  const id = formData.get("id") as string;
  if (!id) return;
  await supabase.from("fun_tests").delete().eq("id", id);
  revalidatePath("/admin/eglenceli-testler");
  revalidatePath("/eglenceli-testler");
}

export async function getFunTestById(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase.from("fun_tests").select("*").eq("id", id).single();
  return data;
}
