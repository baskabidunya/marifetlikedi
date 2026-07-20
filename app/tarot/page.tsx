import TarotTable from "@/components/tarot/TarotTable";
import Disclaimer from "@/components/layout/Disclaimer";
import { getPublicTarotCards } from "@/lib/public-queries";

export const metadata = {
  title: "Tarot ve Kehanet Odası - Marifetli Kedi",
  description: "Yıldızların ve kartların rehberliğinde gizemli bir yolculuğa çıkın.",
};

export default async function TarotPage() {
  const dbCards = await getPublicTarotCards();
  const cards = dbCards.map((c) => ({
    name: c.name,
    desc: c.upright_meaning,
    detail: c.description,
    icon: c.icon,
  }));
  return (
    <>
      <TarotTable deck={cards} />
      <div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pb-16">
        <Disclaimer variant="box" />
      </div>
    </>
  );
}
