"use client";

import { useState } from "react";
import { useCredits } from "@/components/CreditProvider";

type SpreadType = "daily" | "three" | "love" | "career" | null;

type CardData = {
  name: string;
  desc: string;
  detail: string;
  icon: string;
};

const spreads: { id: SpreadType; icon: string; title: string; desc: string; cardCount: number }[] = [
  { id: "daily", icon: "today", title: "Günün Kartı", desc: "Bugünün enerjisini ve rehberliğini tek bir kartla keşfet.", cardCount: 1 },
  { id: "three", icon: "filter_3", title: "Üç Kart Açılımı", desc: "Geçmiş, Şimdi ve Gelecek arasındaki derin bağları incele.", cardCount: 3 },
  { id: "love", icon: "favorite", title: "Aşk ve İlişkiler", desc: "Duygusal dünyandaki gizemleri ve potansiyelleri gör.", cardCount: 2 },
  { id: "career", icon: "work_history", title: "Kariyer ve Başarı", desc: "İş hayatın ve maddi durumunla ilgili kozmik tavsiyeler al.", cardCount: 2 },
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
  const { credits, authenticated, loading, refresh, useCredit } = useCredits();

  const [activeSpread, setActiveSpread] = useState<SpreadType>(null);
  const [cards, setCards] = useState<{ revealed: boolean; data: CardData | null }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [noCredit, setNoCredit] = useState(false);

  async function changeSpread(type: SpreadType) {
    const spread = spreads.find((s) => s.id === type);
    if (!spread) return;

    if (deck.length === 0) {
      setNoCredit(true);
      return;
    }

    if (!authenticated) {
      setNoCredit(true);
      return;
    }

    if (credits <= 0) {
      setNoCredit(true);
      return;
    }

    const result = await useCredit();
    if (!result.success) {
      setNoCredit(true);
      return;
    }

    setNoCredit(false);
    setActiveSpread(type);
    setShowResult(false);

    const shuffled = shuffle(deck);
    setCards(
      Array.from({ length: spread.cardCount }, (_, i) => ({
        revealed: false,
        data: null,
      }))
    );
  }

  function revealCard(index: number) {
    if (cards[index].revealed) return;

    const shuffled = shuffle(deck);
    const updated = [...cards];
    updated[index] = { revealed: true, data: shuffled[0] };
    setCards(updated);

    const allRevealed = updated.every((c) => c.revealed);
    if (allRevealed) {
      setTimeout(() => setShowResult(true), 800);
    }
  }

  function resetBoard() {
    setActiveSpread(null);
    setCards([]);
    setShowResult(false);
    setNoCredit(false);
  }

  const activeSpreadData = spreads.find((s) => s.id === activeSpread);

  return (
    <main className="flex-grow pt-24 pb-16 relative overflow-hidden nebula-bg min-h-screen">
      {/* Ambient candle glows */}
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop mb-12 text-center relative z-10">
        <h1 className="font-sora text-headline-lg text-white mb-4 font-bold">Kehanet Odası</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Yıldızların ve kartların rehberliğinde gizemli bir yolculuğa çıkın.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="material-symbols-outlined text-tertiary text-lg">diamond</span>
          <span className="font-label-md text-tertiary">{loading ? "..." : credits} Kredi</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Spread Options Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {spreads.map((s) => (
            <button
              key={s.id}
              onClick={() => changeSpread(s.id)}
              disabled={cards.length > 0 && !showResult}
              className={`glass-card p-6 rounded-xl text-left border-l-4 transition-all hover:translate-x-2 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${
                activeSpread === s.id ? "border-tertiary" : "border-primary/20 hover:border-primary"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-tertiary">{s.icon}</span>
                <h3 className="font-sora text-body-lg text-white font-semibold">{s.title}</h3>
              </div>
              <p className="text-caption text-on-surface-variant text-left">{s.desc}</p>
            </button>
          ))}

          {authenticated && (
            <div className="mt-4 p-4 glass-card rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-lg">diamond</span>
              <div className="text-sm text-on-surface-variant">
                Kalan kredi:{" "}
                <span className="text-tertiary font-bold">{loading ? "..." : credits}</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Table */}
        <div className="lg:col-span-9 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[600px] border-white/5">
          {/* Mystical circles */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-tertiary/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-secondary/10 rounded-full" />
          </div>

          {/* Cards Display */}
          {cards.length > 0 && activeSpreadData && (
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-20 transition-all duration-700">
              {activeSpreadData.id === "three" &&
                ["Geçmiş", "Şimdi", "Gelecek"].map((label, i) => (
                  cards[i]?.revealed && (
                    <div key={label} className="absolute top-4 text-caption text-primary/60 uppercase tracking-widest">
                      {label}
                    </div>
                  )
                ))}

              {cards.map((card, i) => (
                <div
                  key={i}
                  onClick={() => revealCard(i)}
                  className={`tarot-card cursor-pointer w-48 h-80 md:w-56 md:h-96 ${card.revealed ? "flipped card-revealed" : "hover:-translate-y-2"}`}
                  style={{ perspective: "1000px", transition: "all 0.3s ease" }}
                >
                  <div
                    className="tarot-card-inner relative w-full h-full rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      transform: card.revealed ? "rotateY(180deg)" : "",
                      borderColor: card.revealed ? "rgba(249,189,34,0.4)" : "rgba(255,255,255,0.15)",
                      borderWidth: "2px",
                      boxShadow: card.revealed
                        ? "0 0 40px rgba(208,188,255,0.3), 0 0 80px rgba(249,189,34,0.15)"
                        : "0 8px 32px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Card Back */}
                    <div className="tarot-card-back bg-gradient-to-br from-indigo-900 via-surface to-purple-900 flex items-center justify-center p-4">
                      <div className="w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden">
                        {/* Mandala pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-primary/30 rounded-full" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-tertiary/20 rounded-full" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-secondary/10 rounded-full" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/10 rounded-full" />
                          {/* Star points */}
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                            <div
                              key={deg}
                              className="absolute top-1/2 left-1/2 w-px h-16 bg-primary/20"
                              style={{ transform: `translate(-50%, -100%) rotate(${deg}deg)`, transformOrigin: "bottom center" }}
                            />
                          ))}
                        </div>
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 animate-shimmer" />
                        {/* Center symbol */}
                        <span className="material-symbols-outlined text-5xl md:text-6xl text-primary/60 gold-foil bg-clip-text text-transparent relative z-10">
                          auto_awesome
                        </span>
                      </div>
                      {/* Gold border accent */}
                      <div className="absolute inset-3 rounded-xl border border-tertiary/10 pointer-events-none" />
                    </div>

                    {/* Card Front */}
                    <div className="tarot-card-front bg-gradient-to-b from-surface-container-high via-surface-container to-surface-container-low flex flex-col items-center justify-center p-6 text-center">
                      {card.revealed && card.data ? (
                        <>
                          <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-tertiary/20 to-primary/20 flex items-center justify-center shadow-[0_0_20px_rgba(249,189,34,0.2)]">
                            <span className="material-symbols-outlined text-4xl text-tertiary">
                              {card.data.icon}
                            </span>
                          </div>
                          <h4 className="font-sora text-headline-md text-white mb-1 font-bold leading-tight">
                            {card.data.name}
                          </h4>
                          <p className="text-caption text-tertiary mb-3 uppercase tracking-widest">
                            {card.data.desc}
                          </p>
                          <div className="w-8 h-0.5 gold-foil rounded-full mb-3" />
                          <p className="text-caption text-on-surface-variant leading-relaxed">
                            {card.data.detail}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-primary/60">
                              star
                            </span>
                          </div>
                          <h4 className="font-sora text-headline-md text-white mb-2 font-semibold">
                            Gizemli Kart
                          </h4>
                          <div className="w-12 h-0.5 bg-primary/30 mb-4" />
                          <p className="text-caption text-on-surface-variant italic">
                            Dokunarak çevir...
                          </p>
                        </>
                      )}
                      {/* Decorative corners */}
                      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-tertiary/20 rounded-tl" />
                      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-tertiary/20 rounded-tr" />
                      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-tertiary/20 rounded-bl" />
                      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-tertiary/20 rounded-br" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Initial Prompt */}
          {!activeSpread && !noCredit && (
            <div className="text-center space-y-6 relative z-20">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-tertiary/20 rounded-full blur-2xl animate-pulse" />
                <span className="material-symbols-outlined text-7xl text-tertiary relative z-10 floating">
                  auto_awesome
                </span>
              </div>
              <h3 className="font-sora text-headline-md text-white font-bold">Kehanetine Başla</h3>
              <p className="text-body-md text-on-surface-variant max-w-sm mx-auto">
                Soldaki menüden bir açılım seçin ve ruhunuzu kartların enerjisine hazırlayın.
              </p>
            </div>
          )}

          {/* No Credit Gate */}
          {noCredit && (
            <div className="text-center space-y-6 relative z-20 max-w-sm">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-error/20 rounded-full blur-2xl animate-pulse" />
                <span className="material-symbols-outlined text-5xl text-error relative z-10">hourglass_empty</span>
              </div>
              {!authenticated ? (
                <>
                  <h3 className="font-sora text-headline-md text-white font-bold">Giriş Yapmalısın</h3>
                  <p className="text-body-md text-on-surface-variant">
                    Kehanet odasını kullanmak için giriş yapman gerekiyor. Her gün 2 ücretsiz kredi seni bekliyor.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="/giris"
                      className="w-full py-3 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all text-center inline-block"
                    >
                      Giriş Yap
                    </a>
                    <a
                      href="/kayit"
                      className="w-full py-3 glass text-white font-label-md rounded-full hover:bg-white/10 transition-all text-center inline-block"
                    >
                      Kayıt Ol
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-sora text-headline-md text-white font-bold">Kredin Kalmadı</h3>
                  <p className="text-body-md text-on-surface-variant">
                    Günlük kredilerini tükettin. Yeni krediler yarın sıfırlanacak veya bir reklam izleyerek kredi kazanabilirsin.
                  </p>
                  <button
                    disabled
                    title="Yakında kullanıma sunulacak"
                    className="w-full py-3 bg-gradient-to-r from-secondary-container to-primary-container text-white/60 font-label-md rounded-full cursor-not-allowed opacity-70"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">play_circle</span>
                      Reklam İzle, Kredi Kazan (Yakında)
                    </span>
                  </button>
                </>
              )}
              <button
                onClick={() => setNoCredit(false)}
                className="text-caption text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                Geri dön
              </button>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className="mt-12 text-center max-w-xl z-20 relative animate-fadeIn">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary text-xl">auto_awesome</span>
                <h4 className="font-sora text-headline-md text-white font-semibold">
                  Evrenin Sesini Dinleyin
                </h4>
              </div>
              <div className="w-16 h-0.5 gold-foil rounded-full mx-auto mb-4" />
              <p className="text-body-md text-on-surface-variant">
                Seçtiğiniz kartlar ruhunuzun o anki enerjisini yansıtıyor. Bu mesajları kalbinizle yorumlayın.
              </p>
              <button
                onClick={resetBoard}
                className="mt-8 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
              >
                Yeni Bir Kehanet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating decorations */}
      <div className="absolute top-1/4 right-5 w-16 h-16 border border-white/10 rounded-full floating pointer-events-none" style={{ animationDelay: "-1s" }} />
      <div className="absolute bottom-1/3 left-5 w-24 h-24 border border-white/5 rounded-full floating pointer-events-none" style={{ animationDelay: "-2s" }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .floating { animation: float 4s ease-in-out infinite; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </main>
  );
}
