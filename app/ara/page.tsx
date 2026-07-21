import Link from "next/link";
import { searchPosts } from "@/lib/blog-public";
import { searchTrendArticles } from "@/lib/public-queries";
import type { Metadata } from "next";
import type { PostWithTags } from "@/lib/blog-public";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `${q} - Arama Sonuçları` : "Arama",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q?.trim()) {
    return (
      <main className="max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-outline mb-4">search</span>
        <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Arama</h1>
        <p className="text-body-md text-outline">Aramak için yukarıdaki arama kutusunu kullanın.</p>
      </main>
    );
  }

  const [blogResults, trendResults] = await Promise.all([
    searchPosts(q.trim()),
    searchTrendArticles(q.trim()),
  ]);

  const total = blogResults.length + trendResults.length;

  return (
    <main className="max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-12">
      <div className="mb-8">
        <h1 className="text-headline-md font-headline-md text-on-surface">Arama Sonuçları</h1>
        <p className="text-caption text-outline mt-1">
          &ldquo;{q}&rdquo; için {total} sonuç bulundu
        </p>
      </div>

      {total === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span>
          <p className="text-body-md text-outline">Sonuç bulunamadı.</p>
          <p className="text-caption text-outline mt-1">Farklı bir kelimeyle tekrar deneyin.</p>
        </div>
      )}

      {blogResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-label-lg font-label-md text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">article</span>
            Blog Yazıları ({blogResults.length})
          </h2>
          <div className="space-y-3">
            {blogResults.map((post: PostWithTags) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-surface-container/50 rounded-xl p-4 border border-white/5 hover:bg-surface-container-high transition-colors"
              >
                <h3 className="text-body-md font-label-md text-on-surface mb-1">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-caption text-outline line-clamp-2">{post.excerpt}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-caption text-outline bg-white/5 px-2 py-0.5 rounded">{post.category}</span>
                  <span className="text-caption text-outline">{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {trendResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-label-lg font-label-md text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">trending_up</span>
            Trend İçerikler ({trendResults.length})
          </h2>
          <div className="space-y-3">
            {trendResults.map((article: any) => (
              <Link
                key={article.id}
                href={`/trend/${article.slug}`}
                className="block bg-surface-container/50 rounded-xl p-4 border border-white/5 hover:bg-surface-container-high transition-colors"
              >
                <h3 className="text-body-md font-label-md text-on-surface mb-1">{article.title}</h3>
                {article.summary && (
                  <p className="text-caption text-outline line-clamp-2">{article.summary}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
