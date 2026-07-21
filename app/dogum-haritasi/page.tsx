import type { Metadata } from "next";
import Link from "next/link";
import BirthChartCalculator from "@/components/birthchart/BirthChartCalculator";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Doğum Haritası Hesapla - Marifetli Kedi",
  description: "Güneş, yükselen, ay ve venüs burcunuzu ücretsiz hesaplayın.",
};

export default async function DogumHaritasiPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const { focus } = await searchParams;

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Doğum Haritası</span>
      </nav>
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          <span className="text-label-md">Ücretsiz Doğum Haritası</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-white font-bold mt-4">
          Burçlarını <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">Keşfet</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Doğum bilgilerini girerek Güneş, Yükselen, Ay ve Venüs burcunu öğren. Her sonuç seni
          ilgili burç sayfasına bağlar.
        </p>
      </div>

      <BirthChartCalculator focus={focus} />

      <AdSlot
        name="content_inline"
        className="my-12 max-w-5xl mx-auto"
      />
    </main>
  );
}
