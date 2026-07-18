"use client";

import { useState, useCallback } from "react";

const cosmicMessages = [
  { body: "Sezgilerin bugün her zamankinden güçlü. İç sesini dinle, o sana yolu gösterecek.", manifest: "Ben evrenin bolluğuna ve rehberliğine açığım.", task: "Bugün 5 dakika sessizlikte kal ve nefesine odaklan." },
  { body: "Yaratıcılığının zirvesindesin. Bugün hayallerini somut birer projeye dönüştürmek için harika bir gün.", manifest: "Yaratıcı enerjimle dünyayı güzelleştiriyorum.", task: "Daha önce hiç denemediğin bir yoldan yürümeyi dene." },
  { body: "Geçmişin yüklerinden kurtulma zamanı. Affetmek, karşı tarafa bir ödül değil, senin ruhuna bir özgürlüktür.", manifest: "Geçmişi sevgiyle bırakıyor, şimdiye odaklanıyorum.", task: "Seni yoran bir eşyayı bugün hayatından çıkar." },
  { body: "Bugün yeni bir başlangıç için ideal bir gün. Eski kalıpları kır ve kendine yeni bir sayfa aç.", manifest: "Her gün yeni bir başlangıçtır, ben buna hazırım.", task: "Bugün yapmaktan hoşlanmadığın bir alışkanlığını değiştir." },
  { body: "İçindeki gücü keşfetme zamanı. Başkalarının seni sınırlamasına izin verme, kendi yolunu çiz.", manifest: "Ben kendi kaderimin yaratıcısıyım.", task: "Bugün seni rahatsız eden bir konuda net bir karar ver." },
  { body: "Şükretme zamanı. Hayatındaki güzelliklerin farkına var, minnettarlık enerjini yükseltecek.", manifest: "Şükran dolu bir kalple yaşıyorum.", task: "Bugün 3 kişiye içten bir iltifat söyle." },
  { body: "Sosyal ilişkilerinde parlak bir gün. Yeni insanlarla tanış ve eski bağlarını yenile.", manifest: "Ben sevgi dolu ilişkilerin merkezindeyim.", task: "Uzun zamandır ulaşamadığın birine mesaj at." },
  { body: "Enerjini koruma zamanı. Negatif insanlardan uzak dur ve kendi alanını kutsa.", manifest: "Ben negatif enerjilerden korunuyorum, sadece iyiliği hayatıma çekiyorum.", task: "Bugün 10 dakika meditasyon yap ve enerjini temizle." },
  { body: "Sabırlı ol, evren senin için çalışıyor. Beklediğin sonuçlar yolda, sadece zamana bırak.", manifest: "Ben sabırla bekliyorum, çünkü biliyorum ki en güzel şeyler zamana yayılır.", task: "Bugün acele etmediğin bir konuda kendine teşekkür et." },
  { body: "Hayatında yeni bir dönem açılıyor. Geçmiş deneyimlerinden ders alarak ileriye bak.", manifest: "Her deneyim beni daha güçlü kılıyor.", task: "Bugün geçmişteki bir başarını hatırla ve kendini kutla." },
  { body: "Bedensel ve zihinsel sağlığına özen gösterme zamanı. Kendini şımart, ruhunu besle.", manifest: "Ben bedenimi ve ruhumu sevgiyle şifalandırıyorum.", task: "Bugün sevdiğin bir aktivite için kendine zaman ayır." },
  { body: "Karşına yeni fırsatlar çıkıyor. Cesur ol ve adım at, evren seni destekliyor.", manifest: "Ben fırsatları görmeye ve değerlendirmeye açığım.", task: "Bugün daha önce düşünmediğin bir olasılığı değerlendir." },
  { body: "Doğayla bağ kurma zamanı. Toprakla temas kur, enerjini yenile.", manifest: "Ben doğanın bir parçasıyım ve ondan güç alıyorum.", task: "Bugün yeşil bir alanda yürüyüş yap veya bitkilerinle ilgilen." },
  { body: "Kendine dürüst olma zamanı. İç yüzüne bak ve gerçek benliğini kucakla.", manifest: "Ben kendimi olduğu gibi kabul ediyorum ve seviyorum.", task: "Bugün aynaya bak ve kendine 3 güzel şey söyle." },
  { body: "Renkler enerji taşır. Mor ve altın renklerine odaklan, ruhsal gelişimini destekleyecek.", manifest: "Ben evrenin renkleriyle uyum içindeyim.", task: "Bugün mor veya altın rengi bir aksesuar kullan." },
  { body: "Müzik ruhun gıdası. Bugün sevdiğin bir şarkıyı dans ederek dinle.", manifest: "Müzik beni yükseltir ve özgürleştirir.", task: "Bugün 5 dakika ritim eşliğinde dans et." },
  { body: "Beslenme şeklin ruhsal enerjini etkiler. Bugün doğal ve taze gıdalarla beslen.", manifest: "Ben bedenimi en güzel gıdalarla besliyorum.", task: "Bugün yeni bir meyve veya sebze dene." },
  { body: "Dinlenme zamanı. Yeterince uyuduğundan emin ol, rüyaların sana mesajlar getirecek.", manifest: "Ben dinlenmeye ve rüyalarımın rehberliğine açığım.", task: "Bugün erken yat ve rüyalarını not et." },
  { body: "Gülümsemenin gücünü hafife alma. Bugün bol gülümse, hem kendini hem başkalarını mutlu et.", manifest: "Gülümsemem dünyayı güzelleştiriyor.", task: "Bugün yabancı birine gülümse ve gününü aydınlat." },
  { body: "Her adım seni hedefine yaklaştırır. Küçük ama emin adımlarla ilerle.", manifest: "Ben her adımda büyüyor ve öğreniyorum.", task: "Bugün hedeflerinden biri için küçük bir adım at." },
  { body: "Zihnini boşalt ve sadece anda kal. Geçmişin pişmanlıkları ve geleceğin kaygıları seni yavaşlatıyor.", manifest: "Ben şu anda yaşıyorum, geçmiş ve gelecek sadece düşüncede var.", task: "Bugün 3 kez derin nefes al ve sadece o ana odaklan." },
  { body: "Bugün birine yardım et. Küçük bir iyilik bile evrenin dengesini değiştirir.", manifest: "Ben iyilik dağıtacak bir ışığım.", task: "Bugün tanımadığın birine ufak bir iyilik yap." },
  { body: "Korkularınla yüzleşme zamanı. Onlar sadece zihninin yarattığı gölgeler.", manifest: "Ben korkularımın üstesinden gelirim, çünkü onlar sadece yanılsama.", task: "Bugün en çok korktuğun şey hakkında 5 dakika düşün." },
  { body: "Bugün kendin için bir şey yap. Başkalarını mutlu etmeden önce kendini mutlu et.", manifest: "Ben kendime değer veriyorum, çünkü ben değerliyim.", task: "Bugün en sevdiğin yemeği ye veya en sevdiğin müziği dinle." },
  { body: "Doğanın ritmine uyumlan. Ağaçların, kuşların ve rüzgarın mesajını dinle.", manifest: "Ben doğanın bir parçasıyım ve onun bilgeliğine sahibim.", task: "Bugün 10 dakika açık havada yürü ve etrafını gözlemle." },
  { body: "Bugün yeni bir beceri öğren. Zihnini canlı tut ve merakını besle.", manifest: "Ben sürekli öğrenen ve büyüyen bir varlığım.", task: "Bugün daha önce bilmediğin bir konuda 15 dakika okuma yap." },
  { body: "Vücudunu dinle. Yorgunsan dinlen, susuzsan su iç, açsan ye. Basit ihtiyaçlarına kulak ver.", manifest: "Ben bedenimin bilgeliğine güveniyorum.", task: "Bugün su içme alışkanlığını kontrol et, en az 8 bardak su iç." },
  { body: "Bugün eski bir arkadaşını hatırla. Ona bir mesaj at veya sadece güzel bir anıyı anımsa.", manifest: "Ben sevgi dolu bağlar kuruyorum ve onları besliyorum.", task: "Bugün uzun süredir konuşmadığın birine selam gönder." },
];

const cardConfig = [
  { sectionTitle: "Günün Mesajı", icon: "visibility", color: "text-tertiary", border: "border-tertiary/30", gradient: "from-tertiary/10 to-transparent" },
  { sectionTitle: "Günün Manifesti", icon: "brightness_high", color: "text-secondary", border: "border-secondary/30", gradient: "from-secondary/10 to-transparent" },
  { sectionTitle: "Günün Küçük Görevi", icon: "cyclone", color: "text-primary", border: "border-primary/30", gradient: "from-primary/10 to-transparent" },
];

function pickRandom(count: number, exclude: number[] = []): number[] {
  const available = cosmicMessages.map((_, i) => i).filter(i => !exclude.includes(i));
  const picked: number[] = [];
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    picked.push(available[idx]);
    available.splice(idx, 1);
  }
  return picked;
}

export default function DailyMessage() {
  const [revealed, setRevealed] = useState<number | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>(() => pickRandom(3));

  const handleCardClick = useCallback((cardIndex: number) => {
    if (revealed !== null) return;
    setRevealed(cardIndex);
  }, [revealed]);

  const handleReset = useCallback(() => {
    setSelectedIndices(pickRandom(3));
    setRevealed(null);
  }, []);

  return (
    <section className="relative py-section-gap overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 star-drift" />
      <div className="container mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
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
          {cardConfig.map((cfg, i) => {
            const msgIdx = selectedIndices[i];
            const msg = cosmicMessages[msgIdx];

            return (
              <div
                key={i}
                className={`relative h-[360px] md:h-[420px] cursor-pointer transition-all duration-500 ${
                  revealed !== null && revealed !== i
                    ? "opacity-40 grayscale-[50%] pointer-events-none scale-[0.95]"
                    : ""
                }`}
                style={{ perspective: "1000px" }}
                onClick={() => handleCardClick(i)}
              >
                <div
                  className="cosmic-card h-full w-full relative transition-transform duration-700"
                  style={{ transformStyle: "preserve-3d", transform: revealed === i ? "rotateY(180deg)" : "" }}
                >
                  {/* Front */}
                  <div
                    className={`absolute inset-0 glass rounded-[2.5rem] border-2 ${cfg.border} flex flex-col items-center justify-center overflow-hidden`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest to-surface-container opacity-90" />
                    <div className="relative z-10 border border-white/10 w-[85%] h-[90%] rounded-[2.2rem] flex flex-col items-center justify-center gap-4">
                      <span className={`material-symbols-outlined text-7xl ${cfg.color} animate-pulse-soft`}>
                        {cfg.icon}
                      </span>
                      <div className={`text-label-md ${cfg.color} tracking-[0.3em] uppercase font-bold`}>
                        {cfg.sectionTitle}
                      </div>
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 glass rounded-[2.5rem] border-2 border-primary/30 overflow-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className={`h-full w-full bg-gradient-to-b ${cfg.gradient} to-surface-container p-8 flex flex-col items-center justify-center text-center space-y-6`}>
                      <div className={`font-sora ${cfg.color} text-headline-md font-semibold`}>{cfg.sectionTitle}</div>
                      <div className={`w-12 h-px ${cfg.border}`} />
                      {i === 0 && (
                        <>
                          <p className="text-body-md text-on-surface leading-relaxed">{msg.body}</p>
                          <div className="space-y-2">
                            <div className="text-caption text-tertiary font-bold uppercase tracking-widest">İç Ses</div>
                            <p className="text-body-md italic text-on-surface-variant">&ldquo;{msg.body}&rdquo;</p>
                          </div>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <p className="text-body-md text-on-surface leading-relaxed">{msg.body}</p>
                          <div className="space-y-2">
                            <div className="text-caption text-secondary font-bold uppercase tracking-widest">Manifest</div>
                            <p className="text-body-md italic text-on-surface-variant">&ldquo;{msg.manifest}&rdquo;</p>
                          </div>
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <p className="text-body-md text-on-surface leading-relaxed">{msg.body}</p>
                          <div className="pt-4 border-t border-white/5 w-full">
                            <div className="text-caption text-primary font-bold mb-1">Küçük Görev</div>
                            <p className="text-caption text-on-surface-variant">{msg.task}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          {revealed !== null ? (
            <button
              onClick={handleReset}
              className="px-6 py-3 glass text-on-surface font-label-md rounded-full hover:bg-white/10 transition-all border border-white/20 cursor-pointer"
            >
              Yeni Kartlar Çek
            </button>
          ) : (
            <p className="text-caption text-on-surface-variant italic tracking-wider opacity-60">
              Yarın seni yeni bir mesaj bekliyor.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
