"use client";

import { useState } from "react";

const messages = [
  {
    title: "Yıldızların Sesi",
    body: "Sezgilerin bugün her zamankinden güçlü. İç sesini dinle, o sana yolu gösterecek.",
    manifest: "Ben evrenin bolluğuna ve rehberliğine açığım.",
    task: "Bugün 5 dakika sessizlikte kal ve nefesine odaklan.",
    icon: "visibility",
  },
  {
    title: "Yıldızların Sesi",
    body: "Yaratıcılığının zirvesindesin. Bugün hayallerini somut birer projeye dönüştürmek için harika bir gün.",
    manifest: "Yaratıcı enerjimle dünyayı güzelleştiriyorum.",
    task: "Daha önce hiç denemediğin bir yoldan yürümeyi dene.",
    icon: "brightness_high",
  },
  {
    title: "Yıldızların Sesi",
    body: "Geçmişin yüklerinden kurtulma zamanı. Affetmek, karşı tarafa bir ödül değil, senin ruhuna bir özgürlüktür.",
    manifest: "Geçmişi sevgiyle bırakıyor, şimdiye odaklanıyorum.",
    task: "Seni yoran bir eşyayı bugün hayatından çıkar.",
    icon: "cyclone",
  },
];

export default function DailyMessage() {
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <section className="relative py-section-gap overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 star-drift" />
      <div className="container mx-auto px-container-padding-desktop relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <span className="material-symbols-outlined text-5xl text-tertiary drop-shadow-[0_0_15px_rgba(249,189,34,0.5)]">
              stars
            </span>
          </div>
          <h2 className="font-sora text-headline-lg lg:text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-tertiary via-secondary to-primary font-bold">
            Bugün Evrenin Sana Bir Mesajı Var
          </h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Bugünün ilham mesajını görmek için kartlardan birini seç.
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto"
          style={{ perspective: "1000px" }}
          id="message-cards-container"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`relative h-[420px] cursor-pointer transition-all duration-500 ${
                revealed !== null && revealed !== i
                  ? "opacity-40 grayscale-[50%] pointer-events-none scale-[0.95]"
                  : ""
              }`}
              style={{ perspective: "1000px" }}
              onClick={() => revealed === null && setRevealed(i)}
            >
              <div
                className={`cosmic-card h-full w-full relative transition-transform duration-700`}
                style={{ transformStyle: "preserve-3d", transform: revealed === i ? "rotateY(180deg)" : "" }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass rounded-[2.5rem] border-2 border-tertiary/30 flex flex-col items-center justify-center overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest to-surface-container opacity-90" />
                  <div className="relative z-10 border border-tertiary/20 w-[85%] h-[90%] rounded-[2.2rem] flex flex-col items-center justify-center gap-4">
                    <span className="material-symbols-outlined text-7xl text-tertiary animate-pulse-soft">
                      {msg.icon}
                    </span>
                    <div className="text-label-md text-tertiary tracking-[0.3em] uppercase font-bold">
                      Kaderini Seç
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 glass rounded-[2.5rem] border-2 border-primary/30 overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="h-full w-full bg-gradient-to-b from-surface-container-high to-surface-container p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="font-sora text-tertiary text-headline-md font-semibold">{msg.title}</div>
                    <div className="w-12 h-px bg-tertiary/30" />
                    <p className="text-body-md text-on-surface leading-relaxed">{msg.body}</p>
                    <div className="space-y-2">
                      <div className="text-caption text-secondary font-bold uppercase tracking-widest">
                        Günün Manifesti
                      </div>
                      <p className="text-body-md italic">{msg.manifest}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5 w-full">
                      <div className="text-caption text-primary font-bold mb-1">Günün Küçük Görevi</div>
                      <p className="text-caption text-on-surface-variant">{msg.task}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-caption text-on-surface-variant italic tracking-wider opacity-60">
            Yarın seni yeni bir mesaj bekliyor.
          </p>
        </div>
      </div>
    </section>
  );
}
