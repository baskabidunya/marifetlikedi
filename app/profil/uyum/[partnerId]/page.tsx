"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSynastryForPartner, getPartners, updatePartnerAvatar } from "@/lib/partners";
import type { SynastryResult } from "@/lib/astro-synastry";
import SynastryContent from "@/components/profile/SynastryContent";

const ZODIAC_EMOJIS: Record<string, string> = {
  Koç: "♈", Boğa: "♉", İkizler: "♊", Yengeç: "♋",
  Aslan: "♌", Başak: "♍", Terazi: "♎", Akrep: "♏",
  Yay: "♐", Oğlak: "♑", Kova: "♒", Balık: "♓",
};

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

const AVATAR_ICONS = [
  "star", "auto_awesome", "dark_mode", "light_mode",
  "psychiatry", "diamond", "bolt", "water_drop",
  "local_fire_department", "air", "explore", "magic_button",
  "self_improvement", "spa", "bedtime", "psychology",
  "flare", "nightlight", "sunny", "ac_unit",
];

const elementSymbols: Record<string, string> = { Ateş: "local_fire_department", Toprak: "explore", Hava: "air", Su: "water_drop" };

function AvatarPicker({ current, onSelect, onClose }: { current: string; onSelect: (v: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 p-3 rounded-xl bg-surface-container border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl w-56">
      <div className="text-caption text-outline text-center mb-2 font-label-md">Avatar Seç</div>
      <div className="grid grid-cols-5 gap-1.5">
        {AVATAR_ICONS.map(icon => (
          <button key={icon} onClick={() => { onSelect(icon); onClose(); }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-primary/20 active:scale-90 ${current === icon ? "bg-primary/20 ring-1 ring-primary" : "bg-white/[0.03]"}`}>
            <span className="material-symbols-outlined text-lg text-on-surface">{icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SynastryPage() {
  const params = useParams();
  const partnerId = params.partnerId as string;
  const [synastry, setSynastry] = useState<SynastryResult | null>(null);
  const [partnerName, setPartnerName] = useState("");
  const [partnerAvatar, setPartnerAvatar] = useState("auto_awesome");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [res, partners] = await Promise.all([
          getSynastryForPartner(partnerId),
          getPartners(),
        ]);
        if (!res) {
          setError("Uyum analizi hesaplanamadı. Partnerin doğum bilgilerini kontrol et.");
          return;
        }
        setSynastry(res);
        const p = partners.find(x => x.id === partnerId);
        if (p) {
          setPartnerName(p.name);
          setPartnerAvatar(p.avatar || "auto_awesome");
        }
      } catch {
        setError("Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    })();
  }, [partnerId]);

  const handleAvatarSelect = async (icon: string) => {
    setPartnerAvatar(icon);
    await updatePartnerAvatar(partnerId, icon);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-32 flex items-start justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-on-surface-variant text-body-md">Uyum analizi hesaplanıyor...</p>
        </div>
      </main>
    );
  }

  if (error || !synastry) {
    return (
      <main className="min-h-screen bg-background pt-32 flex items-start justify-center">
        <div className="glass-card rounded-xl p-10 max-w-md text-center">
          <span className="material-symbols-outlined text-5xl text-error/60 mb-4">error</span>
          <p className="text-on-surface-variant text-body-md mb-6">{error || "Analiz bulunamadı."}</p>
          <Link href="/profil"
            className="px-6 py-3 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all inline-block no-underline">
            Profile Dön
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

  const ratingLabel = temelPct >= 90 ? "Mükemmel Uyum" : temelPct >= 70 ? "Yüksek Uyum" : temelPct >= 50 ? "İyi Uyum" : temelPct >= 30 ? "Orta Uyum" : "Zorlayıcı Uyum";

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      {/* Background Nebula */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,59,215,0.08),transparent_70%)]" />
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Navigation */}
      <Link href="/profil"
        className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface transition-colors mb-6 no-underline group">
        <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
        <span className="font-label-md">Profilime Dön</span>
      </Link>

      {/* Hero Section */}
      <section className="relative mb-section-gap rounded-[32px] overflow-hidden glass-card min-h-[400px] flex flex-col justify-end p-8 md:p-12">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-tertiary/[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto w-full">
          {/* Partner Avatars Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
            {/* User */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${userGrad} blur-xl rounded-full`} />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-primary/40 bg-surface-container flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-4xl md:text-5xl text-primary">person</span>
                </div>
              </div>
              <span className="font-sora font-bold text-headline-sm text-on-background">Sen</span>
              <div className="flex items-center gap-1.5">
                <span className="font-sora font-bold text-headline-xs text-primary">{uc.sun.sign}</span>
                <span className="text-sm">{ZODIAC_EMOJIS[uc.sun.sign] || "☀️"}</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-outline">
                <span>↑ {uc.rising.sign}</span>
                <span>🌙 {uc.moon.sign}</span>
              </div>
            </div>

            {/* Connection */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <span className="text-3xl md:text-4xl text-secondary font-bold font-sora">×</span>
              <span className="text-caption text-outline">uyumu</span>
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
            </div>

            {/* Partner — with avatar picker */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${partnerGrad} blur-xl rounded-full`} />
                <button onClick={() => setAvatarPickerOpen(!avatarPickerOpen)}
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-secondary/40 bg-surface-container flex items-center justify-center overflow-hidden cursor-pointer hover:border-secondary/70 transition-all group">
                  <span className="material-symbols-outlined text-4xl md:text-5xl text-secondary">{partnerAvatar}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-xl">edit</span>
                  </div>
                </button>
                {avatarPickerOpen && (
                  <AvatarPicker current={partnerAvatar} onSelect={handleAvatarSelect} onClose={() => setAvatarPickerOpen(false)} />
                )}
              </div>
              <span className="font-sora font-bold text-headline-sm text-on-background">{partnerName}</span>
              <div className="flex items-center gap-1.5">
                <span className="font-sora font-bold text-headline-xs text-secondary">{pc.sun.sign}</span>
                <span className="text-sm">{ZODIAC_EMOJIS[pc.sun.sign] || "☀️"}</span>
              </div>
              <div className="flex items-center gap-2 text-caption text-outline">
                <span>↑ {pc.rising.sign}</span>
                <span>🌙 {pc.moon.sign}</span>
              </div>
            </div>
          </div>

          {/* Score Summary — centered */}
          <div className="flex flex-col items-center gap-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary/20 text-tertiary font-label-md text-label-md backdrop-blur-md">{ratingLabel}</span>
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="url(#temelGrad)" strokeWidth="4"
                    strokeDasharray={`${(temelPct / 100) * 213.6} 213.6`} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="temelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgb(var(--color-primary))" />
                      <stop offset="100%" stopColor="rgb(var(--color-secondary))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-sora font-bold text-headline-sm md:text-headline-md text-on-background">{temelPct}%</span>
                </div>
              </div>
              <div>
                <div className="font-sora font-bold text-headline-sm text-on-background">Temel Uyum</div>
                <div className="text-caption text-outline">Güneş + Ay uyumu</div>
              </div>
            </div>

            {/* Larger centered score pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-6 border-t border-white/5 w-full max-w-xl">
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 min-w-[130px] justify-center">
                <span className="text-lg">❤️</span>
                <div>
                  <div className="font-label-md text-caption text-outline leading-none mb-0.5">Aşk</div>
                  <span className="font-sora font-bold text-headline-xs text-on-background">{sc.ask * 10}%</span>
                </div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 min-w-[130px] justify-center">
                <span className="text-lg">💬</span>
                <div>
                  <div className="font-label-md text-caption text-outline leading-none mb-0.5">İletişim</div>
                  <span className="font-sora font-bold text-headline-xs text-on-background">{sc.iletisim * 10}%</span>
                </div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 min-w-[130px] justify-center">
                <span className="text-lg">🔥</span>
                <div>
                  <div className="font-label-md text-caption text-outline leading-none mb-0.5">Tutku</div>
                  <span className="font-sora font-bold text-headline-xs text-on-background">{sc.tutku * 10}%</span>
                </div>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 min-w-[130px] justify-center">
                <span className="text-lg">🏡</span>
                <div>
                  <div className="font-label-md text-caption text-outline leading-none mb-0.5">Vade</div>
                  <span className="font-sora font-bold text-headline-xs text-on-background">{sc.uzunVade * 10}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-gutter">
          {/* Partner Quick Info */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="font-headline-md text-headline-md mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
              Partner
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">emoji_events</span>
                </div>
                <div>
                  <div className="font-label-md text-on-surface">Güneş</div>
                  <div className="text-caption text-outline">{pc.sun.sign} {ZODIAC_EMOJIS[pc.sun.sign]}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">dark_mode</span>
                </div>
                <div>
                  <div className="font-label-md text-on-surface">Ay</div>
                  <div className="text-caption text-outline">{pc.moon.sign} {ZODIAC_EMOJIS[pc.moon.sign]}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">arrow_upward</span>
                </div>
                <div>
                  <div className="font-label-md text-on-surface">Yükselen</div>
                  <div className="text-caption text-outline">{pc.rising.sign} {ZODIAC_EMOJIS[pc.rising.sign]}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Senin Bilgilerin */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="font-headline-md text-headline-md mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">person</span>
              Sen
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">emoji_events</span>
                </div>
                <div>
                  <div className="font-label-md text-on-surface">Güneş</div>
                  <div className="text-caption text-outline">{uc.sun.sign} {ZODIAC_EMOJIS[uc.sun.sign]}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">dark_mode</span>
                </div>
                <div>
                  <div className="font-label-md text-on-surface">Ay</div>
                  <div className="text-caption text-outline">{uc.moon.sign} {ZODIAC_EMOJIS[uc.moon.sign]}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">arrow_upward</span>
                </div>
                <div>
                  <div className="font-label-md text-on-surface">Yükselen</div>
                  <div className="text-caption text-outline">{uc.rising.sign} {ZODIAC_EMOJIS[uc.rising.sign]}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Element Comparison */}
          <div className="glass-card rounded-xl p-6">
            <h2 className="font-headline-md text-headline-md mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">globe</span>
              Elementler
            </h2>
            <div className="space-y-4">
              {["Ateş", "Toprak", "Hava", "Su"].map(el => {
                const uEl = synastry.elementScore.user[el] || 0;
                const pEl = synastry.elementScore.partner[el] || 0;
                const uPct = Math.round((uEl / 14) * 100);
                const pPct = Math.round((pEl / 14) * 100);
                return (
                  <div key={el} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm text-outline">{elementSymbols[el]}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-caption">
                        <span className="text-on-surface-variant">{el}</span>
                        <span className="text-outline">{uPct}% · {pPct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden flex">
                        <div className="h-full bg-primary/60 rounded-l-full transition-all" style={{ width: `${uPct}%` }} />
                        <div className="h-full bg-secondary/60 rounded-r-full transition-all" style={{ width: `${pPct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-xl p-8 md:p-10">
            <SynastryContent synastry={synastry} partnerName={partnerName} />
          </div>
        </div>
      </div>
    </main>
  );
}
