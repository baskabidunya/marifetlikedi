import TarotTable from "@/components/tarot/TarotTable";
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
  return <TarotTable deck={cards} />;
}
