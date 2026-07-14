import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/giris?from=/admin");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role, display_name")
    .eq("user_id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar displayName={profile.display_name || user.email || ""} />
      <main className="flex-1 min-h-screen">
        <div className="px-4 md:px-5 pt-4 md:pt-5">
          {children}
        </div>
      </main>
    </div>
  );
}
