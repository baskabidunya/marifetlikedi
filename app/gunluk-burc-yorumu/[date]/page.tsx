import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ZODIAC_SIGNS, ZODIAC_DATA } from "@/lib/astro-utils";
import { signSlug } from "@/lib/sign-slugs";
import { TURKISH_MONTHS } from "@/lib/moon-phases";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import { getSignContentAll } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";
import Disclaimer from "@/components/layout/Disclaimer";

const TURKISH_DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

function formatDateTR(d: Date): string {
  return `${d.getDate()} ${TURKISH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function getMoonPhaseForDate(date: Date): { name: string; emoji: string } {
  const angle = getMoonAngle(date);
  const a = ((angle % 360) + 360) % 360;
  if (a < 22.5 || a >= 337.5) return { name: "Yeni Ay", emoji: "🌑" };
  if (a < 67.5) return { name: "Hilal", emoji: "🌒" };
  if (a < 112.5) return { name: "İlk Dördün", emoji: "🌓" };
  if (a < 157.5) return { name: "Şişkin Ay", emoji: "🌔" };
  if (a < 202.5) return { name: "Dolunay", emoji: "🌕" };
  if (a < 247.5) return { name: "Sönen Şişkin", emoji: "🌖" };
  if (a < 292.5) return { name: "Son Dördün", emoji: "🌗" };
  return { name: "Sönen Hilal", emoji: "🌘" };
}

function getMoonAngle(date: Date): number {
  const JD = date.getTime() / 86400000 + 2440587.5;
  const T = (JD - 2451545.0) / 36525;
  const L0 = 218.3164477 + 481267.88123421 * T;
  const M = 134.9633964 + 477198.8675055 * T;
  const D = 297.8501921 + 445267.1114034 * T;
  const lambda = L0 + 6.288774 * Math.sin((M * Math.PI) / 180);
  const beta = 5.128122 * Math.sin((D * Math.PI) / 180);
  const moonLon = lambda + 6.289 * Math.sin((M * Math.PI) / 180);
  return ((moonLon % 360) + 360) % 360;
}

export async function generateStaticParams() {
  const today = new Date();
  const dates: { date: string }[] = [];
  for (let i = -60; i <= 7; i++) {
    const d = addDays(today, i);
    dates.push({ date: toISODate(d) });
  }
  return dates;
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date } = await params;
  const d = new Date(date + "T12:00:00");
  const dateStr = formatDateTR(d);
  const title = `${dateStr} Burç Yorumu | Günlük Burç Yorumları`;
  const description = `${dateStr} günlük burç yorumları. 12 burç için fal, uyum, aşk ve kariyer yorumları. ${dateStr} ay fazı ve kozmik etkiler.`;
  return {
    title,
    description,
    alternates: { canonical: `/gunluk-burc-yorumu/${date}` },
    ...ogMeta({ title, description, path: `/gunluk-burc-yorumu/${date}` }),
  };
}

export default async function GunlukBurcYorumuPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const d = new Date(date + "T12:00:00");
  if (isNaN(d.getTime())) notFound();

  const dateStr = formatDateTR(d);
  const dayName = TURKISH_DAYS[d.getDay()];
  const prevDate = toISODate(addDays(d, -1));
  const nextDate = toISODate(addDays(d, 1));
  const moon = getMoonPhaseForDate(d);
  const isoDate = toISODate(d);

  const signs = await getSignContentAll();

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Günlük Burç Yorumları", path: "/gunluk-burc-yorumu" },
    { name: dateStr },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${dateStr} Burç Yorumu`,
    description: `${dateStr} günlük burç yorumları ve kozmik etkiler.`,
    datePublished: isoDate,
    dateModified: isoDate,
    author: { "@type": "Organization", name: "Marifetli Kedi" },
    publisher: { "@type": "Organization", name: "Marifetli Kedi" },
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Günlük Burç Yorumları</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">{moon.emoji}</span>
          <span className="text-label-md">{moon.name} Dönemi</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          {dateStr} Burç Yorumu
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          {dayName}, {dateStr} günlük burç yorumları. 12 burç için fal, uyum, aşk ve kariyer
          yorumları ile günün kozmik etkileri.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link href={`/gunluk-burc-yorumu/${prevDate}`} className="text-primary hover:text-secondary inline-flex items-center gap-1 text-label-md">
            <span aria-hidden="true" className="material-symbols-outlined text-sm">chevron_left</span>
            Önceki Gün
          </Link>
          <Link href={`/gunluk-burc-yorumu/${nextDate}`} className="text-primary hover:text-secondary inline-flex items-center gap-1 text-label-md">
            Sonraki Gün
            <span aria-hidden="true" className="material-symbols-outlined text-sm">chevron_right</span>
          </Link>
        </div>
      </div>

      <AdSlot name="content_inline" className="mb-section-gap" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-section-gap">
        {ZODIAC_SIGNS.map((sign) => {
          const ui = ZODIAC_DATA[sign as keyof typeof ZODIAC_DATA];
          const content = signs.find((s) => s.sign === sign);
          const prophecy = content?.daily_prophecy || "";
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
                {prophecy}
              </p>
              <div className="mt-4 flex items-center gap-2 text-caption text-outline">
                <span className="text-label-sm">{content?.lucky_color || ""}</span>
                <span aria-hidden="true" className="material-symbols-outlined text-xs">circle</span>
                <span className="text-label-sm">{content?.lucky_stone || ""}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <AdSlot name="blog_listing" format="fluid" className="my-section-gap" />

      <Disclaimer variant="box" />
    </main>
  );
}
