"use client";

import { useState } from "react";
import AdSlot from "@/components/ads/AdSlot";

type SpreadType = "daily" | "three" | "love" | "career";

type CardData = {
  name: string;
  desc: string;
  detail: string;
  icon: string;
};

const spreads: { id: SpreadType; icon: string; title: string; desc: string; cardCount: number; labels: string[] }[] = [
  { id: "daily", icon: "today", title: "Günün Kartı", desc: "Bugünün enerjisini ve rehberliğini tek bir kartla keşfet.", cardCount: 1, labels: ["Günün Kartı"] },
  { id: "three", icon: "filter_3", title: "Üç Kart Açılımı", desc: "Geçmiş, Şimdi ve Gelecek arasındaki derin bağları incele.", cardCount: 3, labels: ["Geçmiş", "Şimdi", "Gelecek"] },
  { id: "love", icon: "favorite", title: "Aşk ve İlişkiler", desc: "Duygusal dünyandaki gizemleri ve potansiyelleri gör.", cardCount: 2, labels: ["Siz", "Partner"] },
  { id: "career", icon: "work_history", title: "Kariyer ve Başarı", desc: "İş hayatın ve maddi durumunla ilgili kozmik tavsiyeler al.", cardCount: 1, labels: ["Kariyer"] },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TarotTable({ deck }: { deck: CardData[] }) {
  const [activeSpread, setActiveSpread] = useState<SpreadType | null>(null);
  const [shuffledDeck, setShuffledDeck] = useState<CardData[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const activeSpreadData = spreads.find((s) => s.id === activeSpread);
  const allSelected = activeSpreadData ? selectedIndices.length >= activeSpreadData.cardCount : false;

  function selectSpread(type: SpreadType) {
    if (deck.length === 0) return;
    setActiveSpread(type);
    setSelectedIndices([]);
    setShuffledDeck(shuffle(deck));
  }

  function handleCardClick(deckIndex: number) {
    if (!activeSpreadData) return;
    if (selectedIndices.includes(deckIndex)) return;
    if (allSelected) return;

    setSelectedIndices([...selectedIndices, deckIndex]);
  }

  function resetAll() {
    setActiveSpread(null);
    setSelectedIndices([]);
    setShuffledDeck([]);
    setShowModal(false);
  }

  const selectedCards = selectedIndices.map((idx, i) => ({
    deckIndex: idx,
    data: shuffledDeck[idx],
    label: activeSpreadData?.labels[i] || "",
  }));

  return (
    <main className="flex-grow pt-24 pb-16 relative overflow-hidden nebula-bg min-h-screen">
      <div
        className="absolute top-40 left-10 w-96 h-96 pointer-events-none"
        style={{
          filter: "blur(40px)",
          background: "radial-gradient(circle, rgba(249,189,34,0.15) 0%, rgba(249,189,34,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 opacity-60 pointer-events-none"
        style={{
          filter: "blur(40px)",
          background: "radial-gradient(circle, rgba(249,189,34,0.15) 0%, rgba(249,189,34,0) 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center relative z-10">
        <h1 className="font-sora text-3xl md:text-4xl text-white mb-3 font-bold">Kehanet Odası</h1>
        <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
          Yıldızların ve kartların rehberliğinde gizemli bir yolculuğa çıkın.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Spread Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {spreads.map((s) => (
            <button
              key={s.id}
              onClick={() => selectSpread(s.id)}
              className={`glass-card p-5 rounded-xl text-center border transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ${
                activeSpread === s.id
                  ? "border-primary/60 shadow-lg shadow-primary/10"
                  : "border-white/10 hover:border-primary/40"
              }`}
            >
              <span className="material-symbols-outlined text-3xl text-tertiary mb-2 block">{s.icon}</span>
              <h3 className="font-sora text-sm text-white font-semibold mb-1">{s.title}</h3>
              <p className="text-xs text-on-surface-variant">{s.desc}</p>
            </button>
          ))}
        </div>

        {/* Active Spread Info */}
        {activeSpread && activeSpreadData && (
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="material-symbols-outlined text-tertiary text-xl">{activeSpreadData.icon}</span>
              <h2 className="font-sora text-xl text-white font-bold">{activeSpreadData.title}</h2>
            </div>
            <p className="text-sm text-on-surface-variant">
              Lütfen {activeSpreadData.cardCount} kart seçin
              {!allSelected && selectedIndices.length > 0 && ` — ${activeSpreadData.cardCount - selectedIndices.length} kart kaldı`}
            </p>
          </div>
        )}

        {/* Card Grid - Only card backs shown */}
        {activeSpread && shuffledDeck.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-5xl mx-auto">
              {shuffledDeck.map((_, i) => {
                const isSelected = selectedIndices.includes(i);

                return (
                  <div
                    key={i}
                    onClick={() => handleCardClick(i)}
                    className={`tarot-card relative transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-primary/60 scale-105 shadow-[0_0_20px_rgba(249,189,34,0.3)]"
                        : "hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(208,188,255,0.2)]"
                    } ${!isSelected && !allSelected ? "cursor-pointer" : "cursor-default"}`}
                    style={{
                      width: "clamp(48px, 8vw, 72px)",
                      height: "clamp(72px, 12vw, 108px)",
                      borderRadius: "8px",
                    }}
                  >
                    {/* Realistic Tarot Card Back */}
                    <div className="w-full h-full rounded-lg overflow-hidden relative" style={{
                      background: "linear-gradient(135deg, #1a1040 0%, #2d1b69 30%, #1a1040 60%, #0f0a2e 100%)",
                      border: "2px solid rgba(249,189,34,0.35)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.3)",
                    }}>
                      {/* Inner border */}
                      <div className="absolute inset-1 rounded-md border border-primary/20" />
                      {/* Center mandala */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-3/4 h-3/4">
                          {/* Outer circle */}
                          <div className="absolute inset-0 rounded-full border-2 border-primary/25" />
                          {/* Middle circle */}
                          <div className="absolute inset-[15%] rounded-full border border-tertiary/30" />
                          {/* Inner circle */}
                          <div className="absolute inset-[30%] rounded-full border border-primary/20" />
                          {/* Star pattern */}
                          {[0, 30, 60, 90, 120, 150].map((deg) => (
                            <div
                              key={deg}
                              className="absolute top-1/2 left-1/2 w-px h-full bg-primary/15"
                              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
                            />
                          ))}
                          {/* Center dot */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/30" />
                          {/* Corner diamonds */}
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-primary/20" />
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-primary/20" />
                          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-primary/20" />
                          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-primary/20" />
                        </div>
                      </div>
                      {/* Gold shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5" />
                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                          <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Button */}
        {activeSpread && allSelected && (
          <div className="text-center animate-fadeIn mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-on-primary px-10 py-3 rounded-full text-sm font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
            >
              Seçimi Tamamla
            </button>
          </div>
        )}

        {/* Empty state */}
        {!activeSpread && deck.length === 0 && (
          <div className="text-center space-y-6 py-20">
            <span className="material-symbols-outlined text-6xl text-error">error</span>
            <h3 className="font-sora text-xl text-white font-bold">Kartlar Yüklenemedi</h3>
            <p className="text-sm text-on-surface-variant">Lütfen biraz sonra tekrar deneyin.</p>
          </div>
        )}
      </div>

      {/* Modal - Cards revealed here */}
      {showModal && activeSpreadData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative bg-surface-container rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors cursor-pointer z-10"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-xl">{activeSpreadData.icon}</span>
                <h2 className="font-sora text-2xl text-white font-bold">{activeSpreadData.title}</h2>
              </div>
              <div className="w-16 h-0.5 gold-foil rounded-full mx-auto" />
            </div>

            <div className={`grid gap-6 mb-8 ${
              selectedCards.length === 1 ? "grid-cols-1 max-w-md mx-auto" :
              selectedCards.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto" :
              "grid-cols-1 md:grid-cols-3"
            }`}>
              {selectedCards.map((sc) => (
                <div key={sc.deckIndex} className="glass-card rounded-2xl overflow-hidden border border-white/10">
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden" style={{
                    background: "linear-gradient(135deg, #1a1040 0%, #2d1b69 40%, #4a2c8a 70%, #1a1040 100%)",
                  }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-7xl text-primary/40">{sc.data.icon}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
                    {/* Card number overlay */}
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs text-primary font-semibold">{sc.label}</span>
                    </div>
                  </div>
                  {/* Card Info */}
                  <div className="p-5 text-center">
                    <h4 className="font-sora text-lg text-white mb-1 font-bold">{sc.data.name}</h4>
                    <p className="text-xs text-tertiary mb-3 uppercase tracking-wider">{sc.data.desc}</p>
                    <div className="w-8 h-0.5 gold-foil rounded-full mx-auto mb-3" />
                    <p className="text-sm text-on-surface-variant leading-relaxed">{sc.data.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-on-surface-variant mb-4">
                Seçtiğiniz kartlar ruhunuzun o anki enerjisini yansıtıyor. Bu mesajları kalbinizle yorumlayın.
              </p>
              <button
                onClick={resetAll}
                className="bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
              >
                Yeni Kart Seç
              </button>
            </div>
          </div>
        </div>
      )}

      <AdSlot
        name="tarot"
        className="max-w-7xl mx-auto px-4 md:px-8 my-12"
      />

      <div className="absolute top-1/4 right-5 w-16 h-16 border border-white/10 rounded-full floating pointer-events-none" style={{ animationDelay: "-1s" }} />
      <div className="absolute bottom-1/3 left-5 w-24 h-24 border border-white/5 rounded-full floating pointer-events-none" style={{ animationDelay: "-2s" }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .floating { animation: float 4s ease-in-out infinite; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </main>
  );
}
