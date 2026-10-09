import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import DailyEnergy from "@/components/home/DailyEnergy";
import ZodiacWheel from "@/components/home/ZodiacWheel";
import DailyMessage from "@/components/home/DailyMessage";
import CalendarSection from "@/components/home/CalendarSection";
import TrendingContent from "@/components/home/TrendingContent";
import RelationshipLab from "@/components/home/RelationshipLab";
import PlanetTools from "@/components/home/PlanetTools";
import FeaturedContent from "@/components/home/FeaturedContent";
import FunTestsSection from "@/components/home/FunTestsSection";
import Newsletter from "@/components/home/Newsletter";
import AdSlot from "@/components/ads/AdSlot";
import { computeMonthMoonPhases } from "@/lib/moon-phases";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Ana sayfa statik (ISR): takvim ?km/?ky istemci tarafında işlenir.
export const revalidate = 600;

export default function Home() {
  const now = new Date();
  const dayNumber = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000
  );
  const year = now.getFullYear();
  const month = now.getMonth();
  const initialDays = computeMonthMoonPhases(year, month);

  return (
    <main className="top-clear">
      <HeroSection />
      <AdSlot
        name="content_inline"
        className="my-12 max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop"
      />
      <DailyEnergy />
      <ZodiacWheel />
      <DailyMessage seed={dayNumber} />
      <CalendarSection
        initialYear={year}
        initialMonth={month}
        initialDays={initialDays}
      />
      <TrendingContent />
      <RelationshipLab />
      <PlanetTools />
      <FunTestsSection />
      <FeaturedContent />
      <Newsletter />
    </main>
  );
}
