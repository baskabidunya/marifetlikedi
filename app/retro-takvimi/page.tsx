import type { Metadata } from "next";
import Link from "next/link";
import RetroCalendar from "@/components/retro/RetroCalendar";
import AdSlot from "@/components/ads/AdSlot";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Retro Takvimi 2025-2030 | Gezegen Retroları ve Döngüleri",
  description:
    "Hangi gezegen retro? Merkür, Venüs, Mars, Jüpiter, Satürn, Uranüs, Neptün ve Plüton retro tarihleri, burç dereceleri ve temaları.",
  alternates: { canonical: "/retro-takvimi" },
  ...ogMeta({
    title: "Retro Takvimi 2025-2030 | Gezegen Retroları ve Döngüleri",
    description:
      "Hangi gezegen retro? Merkür, Venüs, Mars, Jüpiter, Satürn, Uranüs, Neptün ve Plüton retro tarihleri, burç dereceleri ve temaları.",
    path: "/retro-takvimi",
  }),
};

export default function RetroTakvimiPage() {
  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Retro Takvimi" },
  ]);

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Retro Takvimi</span>
      </nav>

      <RetroCalendar />

      <section className="mt-section-gap max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Retro Hareket Nedir?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Retro, bir gezegenin Dünya'dan bakıldığında gökyüzünde geriye doğru hareket
            ediyormuş gibi göründüğü dönemdir. Gerçekte gezegen yön değiştirmez; bu,
            Dünya ile gezegenin göreli hızlarından doğan bir perspektif etkisidir.
            Astrolojide retro dönemleri, gezegenin temsil ettiği konularda yavaşlama,
            gözden geçirme ve içe dönüş zamanı olarak yorumlanır.
          </p>
        </div>
      </section>

      <AdSlot name="content_inline" className="my-12 max-w-5xl mx-auto" />
    </main>
  );
}
