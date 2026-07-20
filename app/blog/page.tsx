import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/blog-public";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Gök Günlüğü",
  description: "Astroloji, burç yorumları, tarot ve kozmik rehberlik yazıları. Günlük burç, burç uyumu ve kişisel gelişim.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; etiket?: string }>;
}) {
  const { kategori, etiket } = await searchParams;
  const allPosts = await getPublishedPosts();

  const categories = Array.from(new Set(allPosts.map((p) => p.category).filter(Boolean)));

  const posts = allPosts.filter((p) => {
    if (kategori && p.category !== kategori) return false;
    if (etiket && !p.tags.some((t) => t.slug === etiket)) return false;
    return true;
  });

  const activeLabel = kategori
    ? kategori
    : etiket
      ? allPosts.flatMap((p) => p.tags).find((t) => t.slug === etiket)?.name || etiket
      : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.marifetlikedi.com" },
      { "@type": "ListItem", position: 2, name: "Gök Günlüğü" },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop top-clear-2 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Gök Günlüğü</span>
      </nav>

      <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-4">Gök Günlüğü</h1>
      <p className="text-body-lg text-on-surface-variant mb-8">Astroloji, burç yorumları ve kozmik rehberlik</p>

      <div className="flex flex-wrap items-center gap-3 mb-12">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full text-label-md transition-all ${!kategori && !etiket ? "bg-primary text-on-primary" : "glass text-on-surface-variant hover:text-white"}`}
        >
          Tümü
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/blog?kategori=${encodeURIComponent(c)}`}
            className={`px-4 py-2 rounded-full text-label-md transition-all ${kategori === c ? "bg-primary text-on-primary" : "glass text-on-surface-variant hover:text-white"}`}
          >
            {c}
          </Link>
        ))}
        {activeLabel && (
          <span className="text-caption text-outline ml-2">
            Filtre: <span className="text-primary">{activeLabel}</span>
            <Link href="/blog" className="ml-2 underline hover:text-white">temizle</Link>
          </span>
        )}
      </div>

      <AdSlot name="blog_listing" className="mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(p => (
          <article key={p.id} className="glass-card rounded-3xl overflow-hidden hover:-translate-y-1 transition-all group">
            {p.cover_image && (
              <Link href={`/blog/${p.slug}`} className="block h-48 overflow-hidden">
                <img src={p.cover_image} alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
            )}
            <div className="p-6 space-y-3">
              <span className="px-3 py-1 rounded-lg bg-primary/15 text-primary text-caption font-label-md">{p.category}</span>
              <h2 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              {p.excerpt && <p className="text-body-md text-on-surface-variant line-clamp-3">{p.excerpt}</p>}
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/blog?etiket=${encodeURIComponent(t.slug)}`}
                      className="text-caption px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/30 hover:bg-tertiary/20"
                    >
                      #{t.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-3">
                <span className="text-caption text-outline">{p.author_name || "Marifetli Kedi"}</span>
                <span className="text-caption text-outline">{new Date(p.created_at).toLocaleDateString("tr-TR")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-24 text-outline">
          <span className="material-symbols-outlined text-5xl mb-4 block">auto_stories</span>
          <p className="text-body-lg">Bu filtreye uygun yazı bulunamadı</p>
        </div>
      )}
    </div>
  );
}
