import type { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS, ZODIAC_DATA } from "@/lib/astro-utils";
import { signSlug } from "@/lib/sign-slugs";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import { getSignContentAll } from "@/lib/public-queries";
import CalendarTabs from "@/components/moon/CalendarTabs";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Günlük Burç Yorumları | 12 Burç İçin Günlük Fal",
  description:
    "Günlük burç yorumları: 12 burç için her gün fal, uyum, aşk ve kariyer yorumları. Ay fazı ve kozmik etkilerle günlük astroloji rehberi.",
  alternates: { canonical: "/gunluk-burc-yorumu" },
  ...ogMeta({
    title: "Günlük Burç Yorumları | 12 Burç İçin Günlük Fal",
    description:
      "Günlük burç yorumları: 12 burç için her gün fal, uyum, aşk ve kariyer yorumları. Ay fazı ve kozmik etkilerle günlük astroloji rehberi.",
    path: "/gunluk-burc-yorumu",
  }),
};

export const revalidate = 3600;

export default async function GunlukBurcYorumuIndexPage() {
  const signs = await getSignContentAll();
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Günlük Burç Yorumları" },
  ]);

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Günlük Burç Yorumları</span>
      </nav>

      <CalendarTabs active="gunluk" />

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-primary border border-primary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">today</span>
          <span className="text-label-md">Günlük Astroloji Rehberi</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          Günlük Burç Yorumları
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          12 burç için her gün fal, uyum, aşk ve kariyer yorumları. Ay fazı ve kozmik
          etkilerle günlük astroloji rehberi.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link href={`/gunluk-burc-yorumu/${todayISO}`} className="text-primary hover:text-secondary inline-flex items-center gap-1 text-label-md">
            <span aria-hidden="true" className="material-symbols-outlined text-sm">today</span>
            Bugünün Yorumu
          </Link>
          <Link href="/haftalik-burc-yorumu" className="text-primary hover:text-secondary inline-flex items-center gap-1 text-label-md">
            <span aria-hidden="true" className="material-symbols-outlined text-sm">calendar_month</span>
            Haftalık Yorum
          </Link>
          <Link href="/aylik-burc-yorumu" className="text-primary hover:text-secondary inline-flex items-center gap-1 text-label-md">
            <span aria-hidden="true" className="material-symbols-outlined text-sm">calendar_view_month</span>
            Aylık Yorum
          </Link>
        </div>
      </div>

      <AdSlot name="content_inline" className="mb-section-gap" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-section-gap">
        {ZODIAC_SIGNS.map((sign) => {
          const ui = ZODIAC_DATA[sign as keyof typeof ZODIAC_DATA];
          const content = signs.find((s) => s.sign === sign);
          return (
            <Link
              key={sign}
              href={`/burclar/${signSlug(sign)}`}
              className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{ui.emoji}</span>
                <div>
                  <h2 className="font-sora text-headline-sm text-on-surface font-bold">{sign} Burcu</h2>
                  <p className="text-caption text-outline">{ui.dateRange}</p>
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed line-clamp-4">
                {content?.daily_prophecy || ""}
              </p>
            </Link>
          );
        })}
      </div>

      <AdSlot name="blog_listing" format="fluid" className="my-section-gap" />
    </main>
  );
}
