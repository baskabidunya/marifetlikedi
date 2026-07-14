import { getBlogTags, saveBlogTag, deleteBlogTag } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminBlogTagsPage() {
  const tags = await getBlogTags();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Blog Etiketleri</h1>
        <p className="text-caption text-outline mt-0.5">{tags.length} etiket</p>
      </div>

      {/* Yeni Ekle */}
      <form action={saveBlogTag} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Etiket Adı</label>
            <input name="name" required placeholder="Etiket adı"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Slug</label>
            <input name="slug" required placeholder="etiket-slug"
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

      <div className="flex flex-wrap gap-2">
        {tags.map(t => (
          <div key={t.id} className="flex items-center gap-2 bg-surface-container/60 rounded-lg px-3 py-2 border border-white/5">
            <span className="text-body-sm text-on-surface">{t.name}</span>
            <ConfirmButton formAction={deleteBlogTag} name="id" value={t.id} label="Sil" />
          </div>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz etiket yok</div>
      )}
    </div>
  );
}
