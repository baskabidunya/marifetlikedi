import type { Metadata } from "next";
import Link from "next/link";
import TestCard from "@/components/funtests/TestCard";
import AdSlot from "@/components/ads/AdSlot";
import { FUN_TESTS } from "@/lib/fun-tests";

export const metadata: Metadata = {
  title: "Eğlenceli Testler - Marifetli Kedi",
  description:
    "Kişiliğini keşfet! Sinir seviyenden empati gücüne, sabırdan risk ruhuna kadar birbirinden eğlenceli testler seni bekliyor.",
};

export default function EglenceliTestlerPage() {
  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Eğlenceli Testler</span>
      </nav>
      <div className="mb-section-gap">
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
          Eğlenceli Testler
        </h1>
        <p className="text-on-surface-variant text-body-md max-w-2xl">
          Kendini keşfetmeye hazır mısın? Aşağıdaki testleri çöz, içsel dünyanda
          keyifli bir yolculuğa çık.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FUN_TESTS.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>

      <AdSlot
        name="static_page"
        className="my-section-gap max-w-3xl mx-auto"
      />
    </main>
  );
}