import type { Metadata } from "next";
import Link from "next/link";
import { computeMonthMoonPhases, TURKISH_MONTHS } from "@/lib/moon-phases";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Yeni Ay ve Dolunay Takvimi | Ay Fazları ve Etkileri",
  description:
    "Yeni ay ne zaman, dolunay ne zaman? Yaklaşan yeni ay ve dolunay tarihleri, ay fazlarının burçlara etkisi ve her ayın ay olayı rehberi.",
  alternates: { canonical: "/yeni-ay-dolunay-takvimi" },
  ...ogMeta({
    title: "Yeni Ay ve Dolunay Takvimi | Ay Fazları ve Etkileri",
    description:
      "Yeni ay ne zaman, dolunay ne zaman? Yaklaşan yeni ay ve dolunay tarihleri, ay fazlarının burçlara etkisi ve her ayın ay olayı rehberi.",
    path: "/yeni-ay-dolunay-takvimi",
  }),
};

// Her gün yenilenir: yaklaşan ay olayları her zaman güncel kalır.
export const revalidate = 86400;

const MONTH_SLUGS = [
  "ocak", "subat", "mart", "nisan", "mayis", "haziran",
  "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik",
];

interface MoonEvent {
  kind: "yeni-ay" | "dolunay";
  day: number;
  month: number;
  year: number;
  slug: string;
}

function upcomingEvents(): { newMoons: MoonEvent[]; fullMoons: MoonEvent[] } {
  const now = new Date();
  const newMoons: MoonEvent[] = [];
  const fullMoons: MoonEvent[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    for (const p of computeMonthMoonPhases(y, m)) {
      if (!p.isKey) continue;
      if (p.kind !== "new" && p.kind !== "full") continue;
      const evDate = new Date(y, m, p.day);
      if (evDate.getTime() < now.getTime() - 86400000) continue;
      const kind = p.kind === "new" ? "yeni-ay" : "dolunay";
      const ev: MoonEvent = {
        kind,
        day: p.day,
        month: m,
        year: y,
        slug: `/kozmik-takvim/${kind}-${MONTH_SLUGS[m]}-${y}`,
      };
      if (kind === "yeni-ay") newMoons.push(ev);
      else fullMoons.push(ev);
    }
  }
  return { newMoons: newMoons.slice(0, 12), fullMoons: fullMoons.slice(0, 12) };
}

const FAQS = [
  {
    q: "Yeni ay nedir?",
    a: "Yeni ay, Ay'ın Güneş ile aynı burçta buluştuğu ve gökyüzünde görünmediği evredir. Astrolojide yeni başlangıçlar, niyet belirleme ve tohum ekme zamanıdır.",
  },
  {
    q: "Dolunay nedir?",
    a: "Dolunay, Ay'ın Güneş'in tam karşısında yer aldığı ve tamamen aydınlık göründüğü evredir. Duygusal yoğunluk, berraklaşma ve sonuç alma zamanıdır.",
  },
  {
    q: "Yeni ay ve dolunay ne sıklıkla olur?",
    a: "Her ay bir yeni ay ve bir dolunay gerçekleşir; ay döngüsü yaklaşık 29,5 gün sürer. Nadiren bir ayda iki dolunay (Mavi Ay) olabilir.",
  },
  {
    q: "Ay fazları burçları nasıl etkiler?",
    a: "Ay fazının gerçekleştiği burç, o dönemin temasını belirler. Yeni ayda niyetler o burcun alanında filizlenir; dolunayda o burcun konuları aydınlanır ve sonuçlanır.",
  },
];

export default function YeniAyDolunayTakvimiPage() {
  const { newMoons, fullMoons } = upcomingEvents();

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Yeni Ay ve Dolunay Takvimi" },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Yeni Ay ve Dolunay Takvimi</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">dark_mode</span>
          <span className="text-label-md">Otomatik Güncellenen Ay Takvimi</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          Yeni Ay ve Dolunay Takvimi
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Yaklaşan yeni ay ve dolunay tarihleri, her ay olayının burçlara etkisi ve
          ay fazlarına göre yaşama rehberi. Liste her gün otomatik güncellenir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-section-gap">
        <section className="glass-card p-6 rounded-3xl">
          <h2 className="font-sora text-headline-sm text-on-surface font-bold mb-4 flex items-center gap-2">
            <span aria-hidden="true" className="text-2xl">🌑</span>
            Yaklaşan Yeni Aylar
          </h2>
          <ul className="space-y-3">
            {newMoons.map((e) => (
              <li key={e.slug}>
                <Link
                  href={e.slug}
                  className="flex items-center justify-between p-3 rounded-2xl bg-on-surface/5 border border-on-surface/10 hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-body-md text-on-surface font-label-md">
                    {e.day} {TURKISH_MONTHS[e.month]} {e.year}
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary text-label-md">
                    Yeni ay ne söylüyor?
                    <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card p-6 rounded-3xl">
          <h2 className="font-sora text-headline-sm text-on-surface font-bold mb-4 flex items-center gap-2">
            <span aria-hidden="true" className="text-2xl">🌕</span>
            Yaklaşan Dolunaylar
          </h2>
          <ul className="space-y-3">
            {fullMoons.map((e) => (
              <li key={e.slug}>
                <Link
                  href={e.slug}
                  className="flex items-center justify-between p-3 rounded-2xl bg-on-surface/5 border border-on-surface/10 hover:border-tertiary/40 hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-body-md text-on-surface font-label-md">
                    {e.day} {TURKISH_MONTHS[e.month]} {e.year}
                  </span>
                  <span className="inline-flex items-center gap-1 text-tertiary text-label-md">
                    Dolunay ne söylüyor?
                    <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AdSlot name="content_inline" className="mb-section-gap" />

      <section className="mb-section-gap max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Yeni Ay Nedir?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Yeni ay, Ay ile Güneş'in gökyüzünde aynı burçta buluştuğu evredir; Ay bu
            sırada Dünya'dan görünmez. Astrolojik olarak yeni ay, tohum ekme zamanıdır:
            niyet belirlemek, yeni projelere başlamak, alışkanlıkları sıfırlamak ve içe
            dönüp ne istediğini netleştirmek için yılın en güçlü dönemlerindendir. Yeni
            ayın gerçekleştiği burç, hangi hayat alanında yeni bir sayfa açılacağını
            gösterir. Etkisi yaklaşık iki hafta sürer ve dolunayda olgunlaşır.
          </p>
        </div>
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Dolunay Nedir?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Dolunay, Ay'ın Güneş'in tam karşısında konumlanıp tamamen aydınlık göründüğü
            evredir. Astrolojik olarak hasat ve aydınlanma zamanıdır: yeni ayda ekilen
            niyetler sonuç verir, gizli kalanlar açığa çıkar, duygular yoğunlaşır. Bu
            dönemde uyku düzeni ve ruh hali dalgalanabilir; farkındalıkla karşılandığında
            ise bırakma, şükretme ve tamamlama için eşsiz bir fırsattır. Dolunayın
            gerçekleştiği burç, hangi konuların aydınlanacağını belirler.
          </p>
        </div>
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Hangi Yeni Ay Ne Söylüyor?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Her yeni ay, gerçekleştiği burcun dilini konuşur: Koç'taki yeni ay cesur
            başlangıçları, Boğa'daki yeni ay maddi güvenliği, İkizler'deki yeni ay
            iletişimi, Yengeç'teki yeni ay aileyi, Aslan'daki yeni ay yaratıcılığı,
            Başak'taki yeni ay düzeni, Terazi'deki yeni ay ilişkileri, Akrep'teki yeni
            ay dönüşümü, Yay'daki yeni ay ufku, Oğlak'taki yeni ay kariyeri, Kova'daki
            yeni ay yeniliği, Balık'taki yeni ay ise maneviyatı öne çıkarır. Yukarıdaki
            listeden ilgilendiğin yeni aya dokunarak o aya özel detaylı analizi okuyabilirsin.
          </p>
        </div>
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Hangi Dolunay Ne Söylüyor?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Her dolunay da kendi burcunun konularını aydınlatır: hangi alanda sonuç
            alacağın, neyi bırakman gerektiği ve hangi duygunun olgunlaştığı dolunayın
            burcuna göre okunur. Listeden bir dolunay seçerek o aya özel burçlara
            etkisini, ritüel önerilerini ve dikkat edilmesi gerekenleri öğrenebilirsin.
            Dolunay geceleri duygusal yoğunluk artabileceği için önemli kararları bir
            gün sonraya bırakmak genellikle daha sağlıklı olur.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-primary/10">
          <h3 className="text-headline-md font-headline-md text-primary mb-3">Sık Sorulan Sorular</h3>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q}>
                <p className="text-body-md font-body-md text-on-surface font-semibold mb-1">{f.q}</p>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-section-gap">
        <h3 className="text-headline-lg font-headline-lg text-primary mb-6">Keşfetmeye Devam Et</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/retro-takvimi" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">♄</span>
            <p className="text-label-md font-label-md text-on-surface">Retro Takvimi</p>
            <p className="text-caption text-outline mt-1">Tüm gezegenler</p>
          </Link>
          <Link href="/kozmik-takvim/merkur-retrosu" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">☿</span>
            <p className="text-label-md font-label-md text-on-surface">Merkür Retrosu</p>
            <p className="text-caption text-outline mt-1">Ne zaman, etkileri</p>
          </Link>
          <Link href="/gunluk-burc-yorumu" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">📅</span>
            <p className="text-label-md font-label-md text-on-surface">Günlük Yorumlar</p>
            <p className="text-caption text-outline mt-1">12 burç için</p>
          </Link>
          <Link href="/dogum-haritasi" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🌌</span>
            <p className="text-label-md font-label-md text-on-surface">Doğum Haritası</p>
            <p className="text-caption text-outline mt-1">Burçlarını öğren</p>
          </Link>
          <Link href="/tarot" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🔮</span>
            <p className="text-label-md font-label-md text-on-surface">Tarot Falı</p>
            <p className="text-caption text-outline mt-1">Günün kartını çek</p>
          </Link>
        </div>
      </section>

      <AdSlot name="blog_listing" format="fluid" className="my-section-gap" />
    </main>
  );
}
