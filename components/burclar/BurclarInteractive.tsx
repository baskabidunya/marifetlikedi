"use client";

import { useState, useEffect, useCallback } from "react";
import { ZODIAC_DATA, ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astro-utils";
import { getActiveSlides } from "@/lib/slides-public";

type Slide = { id: string; sign: string; title: string; description: string; image_url: string; slide_index: number; active: boolean };

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

const ELEMENT_COMPAT: Record<string, Record<string, number>> = {
  Ateş: { Ateş: 8, Toprak: 3, Hava: 7, Su: 4 },
  Toprak: { Ateş: 3, Toprak: 8, Hava: 4, Su: 7 },
  Hava: { Ateş: 7, Toprak: 4, Hava: 8, Su: 3 },
  Su: { Ateş: 4, Toprak: 7, Hava: 3, Su: 8 },
};

const QUALITY_COMPAT: Record<string, Record<string, number>> = {
  "Öncü": { "Öncü": 5, "Sabit": 4, "Değişken": 6 },
  "Sabit": { "Öncü": 4, "Sabit": 7, "Değişken": 4 },
  "Değişken": { "Öncü": 6, "Sabit": 4, "Değişken": 7 },
};

const ELEMENT_COLORS: Record<string, string> = {
  Ateş: "text-tertiary",
  Toprak: "text-secondary",
  Hava: "text-primary",
  Su: "text-blue-400",
};

const ELEMENT_ICONS: Record<string, string> = {
  Ateş: "local_fire_department",
  Toprak: "explore",
  Hava: "air",
  Su: "water_drop",
};

function getCompatScore(s1: string, s2: string): { score: number; label: string; note: string } {
  const e1 = ZODIAC_DATA[s1 as keyof typeof ZODIAC_DATA]?.element;
  const e2 = ZODIAC_DATA[s2 as keyof typeof ZODIAC_DATA]?.element;
  const q1 = ZODIAC_DATA[s1 as keyof typeof ZODIAC_DATA]?.quality;
  const q2 = ZODIAC_DATA[s2 as keyof typeof ZODIAC_DATA]?.quality;
  if (!e1 || !e2 || !q1 || !q2) return { score: 50, label: "Orta", note: "Yeterli veri bulunamadı." };
  const elScore = ELEMENT_COMPAT[e1]?.[e2] ?? 5;
  const qScore = QUALITY_COMPAT[q1]?.[q2] ?? 5;
  const raw = Math.round(((elScore + qScore) / 16) * 100);
  const score = Math.min(100, Math.max(10, raw));
  const label = score >= 85 ? "Mükemmel" : score >= 70 ? "Yüksek" : score >= 50 ? "Orta" : score >= 30 ? "Düşük" : "Zorlayıcı";
  const notes: Record<string, string> = {
    Mükemmel: "Bu iki burç arasında doğal bir çekim var. Elementler ve nitelikler mükemmel uyum sağlıyor.",
    Yüksek: "Güçlü bir uyum söz konusu. Küçük farklılıklar ilişkiye renk katabilir.",
    Orta: "Dengeli bir uyum. Bazı konularda anlaşmak zor olabilir ama emek verilirse güzel bir ilişki kurulabilir.",
    Düşük: "Zıt kutupların çekimi var ama anlaşmak için çaba gerekiyor. Farklılıklarınızı zenginlik olarak görebilirseniz işe yarayabilir.",
    Zorlayıcı: "Bu iki burcun enerjileri oldukça farklı. İlişkinin yürümesi için çok fazla anlayış ve fedakarlık gerekebilir.",
  };
  return { score, label, note: notes[label] || notes["Orta"] };
}

export default function BurclarInteractive() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [sign1, setSign1] = useState(ZODIAC_SIGNS[0]);
  const [sign2, setSign2] = useState(ZODIAC_SIGNS[1]);
  const compat = getCompatScore(sign1, sign2);

  useEffect(() => {
    getActiveSlides("burclar").then(s => setSlides(s));
  }, []);

  const nextSlide = useCallback(() => setSlideIdx(i => (i + 1) % Math.max(slides.length, 1)), [slides.length]);
  const prevSlide = useCallback(() => setSlideIdx(i => (i - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1)), [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide, slides.length]);

  const slide = slides[slideIdx] || { sign: "", title: "", description: "", image_url: "" };

  return (
    <>
      {/* News Slider */}
      <section className="relative mb-section-gap rounded-[32px] overflow-hidden min-h-[360px] md:min-h-[420px] flex items-end glass-card group">
        <div className="absolute inset-0 transition-all duration-700"
          style={{ backgroundImage: `url(${slide.image_url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className={`absolute inset-0 bg-gradient-to-br ${ZODIAC_HERO[slide.sign]?.grad || "from-primary/40 to-secondary/40"} mix-blend-multiply transition-all duration-700`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className={`absolute top-8 right-8 text-[160px] md:text-[200px] leading-none opacity-[0.06] pointer-events-none select-none transition-all duration-700`}>
          {ZODIAC_HERO[slide.sign]?.symbol || "✦"}
        </div>
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(208,188,255,0.06), transparent 50%)" }} />
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-on-surface-variant">
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-on-surface-variant">
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>
        <div className="relative z-10 p-8 md:p-12 w-full">
          <span className="px-4 py-1.5 rounded-full bg-tertiary/20 text-tertiary font-label-md text-xs uppercase tracking-widest mb-4 inline-block backdrop-blur-md border border-tertiary/20">
            ✦ {slide.sign} Burcu — Gündemde
          </span>
          <div className="max-w-3xl">
            <h2 className="font-sora font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">{slide.title}</h2>
            <p className="text-on-surface-variant text-body-lg leading-relaxed">{slide.description}</p>
          </div>
          <div className="flex gap-2 mt-6">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlideIdx(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === slideIdx ? "bg-tertiary w-6" : "bg-white/20 hover:bg-white/40"
                }`} />
            ))}
          </div>
        </div>
      </section>

      {/* İlişki Laboratuvarı */}
      <section className="mb-section-gap">
        <div className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-10">
          <div className="absolute right-[-30px] bottom-[-30px] opacity-[0.05]">
            <span className="material-symbols-outlined text-[180px] text-secondary">favorite</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-secondary">favorite</span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">İlişki Laboratuvarı</h2>
                <p className="text-caption text-outline">İki burç seç, aranızdaki kozmik uyumu keşfet</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <div>
                  <label className="font-label-md text-sm text-on-surface-variant mb-2 block">Birinci Burç</label>
                  <div className="relative">
                    <select value={sign1} onChange={e => setSign1(e.target.value as ZodiacSign)}
                      className="w-full appearance-none bg-surface-container border border-white/10 rounded-2xl px-5 py-4 text-on-surface font-label-md focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer">
                      {ZODIAC_SIGNS.map(s => (
                        <option key={s} value={s}>{ZODIAC_DATA[s].emoji} {s} — {ZODIAC_DATA[s].element}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-sm text-on-surface-variant mb-2 block">İkinci Burç</label>
                  <div className="relative">
                    <select value={sign2} onChange={e => setSign2(e.target.value as ZodiacSign)}
                      className="w-full appearance-none bg-surface-container border border-white/10 rounded-2xl px-5 py-4 text-on-surface font-label-md focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer">
                      {ZODIAC_SIGNS.map(s => (
                        <option key={s} value={s}>{ZODIAC_DATA[s].emoji} {s} — {ZODIAC_DATA[s].element}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none material-symbols-outlined">expand_more</span>
                  </div>
                </div>

                <div className="flex flex-col items-center py-4">
                  <div className="relative w-28 h-28 md:w-32 md:h-32">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#compatGrad)" strokeWidth="6"
                        strokeDasharray={`${(compat.score / 100) * 326.7} 326.7`} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="compatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(208,188,255)" />
                          <stop offset="100%" stopColor="rgb(251,171,255)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-sora font-bold text-headline-md text-on-background">{compat.score}%</span>
                      <span className="text-caption text-outline font-label-md">{compat.label}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container/50 rounded-2xl border border-white/5 p-6 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{ZODIAC_DATA[sign1].emoji}</span>
                      <div>
                        <div className="font-sora font-bold text-headline-sm text-on-background">{sign1}</div>
                        <div className="text-caption text-outline">{ZODIAC_DATA[sign1].element}</div>
                      </div>
                    </div>
                    <span className="text-2xl text-secondary font-sora font-bold">×</span>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{ZODIAC_DATA[sign2].emoji}</span>
                      <div>
                        <div className="font-sora font-bold text-headline-sm text-on-background">{sign2}</div>
                        <div className="text-caption text-outline">{ZODIAC_DATA[sign2].element}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm" style={{ color: ELEMENT_COLORS[ZODIAC_DATA[sign1].element].replace("text-", "") }}>
                        {ELEMENT_ICONS[ZODIAC_DATA[sign1].element]}
                      </span>
                      <span className="text-caption text-on-surface-variant">{ZODIAC_DATA[sign1].element}</span>
                      <span className="text-outline">×</span>
                      <span className="material-symbols-outlined text-sm" style={{ color: ELEMENT_COLORS[ZODIAC_DATA[sign2].element].replace("text-", "") }}>
                        {ELEMENT_ICONS[ZODIAC_DATA[sign2].element]}
                      </span>
                      <span className="text-caption text-on-surface-variant">{ZODIAC_DATA[sign2].element}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-outline">diamond</span>
                      <span className="text-caption text-on-surface-variant">{ZODIAC_DATA[sign1].quality}</span>
                      <span className="text-outline">×</span>
                      <span className="material-symbols-outlined text-sm text-outline">diamond</span>
                      <span className="text-caption text-on-surface-variant">{ZODIAC_DATA[sign2].quality}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${compat.score}%` }} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{compat.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
