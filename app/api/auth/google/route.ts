import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
    },
  });

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect("/giris?error=OAuth başlatılamadı");
}
