import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { computeMonthMoonPhases, TURKISH_MONTHS } from "@/lib/moon-phases";
import { ZODIAC_SIGNS, ZODIAC_DATA } from "@/lib/astro-utils";
import { signSlug } from "@/lib/sign-slugs";
import { getEventMoonSign, interpret } from "@/lib/moon-events";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import AdSlot from "@/components/ads/AdSlot";

const MONTH_SLUGS = [
  "ocak", "subat", "mart", "nisan", "mayis", "haziran",
  "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik",
];

interface EventInfo {
  slug: string;
  kind: "yeni-ay" | "dolunay";
  month: number;
  year: number;
  day: number;
}

function getEvents(): EventInfo[] {
  const events: EventInfo[] = [];
  const now = new Date();
  for (let y = now.getFullYear() - 1; y <= now.getFullYear() + 1; y++) {
    for (let m = 0; m < 12; m++) {
      const phases = computeMonthMoonPhases(y, m);
      for (const p of phases) {
        if (p.isKey && (p.kind === "new" || p.kind === "full")) {
          events.push({
            slug: `${p.kind === "new" ? "yeni-ay" : "dolunay"}-${MONTH_SLUGS[m]}-${y}`,
            kind: p.kind === "new" ? "yeni-ay" : "dolunay",
            month: m,
            year: y,
            day: p.day,
          });
        }
      }
    }
  }
  return events;
}

function parseSlug(slug: string): { kind: "yeni-ay" | "dolunay"; month: number; year: number } | null {
  const m = slug.match(/^(yeni-ay|dolunay)-([a-z]+)-(\d{4})$/);
  if (!m) return null;
  const monthIdx = MONTH_SLUGS.indexOf(m[2]);
  if (monthIdx === -1) return null;
  return { kind: m[1] as "yeni-ay" | "dolunay", month: monthIdx, year: parseInt(m[3], 10) };
}

export async function generateStaticParams() {
  return getEvents().map((e) => ({ event: e.slug }));
}

type PageParams = { params: Promise<{ event: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { event } = await params;
  const parsed = parseSlug(event);
  if (!parsed) return { title: "Kozmik Takvim" };
  const monthName = TURKISH_MONTHS[parsed.month];
  const title = parsed.kind === "yeni-ay"
    ? `Yeni Ay ${monthName} ${parsed.year} | Yeni Ay Burçlara Etkisi`
    : `Dolunay ${monthName} ${parsed.year} | Dolunay Burçlara Etkisi`;
  const description = parsed.kind === "yeni-ay"
    ? `${monthName} ${parsed.year} yeni ay burçlara etkisi. Yeni ay ne zaman, hangi burçta, astrolojik önemi ve ritüelleri.`
    : `${monthName} ${parsed.year} dolunay burçlara etkisi. Dolunay ne zaman, hangi burçta, astrolojik önemi ve ritüelleri.`;
  return {
    title,
    description,
    alternates: { canonical: `/kozmik-takvim/${event}` },
    ...ogMeta({ title, description, path: `/kozmik-takvim/${event}` }),
  };
}

const NEW_MOON_CONTENT = {
  title: "Yeni Ay Burçlara Etkisi",
  intro: (month: string, year: number, day: number) =>
    `${month} ${year} yeni ayı, Ay'ın Güneş ile aynı burçta buluştuğu ve gecenin en karanlık anıdır. Bu dönem, yeni başlangıçlar, niyet belirleme ve içsel tohumlama için astrolojik olarak en güçlü zamanlardan biridir. Yeni ay ${day} ${month} ${year} tarihinde gerçekleşir ve burçlara etkisi, yeni ayın düştüğü burca göre değişir.`,
  howTitle: "Yeni Ay Nasıl Hesaplanır?",
  howText: "Yeni ay, Ay'ın Güneş ile aynı zodyak derecesinde buluştuğu andır. Astronomik olarak bu, Ay'ın Güneş'in önüne geçtiği ve iki gözegenin konumlarının örtüştüğü anlamına gelir. Yeni ay tarihleri, ephemeris tablolarıyla yılın her ayı için önceden hesaplanabilir. Yeni ayın astrolojik etkisi, hangi burçta gerçekleştiğine göre değişir; her burç için farklı bir enerji alanı etkinleşir. Yeni ay döneminde niyet belirlemek, meditasyon yapmak ve yeni projelere başlamak astrolojik olarak desteklenir.",
  meaningTitle: "Yeni Ay Ne Anlama Gelir?",
  meaningText: "Yeni ay, astrolojide yeni başlangıçların ve tozların simgesidir. Bu dönemde içsel enerjiniz yükselir ve niyetlerinizi somutlaştırmak için güçlü bir fırsat sunar. Yeni ayın düştüğü burç, hayatınızda hangi alanda yeni başlangıçlar yapabileceğinizi gösterir. Örneğin yeni ay Koç'ta olduğunda kariyer ve kişisel hedefler, Yengeç'te olduğunda aile ve duygusal hayat ön plana çıkar. Yeni ay ritüelleri, niyet yazma ve meditasyon gibi pratikler bu enerjiyi dengelemeye yardımcı olur. Yeni ayın etkisi genellikle iki hafta sürer ve dolunayda zirve yapar.",
  faqs: [
    { q: "Yeni ay ne zaman gerçekleşir?", a: "Yeni ay, Ay'ın Güneş ile aynı burçta buluştuğu andır. Tarihler yılın her ayı için astronomik hesaplamalarla önceden belirlenebilir." },
    { q: "Yeni ay hangi burçta olacak?", a: "Yeni ayın burcu, o ayın astronomik konumuna göre değişir. Her yeni ay farklı bir burçta gerçekleşir ve bu, o ayın astrolojik temasını belirler." },
    { q: "Yeni ayda ne yapmalıyım?", a: "Yeni ayda niyet belirlemek, yeni projelere başlamak ve içsel tohumlama yapmak astrolojik olarak desteklenir. Meditasyon ve niyet yazma pratikleri önerilir." },
    { q: "Yeni ayın etkisi ne kadar sürer?", a: "Yeni ayın etkisi genellikle iki hafta sürer ve dolunayda zirve yapar. Bu dönemde başlatılan projeler ve niyetler astrolojik olarak desteklenir." },
  ],
};

const FULL_MOON_CONTENT = {
  title: "Dolunay Burçlara Etkisi",
  intro: (month: string, year: number, day: number) =>
    `${month} ${year} dolunayı, Ay'ın Güneş'in tam karşısında olduğu ve gecenin en aydınlık anıdır. Bu dönem, duygusal yoğunluk, berraklaşma ve dönüşüm için astrolojik olarak en güçlü zamanlardan biridir. Dolunay ${day} ${month} ${year} tarihinde gerçekleşir ve burçlara etkisi, dolunayın düştüğü burca göre değişir.`,
  howTitle: "Dolunay Nasıl Hesaplanır?",
  howText: "Dolunay, Ay'ın Güneş'in tam karşısında olduğu andır. Astronomik olarak bu, Ay'ın Güneş'ten 180 derece uzakta olduğu ve Dünya üzerinden tamamen aydınlık bir Ay görüldüğü anlamına gelir. Dolunay tarihleri, ephemeris tablolarıyla yılın her ayı için önceden hesaplanabilir. Dolunayın astrolojik etkisi, hangi burçta gerçekleştiğine göre değişir; her burç için farklı bir duygusal ve ruhsal enerji alanı etkinleşir. Dolunay döneminde duygusal dengeyi korumak, meditasyon yapmak ve içsel berraklaşmayı desteklemek astrolojik olarak önerilir.",
  meaningTitle: "Dolunay Ne Anlama Gelir?",
  meaningText: "Dolunay, astrolojide duygusal yoğunluk, berraklaşma ve dönüşümün simgesidir. Bu dönemde duygusal enerjiniz yükselir ve içsel gerçekleriniz daha belirgin hale gelir. Dolunayın düştüğü burç, hayatınıznda hangi alanda duygusal dönüşüm yaşayabileceğinizi gösterir. Örneğin dolunay Akrep'te olduğunda derin duygusal bağlar ve dönüşüm, Terazi'de olduğunda ilişkiler ve denge ön plana çıkar. Dolunay ritüelleri, şükran ve bırakma pratikleri bu enerjiyi dengelemeye yardımcı olur. Dolunayın etkisi genellikle iki hafta sürer ve yeni ayda sona erer.",
  faqs: [
    { q: "Dolunay ne zaman gerçekleşir?", a: "Dolunay, Ay'ın Güneş'in tam karşısında olduğu andır. Tarihler yılın her ayı için astronomik hesaplamalarla önceden belirlenebilir." },
    { q: "Dolunay hangi burçta olacak?", a: "Dolunayın burcu, o ayın astronomik konumuna göre değişir. Her dolunay farklı bir burçta gerçekleşir ve bu, o ayın duygusal temasını belirler." },
    { q: "Dolunyada ne yapmalıyım?", a: "Dolunyada duygusal dengeyi korumak, meditasyon yapmak ve içsel berraklaşmayı desteklemek astrolojik olarak önerilir. Şükran ve bırakma pratikleri faydalıdır." },
    { q: "Dolunayın etkisi ne kadar sürer?", a: "Dolunayın etkisi genellikle iki hafta sürer ve yeni ayda sona erer. Bu dönemde yaşanan duygusal dönüşümler astrolojik olarak desteklenir." },
  ],
};

export default async function KozmikTakvimEventPage({ params }: { params: Promise<{ event: string }> }) {
  const { event } = await params;
  const parsed = parseSlug(event);
  if (!parsed) notFound();

  const events = getEvents();
  const eventInfo = events.find((e) => e.slug === event);
  if (!eventInfo) notFound();

  const monthName = TURKISH_MONTHS[parsed.month];
  const isNewMoon = parsed.kind === "yeni-ay";
  const content = isNewMoon ? NEW_MOON_CONTENT : FULL_MOON_CONTENT;
  const dateStr = `${eventInfo.day} ${monthName} ${parsed.year}`;
  const moonSign = getEventMoonSign(parsed.year, parsed.month, eventInfo.day, parsed.kind);
  const signCards = ZODIAC_SIGNS.map((s) => ({
    sign: s,
    emoji: ZODIAC_DATA[s]?.emoji || "✦",
    ...interpret(parsed.kind, moonSign, s),
  }));

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Kozmik Takvim", path: "/#celestial-calendar" },
    { name: content.title },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${content.title} ${monthName} ${parsed.year}`,
    description: content.intro(monthName, parsed.year, eventInfo.day),
    datePublished: new Date(parsed.year, parsed.month, eventInfo.day).toISOString(),
    dateModified: new Date(parsed.year, parsed.month, eventInfo.day).toISOString(),
    author: { "@type": "Organization", name: "Marifetli Kedi" },
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/#celestial-calendar" className="hover:text-on-surface transition-colors">Kozmik Takvim</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">{content.title}</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">{isNewMoon ? "🌑" : "🌕"}</span>
          <span className="text-label-md">{dateStr}</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          {content.title} {monthName} {parsed.year}
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          Bu {isNewMoon ? "yeni ay" : "dolunay"} <strong className="text-on-surface">{moonSign} burcunda</strong> gerçekleşiyor.{" "}
          {content.intro(monthName, parsed.year, eventInfo.day)}
        </p>
      </div>

      <AdSlot name="content_inline" className="mb-section-gap" />

      <section className="mb-section-gap">
        <h2 className="text-headline-lg font-headline-lg text-primary mb-2">
          {moonSign} {isNewMoon ? "Yeni Ayı" : "Dolunayı"} Burçlara Ne Söylüyor?
        </h2>
        <p className="text-body-md text-on-surface-variant mb-8 max-w-3xl">
          {dateStr} tarihli bu {isNewMoon ? "yeni ay" : "dolunay"} {moonSign} burcunda gerçekleşiyor.
          Her burç bu gökyüzü olayını kendi haritasında farklı bir evde karşılar; aşağıda burcunu bul,
          seni nelerin beklediğini oku.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {signCards.map((c) => (
            <Link
              key={c.sign}
              href={`/burclar/${signSlug(c.sign)}`}
              className="glass-card p-6 rounded-3xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{c.emoji}</span>
                <div>
                  <h3 className="font-sora text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                    {c.sign}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-caption font-label-md">
                    {c.aspect.label} • {c.aspect.desc}
                  </span>
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">{c.text}</p>
              <span className="inline-flex items-center gap-1 text-primary text-label-md mt-4">
                {c.sign} burcunu incele
                <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-section-gap max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            {content.howTitle}
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">{content.howText}</p>
        </div>
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            {content.meaningTitle}
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">{content.meaningText}</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-primary/10">
          <h3 className="text-headline-md font-headline-md text-primary mb-3">Sık Sorulan Sorular</h3>
          <div className="space-y-4">
            {content.faqs.map((f) => (
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
          <Link href="/kozmik-takvim/merkur-retrosu" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">☿</span>
            <p className="text-label-md font-label-md text-on-surface">Merkür Retrosu</p>
            <p className="text-caption text-outline mt-1">Ne zaman, etkileri</p>
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
        </div>
      </section>

      <AdSlot name="blog_listing" format="fluid" className="my-section-gap" />
    </main>
  );
}
