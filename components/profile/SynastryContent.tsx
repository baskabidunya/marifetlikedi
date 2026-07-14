"use client";

import type { SynastryResult } from "@/lib/astro-synastry";
import { ASPECT_MEANINGS } from "@/lib/astro-interpretations";

const overallNotes: Record<string, string> = {
  "Koç-Balık": "Koç'un ateşli ve girişimci enerjisi, Balık'ın sezgisel ve duygusal dünyasıyla buluşuyor. Bu iki burç birbirini tamamlayıcı bir potansiyele sahip. Koç, Balık'a harekete geçme cesareti verirken; Balık, Koç'a şefkat ve derinlik katıyor. Duygusal uyum üzerinde çalışılması gereken bir ilişki.",
  "Koç-Boğa": "Koç'un atılganlığı ile Boğa'nın sabrı arasında bir denge kurmak gerekiyor. Zorluklarla başa çıkma konusunda güçlü bir ikili olabilirler.",
  "Koç-İkizler": "Enerjik ve dinamik bir ikili. Sürekli hareket halinde, keşfetmeyi seven, birbirini besleyen bir ilişki potansiyeli var.",
  "Koç-Yengeç": "Koç'un bağımsızlığı ile Yengeç'in bağlanma ihtiyacı arasında bir denge kurulmalı. Emek isteyen bir uyum.",
  "Koç-Aslan": "İki ateş burcu bir araya gelince enerji tavan. Tutkulu, coşkulu ve birbirini yükselten bir ilişki.",
  "Koç-Başak": "Koç'un hızı Başak'ın detaycılığıyla zorlansa da birbirlerine çok şey katabilirler.",
  "Koç-Terazi": "Zıt kutupların çekimi. Koç'un benliği Terazi'nin ortaklık anlayışıyla dengelenir.",
  "Koç-Akrep": "Yoğun ve dönüştürücü bir bağ. İkisi de güçlü iradeli, bu ilişki derin izler bırakır.",
  "Koç-Yay": "Macera ve keşif dolu bir ilişki. İkisi de özgür ruhlu, birbirini sınırlamayan bir uyum.",
  "Koç-Oğlak": "Koç'un isyankarlığı Oğlak'ın disipliniyle şekillenir. Zorlu ama sağlam bir temel.",
  "Koç-Kova": "Özgürlükçü ve yenilikçi bir ikili. Birbirlerinin farklılıklarına saygı duyarlar.",
};

function aspectBadge(type: string) {
  if (type === "Kavuşum") return <span className="text-xs px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/30">{type}</span>;
  if (type === "Üçgen") return <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/30">{type}</span>;
  if (type === "Altmışlık") return <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">{type}</span>;
  if (type === "Kare") return <span className="text-xs px-2 py-0.5 rounded-full bg-error/10 text-error border border-error/30">{type}</span>;
  if (type === "Karşıt") return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/10 text-amber-400 border border-amber-500/30">{type}</span>;
  return null;
}

function renderPair(p1: string, s1: string, p2: string, s2: string, aspect: any) {
  return (
    <div className={`p-4 rounded-xl border ${aspect ? (aspect.type === "Kare" || aspect.type === "Karşıt" ? "border-error/20 bg-error/5" : "border-secondary/20 bg-secondary/5") : "border-white/5 bg-white/[0.02]"}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-sora font-bold text-sm text-on-background">{p1}</span>
        <span className="text-caption text-outline">({s1})</span>
        <span className="text-on-surface-variant mx-1">↔</span>
        <span className="font-sora font-bold text-sm text-on-background">{p2}</span>
        <span className="text-caption text-outline">({s2})</span>
        <span className="ml-auto">{aspect && aspectBadge(aspect.type)}</span>
        {aspect && <span className="text-caption text-outline">{aspect.degree}°</span>}
      </div>
      {aspect && <div className="text-caption text-on-surface-variant leading-relaxed mt-2">{ASPECT_MEANINGS[aspect.type]}</div>}
      {!aspect && (
        <div className="text-caption text-outline mt-2">Bu iki gezegen arasında belirgin bir açı bulunmuyor. Enerjileri bağımsız çalışıyor.</div>
      )}
    </div>
  );
}

function ScoreDetailBar({ icon, label, value, max, note, color, className = "" }: { icon: React.ReactNode; label: string; value: number; max: number; note: string; color: string; className?: string }) {
  const pct = Math.round((value / max) * 100);
  const rating = value >= max * 0.9 ? "Mükemmel" : value >= max * 0.7 ? "Çok İyi" : value >= max * 0.5 ? "Orta" : value >= max * 0.3 ? "Düşük" : "Zorlayıcı";
  return (
    <div className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 ${className}`}>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-label-md text-on-background">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/5 overflow-hidden flex">
            <div className={`h-full rounded-full transition-all ${color}`}
              style={{ width: `${pct}%` }} />
          </div>
          <span className="font-sora font-bold text-on-background tabular-nums">{pct}%</span>
          <span className="text-caption text-outline hidden sm:inline">— {rating}</span>
        </div>
      </div>
      <p className="text-caption text-on-surface-variant leading-relaxed">{note}</p>
    </div>
  );
}

export default function SynastryContent({ synastry, partnerName }: { synastry: SynastryResult; partnerName: string }) {
  const uc = synastry.userChart;
  const pc = synastry.partnerChart;

  const sunSignKey = `${uc.sun.sign}-${pc.sun.sign}`;
  const sunSignKeyRev = `${pc.sun.sign}-${uc.sun.sign}`;
  const overallText = overallNotes[sunSignKey] || overallNotes[sunSignKeyRev] || "";

  const userEl = (() => {
    const pts = synastry.elementScore.user;
    const total = Object.values(pts).reduce((s, v) => s + v, 0);
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(pts)) out[k] = total > 0 ? Math.round((v / 14) * 100) : 0;
    return out;
  })();
  const partnerEl = (() => {
    const pts = synastry.elementScore.partner;
    const total = Object.values(pts).reduce((s, v) => s + v, 0);
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(pts)) out[k] = total > 0 ? Math.round((v / 14) * 100) : 0;
    return out;
  })();

  return (
    <>
      {overallText && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-3">Özet Analiz</h4>
          <p className="text-on-surface-variant text-body-md leading-relaxed">{overallText}</p>
        </div>
      )}

      <div className="glass-card rounded-xl p-6 mb-6">
        <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">Uyum Skorları</h4>
        <p className="text-outline text-body-md mb-5">Beş farklı kategoride uyum seviyeniz</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreDetailBar className="md:col-span-2" icon={<span className="material-symbols-outlined text-sm text-primary">star</span>} label="Temel Uyum"
              value={synastry.compatibilityScores.temel} max={100}
            note="Güneş ve Ay burçlarınız arasındaki temel uyumu yansıtır. Birbirinizi doğal olarak ne kadar anladığınızı gösterir."
            color="bg-gradient-to-r from-primary to-secondary" />
          <ScoreDetailBar icon={<span>❤️</span>} label="Aşk"
            value={synastry.compatibilityScores.ask} max={10}
            note="Venüs ve Mars gezegenleriniz arasındaki etkileşimleri yansıtır. Romantik bağınızı ve fiziksel çekim seviyenizi gösterir."
            color="bg-primary/60" />
          <ScoreDetailBar icon={<span>💬</span>} label="İletişim"
            value={synastry.compatibilityScores.iletisim} max={10}
            note="Merkür, Güneş ve Ay arasındaki açıları yansıtır. Birbirinizle ne kadar kolay anlaştığınızı ve fikir alışverişinde bulunduğunuzu gösterir."
            color="bg-secondary/60" />
          <ScoreDetailBar icon={<span>🔥</span>} label="Tutku"
            value={synastry.compatibilityScores.tutku} max={10}
            note="Mars, Venüs ve Güneş arasındaki dinamikleri yansıtır. Aranızdaki kıvılcımı, heyecanı ve manyetik çekimi gösterir."
            color="bg-tertiary/60" />
          <ScoreDetailBar icon={<span>🏡</span>} label="Uzun Vade"
            value={synastry.compatibilityScores.uzunVade} max={10}
            note="Jüpiter ve Satürn arasındaki açıları yansıtır. Birlikte büyüme potansiyelinizi ve uzun vadeli hedeflerinizin uyumunu gösterir."
            color="bg-amber-400/60" />
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 mb-6">
        <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">💖 Büyük Üçlü Uyumu</h4>
        <p className="text-outline text-body-md mb-4">Birbirinizi genel olarak nasıl algıladığınızı gösterir.</p>
        <div className="space-y-3">
          {renderPair("Güneş", synastry.bigThree.sun.userSign, "Güneş", synastry.bigThree.sun.partnerSign, synastry.bigThree.sun.aspect)}
          {renderPair("Ay", synastry.bigThree.moon.userSign, "Ay", synastry.bigThree.moon.partnerSign, synastry.bigThree.moon.aspect)}
          {renderPair("Yükselen", synastry.bigThree.rising.userSign, "Yükselen", synastry.bigThree.rising.partnerSign, synastry.bigThree.rising.aspect)}
        </div>
      </div>

      {synastry.loveAspects.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">❤️ Aşk ve Çekim</h4>
          <p className="text-outline text-body-md mb-4">Sevgi dili, romantizm ve fiziksel çekim.</p>
          <div className="space-y-3">
            {synastry.loveAspects.map(a => renderPair(a.planet1, a.sign1, a.planet2, a.sign2, a))}
          </div>
        </div>
      )}

      {synastry.communicationAspects.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">🗣️ İletişim</h4>
          <p className="text-outline text-body-md mb-4">Birbirinizi ne kadar kolay anladığınızı gösterir.</p>
          <div className="space-y-3">
            {synastry.communicationAspects.map(a => renderPair(a.planet1, a.sign1, a.planet2, a.sign2, a))}
          </div>
        </div>
      )}

      {synastry.growthAspects.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">🌱 Birlikte Büyüme</h4>
          <p className="text-outline text-body-md mb-4">Ortak hedefler, uzun vadeli uyum ve sorumluluk.</p>
          <div className="space-y-3">
            {synastry.growthAspects.map(a => renderPair(a.planet1, a.sign1, a.planet2, a.sign2, a))}
          </div>
        </div>
      )}

      {synastry.challengingAspects.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">⚡ Zorlayıcı Noktalar</h4>
          <p className="text-outline text-body-md mb-4">İlişkide emek isteyen alanlar.</p>
          <div className="space-y-3">
            {synastry.challengingAspects.map(a => renderPair(a.planet1, a.sign1, a.planet2, a.sign2, a))}
          </div>
        </div>
      )}

      {synastry.supportiveAspects.length > 0 && (
        <div className="glass-card rounded-xl p-6 mb-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">✨ Destekleyen Noktalar</h4>
          <p className="text-outline text-body-md mb-4">İlişkiyi kolaylaştıran enerjiler.</p>
          <div className="space-y-3">
            {synastry.supportiveAspects.map(a => renderPair(a.planet1, a.sign1, a.planet2, a.sign2, a))}
          </div>
        </div>
      )}

      <div className="glass-card rounded-xl p-6 mb-6">
        <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">Element Karşılaştırması</h4>
        <p className="text-outline text-body-md mb-4">Element dengeleriniz nasıl örtüşüyor?</p>
        <div className="space-y-3">
          {["Ateş", "Toprak", "Hava", "Su"].map(el => (
            <div key={el} className="flex items-center gap-3">
              <span className="font-label-md text-on-surface-variant w-16">{el}</span>
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden flex">
                <div className="h-full bg-primary/60 rounded-l-full transition-all" style={{ width: `${userEl[el]}%` }} />
                <div className="h-full bg-secondary/60 rounded-r-full transition-all" style={{ width: `${partnerEl[el]}%` }} />
              </div>
              <span className="text-caption text-outline w-24 text-right">{userEl[el]}% · {partnerEl[el]}%</span>
            </div>
          ))}
        </div>
      </div>

      {synastry.userHouseOverlays.filter(h => h.planets.length > 0).length > 0 && (
        <div className="glass-card rounded-xl p-6">
          <h4 className="font-sora text-headline-sm text-on-background font-bold mb-1">{partnerName}'nin Gezegenleri Senin Evlerinde</h4>
          <p className="text-outline text-body-md mb-4">Onun gezegenleri hayatının hangi alanlarını etkiliyor?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {synastry.userHouseOverlays.filter(h => h.planets.length > 0).map(h => {
              const houseMeanings: Record<number, string> = {
                1: "Kişilik, görünüş, hayata yaklaşım",
                2: "Maddi değerler, özgüven, kaynaklar",
                3: "İletişim, kardeşler, yakın çevre",
                4: "Aile, kökler, ev, duygusal temel",
                5: "Aşk, yaratıcılık, çocuk, eğlence",
                6: "Sağlık, günlük rutin, hizmet",
                7: "İlişkiler, ortaklık, evlilik",
                8: "Dönüşüm, ortak kaynaklar, gizem",
                9: "Seyahat, felsefe, yüksek öğrenim",
                10: "Kariyer, toplumsal statü, hedefler",
                11: "Arkadaşlık, grup, idealler",
                12: "Bilinçaltı, yalnızlık, ruhsal gelişim",
              };
              return (
                <div key={h.houseNum} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="font-label-md text-primary">{h.houseTitle}</div>
                  <div className="text-caption text-on-surface-variant mt-0.5">{houseMeanings[h.houseNum]}</div>
                  <div className="text-label-md text-on-background mt-2">{h.planets.join(" · ")}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
