import { getTarotCards, saveTarotCard, deleteTarotCard } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminTarotPage() {
  const cards = await getTarotCards();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Tarot Kartları</h1>
        <p className="text-caption text-outline mt-0.5">{cards.length} kart</p>
      </div>

      {/* Yeni Ekle */}
      <form action={saveTarotCard} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="active" value="true" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Kart Adı</label>
            <input name="name" required placeholder="The Fool"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Numara</label>
            <input name="number" type="number" required placeholder="0"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Tür</label>
            <select name="arcana"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
              <option value="major">Major Arcana</option>
              <option value="minor">Minor Arcana</option>
            </select>
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">İkon</label>
            <input name="icon" placeholder="auto_awesome"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div className="flex items-end">
            <button type="submit"
              className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
              + Ekle
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {cards.map(c => (
          <form key={c.id} action={saveTarotCard}
            className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
            <input type="hidden" name="id" value={c.id} />
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <div>
                <label className="block text-caption text-outline mb-1">Kart Adı</label>
                <input name="name" defaultValue={c.name} required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Numara</label>
                <input name="number" defaultValue={c.number} type="number"
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Tür</label>
                <select name="arcana" defaultValue={c.arcana}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                </select>
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">İkon</label>
                <input name="icon" defaultValue={c.icon}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Sıra</label>
                <input name="sort_order" defaultValue={c.sort_order} type="number"
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Durum</label>
                <select name="active" defaultValue={c.active ? "true" : "false"}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-caption text-outline mb-1">Dik Anlamı</label>
                <textarea name="upright_meaning" defaultValue={c.upright_meaning} rows={2}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Ters Anlamı</label>
                <textarea name="reversed_meaning" defaultValue={c.reversed_meaning} rows={2}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
              </div>
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Görsel URL</label>
              <input name="image_url" defaultValue={c.image_url}
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
            </div>
            <div className="flex items-center gap-2">
              <button type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                Kaydet
              </button>
              <ConfirmButton formAction={deleteTarotCard} name="id" value={c.id} label="Sil" />
            </div>
          </form>
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz tarot kartı yok</div>
      )}
    </div>
  );
}
