import Link from "next/link";
import { notFound } from "next/navigation";
import { ZODIAC_DATA, ZODIAC_SIGNS } from "@/lib/astro-utils";
import { SIGN_TRAITS } from "@/lib/astro-narratives";
import { RISING_SIGNS } from "@/lib/astro-interpretations";
import KozmikTakvim from "@/components/profile/KozmikTakvim";

type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

const SIGN_IMAGES: Record<string, string> = {
  Koç: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=700&fit=crop&q=80",
  Boğa: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=700&fit=crop&q=80",
  İkizler: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&h=700&fit=crop&q=80",
  Yengeç: "https://images.unsplash.com/photo-1470071459604-7a8f0d4a7b47?w=1600&h=700&fit=crop&q=80",
  Aslan: "https://images.unsplash.com/photo-1465056836188-faa30e205ce3?w=1600&h=700&fit=crop&q=80",
  Başak: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1600&h=700&fit=crop&q=80",
  Terazi: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=700&fit=crop&q=80",
  Akrep: "https://images.unsplash.com/photo-1508280756094-5c0c9a99e2c5?w=1600&h=700&fit=crop&q=80",
  Yay: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=700&fit=crop&q=80",
  Oğlak: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=700&fit=crop&q=80",
  Kova: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&h=700&fit=crop&q=80",
  Balık: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&h=700&fit=crop&q=80",
};

const LUCKY_RITUALS: Record<string, { color: string; stone: string; activity: string }> = {
  Koç: { color: "Kırmızı & Beyaz", stone: "Elmas & Akik", activity: "Yüksek Tempolu Spor" },
  Boğa: { color: "Yeşil & Pembe", stone: "Zümrüt & Opal", activity: "Doğa Yürüyüşü" },
  İkizler: { color: "Sarı & Açık Mavi", stone: "Akik & Kuvars", activity: "Zihin Oyunları" },
  Yengeç: { color: "Gümüş & Beyaz", stone: "Aytaşı & İnci", activity: "Yoga & Meditasyon" },
  Aslan: { color: "Altın & Turuncu", stone: "Yakut & Kehribar", activity: "Sahne Sanatları" },
  Başak: { color: "Bej & Lacivert", stone: "Safir & Jade", activity: "Organik Bahçecilik" },
  Terazi: { color: "Pastel Mavi & Pembe", stone: "Opal & Kuvars", activity: "Sanat & Tasarım" },
  Akrep: { color: "Bordo & Gece Mavisi", stone: "Obsidyen & Topaz", activity: "Derin Meditasyon" },
  Yay: { color: "Mor & Altın", stone: "Turkuaz & Lapis Lazuli", activity: "Seyahat & Keşif" },
  Oğlak: { color: "Siyah & Kahverengi", stone: "Oniks & Granat", activity: "Stratejik Planlama" },
  Kova: { color: "Turkuaz & Elektrik Mavisi", stone: "Ametist & Kuvars", activity: "Teknoloji & İnovasyon" },
  Balık: { color: "Lavanta & Deniz Yeşili", stone: "Ametist & Mercan", activity: "Müzik & Dans" },
};

const DAILY_PROPHECIES: Record<string, string> = {
  Koç: "Bugün Mars'ın enerjisiyle dolusun. Önüne çıkan her fırsatı değerlendirmek isteyeceksin. Kariyer alanında önemli bir adım atmak için doğru zaman. Ancak acele kararlardan kaçın, Jüpiter'in desteğiyle atacağın sağlam adımlar uzun vadede meyve verecek. Finansal konularda sezgilerine güven ama abartılı harcamalardan kaçın.",
  Boğa: "Venüs'ün etkisiyle ilişkilerin ön planda. Bugün sevdiklerinle kaliteli zaman geçirmek için harika bir gün. Finansal konularda Satürn'ün disiplini sayesinde doğru kararlar alabilirsin. İş yerinde gerçekleştireceğin küçük bir değişiklik verimliliğini artırabilir. Sağlığına dikkat et, özellikle boğaz ve boyun bölgen hassas olabilir.",
  İkizler: "Merkür'ün hareketli enerjisiyle zihnin bugün çok hızlı çalışıyor. Yeni fikirler ve projeler için harika bir zaman. İletişim yeteneklerin sayesinde önemli bir anlaşmaya varabilirsin. Sosyal çevrende yeni ve ilginç insanlarla tanışabilirsin. Akşam saatlerinde biraz yalnız kalıp zihnini dinlendirmeyi unutma.",
  Yengeç: "Ay'ın yönettiği duygusal dünyan bugün oldukça hareketli. Ailevi konular gündemine gelebilir. Geçmişten gelen bir mesele bugün çözüme kavuşabilir. İç sesine kulak ver, sezgilerin seni doğru yönlendirecek. Ev ortamında küçük bir düzenleme yapmak kendini daha iyi hissetmeni sağlayabilir.",
  Aslan: "Güneş'in aydınlatıcı enerjisiyle bugün sahnede olma zamanı. Liderlik yeteneklerin ön plana çıkıyor. Yaratıcı projelerine odaklan ve yeteneklerini sergilemekten çekinme. Bir dostun beklenmedik bir haberi moralini yükseltebilir. Kalp sağlığına özen göster, fiziksel aktiviteler sana iyi gelecek.",
  Başak: "Merkür'ün detaycı etkisiyle bugün işlerini düzene sokmak için ideal bir gün. Uzun zamandır ertelediğin bir görevi tamamlayabilirsin. Sağlık ve beslenme konularında yeni bir alışkanlık edinmek için doğru zaman. Eleştirel bakış açın sorunları çözmeni sağlarken, sevdiklerine karşı daha anlayışlı olmayı unutma.",
  Terazi: "Venüs'ün uyumlu enerjisiyle bugün ilişkilerinde dengeyi buluyorsun. Sanatsal yeteneklerin ve estetik anlayışın ön planda. Bir ikili ilişkinde önemli bir karar vermen gerekebilir. İç sesinin rehberliğinde hareket et ve adaletten asla şaşma. Sosyal aktiviteler sana iyi gelecek.",
  Akrep: "Plüton'un dönüştürücü enerjisiyle bugün içsel bir güç hissediyorsun. Derin düşüncelere dalma ve hayatını sorgulama zamanı. Finansal bir konuda gizli kalmış bir detayı fark edebilirsin. Sezgilerin oldukça güçlü, çevrendeki insanların gerçek niyetlerini görebilirsin. Meditasyon yapmak iç huzurunu bulmana yardımcı olacak.",
  Yay: "Jüpiter'in genişletici enerjisiyle bugün macera çağrısı alıyorsun. Ufkunu genişletecek bir fırsatla karşılaşabilirsin. Yeni bir kültür, felsefe veya seyahat planı gündemine gelebilir. İyimser bakış açın ve esprili tavırların çevrendekileri de olumlu etkileyecek. Dürüstlüğün sayesinde zor bir durumu çözebilirsin.",
  Oğlak: "Satürn'ün disiplinli enerjisiyle bugün iş hayatında önemli bir adım atıyorsun. Kariyer hedeflerin doğrultusunda sağlam ilerliyorsun. Sorunları çözme yeteneğin ve kararlılığın üstlerinin dikkatini çekebilir. Özel hayatında ise biraz daha esnek olman gerekebilir. Akşam saatlerinde sevdiklerinle vakit geçirmek dengeyi sağlayacak.",
  Kova: "Uranüs'ün sürpriz enerjisiyle bugün beklenmedik gelişmeler yaşanabilir. Yenilikçi fikirlerin ve özgün bakış açın sayesinde bir soruna yaratıcı bir çözüm bulabilirsin. Arkadaşlık ilişkilerinde sürpriz bir buluşma seni bekliyor. Teknoloji ve inovasyon alanında yeni bir şey öğrenmek için harika bir gün.",
  Balık: "Neptün'ün sezgisel enerjisiyle bugün hayal gücünün sınırlarında geziniyorsun. Sanatsal yeteneklerin zirvede, yaratıcı projeler için ilham alabilirsin. Ruhsal bir deneyim yaşayabilir veya manevi bir farkındalık kazanabilirsin. Sevdiklerinle empati kurabilme yeteneğin sayesinde bir ilişkide köprüler kurabilirsin.",
};

const SIGN_SLUGS: Record<string, string> = {
  Koç: "kocburcu", Boğa: "bogaburcu", İkizler: "ikizlerburcu", Yengeç: "yengecburcu",
  Aslan: "aslanburcu", Başak: "basakburcu", Terazi: "teraziburcu", Akrep: "akrepburcu",
  Yay: "yayburcu", Oğlak: "oglakburcu", Kova: "kovaburcu", Balık: "balikburcu",
};

const SLUG_TO_SIGN: Record<string, string> = {
  kocburcu: "Koç", bogaburcu: "Boğa", ikizlerburcu: "İkizler", yengecburcu: "Yengeç",
  aslanburcu: "Aslan", basakburcu: "Başak", teraziburcu: "Terazi", akrepburcu: "Akrep",
  yayburcu: "Yay", oglakburcu: "Oğlak", kovaburcu: "Kova", balikburcu: "Balık",
};

function slugToSign(slug: string): string | undefined {
  return SLUG_TO_SIGN[slug];
}

function getElementIcon(el: string): string {
  const m: Record<string, string> = { Ateş: "local_fire_department", Toprak: "explore", Hava: "air", Su: "water_drop" };
  return m[el] || "auto_awesome";
}

function getQualityIcon(q: string): string {
  const m: Record<string, string> = { "Öncü": "keyboard_double_arrow_up", "Sabit": "lock", "Değişken": "sync_alt" };
  return m[q] || "diamond";
}

const ELEMENT_COMPAT: Record<string, Record<string, number>> = {
  Ateş: { Ateş: 85, Toprak: 40, Hava: 80, Su: 45 },
  Toprak: { Ateş: 40, Toprak: 85, Hava: 45, Su: 75 },
  Hava: { Ateş: 80, Toprak: 45, Hava: 85, Su: 35 },
  Su: { Ateş: 45, Toprak: 75, Hava: 35, Su: 85 },
};

const QUALITY_BONUS: Record<string, Record<string, number>> = {
  "Öncü": { "Öncü": 0, "Sabit": 5, "Değişken": 10 },
  "Sabit": { "Öncü": 5, "Sabit": 0, "Değişken": 5 },
  "Değişken": { "Öncü": 10, "Sabit": 5, "Değişken": 0 },
};

function getCompatScore(s1: string, s2: string): number {
  const e1 = ZODIAC_DATA[s1 as keyof typeof ZODIAC_DATA]?.element;
  const e2 = ZODIAC_DATA[s2 as keyof typeof ZODIAC_DATA]?.element;
  const q1 = ZODIAC_DATA[s1 as keyof typeof ZODIAC_DATA]?.quality;
  const q2 = ZODIAC_DATA[s2 as keyof typeof ZODIAC_DATA]?.quality;
  if (!e1 || !e2) return 50;
  const base = ELEMENT_COMPAT[e1]?.[e2] ?? 50;
  const bonus = q1 && q2 ? (QUALITY_BONUS[q1]?.[q2] ?? 0) : 0;
  return Math.min(100, Math.max(10, base + bonus));
}

function orderByCompat(sign: string, others: typeof ZODIAC_SIGNS): typeof ZODIAC_SIGNS {
  return [...others].sort((a, b) => getCompatScore(sign, b) - getCompatScore(sign, a));
}

export function generateStaticParams() {
  return Object.keys(SLUG_TO_SIGN).map(slug => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sign = slugToSign(slug);
  if (!sign || !ZODIAC_DATA[sign as ZodiacSign]) return notFound();

  const s = sign as ZodiacSign;
  const info = ZODIAC_DATA[s];
  const traits = SIGN_TRAITS[s];
  const img = SIGN_IMAGES[s];
  const lucky = LUCKY_RITUALS[s] || { color: "", stone: "", activity: "" };
  const prophecy = DAILY_PROPHECIES[s];
  const desc = RISING_SIGNS[s];

  const positiveTraits = traits.positive.split(", ");
  const negativeTraits = traits.negative.split(", ");
  const allTraits = [...positiveTraits, ...negativeTraits];
  const traitedSigns = ZODIAC_SIGNS.filter(t => t !== s);

  const topSigns = [
    ...orderByCompat(s, traitedSigns).slice(0, 4),
    traitedSigns.find(t => getCompatScore(s, t) < 50),
  ].filter(Boolean) as typeof ZODIAC_SIGNS;

  return (
    <main className="relative min-h-screen bg-background pb-32 pt-24">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(110,59,215,0.2),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(251,171,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        {/* Hero */}
        <section className="relative rounded-[2rem] overflow-hidden mb-section-gap min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-center p-8 group">
          <div className="absolute inset-0 bg-cover bg-center z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
            style={{ backgroundImage: `url(${img})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10" />
          <div className="relative z-20 space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 border border-white/10 bg-surface/50 backdrop-blur-md">
              <span className="text-6xl text-tertiary">{info.emoji}</span>
            </div>
            <h1 className="text-display-lg font-headline-lg-mobile md:text-display-lg font-display-lg text-primary tracking-widest uppercase">{s}</h1>
            <p className="text-headline-md font-headline-md text-secondary">{info.dateRange}</p>
            <div className="flex gap-2 justify-center mt-6">
              <span className="px-4 py-1.5 rounded-full text-label-md font-label-md bg-surface/50 backdrop-blur-md border border-white/10 text-on-surface/80">
                <span className="material-symbols-outlined text-[14px] align-text-bottom mr-1">{getElementIcon(info.element)}</span>
                {info.element} Elementi
              </span>
              <span className="px-4 py-1.5 rounded-full text-label-md font-label-md bg-surface/50 backdrop-blur-md border border-white/10 text-on-surface/80">
                <span className="material-symbols-outlined text-[14px] align-text-bottom mr-1">{getQualityIcon(info.quality)}</span>
                {info.quality} Nitelik
              </span>
              <span className="px-4 py-1.5 rounded-full text-label-md font-label-md bg-surface/50 backdrop-blur-md border border-white/10 text-on-surface/80">
                <span className="material-symbols-outlined text-[14px] align-text-bottom mr-1">public</span>
                {info.ruler}
              </span>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-section-gap">
          <div className="md:col-span-4 glass-card p-8 rounded-3xl space-y-6">
            <h3 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">auto_awesome</span> Burç Künyesi
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-lg">{getElementIcon(info.element)}</span>
                  <span className="text-body-md font-body-md">Element</span>
                </div>
                <span className="text-label-md font-label-md text-tertiary">{info.element}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">{getQualityIcon(info.quality)}</span>
                  <span className="text-body-md font-body-md">Nitelik</span>
                </div>
                <span className="text-label-md font-label-md text-secondary">{info.quality}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">public</span>
                  <span className="text-body-md font-body-md">Yönetici Gezegen</span>
                </div>
                <span className="text-label-md font-label-md text-primary">{info.ruler}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 glass-card p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">psychology</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-primary mb-6">Karakter Analizi</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {allTraits.map(t => {
                const isPositive = positiveTraits.includes(t);
                return (
                  <span key={t}
                    className={`px-4 py-2 rounded-xl text-label-md font-label-md ${
                      isPositive ? "bg-primary/15 text-primary" : "bg-white/5 text-on-surface-variant"
                    }`}>
                    {t}
                  </span>
                );
              })}
            </div>
            <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed max-w-2xl">{desc}</p>
          </div>
        </div>

        <KozmikTakvim
          sign={s}
          dailyProphecy={prophecy}
          luckyColor={lucky.color}
          luckyStone={lucky.stone}
          luckyActivity={lucky.activity}
        />

        {/* İlişki Uyumu */}
        <section className="mb-section-gap">
          <h3 className="text-headline-lg font-headline-lg text-primary mb-8">{s} Burcu İlişki Uyumu</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topSigns.map(target => {
              const score = getCompatScore(s, target);
              const isHigh = score >= 75;
              const isMid = score >= 50;
              return (
                <div key={target}
                  className={`glass-card p-6 rounded-3xl text-center group cursor-pointer hover:-translate-y-2 transition-all ${
                    !isMid ? "opacity-50 grayscale hover:grayscale-0 hover:opacity-100" : ""
                  }`}>
                  <span className="text-4xl mb-3 inline-block">{ZODIAC_DATA[target]?.emoji || "✦"}</span>
                  <p className="text-label-md font-label-md text-on-surface">{target}</p>
                  <p className={`text-caption font-label-md mt-1 ${
                    isHigh ? "text-secondary" : isMid ? "text-primary" : "text-error"
                  }`}>{score}% Uyumluluk</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
