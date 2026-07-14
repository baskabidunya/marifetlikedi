import Link from "next/link";
import { getDashboardStats } from "@/lib/admin";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: "Kullanıcı", value: stats.totalUsers, icon: "group", color: "text-primary" },
    { label: "Blog Yazısı", value: stats.blogCount, icon: "article", color: "text-secondary" },
    { label: "Burç İçerik", value: `${stats.filledSigns}/12`, icon: "auto_awesome", color: "text-tertiary" },
    { label: "Partner", value: stats.totalPartners, icon: "favorite", color: "text-tertiary" },
  ];

  const actions = [
    { href: "/admin/burclar", label: "Burç İçerikleri", icon: "auto_awesome" },
    { href: "/admin/slider", label: "Slider", icon: "slideshow" },
    { href: "/admin/blog", label: "Blog", icon: "article" },
    { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "group" },
    { href: "/admin/ayarlar", label: "Ayarlar", icon: "settings" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map(s => (
          <div key={s.label} className="bg-surface-container/60 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className={`material-symbols-outlined text-xl ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className="text-headline-sm font-headline-sm text-on-surface">{s.value}</p>
              <p className="text-caption text-outline">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div>
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Hızlı Erişim</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {actions.map(a => (
            <Link key={a.href} href={a.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container/40 hover:bg-primary/10 border border-white/5 hover:border-primary/20 transition-all group">
              <span className="material-symbols-outlined text-xl text-on-surface-variant group-hover:text-primary transition-colors">{a.icon}</span>
              <span className="text-label-md font-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">{a.label}</span>
              <span className="material-symbols-outlined text-sm text-outline ml-auto opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
