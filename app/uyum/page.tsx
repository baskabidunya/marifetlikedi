import type { Metadata } from "next";
import Link from "next/link";
import CompatibilityCalculator from "@/components/compatibility/CompatibilityCalculator";
import AdSlot from "@/components/ads/AdSlot";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import Disclaimer from "@/components/layout/Disclaimer";

export const metadata: Metadata = {
  title: "Burç Uyumu Hesapla | Aşk Uyumu ve Sinastri",
  description:
    "İki doğum haritasını karşılaştırarak burç uyumu, aşk uyumu ve sinastri analizini ücretsiz hesaplayın. Yükselen, ay ve venüs burçları.",
  alternates: { canonical: "/uyum" },
  ...ogMeta({
    title: "Burç Uyumu Hesapla | Aşk Uyumu ve Sinastri",
    description:
      "İki doğum haritasını karşılaştırarak burç uyumu, aşk uyumu ve sinastri analizini ücretsiz hesaplayın. Yükselen, ay ve venüs burçları.",
    path: "/uyum",
  }),
};

export default function UyumPage() {
  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Burç Uyumu" },
  ]);

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Uyum Analizi</span>
      </nav>
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-secondary border border-secondary/20">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">favorite</span>
          <span className="text-label-md">İlişki Uyumu</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold mt-4">
          Burç Uyumu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Hesaplayın</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Senin ve partnerinin doğum bilgilerini girerek güneş, ay ve yükselen burçlarınızın
          uyumunu, aşk ve iletişim skorlarını öğren.
        </p>
      </div>

      <CompatibilityCalculator />

      <AdSlot
        name="content_inline"
        className="my-12 max-w-5xl mx-auto"
      />

      <Disclaimer variant="box" />
    </main>
  );
}
