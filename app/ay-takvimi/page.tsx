import type { Metadata } from "next";
import Link from "next/link";
import MoonMansions from "@/components/moon/MoonMansions";
import AdSlot from "@/components/ads/AdSlot";
import Disclaimer from "@/components/layout/Disclaimer";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ay Takvimi ve Ay Durakları 2026-2029 | Günlük Ay Durağı",
  description:
    "2026-2029 ay takvimi: her günün öğle saatindeki ay durağı, gün içi geçiş saatleri ve kısa günlük notlar. 28 ay durağı rehberi.",
  alternates: { canonical: "/ay-takvimi" },
  ...ogMeta({
    title: "Ay Takvimi ve Ay Durakları 2026-2029 | Günlük Ay Durağı",
    description:
      "2026-2029 ay takvimi: her günün öğle saatindeki ay durağı, gün içi geçiş saatleri ve kısa günlük notlar. 28 ay durağı rehberi.",
    path: "/ay-takvimi",
  }),
};

export default function AyTakvimiPage() {
  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Ay Takvimi" },
  ]);

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Ay Takvimi</span>
      </nav>

      <MoonMansions />

      <section className="mt-section-gap max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Ay Durakları (Menazil) Nedir?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Ay durakları, Ay'ın gökyüzündeki aylık yolculuğunun 28 eşit parçaya bölünmüş
            halidir. Her durak yaklaşık 12°51' genişliğindedir ve Ay her birinde ortalama
            bir gün kalır. Binlerce yıllık bu sistemde her durağın kendine özgü bir
            karakteri vardır; yukarıdaki takvim, her gün öğle saatinde Ay'ın hangi
            durakta olduğunu ve gün içinde durak değişimi olup olmadığını gösterir.
          </p>
        </div>
      </section>

      <AdSlot name="content_inline" className="my-12 max-w-5xl mx-auto" />

      <Disclaimer variant="box" />
    </main>
  );
}
