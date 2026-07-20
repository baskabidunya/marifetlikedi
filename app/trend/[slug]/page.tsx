import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrendArticleBySlug } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getTrendArticleBySlug(slug);
  if (!article) return { title: "Trend İçerikler - Marifetli Kedi" };
  return { title: `${article.title} - Marifetli Kedi`, description: article.excerpt };
}

export default async function TrendDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getTrendArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="top-clear-2 pb-32">
      <article className="max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <Link
          href="/trend"
          className="inline-flex items-center gap-2 text-label-md text-outline hover:text-on-surface transition-colors mb-8"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Trend İçerikler
        </Link>

        <div className={`inline-block px-3 py-1 rounded-full bg-background/80 text-caption font-label-md mb-4 ${article.tag_color}`}>
          {article.tag}
        </div>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-10 bg-surface-bright/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-outline/30">image</span>
        </div>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <AdSlot name="content_inline" className="my-10" />
      </article>
    </main>
  );
}
