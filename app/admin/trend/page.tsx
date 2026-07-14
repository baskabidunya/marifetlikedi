import { getTrendArticles, saveTrendArticle } from "@/lib/admin";
import TrendArticleList from "@/components/admin/TrendArticleList";
import RichTextEditor from "@/components/admin/RichTextEditor";

const TAG_COLORS = [
  { value: "text-tertiary", label: "Altın (Tertiary)" },
  { value: "text-secondary", label: "Mor (Secondary)" },
  { value: "text-primary", label: "Açık Mor (Primary)" },
];

export default async function AdminTrendPage() {
  const articles = await getTrendArticles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Trend İçerikler</h1>
        <p className="text-caption text-outline mt-0.5">{articles.length} içerik</p>
      </div>

      {/* Yeni Ekle */}
      <form action={saveTrendArticle} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="active" value="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Başlık</label>
            <input name="title" required placeholder="Yazı başlığı"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Slug</label>
            <input name="slug" placeholder="otomatik-uretilir"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Kategori / Etiket</label>
            <input name="tag" placeholder="Burç Analizi"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Etiket Rengi</label>
            <select name="tag_color"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
              {TAG_COLORS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Özet</label>
          <textarea name="excerpt" rows={2}
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">İçerik</label>
          <RichTextEditor />
        </div>
        <div className="flex items-end">
          <button type="submit"
            className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
            + Ekle
          </button>
        </div>
      </form>

      <TrendArticleList articles={articles} />
    </div>
  );
}
