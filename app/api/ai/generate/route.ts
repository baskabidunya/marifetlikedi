import { NextRequest, NextResponse } from "next/server";
import { generateContent } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type, topic } = await req.json();

  if (!type || !topic) {
    return NextResponse.json({ error: "type ve topic gerekli" }, { status: 400 });
  }

  if (!["blog", "trend", "announcement", "burc"].includes(type)) {
    return NextResponse.json({ error: "Geçersiz type" }, { status: 400 });
  }

  try {
    const result = await generateContent(type, topic);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "AI hatası" }, { status: 500 });
  }
}
