import { getPages, savePage, deletePage } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminSayfalarPage() {
  const pages = await getPages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Sayfa Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">Statik sayfalar (Hakkımızda, İletişim vb.)</p>
      </div>

      {/* Yeni Ekle */}
      <form action={savePage} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="published" value="false" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Başlık</label>
            <input name="title" required placeholder="Sayfa başlığı"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Slug</label>
            <input name="slug" required placeholder="sayfa-adresi"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
        </div>
        <button type="submit"
          className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
          + Oluştur
        </button>
      </form>

      <div className="space-y-3">
        {pages.map(p => (
          <form key={p.id} action={savePage}
            className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
            <input type="hidden" name="id" value={p.id} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-caption text-outline mb-1">Başlık</label>
                <input name="title" defaultValue={p.title} required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Slug</label>
                <input name="slug" defaultValue={p.slug} required
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Durum</label>
                <select name="published" defaultValue={p.published ? "true" : "false"}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                  <option value="true">Yayında</option>
                  <option value="false">Taslak</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-caption text-outline mb-1">Meta Başlık</label>
                <input name="meta_title" defaultValue={p.meta_title}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-caption text-outline mb-1">Meta Açıklama</label>
                <input name="meta_description" defaultValue={p.meta_description}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">İçerik (Markdown)</label>
              <textarea name="content" defaultValue={p.content} rows={8}
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none font-mono" />
            </div>
            <div className="flex items-center gap-2">
              <button type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                Kaydet
              </button>
              <ConfirmButton formAction={deletePage} name="id" value={p.id} label="Sil" />
            </div>
          </form>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz sayfa yok</div>
      )}
    </div>
  );
}
