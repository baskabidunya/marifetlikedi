import Link from "next/link";

export type CalendarTab = "gunluk" | "ay" | "retro" | "yeni-ay";

const TABS: { id: CalendarTab; label: string; href: string }[] = [
  { id: "gunluk", label: "Günlük Rehber", href: "/gunluk-burc-yorumu" },
  { id: "ay", label: "Ay Takvimi", href: "/ay-takvimi" },
  { id: "retro", label: "Retro Takvimi", href: "/retro-takvimi" },
  { id: "yeni-ay", label: "Yeni Ay & Dolunay", href: "/yeni-ay-dolunay-takvimi" },
];

export default function CalendarTabs({ active }: { active: CalendarTab }) {
  return (
    <nav className="flex flex-wrap gap-2 mb-8" aria-label="Takvim sayfaları">
      {TABS.map((t) =>
        t.id === active ? (
          <span
            key={t.id}
            aria-current="page"
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-label-md font-bold"
          >
            {t.label}
          </span>
        ) : (
          <Link
            key={t.id}
            href={t.href}
            className="px-4 py-2 rounded-xl glass text-on-surface-variant hover:text-on-surface border border-on-surface/10 text-label-md transition-all"
          >
            {t.label}
          </Link>
        )
      )}
    </nav>
  );
}
