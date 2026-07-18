import type { Metadata } from "next";
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
        name="dogum_haritasi"
        className="my-12 max-w-5xl mx-auto"
      />
    </main>
  );
}
