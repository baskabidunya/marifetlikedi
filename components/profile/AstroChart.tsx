"use client";

import { useState, useEffect } from "react";
import { ZODIAC_DATA, type ZodiacSign, type PlanetPosition, type AspectData, type AstroChart as AstroChartType } from "@/lib/astro-utils";
import { getAstroChart } from "@/lib/profile";
import {
  RISING_SIGNS, HOUSE_MEANINGS, ASPECT_MEANINGS, BODY_RULERSHIPS,
  getPlanetInSignText, getPlanetInHouseText,
} from "@/lib/astro-interpretations";
import {
  getHouseNarrative, getPlanetNarrative, getRisingNarrative,
  getAspectNarrative, getPlanetInHouseNarrative, SIGN_TRAITS,
} from "@/lib/astro-narratives";

interface Props {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  chart?: AstroChartType | null;
  externalDetail?: { state: DetailTarget | null; setter: (d: DetailTarget | null) => void };
}

const ZODIAC_COLORS: Record<ZodiacSign, { bg: string; text: string; border: string }> = {
  Koç: { bg: "bg-red-900/20", text: "text-red-400", border: "border-red-500/30" },
  Boğa: { bg: "bg-emerald-900/20", text: "text-emerald-400", border: "border-emerald-500/30" },
  İkizler: { bg: "bg-amber-900/20", text: "text-amber-400", border: "border-amber-500/30" },
  Yengeç: { bg: "bg-sky-900/20", text: "text-sky-400", border: "border-sky-500/30" },
  Aslan: { bg: "bg-orange-900/20", text: "text-orange-400", border: "border-orange-500/30" },
  Başak: { bg: "bg-lime-900/20", text: "text-lime-400", border: "border-lime-500/30" },
  Terazi: { bg: "bg-pink-900/20", text: "text-pink-400", border: "border-pink-500/30" },
  Akrep: { bg: "bg-purple-900/20", text: "text-purple-400", border: "border-purple-500/30" },
  Yay: { bg: "bg-indigo-900/20", text: "text-indigo-400", border: "border-indigo-500/30" },
  Oğlak: { bg: "bg-teal-900/20", text: "text-teal-400", border: "border-teal-500/30" },
  Kova: { bg: "bg-cyan-900/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  Balık: { bg: "bg-violet-900/20", text: "text-violet-400", border: "border-violet-500/30" },
};

const ASPECT_COLORS: Record<string, string> = {
  "Kavuşum": "text-tertiary border-tertiary/30 bg-tertiary/10",
  "Altmışlık": "text-primary border-primary/30 bg-primary/10",
  "Kare": "text-error border-error/30 bg-error/10",
  "Üçgen": "text-secondary border-secondary/30 bg-secondary/10",
  "Karşıt": "text-on-surface-variant border-white/10 bg-white/5",
};

type DetailTarget =
  | { type: "planet"; planet: PlanetPosition; house?: number }
  | { type: "rising"; sign: ZodiacSign }
  | { type: "aspect"; aspect: AspectData }
  | { type: "house"; num: number; sign: ZodiacSign }
  | { type: "ruler"; name: string }
  | { type: "element"; name: string; bodies: { name: string; sign: ZodiacSign; degree: number; minute: number; points: number }[] }; // prettier-ignore

function DetailModal({ target, onClose }: { target: DetailTarget; onClose: () => void }) {
  let title = "";
  let body = "";

  if (target.type === "planet") {
    const p = target.planet;
    title = `${p.name} ${p.degree}°${p.minute}' ${p.sign}`;
    if (target.house) {
      body = getPlanetInHouseNarrative(p.name, p.sign, target.house);
    } else {
      body = getPlanetNarrative(p.name, p.sign);
    }
    if (p.isRetrograde) body += "\n\n⚠️ Retrograd: Bu gezegen doğum anında geri hareketteydi. Enerjisi içe dönük ve ifadesi farklı olabilir. Bu konularda hayatın ilk yarısında daha çok içsel çalışma yapmanız gerekebilir.";
  } else if (target.type === "rising") {
    const sign = target.sign;
    title = `Yükselen Burç: ${sign}`;
    body = getRisingNarrative(sign);
  } else if (target.type === "aspect") {
    const a = target.aspect;
    title = `${a.planet1} ${a.type} ${a.planet2}`;
    body = getAspectNarrative(a.type, a.planet1, a.planet2, a.degree);
  } else if (target.type === "house") {
    const info = HOUSE_MEANINGS[target.num];
    title = info?.title || `${target.num}. Ev`;
    body = getHouseNarrative(target.num, target.sign);
  } else if (target.type === "ruler") {
    title = target.name;
    body = BODY_RULERSHIPS[target.name as keyof typeof BODY_RULERSHIPS] || "";
  } else if (target.type === "element") {
    title = `${target.name} Elementi`;
    const totalPts = target.bodies.reduce((s, b) => s + b.points, 0);
    body = `Toplam ${totalPts}/14 puan\n\n${target.bodies.map(b => `${b.name}: ${b.sign} ${b.degree}°${b.minute}' (${b.points} puan)`).join("\n")}`;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 glass-card rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h3 className="font-sora text-headline-md text-on-background font-bold mb-4 pr-8">{title}</h3>
        <div className="text-on-surface-variant text-body-md leading-relaxed whitespace-pre-line">{body}</div>
      </div>
    </div>
  );
}

function PlanetCard({ planet, size = "md", onClick }: { planet: PlanetPosition; size?: "sm" | "md" | "lg"; onClick?: () => void }) {
  const zod = ZODIAC_DATA[planet.sign];
  const clr = ZODIAC_COLORS[planet.sign];
  const isRising = planet.name === "Yükselen";

  const inner = size === "lg" ? (
    <div className={`rounded-2xl p-6 ${clr.bg} ${clr.border} border backdrop-blur-sm relative overflow-hidden group transition-all ${onClick ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]" : ""}`}>
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
        <span className="text-6xl">{zod.emoji}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${clr.bg} border ${clr.border}`}>
          <span className={`material-symbols-outlined text-3xl ${clr.text}`}>{isRising ? "arrow_upward" : planet.icon}</span>
        </div>
        <div>
          <div className="text-caption text-outline mb-0.5">{planet.name}</div>
          <div className={`font-sora text-headline-md font-bold ${clr.text}`}>{planet.sign}</div>
          <div className="font-label-md text-on-surface-variant">
            {planet.degree}° {planet.minute}&apos;
            {planet.isRetrograde && <span className="text-error text-caption ml-1">R</span>}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={`rounded-xl p-4 ${clr.bg} border ${clr.border} backdrop-blur-sm transition-all ${onClick ? "cursor-pointer hover:bg-white/[0.06] hover:shadow-md" : ""}`}>
      <div className="flex items-center gap-3">
        <span className={`material-symbols-outlined ${clr.text} text-2xl`}>{planet.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-sora font-bold text-sm text-on-background">{planet.name}</span>
            <span className={`text-xs font-label-md ${clr.text}`}>{planet.sign}</span>
            {planet.isRetrograde && <span className="text-error text-caption">R</span>}
          </div>
          <div className="text-caption text-outline">{planet.degree}° {planet.minute}&apos;</div>
        </div>
        <span className="text-xl opacity-50">{zod.emoji}</span>
      </div>
    </div>
  );

  return onClick ? <button onClick={onClick} className="w-full text-left block">{inner}</button> : <div>{inner}</div>;
}

const HOUSE_SIGNS = ["Kova", "Balık", "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak"] as const;

export function HousesSection({ chart, setDetail }: { chart: AstroChartType; setDetail: (d: DetailTarget) => void }) {
  return (
    <div>
      <h2 className="font-sora text-headline-md text-on-background mb-1 font-bold">Evler</h2>
      <p className="text-outline text-body-md mb-6">Her ev, hayatının farklı bir temasını temsil eder.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.entries(HOUSE_MEANINGS).map(([num, h]) => {
          const sign = HOUSE_SIGNS[(parseInt(num) - 1) % 12] as ZodiacSign;
          const clr = ZODIAC_COLORS[sign];
          return (
            <button key={num} onClick={() => setDetail({ type: "house", num: parseInt(num), sign })}
              className={`rounded-xl p-4 ${clr.bg} border ${clr.border} text-left cursor-pointer hover:bg-white/[0.06] hover:shadow-md transition-all`}>
              <div className="font-sora font-bold text-sm text-on-background">{h.title}</div>
              <div className={`text-xs font-label-md ${clr.text} mt-1`}>{sign}</div>
              <div className="text-caption text-outline mt-1 line-clamp-2">{h.meaning.slice(0, 80)}...</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PlanetsSection({ chart, setDetail }: { chart: AstroChartType; setDetail: (d: DetailTarget) => void }) {
  return (
    <div className="glass-card rounded-xl p-8">
      <h2 className="font-sora text-headline-md text-on-background mb-1 font-bold">Gezegenler</h2>
      <p className="text-outline text-body-md mb-6">Doğum anındaki gezegen konumlarının anlamlarını incele.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {chart.planets.map((p) => {
          const zod = ZODIAC_DATA[p.sign];
          const clr = ZODIAC_COLORS[p.sign];
          return (
            <button key={p.name} onClick={() => setDetail({ type: "planet", planet: p })}
              className={`rounded-xl p-4 ${clr.bg} border ${clr.border} text-left cursor-pointer hover:bg-white/[0.06] hover:shadow-md transition-all`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`material-symbols-outlined ${clr.text} text-xl`}>{p.icon}</span>
                <span className="font-sora font-bold text-sm text-on-background">{p.name}</span>
                <span className={`text-xs font-label-md ${clr.text} ml-auto`}>{p.sign}</span>
              </div>
              <div className="text-caption text-outline leading-relaxed">
                {BODY_RULERSHIPS[p.name as keyof typeof BODY_RULERSHIPS]?.split(".")[0]}.
              </div>
              <div className="text-caption text-outline/50 mt-1.5">{p.degree}°{p.minute}'</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AspectsSection({ chart, setDetail }: { chart: AstroChartType; setDetail: (d: DetailTarget) => void }) {
  return chart.aspects.length > 0 ? (
    <div className="glass-card rounded-xl p-8">
      <h2 className="font-sora text-headline-md text-on-background mb-1 font-bold">Açılar</h2>
      <p className="text-outline text-body-md mb-6">Gezegenler arası etkileşimler ve enerji akışları</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {chart.aspects.map((a, i) => {
          const ac = ASPECT_COLORS[a.type] || "border-white/10 bg-white/5";
          return (
            <button key={i} onClick={() => setDetail({ type: "aspect", aspect: a })}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-white/[0.06] transition-all ${ac}`}>
              <span className="font-label-md text-on-background">{a.planet1}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.type === "Kare" ? "text-error" : a.type === "Üçgen" ? "text-secondary" : a.type === "Kavuşum" ? "text-tertiary" : "text-on-surface-variant"} bg-white/5 border border-white/10`}>
                {a.type}
              </span>
              <span className="font-label-md text-on-background">{a.planet2}</span>
              <span className="text-caption text-outline ml-auto">{a.degree}°</span>
            </button>
          );
        })}
      </div>
    </div>
  ) : null;
}

export { DetailModal, type DetailTarget };

export function Big3Section({ chart, setDetail }: { chart: AstroChartType; setDetail: (d: DetailTarget) => void }) {
  return (
    <div>
      <h2 className="font-sora text-headline-md text-on-background mb-1 font-bold">Büyük Üçlü</h2>
      <p className="text-outline text-body-md mb-6">Haritanın en çok sözü geçen üçlüsü. Kişiliğinin temel taşlarını anlatır.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlanetCard planet={chart.sun} size="lg" onClick={() => setDetail({ type: "planet", planet: chart.sun, house: 2 })} />
        <PlanetCard planet={chart.moon} size="lg" onClick={() => setDetail({ type: "planet", planet: chart.moon, house: 11 })} />
        <PlanetCard planet={chart.rising} size="lg" onClick={() => setDetail({ type: "rising", sign: chart.rising.sign })} />
      </div>
    </div>
  );
}

export default function AstroChart({ birthDate, birthTime, birthPlace, chart: propChart, externalDetail }: Props) {
  const [chart, setChart] = useState<AstroChartType | null>(null);
  const [localDetail, setLocalDetail] = useState<DetailTarget | null>(null);

  const detail = externalDetail ? externalDetail.state : localDetail;
  const setDetail = externalDetail ? externalDetail.setter : setLocalDetail;

  useEffect(() => {
    if (propChart !== undefined) { setChart(propChart); return; }
    if (!birthDate) { setChart(null); return; }
    getAstroChart().then(setChart);
  }, [birthDate, birthTime, birthPlace, propChart]);

  if (birthDate && !chart) {
    return (
      <section className="glass-card rounded-xl p-10 mb-section-gap text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-tertiary animate-spin">sync</span>
          <span className="text-on-surface-variant">Kozmik haritan hesaplanıyor...</span>
        </div>
      </section>
    );
  }

  if (!chart) {
    return (
      <section className="glass-card rounded-xl p-10 mb-section-gap text-center">
        <span className="material-symbols-outlined text-5xl text-outline/40 mb-4">auto_awesome</span>
        <h3 className="font-sora text-headline-md text-on-background font-bold mb-2">Kozmik Haritan Hazır Değil</h3>
        <p className="text-outline text-body-md max-w-md mx-auto">Doğum bilgilerini profiline ekle, Kozmik Haritan burada görünsün.</p>
      </section>
    );
  }

  return (
    <section className="mb-section-gap space-y-8">

      {/* Element Distribution */}
      <div className="glass-card rounded-xl p-8">
        <h3 className="font-sora text-headline-md text-on-background mb-1 font-bold">Element Dağılımı</h3>
        <p className="text-outline text-body-md mb-6">En güçlü etkiyi Güneş, Ay ve Yükselen oluşturur (3'er puan). Kişisel gezegenler de ince dokunuşlarını ekler. Böylece toplam 14 puanlık bir uyum puanı ortaya çıkar.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(() => {
            const weights: Record<string, number> = {
              Yükselen: 3, Güneş: 3, Ay: 3,
              Merkür: 1, Venüs: 1, Mars: 1, Jüpiter: 1, Satürn: 1,
            };
            const personalPlanets = chart.planets.filter(p => weights[p.name]);
            const allBodies = [
              { body: chart.sun, points: 3 },
              { body: chart.moon, points: 3 },
              { body: chart.rising, points: 3 },
              ...personalPlanets.map(p => ({ body: p, points: 1 })),
            ];
            const elementSigns: Record<string, string[]> = {
              Ateş: ["Koç", "Aslan", "Yay"],
              Toprak: ["Boğa", "Başak", "Oğlak"],
              Hava: ["İkizler", "Terazi", "Kova"],
              Su: ["Yengeç", "Akrep", "Balık"],
            };
            const elementBodies: Record<string, { name: string; sign: ZodiacSign; degree: number; minute: number; points: number }[]> = { Ateş: [], Toprak: [], Hava: [], Su: [] };
            const elementPoints: Record<string, number> = { Ateş: 0, Toprak: 0, Hava: 0, Su: 0 };
            for (const { body, points } of allBodies) {
              for (const [el, signs] of Object.entries(elementSigns)) {
                if (signs.includes(body.sign)) {
                  elementPoints[el] += points;
                  elementBodies[el].push({ name: body.name, sign: body.sign, degree: body.degree, minute: body.minute, points });
                  break;
                }
              }
            }
            const totalPoints = 14;
            const elements = [
              { name: "Ateş", points: elementPoints.Ateş, bodies: elementBodies.Ateş, color: "from-orange-400 to-red-500", bg: "bg-orange-900/20", text: "text-orange-400", icon: "local_fire_department" },
              { name: "Toprak", points: elementPoints.Toprak, bodies: elementBodies.Toprak, color: "from-emerald-400 to-green-600", bg: "bg-emerald-900/20", text: "text-emerald-400", icon: "landscape" },
              { name: "Hava", points: elementPoints.Hava, bodies: elementBodies.Hava, color: "from-sky-400 to-blue-500", bg: "bg-sky-900/20", text: "text-sky-400", icon: "air" },
              { name: "Su", points: elementPoints.Su, bodies: elementBodies.Su, color: "from-cyan-400 to-blue-600", bg: "bg-cyan-900/20", text: "text-cyan-400", icon: "water_drop" },
            ];
            return elements.map((el) => {
              const pct = Math.round((el.points / totalPoints) * 100);
              return (
                <button key={el.name} onClick={() => setDetail({ type: "element", name: el.name, bodies: el.bodies })}
                  className={`rounded-xl p-5 ${el.bg} border border-white/10 text-center cursor-pointer hover:scale-[1.03] transition-transform`}>
                  <span className={`material-symbols-outlined text-3xl ${el.text} mb-2`}>{el.icon}</span>
                  <div className={`font-sora font-bold text-headline-md ${el.text}`}>{pct}%</div>
                  <div className="font-label-md text-on-background mt-1">{el.name}</div>
                  <div className="text-caption text-outline mt-1">{el.points}/{totalPoints} puan</div>
                  <div className="mt-3 w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${el.color} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  {el.bodies.length > 0 && (
                    <div className="mt-3 text-caption text-outline">
                      {el.bodies.map(b => b.name).join(" · ")}
                    </div>
                  )}
                </button>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
}
