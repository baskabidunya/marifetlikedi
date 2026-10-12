import type { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS, ZODIAC_DATA } from "@/lib/astro-utils";
import { signSlug } from "@/lib/sign-slugs";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import { getSignContentAll } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Haftalık Burç Yorumları | 12 Burç İçin Haftalık Fal",
  description:
    "Bu hafta 12 burç için haftalık burç yorumları. Aşk, kariyer, uyum ve genel enerji yorumları. Haftalık astroloji rehberi.",
  alternates: { canonical: "/haftalik-burc-yorumu" },
  ...ogMeta({
    title: "Haftalık Burç Yorumları | 12 Burç İçin Haftalık Fal",
    description:
      "Bu hafta 12 burç için haftalık burç yorumları. Aşk, kariyer, uyum ve genel enerji yorumları. Haftalık astroloji rehberi.",
    path: "/haftalik-burc-yorumu",
  }),
};

export const revalidate = 3600;

export default async function HaftalikBurcYorumuPage() {
  const signs = await getSignContentAll();

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Haftalık Burç Yorumları" },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Haftalık Burç Yorumları",
    description: "Bu hafta 12 burç için haftalık burç yorumları ve astroloji rehberi.",
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "Marifetli Kedi" },
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Haftalık Burç Yorumları</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-secondary border border-secondary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">calendar_month</span>
          <span className="text-label-md">Haftalık Astroloji Rehberi</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          Haftalık Burç Yorumları
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Bu hafta 12 burç için haftalık yorumlar. Aşk, kariyer, uyum ve genel enerji
          alanlarında astrolojik rehberlik.
        </p>
      </div>

      <AdSlot name="content_inline" className="mb-section-gap" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-section-gap">
        {ZODIAC_SIGNS.map((sign) => {
          const ui = ZODIAC_DATA[sign as keyof typeof ZODIAC_DATA];
          const content = signs.find((s) => s.sign === sign);
          return (
            <Link
              key={sign}
              href={`/burclar/${signSlug(sign)}`}
              className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{ui.emoji}</span>
                <div>
                  <h2 className="font-sora text-headline-sm text-on-surface font-bold">{sign} Burcu</h2>
                  <p className="text-caption text-outline">{ui.dateRange}</p>
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed line-clamp-4">
                {content?.daily_prophecy || ""}
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mb-section-gap max-w-3xl mx-auto">
        <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
          Haftalık Astroloji Nasıl Okunur?
        </h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed mb-6">
          Haftalık burç yorumları, gezegenlerin hafta boyunca yaptığı geçişlere ve mevcut
          ay fazına göre hazırlanır. Her burç için aşk, kariyer ve genel enerji alanları
          ayrı ayrı değerlendirilir. Haftalık yorumlar, günlük yorumların daha geniş
          bir perspektiften bakışıdır; kısa vadeli değişimler yerine haftanın genel
          eğilimlerini gösterir.
        </p>
        <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
          Bu Hafta Dikkat Edilmesi Gerekenler
        </h2>
        <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
          Haftalık yorumları okurken her burç için belirtilen alanlara dikkat edin.
          Özellikle Merkür retrosu gibi önemli gezegen geçişleri, iletişim ve anlaşma
          konularında daha daha dikkatli olmayı önerir. Hafta sonu dolunay veya yeni ay
          gibi önemli ay olayları varsa, bu dönemlerde duygusal dengelerinize özen
          gösterin. Haftalık yorumlar, astrolojik bir rehber olarak kullanılmalıdır; kesin
          kader belirleyici değil, yolculuğunuzda yol gösteren bir kılavuzdur.
        </p>
      </section>

      <AdSlot name="blog_listing" format="fluid" className="my-section-gap" />
    </main>
  );
}
