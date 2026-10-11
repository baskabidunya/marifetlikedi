import Link from "next/link";
import TarotTable from "@/components/tarot/TarotTable";
import Disclaimer from "@/components/layout/Disclaimer";
import { getPublicTarotCards } from "@/lib/public-queries";
import { ogMeta, jsonLd } from "@/lib/seo";

export const metadata = {
  title: "Tarot Falı Bak: Online Tarot Kartı Çek",
  description:
    "Online tarot falı bak, günün tarot kartı çek, evet hayır tarot ve kart anlamları. Major ve Minor Arkana kartlarının detaylı yorumları.",
  alternates: { canonical: "/tarot" },
  ...ogMeta({
    title: "Tarot Falı Bak: Online Tarot Kartı Çek",
    description:
      "Online tarot falı bak, günün tarot kartı çek, evet hayır tarot ve kart anlamları. Major ve Minor Arkana kartlarının detaylı yorumları.",
    path: "/tarot",
  }),
};

export default async function TarotPage() {
  const dbCards = await getPublicTarotCards();
  const cards = dbCards.map((c) => ({
    name: c.name,
    desc: c.upright_meaning,
    detail: c.description,
    icon: c.icon,
    image_url: c.image_url,
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.marifetlikedi.com" },
      { "@type": "ListItem", position: 2, name: "Tarot" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd)} />
      <div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-28">
        <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
          <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
          <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface-variant">Tarot</span>
        </nav>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-8">
          Tarot Falı Bak: Bugün İçin Tarot Kartı Çek
        </h1>
      </div>
      <TarotTable deck={cards} />
      <div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pb-16">
        <Disclaimer variant="box" />
      </div>
    </>
  );
}
