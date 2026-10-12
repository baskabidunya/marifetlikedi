import type { Metadata } from "next";
import Link from "next/link";
import * as Astronomy from "astronomy-engine";
import { TURKISH_MONTHS } from "@/lib/moon-phases";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Merkür Retrosu Ne zaman | Merkür Retrosu Burçlara Etkisi",
  description:
    "Merkür retrosu ne zaman? 2026 Merkür retrosu tarihleri, burçlara etkisi, iletişim ve anlaşma riskleri. Merkür retrosu döneminde dikkat edilmesi gerekenler.",
  alternates: { canonical: "/kozmik-takvim/merkur-retrosu" },
  ...ogMeta({
    title: "Merkür Retrosu Ne zaman | Merkür Retrosu Burçlara Etkisi",
    description:
      "Merkür retrosu ne zaman? 2026 Merkür retrosu tarihleri, burçlara etkisi, iletişim ve anlaşma riskleri. Merkür retrosu döneminde dikkat edilmesi gerekenler.",
    path: "/kozmik-takvim/merkur-retrosu",
  }),
};

export const revalidate = 3600;

function getEclipticLongitude(body: Astronomy.Body, date: Date): number {
  const time = Astronomy.MakeTime(date);
  const vec = Astronomy.EclipticLongitude(body, time);
  return vec;
}

function computeRetrogradePeriods(year: number): { start: Date; end: Date }[] {
  const periods: { start: Date; end: Date }[] = [];
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year, 11, 31));
  let inRetro = false;
  let retroStart = new Date();

  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const d1 = new Date(d);
    const d2 = new Date(d.getTime() + 86400000);
    const lon1 = getEclipticLongitude(Astronomy.Body.Mercury, d1);
    const lon2 = getEclipticLongitude(Astronomy.Body.Mercury, d2);
    const diff = lon2 - lon1;
    const isRetro = diff < -180 || (diff >= 0 && diff < 180) ? false : true;

    if (isRetro && !inRetro) {
      retroStart = new Date(d);
      inRetro = true;
    } else if (!isRetro && inRetro) {
      periods.push({ start: retroStart, end: new Date(d) });
      inRetro = false;
    }
  }
  if (inRetro) periods.push({ start: retroStart, end: new Date(end) });
  return periods;
}

function formatDateTR(d: Date): string {
  return `${d.getUTCDate()} ${TURKISH_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function getRetrogradeSigns(start: Date, end: Date): string[] {
  const signs = new Set<string>();
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 3)) {
    const lon = getEclipticLongitude(Astronomy.Body.Mercury, d);
    const signIdx = Math.floor((((lon % 360) + 360) % 360) / 30);
    const signNames = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
    signs.add(signNames[signIdx]);
  }
  return Array.from(signs);
}

export default async function MerkurRetrosuPage() {
  const now = new Date();
  const periods = [
    ...computeRetrogradePeriods(now.getFullYear() - 1),
    ...computeRetrogradePeriods(now.getFullYear()),
    ...computeRetrogradePeriods(now.getFullYear() + 1),
  ].filter((p) => p.end >= new Date(now.getFullYear(), 0, 1));

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Kozmik Takvim", path: "/#celestial-calendar" },
    { name: "Merkür Retrosu" },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { q: "Merkür retrosu ne zaman olur?", a: "Merkür retrosu yılda yaklaşık 3-4 kez gerçekleşir ve her dönem yaklaşık 3 hafta sürer. 2026 için tarihler aşağıdaki tabloda verilmiştir." },
      { q: "Merkür retrosu hangi alanları etkiler?", a: "Merkür, iletişim, teknoloji ve anlaşmaları yöneten gezegendir. Retro dönemde iletişim hataları, teknolojik sorunlar ve anlaşma sorunları daha sık görülebilir." },
      { q: "Merkür retrosu döneminde ne yapmalıyım?", a: "Önemli anlaşmaları imzalamaktan kaçınmak, iletişimleri tekrar kontrol etmek ve teknolojik yedeklemeler almak önerilir. Retrosu döneminde başlatılan projelerde gecikmeler yaşanabilir." },
      { q: "Merkür retrosu burçlara etkisi nedir?", a: "Merkür retrosu, Merkür'ün yöneticisi olduğu İkizler ve Başak burçlarında daha belirgin etkiler gösterir. Diğer burçlarda iletişim ve teknoloji alanlarında küçük aksaklıklar yaşanabilir." },
    ].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/#celestial-calendar" className="hover:text-on-surface transition-colors">Kozmik Takvim</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Merkür Retrosu</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">☿</span>
          <span className="text-label-md">Merkür Retrosu 2026</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          Merkür Retrosu Ne Zaman?
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Merkür retrosu tarihleri, burçlara etkisi ve döneminde dikkat edilmesi gerekenler.
          İletişim, teknoloji ve anlaşma alanlarında astrolojik rehberlik.
        </p>
      </div>

      <AdSlot name="content_inline" className="mb-section-gap" />

      <section className="mb-section-gap max-w-3xl mx-auto">
        <h2 className="text-headline-lg font-headline-lg text-primary mb-6">
          Merkür Retrosu Tarihleri
        </h2>
        <div className="space-y-4">
          {periods.map((p, i) => {
            const signs = getRetrogradeSigns(p.start, p.end);
            return (
              <div key={i} className="glass-card p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-sora text-headline-sm text-on-surface font-bold">
                    {formatDateTR(p.start)} — {formatDateTR(p.end)}
                  </h3>
                  <span className="text-caption text-outline">
                    {Math.round((p.end.getTime() - p.start.getTime()) / 86400000)} gün
                  </span>
                </div>
                <p className="text-body-md text-on-surface-variant">
                  Merkür retrosu bu dönemde <span className="text-primary font-semibold">{signs.join(", ")}</span> burçlarından
                  geçer. İletişim, teknoloji ve anlaşma alanlarında dikkatli olun.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-section-gap max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Merkür Retrosu Nedir?
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Merkür retrosu, Merkür gezegeninin görünüşte yönünü değiştirerek geriye doğru
            hareket ettiği dönemdir. Bu bir görsel illüzyondur; Merkür aslında her zaman
            ileri doğru hareket eder, ancak Dünya'yla olan göreli konumu nedeniyle geriye
            hareket ediyor gibi görünür. Merkür retrosu, iletişim, teknoloji, anlaşma ve
            seyahat alanlarında küçük aksaklık ve gecikmelere yol açabilir. Astrolojide
            Merkür retrosu döneminde başlatılan projelerde gecikmeler yaşanabileceği için
            önemli anlaşmaların imzalanmasından kaçınılması önerilir.
          </p>
        </div>
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Merkür Retrosu Burçlara Etkisi
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Merkür retrosu, Merkür'ün yöneticisi olduğu İkizler ve Başak burçlarında daha
            belirgin etkiler gösterir. Bu burçlarda iletişim hataları, teknolojik sorunlar
            ve anlaşma sorunları daha sık yaşanabilir. Diğer burçlarda ise genellikle küçük
            aksaklık ve gecikmeler görülür. Merkür retrosu döneminde iletişim kurarken daha
            dikkatli olmak, önemli anlaşmaları tekrar gözden geçirmek ve teknolojik
            yedeklemeler almak faydalıdır. Merkür retrosu, astrolojide "geriye dönüş"
            enerjisi taşır; bu nedenle geçmişi gözden geçirmek ve tamamlanmamış işleri
            bitirmek için de uygun bir dönemdir.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-primary/10">
          <h3 className="text-headline-md font-headline-md text-primary mb-3">Sık Sorulan Sorular</h3>
          <div className="space-y-4">
            {[
              { q: "Merkür retrosu ne zaman olur?", a: "Merkür retrosu yılda yaklaşık 3-4 kez gerçekleşir ve her dönem yaklaşık 3 hafta sürer. 2026 için tarihler yukarıdaki tabloda verilmiştir." },
              { q: "Merkür retrosu hangi alanları etkiler?", a: "Merkür, iletişim, teknoloji ve anlaşmaları yöneten gezegendir. Retro dönemde iletişim hataları, teknolojik sorunlar ve anlaşma sorunları daha sık görülebilir." },
              { q: "Merkür retrosu döneminde ne yapmalıyım?", a: "Önemli anlaşmaları imzalamaktan kaçınmak, iletişimleri tekrar kontrol etmek ve teknolojik yedeklemeler almak önerilir. Retrosu döneminde başlatılan projelerde gecikmeler yaşanabilir." },
            ].map((f) => (
              <div key={f.q}>
                <p className="text-body-md font-body-md text-on-surface font-semibold mb-1">{f.q}</p>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-section-gap">
        <h3 className="text-headline-lg font-headline-lg text-primary mb-6">Diğer Kozmik Olaylar</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/retro-takvimi" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">♄</span>
            <p className="text-label-md font-label-md text-on-surface">Retro Takvimi</p>
            <p className="text-caption text-outline mt-1">Tüm gezegenler</p>
          </Link>
          <Link href="/gunluk-burc-yorumu" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">📅</span>
            <p className="text-label-md font-label-md text-on-surface">Günlük Yorumlar</p>
            <p className="text-caption text-outline mt-1">12 burç için</p>
          </Link>
          <Link href="/dogum-haritasi" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🌌</span>
            <p className="text-label-md font-label-md text-on-surface">Doğum Haritası</p>
            <p className="text-caption text-outline mt-1">Burçlarını öğren</p>
          </Link>
          <Link href="/tarot" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🔮</span>
            <p className="text-label-md font-label-md text-on-surface">Tarot Falı</p>
            <p className="text-caption text-outline mt-1">Günün kartını çek</p>
          </Link>
          <Link href="/uyum" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">💞</span>
            <p className="text-label-md font-label-md text-on-surface">Uyum Analizi</p>
            <p className="text-caption text-outline mt-1">Partnerinle uyumunu ölç</p>
          </Link>
        </div>
      </section>

      <AdSlot name="blog_listing" format="fluid" className="my-section-gap" />
    </main>
  );
}
