"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { calculateCompatibility } from "@/app/uyum/actions";
import SynastryContent from "@/components/profile/SynastryContent";
import type { SynastryResult, CrossAspect } from "@/lib/astro-synastry";
import { ASPECT_MEANINGS } from "@/lib/astro-interpretations";

const ZODIAC_COLORS: Record<string, string> = {
  Koç: "from-red-500/40 to-orange-500/40",
  Boğa: "from-emerald-500/40 to-green-500/40",
  İkizler: "from-yellow-400/40 to-amber-400/40",
  Yengeç: "from-sky-400/40 to-blue-400/40",
  Aslan: "from-orange-500/40 to-amber-500/40",
  Başak: "from-stone-400/40 to-yellow-700/40",
  Terazi: "from-pink-400/40 to-rose-400/40",
  Akrep: "from-purple-700/40 to-red-900/40",
  Yay: "from-indigo-500/40 to-purple-500/40",
  Oğlak: "from-gray-600/40 to-zinc-700/40",
  Kova: "from-cyan-400/40 to-blue-500/40",
  Balık: "from-indigo-400/40 to-violet-400/40",
};

const PLANET_ICONS: Record<string, string> = {
  "Güneş": "sunny",
  "Ay": "dark_mode",
  "Merkür": "forum",
  "Venüs": "favorite",
  "Mars": "local_fire_department",
  "Jüpiter": "brightness_7",
  "Satürn": "auto_awesome",
  "Uranüs": "explore",
  "Neptün": "water_drop",
  "Pluto": "psychology",
  "Yükselen": "arrow_upward",
};

const ASPECT_ORDER: Record<string, number> = {
  "Kavuşum": 0, "Üçgen": 1, "Altmışlık": 2, "Kare": 3, "Karşıt": 4,
};

function aspectTag(type: string) {
  switch (type) {
    case "Kavuşum":
    case "Üçgen":
      return { label: "POZİTİF", cls: "bg-primary/10 text-primary", border: "border-primary" };
    case "Altmışlık":
      return { label: "DESTEKLEYİCİ", cls: "bg-secondary/10 text-secondary", border: "border-secondary" };
    case "Kare":
      return { label: "YOĞUN", cls: "bg-tertiary/10 text-tertiary", border: "border-tertiary" };
    case "Karşıt":
      return { label: "ZORLAYICI", cls: "bg-error/10 text-error", border: "border-error" };
    default:
      return { label: "", cls: "bg-white/10 text-on-surface-variant", border: "border-white/10" };
  }
}

export default function UyumSonucContent() {
  const searchParams = useSearchParams();
  const [synastry, setSynastry] = useState<SynastryResult | null>(null);
  const [partnerName, setPartnerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userDate = searchParams.get("user_birth_date") || "";
    const userTime = searchParams.get("user_birth_time") || "";
    const userPlace = searchParams.get("user_birth_place") || "";
    const pName = searchParams.get("partner_name") || "Partnerin";
    const partnerDate = searchParams.get("partner_birth_date") || "";
    const partnerTime = searchParams.get("partner_birth_time") || "";
    const partnerPlace = searchParams.get("partner_birth_place") || "";

    if (!userDate || !partnerDate) {
      setError("Doğum bilgileri eksik. Lütfen geri dönüp formu doldurun.");
      setLoading(false);
      return;
    }

    setPartnerName(pName);

    const fd = new FormData();
    fd.set("user_birth_date", userDate);
    fd.set("user_birth_time", userTime);
    fd.set("user_birth_place", userPlace);
    fd.set("partner_name", pName);
    fd.set("partner_birth_date", partnerDate);
    fd.set("partner_birth_time", partnerTime);
    fd.set("partner_birth_place", partnerPlace);

    calculateCompatibility(undefined, fd).then((res) => {
      if (res.error) {
        setError(res.error);
      } else if (res.result) {
        setSynastry(res.result);
      }
      setLoading(false);
    }).catch(() => {
      setError("Bir hata oluştu.");
      setLoading(false);
    });
  }, [searchParams]);

  const scrollToDetail = () => {
    detailRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto flex items-start justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 pt-20">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-on-surface-variant text-body-md">Uyum analizi hesaplanıyor...</p>
        </div>
      </main>
    );
  }

  if (error || !synastry) {
    return (
      <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto flex items-start justify-center min-h-[60vh]">
        <div className="glass-card rounded-xl p-10 max-w-md text-center pt-20">
          <span className="material-symbols-outlined text-5xl text-error/60 mb-4">error</span>
          <p className="text-on-surface-variant text-body-md mb-6">{error || "Analiz bulunamadı."}</p>
          <Link href="/uyum"
            className="px-6 py-3 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all inline-block no-underline">
            Geri Dön
          </Link>
        </div>
      </main>
    );
  }

  const uc = synastry.userChart;
  const pc = synastry.partnerChart;
  const sc = synastry.compatibilityScores;

  const userGrad = ZODIAC_COLORS[uc.sun.sign] || "from-primary/30 to-secondary/30";
  const partnerGrad = ZODIAC_COLORS[pc.sun.sign] || "from-primary/30 to-secondary/30";

  const temelPct = sc.temel;

  const interactions: CrossAspect[] = [
    ...synastry.loveAspects,
    ...synastry.communicationAspects,
    ...synastry.growthAspects,
    ...synastry.challengingAspects,
  ]
    .sort((a, b) => (ASPECT_ORDER[a.type] ?? 9) - (ASPECT_ORDER[b.type] ?? 9))
    .slice(0, 5);

  const scoreCards = [
    { key: "ask", title: "Duygusal Uyum", value: sc.ask * 10, color: "text-secondary", bar: "bg-secondary", icon: "favorite",
      note: "Birbirinizin duygusal dilini ve ihtiyacını ne kadar anladığınızı gösterir." },
    { key: "iletisim", title: "İletişim", value: sc.iletisim * 10, color: "text-primary", bar: "bg-primary", icon: "forum",
      note: "Düşünce ve fikir alışverişinizin akıcılığını, anlaşma kalitenizi yansıtır." },
    { key: "tutku", title: "Tutku", value: sc.tutku * 10, color: "text-tertiary", bar: "bg-tertiary", icon: "local_fire_department",
      note: "Aranızdaki çekim gücü, heyecan ve manyetik enerji alanını gösterir." },
    { key: "uzunVade", title: "Gelecek Potansiyeli", value: sc.uzunVade * 10, color: "text-on-surface", bar: "bg-on-surface", icon: "timeline",
      note: "Ortak büyüme, karmik dersler ve uzun vadeli uyum potansiyelinizi yansıtır." },
  ];

  return (
    <main className="relative top-clear-2 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      {/* Background Nebula */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,59,215,0.08),transparent_70%)]" />
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Navigation */}
      <Link href="/uyum"
        className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors mb-8 no-underline group">
        <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
        <span className="font-label-md">Geri Dön</span>
      </Link>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-section-gap">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-secondary border border-secondary/20 mb-4">
          <span className="material-symbols-outlined text-sm">favorite</span>
          <span className="text-label-md">İlişki Uyumu</span>
        </span>
        <h1 className="font-sora text-headline-lg-mobile md:text-display-lg mb-4 gradient-text">İlişki Laboratuvarı</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          {partnerName ? `${partnerName} ile ` : ""}yıldızların rehberliğinde ruh eşinizi keşfedin. İki haritanın dansı, aşkın ve uyumun gizli kodlarını açığa çıkarıyor.
        </p>
      </section>

      {/* Synastry Sphere & Profile Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Left Panel: Sen */}
        <div className="md:col-span-3 glass-card rounded-xl p-6 flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${userGrad} blur-xl rounded-full`} />
            <div className="relative w-24 h-24 rounded-full border-2 border-primary/40 bg-surface-container flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-4xl text-primary">person</span>
            </div>
          </div>
          <div>
            <h3 className="font-sora font-bold text-headline-md text-on-background">Sen</h3>
            <p className="font-label-md text-label-md text-tertiary">{uc.sun.sign} (Yükselen {uc.rising.sign})</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            <div className="bg-surface-container rounded-lg p-2">
              <span className="text-caption block text-outline">Güneş</span>
              <span className="text-label-md">{uc.sun.sign} {uc.sun.degree}°</span>
            </div>
            <div className="bg-surface-container rounded-lg p-2">
              <span className="text-caption block text-outline">Ay</span>
              <span className="text-label-md">{uc.moon.sign} {uc.moon.degree}°</span>
            </div>
          </div>
        </div>

        {/* Middle: The Interaction Sphere */}
        <div className="md:col-span-6 relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[460px]">
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-80 h-80 bg-primary blur-[100px] rounded-full" />
          </div>
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/10" />
            <div className="glass-card w-44 h-44 md:w-60 md:h-60 rounded-full flex flex-col items-center justify-center celestial-glow z-10 border-white/20">
              <span className="font-sora font-bold text-display-lg text-tertiary">{temelPct}%</span>
              <span className="text-label-md text-on-surface-variant mt-1">Genel Uyum</span>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="48" stroke="url(#lineGrad)" stroke-dasharray="2 2" stroke-width="0.5" />
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#d0bcff", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#fbabff", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button onClick={scrollToDetail}
              className="bg-primary hover:bg-primary/80 text-on-primary font-label-md px-6 py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer">
              Detaylı Analiz
            </button>
          </div>
        </div>

        {/* Right Panel: Partner */}
        <div className="md:col-span-3 glass-card rounded-xl p-6 flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${partnerGrad} blur-xl rounded-full`} />
            <div className="relative w-24 h-24 rounded-full border-2 border-secondary/40 bg-surface-container flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-4xl text-secondary">person</span>
            </div>
          </div>
          <div>
            <h3 className="font-sora font-bold text-headline-md text-on-background">{partnerName}</h3>
            <p className="font-label-md text-label-md text-tertiary">{pc.sun.sign} (Yükselen {pc.rising.sign})</p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            <div className="bg-surface-container rounded-lg p-2">
              <span className="text-caption block text-outline">Güneş</span>
              <span className="text-label-md">{pc.sun.sign} {pc.sun.degree}°</span>
            </div>
            <div className="bg-surface-container rounded-lg p-2">
              <span className="text-caption block text-outline">Ay</span>
              <span className="text-label-md">{pc.moon.sign} {pc.moon.degree}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Uyum Kategorileri (Score Grid) */}
      <section className="mt-section-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {scoreCards.map(card => (
          <div key={card.key} className="glass-card p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <span className="material-symbols-outlined text-4xl">{card.icon}</span>
            </div>
            <h4 className="text-outline font-label-md mb-2">{card.title}</h4>
            <div className="flex items-end gap-2">
              <span className={`text-headline-lg font-sora font-bold ${card.color}`}>{card.value}</span>
              <span className="text-caption mb-2 text-on-surface-variant">/100</span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full mt-4">
              <div className={`${card.bar} h-full rounded-full`} style={{ width: `${card.value}%` }} />
            </div>
            <p className="text-caption mt-4 text-on-surface-variant">{card.note}</p>
          </div>
        ))}
      </section>

      {/* Detailed Planet Interactions */}
      {interactions.length > 0 && (
        <section className="mt-section-gap">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-tertiary">stars</span>
            <h2 className="font-sora text-headline-md text-on-background">Gezegen Etkileşimleri</h2>
          </div>
          <div className="space-y-4">
            {interactions.map((a, i) => {
              const tag = aspectTag(a.type);
              return (
                <div key={i} className={`glass-card p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-colors border-l-4 ${tag.border}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <span className={`material-symbols-outlined ${tag.cls.split(" ")[1]}`}>{PLANET_ICONS[a.planet1] || "stars"}</span>
                    </div>
                    <div>
                      <h5 className="font-label-md text-on-surface">{a.planet1} – {a.planet2} {a.type}</h5>
                      <p className="text-caption text-on-surface-variant">{a.sign1} ↔ {a.sign2}</p>
                    </div>
                  </div>
                  <div className="flex-1 md:px-12">
                    <p className="text-body-md text-on-surface-variant line-clamp-2">
                      {ASPECT_MEANINGS[a.type] || "Bu iki gezegen arasındaki etkileşim ilişkinizin dinamiklerine katkı sağlıyor."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-3 py-1 ${tag.cls} text-caption rounded-full font-bold`}>{tag.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Detailed Analysis (SynastryContent) */}
      <section ref={detailRef} className="mt-section-gap scroll-mt-24">
        <SynastryContent synastry={synastry} partnerName={partnerName} />
      </section>
    </main>
  );
}
