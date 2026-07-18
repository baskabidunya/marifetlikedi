import { getTarotCards, saveTarotCard, deleteTarotCard } from "@/lib/admin";
import TarotCardForm from "./TarotCardForm";

export default async function AdminTarotPage() {
  const cards = await getTarotCards();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Tarot Kartları</h1>
        <p className="text-caption text-outline mt-0.5">{cards.length} kart</p>
      </div>

      {/* Yeni Ekle */}
      <TarotCardForm onSave={saveTarotCard} onDelete={deleteTarotCard} />

      <div className="space-y-3">
        {cards.map(c => (
          <TarotCardForm key={c.id} card={c} onSave={saveTarotCard} onDelete={deleteTarotCard} />
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz tarot kartı yok</div>
      )}
    </div>
  );
}
