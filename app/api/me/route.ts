import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Header'daki oturum durumu için hafif uç: tarayıcıya supabase-js
// bindirmeyi gerektirmez (public sayfalarda kritik JS zinciri küçülür).
export async function GET() {
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.getAll().some((c) => c.name.includes("auth-token"));
  if (!hasAuthCookie) {
    return Response.json({ loggedIn: false });
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return Response.json({ loggedIn: !!user });
  } catch {
    return Response.json({ loggedIn: false });
  }
}
