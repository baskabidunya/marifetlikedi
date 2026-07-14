import { getBlogCategories, saveBlogCategory, deleteBlogCategory } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminBlogCategoriesPage() {
  const categories = await getBlogCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Blog Kategorileri</h1>
        <p className="text-caption text-outline mt-0.5">{categories.length} kategori</p>
      </div>

      {/* Yeni Ekle */}
      <form action={saveBlogCategory} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="active" value="true" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Kategori Adı</label>
            <input name="name" required placeholder="Kategori adı"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Slug</label>
            <input name="slug" required placeholder="kategori-slug"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Açıklama</label>
            <input name="description"
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

      <div className="bg-surface-container/50 rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">Ad</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">Slug</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline text-center">Sıra</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline text-center">Durum</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-2.5 text-body-sm text-on-surface font-medium">{c.name}</td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden sm:table-cell">{c.slug}</td>
                <td className="px-4 py-2.5 text-center text-body-sm text-on-surface-variant">{c.sort_order}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-md text-caption ${c.active ? "bg-primary/15 text-primary" : "bg-white/5 text-outline"}`}>
                    {c.active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <ConfirmButton formAction={deleteBlogCategory} name="id" value={c.id} label="Sil" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz kategori yok</div>
      )}
    </div>
  );
}
