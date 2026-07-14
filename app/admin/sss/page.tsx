import { getFaqItems, saveFaqItem, deleteFaqItem } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminFaqPage() {
  const items = await getFaqItems();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">SSS Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">Sıkça sorulan sorular</p>
      </div>

      {/* Yeni Ekle */}
      <form action={saveFaqItem} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="sort_order" value={items.length} />
        <input type="hidden" name="active" value="true" />
        <div>
          <label className="block text-caption text-outline mb-1">Soru</label>
          <input name="question" required placeholder="Yeni soru..."
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Cevap</label>
          <textarea name="answer" rows={3} required placeholder="Cevap..."
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
        </div>
        <button type="submit"
          className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
          + Ekle
        </button>
      </form>

      <div className="space-y-3">
        {items.map(item => (
          <form key={item.id} action={saveFaqItem}
            className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
            <input type="hidden" name="id" value={item.id} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block text-caption text-outline mb-1">Soru</label>
                <input name="question" defaultValue={item.question} required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Sıra</label>
                <input name="sort_order" defaultValue={item.sort_order} type="number"
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Durum</label>
                <select name="active" defaultValue={item.active ? "true" : "false"}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Cevap</label>
              <textarea name="answer" defaultValue={item.answer} rows={3} required
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
            </div>
            <div className="flex items-center gap-2">
              <button type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                Kaydet
              </button>
              <ConfirmButton formAction={deleteFaqItem} name="id" value={item.id} label="Sil" />
            </div>
          </form>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz SSS yok</div>
      )}
    </div>
  );
}
