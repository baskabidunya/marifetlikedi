import Link from "next/link";
import { getPublicNavLinks, getSiteSetting } from "@/lib/public-queries";
import { createClient } from "@/lib/supabase/server";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const navLinks = await getPublicNavLinks("header");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const logo = await getSiteSetting("site_logo");

  return (
    <header className="bg-surface-container/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-background/50">
      <nav className="flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-20 max-w-7xl mx-auto">
        <div className="cursor-pointer">
          <Link href="/">
            {logo ? (
              <img src={logo} alt="Marifetli Kedi" className="h-12 w-auto object-contain" />
            ) : (
              <span className="text-headline-sm md:text-headline-md tracking-tight text-primary">
                Marifetli Kedi
              </span>
            )}
          </Link>
        </div>
        <HeaderNav
          links={[
            ...navLinks,
            {
              id: "eglenceli-testler",
              title: "Eğlenceli Testler",
              url: "/eglenceli-testler",
              position: "header",
              sort_order: 99,
              active: true,
            },
          ]}
          isLoggedIn={!!user}
        />
        <div className="flex items-center gap-3 md:gap-6">
          {user ? (
            <Link
              href="/profil"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-full text-on-primary font-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-lg">account_circle</span>
              Profil
            </Link>
          ) : (
            <>
              <Link
                href="/giris"
                className="hidden md:flex px-5 py-2.5 rounded-full text-on-surface-variant border border-white/15 hover:border-primary/40 font-label-md hover:bg-white/5 transition-all"
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                className="hidden md:flex bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-full text-on-primary font-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Kaydol
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
