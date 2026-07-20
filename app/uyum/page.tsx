import type { Metadata } from "next";
import Link from "next/link";
import CompatibilityCalculator from "@/components/compatibility/CompatibilityCalculator";
import AdSlot from "@/components/ads/AdSlot";
import Disclaimer from "@/components/layout/Disclaimer";

export const metadata: Metadata = {
  title: "Uyum Hesapla - Marifetli Kedi",
  description: "İki doğum haritasını karşılaştırarak aşk ve uyum analizini keşfedin.",
};

export default function UyumPage() {
  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Uyum Analizi</span>
      </nav>
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-secondary border border-secondary/20">
          <span className="material-symbols-outlined text-sm">favorite</span>
          <span className="text-label-md">İlişki Uyumu</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-white font-bold mt-4">
          Uyumunuzu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Hesaplayın</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Senin ve partnerinin doğum bilgilerini girerek güneş, ay ve yükselen burçlarınızın
          uyumunu, aşk ve iletişim skorlarını öğren.
        </p>
      </div>

      <CompatibilityCalculator />

      <AdSlot
        name="uyum"
        className="my-12 max-w-5xl mx-auto"
      />

      <Disclaimer variant="box" />
    </main>
  );
}
