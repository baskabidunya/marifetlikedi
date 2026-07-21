import type { Metadata } from "next";
import Link from "next/link";
import TrendingGrid from "@/components/trending/TrendingGrid";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Trend İçerikler - Marifetli Kedi",
  description: "En çok okunan ve paylaşılan eğlenceli astroloji rehberleri.",
};

export default function TrendPage() {
  return (
    <main className="top-clear-2 pb-32">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
          <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface-variant">Trend İçerikler</span>
        </nav>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-4">
          Trend İçerikler
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-12">
          En çok okunan ve paylaşılan eğlenceli astroloji rehberlerimiz.
        </p>
        <TrendingGrid />

        <AdSlot name="blog_listing" className="mt-12" />
      </div>
    </main>
  );
}
