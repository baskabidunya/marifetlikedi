import Link from "next/link";

const BURC_KEYWORDS: { name: string; slug: string }[] = [
  { name: "Koç", slug: "kocburcu" },
  { name: "Boğa", slug: "bogaburcu" },
  { name: "İkizler", slug: "ikizlerburcu" },
  { name: "Yengeç", slug: "yengecburcu" },
  { name: "Aslan", slug: "aslanburcu" },
  { name: "Başak", slug: "basakburcu" },
  { name: "Terazi", slug: "teraziburcu" },
  { name: "Akrep", slug: "akrepburcu" },
  { name: "Yay", slug: "yayburcu" },
  { name: "Oğlak", slug: "oglakburcu" },
  { name: "Kova", slug: "kovaburcu" },
  { name: "Balık", slug: "balikburcu" },
];

const TOOL_KEYWORDS: { keywords: string[]; label: string; href: string; icon: string }[] = [
  { keywords: ["tarot", "kart", "fal"], label: "Tarot Falı Bak", href: "/tarot", icon: "🔮" },
  { keywords: ["doğum haritası", "doğum haritası", "natal"], label: "Doğum Haritası Hesapla", href: "/dogum-haritasi", icon: "🌌" },
  { keywords: ["yükselen"], label: "Yükselen Burç Hesapla", href: "/hesapla/yukselen-burc", icon: "⬆️" },
  { keywords: ["ay burcu", "ay burcu"], label: "Ay Burcu Hesapla", href: "/hesapla/ay-burcu", icon: "🌙" },
  { keywords: ["venüs"], label: "Venüs Burçu Hesapla", href: "/hesapla/venus-burcu", icon: "♀️" },
  { keywords: ["uyum", "sinastri", "uyumluluk"], label: "Burç Uyumu Hesapla", href: "/uyum", icon: "💞" },
  { keywords: ["test", "kişilik"], label: "Eğlenceli Testler", href: "/eglenceli-testler", icon: "🧩" },
  { keywords: ["yeni ay", "dolunay", "ay fazı", "ay takvimi"], label: "Kozmik Takvim", href: "/#celestial-calendar", icon: "📅" },
];

export default function RelatedLinks({ text }: { text: string }) {
  const lower = text.toLocaleLowerCase("tr");

  const burcs = BURC_KEYWORDS.filter((b) => lower.includes(b.name.toLocaleLowerCase("tr")));
  const tools = TOOL_KEYWORDS.filter((t) =>
    t.keywords.some((k) => lower.includes(k.toLocaleLowerCase("tr")))
  );

  if (burcs.length === 0 && tools.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-headline-md text-primary font-headline-md mb-6 flex items-center gap-2">
        <span aria-hidden="true" className="material-symbols-outlined text-lg">link</span>
        İlgili İçerikler
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="glass-card p-5 rounded-2xl text-center hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl mb-2 block">{t.icon}</span>
            <p className="text-label-md font-label-md text-on-surface">{t.label}</p>
          </Link>
        ))}
        {burcs.slice(0, 4).map((b) => (
          <Link
            key={b.slug}
            href={`/burclar/${b.slug}`}
            className="glass-card p-5 rounded-2xl text-center hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl mb-2 block">{b.name}</span>
            <p className="text-label-md font-label-md text-on-surface">{b.name} Burcu</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
