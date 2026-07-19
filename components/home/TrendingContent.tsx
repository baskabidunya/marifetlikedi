import Link from "next/link";
import TrendingGrid from "@/components/trending/TrendingGrid";

export default function TrendingContent() {
  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div className="space-y-2">
          <h2 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">Trend İçerikler</h2>
          <p className="text-body-md text-on-surface-variant">
            En çok okunan ve paylaşılan eğlenceli astroloji rehberlerimiz.
          </p>
        </div>
        <Link
          href="/trend"
          className="text-primary font-label-md hover:underline shrink-0"
        >
          Tümünü Gör
        </Link>
      </div>
      <TrendingGrid limit={4} />
    </section>
  );
}
