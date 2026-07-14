import { getAnnouncements, saveAnnouncement, deleteAnnouncement } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminDuyurularPage() {
  const items = await getAnnouncements();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Duyuru Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">Site geneli duyuru ve bannerlar</p>
      </div>

      {/* Yeni Ekle */}
      <form action={saveAnnouncement} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="active" value="true" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Başlık</label>
            <input name="title" required placeholder="Duyuru başlığı"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Tür</label>
            <select name="type"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
              <option value="info">Bilgi</option>
              <option value="warning">Uyarı</option>
              <option value="success">Başarılı</option>
            </select>
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Link (opsiyonel)</label>
            <input name="link" placeholder="/bir-sayfa"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Mesaj</label>
          <input name="message" required placeholder="Duyuru mesajı..."
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
        <button type="submit"
          className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
          + Ekle
        </button>
      </form>

      <div className="space-y-3">
        {items.map(item => (
          <form key={item.id} action={saveAnnouncement}
            className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
            <input type="hidden" name="id" value={item.id} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-caption text-outline mb-1">Başlık</label>
                <input name="title" defaultValue={item.title} required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Tür</label>
                <select name="type" defaultValue={item.type}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                  <option value="info">Bilgi</option>
                  <option value="warning">Uyarı</option>
                  <option value="success">Başarılı</option>
                </select>
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Durum</label>
                <select name="active" defaultValue={item.active ? "true" : "false"}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                  <option value="true">Aktif</option>
                  <option value="false">Pasif</option>
                </select>
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Link</label>
                <input name="link" defaultValue={item.link}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Mesaj</label>
              <input name="message" defaultValue={item.message} required
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
            </div>
            <div className="flex items-center gap-2">
              <button type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                Kaydet
              </button>
              <ConfirmButton formAction={deleteAnnouncement} name="id" value={item.id} label="Sil" />
            </div>
          </form>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz duyuru yok</div>
      )}
    </div>
  );
}
