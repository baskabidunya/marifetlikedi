import Link from "next/link";

const categories = [
  { label: "Keşfet", icon: "auto_fix_high", href: "/kesfet" },
  { label: "Gündemde", icon: "flare", href: "/gundemde" },
  { label: "Çok Konuşulanlar", icon: "cyclone", href: "/cok-konusulanlar" },
  { label: "Göz At", icon: "eye_tracking", href: "/goz-at" },
  { label: "Editörün Seçtikleri", icon: "workspace_premium", href: "/editor-secimi" },
  { label: "Senin İçin Seçtik", icon: "favorite", href: "/senin-icin" },
  { label: "Kaçırma", icon: "alarm_on", href: "/kacirma" },
  { label: "Trendler", icon: "bolt", href: "/trendler" },
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
