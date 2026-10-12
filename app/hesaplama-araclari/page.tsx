import type { Metadata } from "next";
import Link from "next/link";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";
import Disclaimer from "@/components/layout/Disclaimer";

export const metadata: Metadata = {
  title: "Hesaplama Araçları | Doğum Haritası, Burç ve Uyum",
  description:
    "Ücretsiz astroloji hesaplama araçları: doğum haritası, yükselen burç, ay burcu, venüs burcu, sinastri ve burç uyumu hesaplama.",
  alternates: { canonical: "/hesaplama-araclari" },
  ...ogMeta({
    title: "Hesaplama Araçları | Doğum Haritası, Burç ve Uyum",
    description:
      "Ücretsiz astroloji hesaplama araçları: doğum haritası, yükselen burç, ay burcu, venüs burcu, sinastri ve burç uyumu hesaplama.",
    path: "/hesaplama-araclari",
  }),
};

const TOOLS = [
  {
    href: "/dogum-haritasi",
    icon: "auto_awesome",
    title: "Doğum Haritası Hesapla",
    desc: "Güneş, yükselen, Ay ve Venüs burcunu tek hesaplamada öğren.",
  },
  {
    href: "/hesapla/yukselen-burc",
    icon: "arrow_upward",
    title: "Yükselen Burç Hesaplama",
    desc: "Dışarıya yansıyan yüzünü ve ilk izlenimini keşfet.",
  },
  {
    href: "/hesapla/ay-burcu",
    icon: "dark_mode",
    title: "Ay Burcu Hesaplama",
    desc: "Duygusal dünyanı ve içsel ihtiyaçlarını anla.",
  },
  {
    href: "/hesapla/venus-burcu",
    icon: "female",
    title: "Venüs Burcu Hesaplama",
    desc: "Aşk dilini ve ilişkilerde ne aradığını öğren.",
  },
  {
    href: "/uyum",
    icon: "favorite",
    title: "Burç Uyumu Hesapla",
    desc: "Partnerinle güneş, ay ve yükselen uyumunu ölç.",
  },
  {
    href: "/hesapla/sinastri",
    icon: "sync_alt",
    title: "Sinastri Haritası",
    desc: "İki doğum haritasını karşılaştıran detaylı uyum analizi.",
  },
];

const FAQS = [
  {
    q: "Hesaplama araçları ücretsiz mi?",
    a: "Evet. Sitedeki tüm hesaplama araçları (doğum haritası, yükselen burç, ay burcu, venüs burcu, sinastri ve uyum) tamamen ücretsizdir.",
  },
  {
    q: "Hesaplama için hangi bilgiler gerekli?",
    a: "Doğum tarihi temel bilgidir. Yükselen burç ve ev hesaplamaları için doğum saati ve doğum yeri (şehir) de istenir; ne kadar net bilgi verirsen sonuç o kadar isabetli olur.",
  },
  {
    q: "Doğum saatimi bilmiyorsam ne yapmalıyım?",
    a: "Önce aile büyüklerine sor; doğum belgesi veya hastane kayıtlarında saat yazar. Bulunamazsa öğle saati varsayımıyla hesaplama yapılır ve olası sonuçlar listelenir.",
  },
  {
    q: "Sonuçlar ne kadar güvenilir?",
    a: "Hesaplamalar astronomik konum verilerine dayanır ve matematiksel olarak kesindir. Yorumlar ise astrolojik geleneğe göre hazırlanır ve eğlence amaçlıdır.",
  },
];

export default function HesaplamaAraclariPage() {
  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Hesaplama Araçları" },
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
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Hesaplama Araçları</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">calculate</span>
          <span className="text-label-md">Ücretsiz Astroloji Araçları</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          Hesaplama Araçları
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Doğum haritası, yükselen burç, ay burcu, venüs burcu, sinastri ve burç uyumu
          hesaplamaları. Doğum bilgilerini gir, kozmik profilini anında öğren.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-section-gap">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-all group"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-4xl text-primary mb-4 block group-hover:scale-110 transition-transform">{t.icon}</span>
            <h2 className="font-sora text-headline-sm text-on-surface font-bold mb-2 group-hover:text-primary transition-colors">
              {t.title}
            </h2>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">{t.desc}</p>
            <span className="inline-flex items-center gap-1 text-primary text-label-md mt-4">
              Hemen hesapla
              <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </Link>
        ))}
      </div>

      <section className="mb-section-gap max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Astrolojik Hesaplamalar Nasıl Çalışır?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Tüm araçlarımız aynı astronomik modele dayanır: verdiğin doğum tarihi, saati ve
            yerine göre gezegenlerin o andaki zodyak konumları hesaplanır. Güneş burcun kim
            olduğunu, Ay burcun duygusal dünyanı, yükselen burcun dışarıya yansımanı,
            Venüs burcun ise aşk dilini gösterir. Sinastri ve uyum araçları iki haritayı
            yan yana koyarak gezegenler arası açıları değerlendirir.
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

      <AdSlot name="content_inline" className="my-12 max-w-5xl mx-auto" />

      <Disclaimer variant="box" />
    </main>
  );
}
