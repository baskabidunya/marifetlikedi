import Link from "next/link";
import { getPublicNavLinks } from "@/lib/public-queries";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const navLinks = await getPublicNavLinks("header");

  return (
    <header className="bg-surface-container/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-background/50">
      <nav className="flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-20 max-w-7xl mx-auto">
        <div className="text-headline-sm md:text-headline-md tracking-tight text-primary cursor-pointer">
          <Link href="/">Marifetli Kedi</Link>
        </div>
        <HeaderNav links={navLinks} />
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href="/burclar"
            className="hidden md:flex bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-full text-on-primary font-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Burcunu Keşfet
          </Link>
          <Link href="/profil">
            <span className="material-symbols-outlined text-on-surface cursor-pointer text-2xl hover:bg-white/5 p-2 rounded-full transition-all">
              account_circle
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
