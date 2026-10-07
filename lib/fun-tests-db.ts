import { createClient } from "@/lib/supabase/server";
import type { FunTest } from "@/lib/fun-tests";

interface DbFunTest {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  questions: string;
  results: string;
  active: boolean;
  sort_order: number;
}

function rowToTest(row: DbFunTest): FunTest {
  const questions = typeof row.questions === "string" ? JSON.parse(row.questions) : row.questions;
  const results = typeof row.results === "string" ? JSON.parse(row.results) : row.results;
  return {
    id: row.slug,
    title: row.title,
    description: row.description,
    icon: row.icon || "📝",
    questions,
    results,
  };
}

export async function getFunTests(): Promise<FunTest[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("fun_tests")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });
  if (!data) return [];
  return data.map(rowToTest);
}

export async function getFunTestBySlug(slug: string): Promise<FunTest | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("fun_tests")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  if (!data) return null;
  return rowToTest(data as unknown as DbFunTest);
}
