import { getNavigationLinks, saveNavLink, deleteNavLink } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminMenuPage() {
  const links = await getNavigationLinks();
  const headerLinks = links.filter(l => l.position === "header");
  const footerLinks = links.filter(l => l.position === "footer");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Menü Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">Header ve footer linkleri</p>
      </div>

      {/* Header Links */}
      <div>
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Header Menüsü</p>
        <form action={saveNavLink} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5 mb-3">
          <input type="hidden" name="position" value="header" />
          <input type="hidden" name="active" value="true" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-caption text-outline mb-1">Etiket</label>
              <input name="label" required placeholder="Menü yazısı"
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Link</label>
              <input name="url" required placeholder="/burclar"
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Sıra</label>
              <input name="sort_order" type="number" value={headerLinks.length}
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
        <div className="space-y-2">
          {headerLinks.map(l => (
            <form key={l.id} action={saveNavLink}
              className="bg-surface-container/60 rounded-xl px-4 py-2.5 flex items-center gap-3 border border-white/5">
              <input type="hidden" name="id" value={l.id} />
              <input type="hidden" name="position" value="header" />
              <input name="label" defaultValue={l.label} required
                className="flex-1 bg-transparent border-b border-white/10 text-body-sm text-on-surface focus:border-primary transition-all outline-none" />
              <input name="url" defaultValue={l.url} required
                className="flex-1 bg-transparent border-b border-white/10 text-body-sm text-on-surface-variant focus:border-primary transition-all outline-none" />
              <input name="sort_order" defaultValue={l.sort_order} type="number"
                className="w-14 bg-transparent border-b border-white/10 text-body-sm text-on-surface-variant text-center focus:border-primary transition-all outline-none" />
              <button type="submit"
                className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-caption hover:bg-primary/30 transition-all">
                Kaydet
              </button>
              <ConfirmButton formAction={deleteNavLink} name="id" value={l.id} label="Sil" />
            </form>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div>
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Footer Menüsü</p>
        <form action={saveNavLink} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5 mb-3">
          <input type="hidden" name="position" value="footer" />
          <input type="hidden" name="active" value="true" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-caption text-outline mb-1">Etiket</label>
              <input name="label" required placeholder="Menü yazısı"
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Link</label>
              <input name="url" required placeholder="/hakkimizda"
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Sıra</label>
              <input name="sort_order" type="number" value={footerLinks.length}
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
        <div className="space-y-2">
          {footerLinks.map(l => (
            <form key={l.id} action={saveNavLink}
              className="bg-surface-container/60 rounded-xl px-4 py-2.5 flex items-center gap-3 border border-white/5">
              <input type="hidden" name="id" value={l.id} />
              <input type="hidden" name="position" value="footer" />
              <input name="label" defaultValue={l.label} required
                className="flex-1 bg-transparent border-b border-white/10 text-body-sm text-on-surface focus:border-primary transition-all outline-none" />
              <input name="url" defaultValue={l.url} required
                className="flex-1 bg-transparent border-b border-white/10 text-body-sm text-on-surface-variant focus:border-primary transition-all outline-none" />
              <input name="sort_order" defaultValue={l.sort_order} type="number"
                className="w-14 bg-transparent border-b border-white/10 text-body-sm text-on-surface-variant text-center focus:border-primary transition-all outline-none" />
              <button type="submit"
                className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-caption hover:bg-primary/30 transition-all">
                Kaydet
              </button>
              <ConfirmButton formAction={deleteNavLink} name="id" value={l.id} label="Sil" />
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
