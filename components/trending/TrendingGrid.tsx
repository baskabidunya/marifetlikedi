import Link from "next/link";
import { getActiveTrendArticles } from "@/lib/public-queries";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 10;

export default async function TrendingGrid({
  limit,
  page,
}: {
  limit?: number;
  page?: number;
}) {
  const articles = await getActiveTrendArticles();
  const paginated = page !== undefined;
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const displayed = limit
    ? articles.slice(0, limit)
    : paginated && page
      ? articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      : articles;

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-on-surface-variant">
        <span className="material-symbols-outlined text-5xl mb-4 block">auto_stories</span>
        <p className="text-body-lg">Henüz trend içerik eklenmemiş</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayed.map((c) => (
          <Link
            key={c.id}
            href={`/trend/${c.slug}`}
            className="glass p-4 rounded-3xl inner-glow group hover:bg-on-surface/5 transition-all flex flex-col h-full cursor-pointer"
          >
            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
              {c.cover_image ? (
                <img src={c.cover_image} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-surface-bright/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline/30">image</span>
                </div>
              )}
              <div className={`absolute top-3 left-3 px-3 py-1 bg-background/80 backdrop-blur text-caption rounded-full ${c.tag_color}`}>
                {c.tag}
              </div>
            </div>
            <h4 className="font-sora text-body-lg text-on-surface group-hover:text-primary mb-4 flex-1 font-semibold transition-colors">
              {c.title}
            </h4>
          </Link>
        ))}
      </div>
      {paginated && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/trend"
        />
      )}
    </>
  );
}
