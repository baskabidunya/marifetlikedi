import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import DailyEnergy from "@/components/home/DailyEnergy";
import ZodiacWheel from "@/components/home/ZodiacWheel";
import DailyMessage from "@/components/home/DailyMessage";
import CelestialCalendar from "@/components/home/CelestialCalendar";
import TrendingContent from "@/components/home/TrendingContent";
import RelationshipLab from "@/components/home/RelationshipLab";
import PlanetTools from "@/components/home/PlanetTools";
import FeaturedContent from "@/components/home/FeaturedContent";
import FunTestsSection from "@/components/home/FunTestsSection";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ km?: string; ky?: string }>;
}) {
  const sp = await searchParams;
  const now = new Date();
  const monthParam = sp.km !== undefined ? Number(sp.km) : NaN;
  const yearParam = sp.ky !== undefined ? Number(sp.ky) : NaN;
  const month =
    Number.isInteger(monthParam) && monthParam >= 0 && monthParam <= 11
      ? monthParam
      : now.getMonth();
  const year =
    Number.isInteger(yearParam) && yearParam >= 1970 && yearParam <= 2100
      ? yearParam
      : now.getFullYear();

  return (
    <main className="top-clear">
      <HeroSection />
      <AdSlot
        name="content_inline"
        className="my-12 max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop"
      />
      <DailyEnergy />
      <ZodiacWheel />
      <DailyMessage />
      <CelestialCalendar year={year} month={month} />
      <TrendingContent />
      <RelationshipLab />
      <PlanetTools />
      <FunTestsSection />
      <FeaturedContent />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
