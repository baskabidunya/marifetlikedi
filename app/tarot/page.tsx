import Link from "next/link";
import TarotTable from "@/components/tarot/TarotTable";
import Disclaimer from "@/components/layout/Disclaimer";
import { getPublicTarotCards } from "@/lib/public-queries";

export const metadata = {
  title: "Tarot ve Kehanet Odası",
  description: "Online tarot falı ile kartların rehberliğinde geleceğinize bakın. Major ve Minor Arkana kartlarının anlamları.",
  alternates: { canonical: "/tarot" },
};

export default async function TarotPage() {
  const dbCards = await getPublicTarotCards();
  const cards = dbCards.map((c) => ({
    name: c.name,
    desc: c.upright_meaning,
    detail: c.description,
    icon: c.icon,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-28">
        <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
          <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface-variant">Tarot</span>
        </nav>
      </div>
      <TarotTable deck={cards} />
      <div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pb-16">
        <Disclaimer variant="box" />
      </div>
    </>
  );
}
