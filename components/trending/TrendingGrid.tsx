import Link from "next/link";
import { getActiveTrendArticles } from "@/lib/public-queries";

export default async function TrendingGrid({ limit }: { limit?: number }) {
  const articles = await getActiveTrendArticles();
  const displayed = limit ? articles.slice(0, limit) : articles;

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl mb-4 block">auto_stories</span>
        <p className="text-body-lg">Henüz trend içerik eklenmemiş</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayed.map((c) => (
        <Link
          key={c.id}
          href={`/trend/${c.slug}`}
          className="glass p-4 rounded-3xl inner-glow group hover:bg-white/5 transition-all flex flex-col h-full cursor-pointer"
        >
          <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
            {c.cover_image ? (
              <img src={c.cover_image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-surface-bright/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-outline/30">image</span>
              </div>
            )}
            <div className={`absolute top-3 left-3 px-3 py-1 bg-background/80 backdrop-blur text-caption rounded-full ${c.tag_color}`}>
              {c.tag}
            </div>
          </div>
          <h4 className={`font-sora text-body-lg text-white mb-4 flex-1 font-semibold ${c.tag_color} transition-colors`}>
            {c.title}
          </h4>
        </Link>
      ))}
    </div>
  );
}
