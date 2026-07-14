"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "grid_view" },
  { href: "/admin/burclar", label: "Burç İçerikleri", icon: "auto_awesome" },
  { href: "/admin/slider", label: "Slider", icon: "slideshow" },
  { href: "/admin/blog", label: "Blog", icon: "article" },
  { href: "/admin/blog/kategoriler", label: "Kategori & Etiket", icon: "label" },
  { href: "/admin/blog/etiketler", label: "Etiketler", icon: "sell" },
  { href: "/admin/tarot", label: "Tarot Kartları", icon: "style" },
  { href: "/admin/trend", label: "Trend İçerikler", icon: "trending_up" },
  { href: "/admin/sss", label: "SSS", icon: "help" },
  { href: "/admin/sayfalar", label: "Sayfalar", icon: "description" },
  { href: "/admin/duyurular", label: "Duyurular", icon: "campaign" },
  { href: "/admin/partnerler", label: "Partnerler", icon: "favorite" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "group" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
  { href: "/admin/yorumlar", label: "Yorumlar", icon: "rate_review" },
  { href: "/admin/menu", label: "Menü & Footer", icon: "menu" },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: "settings" },
];

export default function AdminSidebar({ displayName }: { displayName: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-surface-container p-2.5 rounded-xl border border-white/10 shadow-lg">
        <span className="material-symbols-outlined text-on-surface">{mobileOpen ? "close" : "menu"}</span>
      </button>

      {/* Overlay on mobile */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden" />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-surface-container border-r border-white/10 flex flex-col transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
          </div>
          <div>
            <Link href="/admin" className="font-sora font-bold text-headline-md text-primary">Admin</Link>
            <p className="text-caption text-outline -mt-0.5">Yönetim Paneli</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_LINKS.map(l => {
            const isActive = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-label-md font-label-md transition-all ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                }`}>
                <span className="material-symbols-outlined text-[20px]">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-on-surface">account_circle</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label-md font-label-md text-on-surface truncate">{displayName}</p>
            </div>
          </div>
          <Link href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-label-md font-label-md text-outline hover:bg-white/5 hover:text-on-surface transition-all mt-1">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Siteye Dön
          </Link>
        </div>
      </aside>
    </>
  );
}
