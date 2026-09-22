import Link from "next/link";
import type { Metadata } from "next";
import { ZODIAC_DATA, ZODIAC_SIGNS } from "@/lib/astro-utils";
import AdSlot from "@/components/ads/AdSlot";
import { signSlug } from "@/lib/sign-slugs";
import { SIGN_TRAITS } from "@/lib/astro-narratives";
import { RISING_SIGNS } from "@/lib/astro-interpretations";
import Disclaimer from "@/components/layout/Disclaimer";
import BurclarInteractive from "@/components/burclar/BurclarInteractive";

export const metadata: Metadata = {
  title: "Burçlar - Marifetli Kedi",
  description: "Tüm burçlar hakkında detaylı bilgi, karakter analizi, element dağılımı ve ilişki uyumu.",
  alternates: { canonical: "/burclar" },
};

const ELEMENT_ICONS: Record<string, string> = {
  Ateş: "local_fire_department",
  Toprak: "explore",
  Hava: "air",
  Su: "water_drop",
};

const ELEMENT_COLORS: Record<string, string> = {
  Ateş: "text-tertiary",
  Toprak: "text-secondary",
  Hava: "text-primary",
  Su: "text-blue-400",
};

const ELEMENT_BG: Record<string, string> = {
  Ateş: "bg-tertiary/20",
  Toprak: "bg-secondary/20",
  Hava: "bg-primary/20",
  Su: "bg-blue-400/20",
};

const ZODIAC_HERO: Record<string, { grad: string; symbol: string }> = {
  Koç: { grad: "from-red-700/50 via-red-900/30 to-background", symbol: "♈" },
  Boğa: { grad: "from-emerald-700/50 via-emerald-900/30 to-background", symbol: "♉" },
  İkizler: { grad: "from-amber-600/50 via-amber-800/30 to-background", symbol: "♊" },
  Yengeç: { grad: "from-sky-600/50 via-sky-800/30 to-background", symbol: "♋" },
  Aslan: { grad: "from-orange-600/50 via-orange-800/30 to-background", symbol: "♌" },
  Başak: { grad: "from-stone-600/50 via-stone-800/30 to-background", symbol: "♍" },
  Terazi: { grad: "from-pink-500/50 via-pink-800/30 to-background", symbol: "♎" },
  Akrep: { grad: "from-purple-800/50 via-purple-950/30 to-background", symbol: "♏" },
  Yay: { grad: "from-indigo-600/50 via-indigo-800/30 to-background", symbol: "♐" },
  Oğlak: { grad: "from-gray-700/50 via-gray-900/30 to-background", symbol: "♑" },
  Kova: { grad: "from-cyan-600/50 via-cyan-800/30 to-background", symbol: "♒" },
  Balık: { grad: "from-violet-600/50 via-violet-800/30 to-background", symbol: "♓" },
};

const CARD_RADIALS: Record<string, string> = {
  Koç: "radial-gradient(ellipse at top right, rgba(185,28,28,0.25), transparent 70%)",
  Boğa: "radial-gradient(ellipse at top right, rgba(4,120,87,0.25), transparent 70%)",
  İkizler: "radial-gradient(ellipse at top right, rgba(217,119,6,0.25), transparent 70%)",
  Yengeç: "radial-gradient(ellipse at top right, rgba(2,132,199,0.25), transparent 70%)",
  Aslan: "radial-gradient(ellipse at top right, rgba(234,88,12,0.25), transparent 70%)",
  Başak: "radial-gradient(ellipse at top right, rgba(120,113,108,0.25), transparent 70%)",
  Terazi: "radial-gradient(ellipse at top right, rgba(236,72,153,0.25), transparent 70%)",
  Akrep: "radial-gradient(ellipse at top right, rgba(107,33,168,0.25), transparent 70%)",
  Yay: "radial-gradient(ellipse at top right, rgba(79,70,229,0.25), transparent 70%)",
  Oğlak: "radial-gradient(ellipse at top right, rgba(75,85,99,0.25), transparent 70%)",
  Kova: "radial-gradient(ellipse at top right, rgba(8,145,178,0.25), transparent 70%)",
  Balık: "radial-gradient(ellipse at top right, rgba(91,33,182,0.25), transparent 70%)",
};

const QUALITY_ICONS: Record<string, string> = {
  "Öncü": "keyboard_double_arrow_up",
  "Sabit": "lock",
  "Değişken": "sync_alt",
};

export default function BurclarPage() {
  return (
    <main className="relative min-h-screen bg-background pb-32 top-clear">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,59,215,0.08),transparent_70%)]" />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-4">
        <nav className="flex items-center gap-2 text-caption text-outline mb-4 flex-wrap">
          <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface-variant">Burçlar</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-8">
        <BurclarInteractive />

        {/* Tüm Burçlar Grid - Server-rendered for SEO */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-md text-headline-md flex items-center gap-2">
            <span className="text-primary">✦</span> Tüm Burçlar
          </h2>
          <span className="text-caption text-outline font-label-md">{ZODIAC_SIGNS.length} burç</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter mb-section-gap">
          {ZODIAC_SIGNS.map(sign => {
            const info = ZODIAC_DATA[sign];
            const traits = SIGN_TRAITS[sign];
            const desc = RISING_SIGNS[sign];
            const hero = ZODIAC_HERO[sign];
            return (
              <Link key={sign} href={`/burclar/${signSlug(sign)}`} className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
                <div className={`h-44 relative bg-gradient-to-br ${hero.grad} overflow-hidden`}>
                  <div className="absolute inset-0" style={{ backgroundImage: CARD_RADIALS[sign] }} />
                  <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full ${ELEMENT_BG[info.element]} blur-2xl`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <span className={`material-symbols-outlined text-lg ${ELEMENT_COLORS[info.element]}`}>{ELEMENT_ICONS[info.element]}</span>
                  </div>
                  <div className="absolute bottom-4 left-5">
                    <span className="text-4xl md:text-5xl drop-shadow-lg">{hero.symbol}</span>
                    <h3 className="font-sora font-bold text-headline-sm text-on-background mt-1">{sign}</h3>
                    <p className="text-caption text-outline">{info.dateRange}</p>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-caption font-label-md bg-white/5 border border-white/5 ${ELEMENT_COLORS[info.element]}`}>
                      {info.element}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-caption font-label-md bg-white/5 border border-white/5 text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">{QUALITY_ICONS[info.quality]}</span>
                      {info.quality}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-caption font-label-md bg-white/5 border border-white/5 text-on-surface-variant">
                      {info.ruler}
                    </span>
                  </div>
                  <p className="text-body-md text-on-surface-variant leading-relaxed line-clamp-2">{desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {traits.positive.split(", ").map((w: string) => (
                      <span key={w} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-caption">{w}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Element Dağılımı - Server-rendered for SEO */}
        <section className="mb-section-gap">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface-container-high/60 via-primary/[0.05] to-secondary/[0.05] border border-white/5 p-8 md:p-10">
            <div className="absolute right-[-40px] top-[-40px] opacity-[0.06]">
              <span className="material-symbols-outlined text-[200px] text-primary">explore</span>
            </div>
            <div className="absolute inset-0"
              style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.03 }} />
            <div className="relative z-10">
              <h2 className="font-headline-md text-headline-md flex items-center gap-2 mb-2">
                <span className="text-secondary">✦</span> Element Dağılımı
              </h2>
              <p className="text-on-surface-variant mb-8 font-body-md">Her element üç burcu yönetir, üç farklı nitelikte.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(["Ateş", "Toprak", "Hava", "Su"] as const).map(el => {
                  const elSigns = ZODIAC_SIGNS.filter(s => ZODIAC_DATA[s].element === el);
                  return (
                    <div key={el} className="bg-surface/40 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:bg-surface/60 transition-all">
                      <div className={`flex items-center gap-2 mb-4 ${ELEMENT_COLORS[el]}`}>
                        <div className={`w-10 h-10 rounded-xl ${ELEMENT_BG[el]} flex items-center justify-center`}>
                          <span className="material-symbols-outlined">{ELEMENT_ICONS[el]}</span>
                        </div>
                        <span className="font-label-md text-headline-sm">{el}</span>
                      </div>
                      <div className="space-y-3">
                        {elSigns.map(s => (
                          <div key={s} className="flex items-center gap-3">
                            <span className="text-2xl w-8 text-center">{ZODIAC_DATA[s].emoji}</span>
                            <div>
                              <div className="font-label-md text-sm text-on-surface">{s}</div>
                              <div className="text-caption text-outline">{ZODIAC_DATA[s].quality} · {ZODIAC_DATA[s].ruler}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <AdSlot
          name="blog_listing"
          className="my-section-gap max-w-7xl mx-auto"
        />
      </div>
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pb-16">
        <Disclaimer variant="box" />
      </div>
    </main>
  );
}
