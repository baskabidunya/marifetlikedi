import Link from "next/link";

const categories = [
  { label: "Keşfet", icon: "auto_fix_high", href: "/blog" },
  { label: "Gündemde", icon: "flare", href: "/trend" },
  { label: "Çok Konuşulanlar", icon: "cyclone", href: "/blog" },
  { label: "Göz At", icon: "eye_tracking", href: "/blog" },
  { label: "Editörün Seçtikleri", icon: "workspace_premium", href: "/blog" },
  { label: "Senin İçin Seçtik", icon: "favorite", href: "/blog" },
  { label: "Kaçırma", icon: "alarm_on", href: "/trend" },
  { label: "Trendler", icon: "bolt", href: "/trend" },
];

export default function CategoryNav() {
  return (
    <nav className="w-full bg-surface-container-low/50 border-t border-white/5 overflow-x-auto py-3">
      <div className="flex items-center gap-2 px-container-padding-mobile md:px-container-padding-desktop min-w-max">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all duration-300 whitespace-nowrap backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
            <span className="font-label-md text-sm">{cat.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
