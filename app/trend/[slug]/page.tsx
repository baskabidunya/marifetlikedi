import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrendArticleBySlug, getActiveTrendArticles } from "@/lib/public-queries";
import { renderMarkdown } from "@/lib/markdown";
import {
  ogMeta,
  breadcrumbLd,
  jsonLd,
  cleanDescription,
  decodeEntities,
  absoluteUrl,
  trendTagLabel,
} from "@/lib/seo";
import { findSignInText } from "@/lib/sign-slugs";
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = await getActiveTrendArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

import AdSlot from "@/components/ads/AdSlot";
import AuthorBox from "@/components/seo/AuthorBox";
import ContentDisclaimer from "@/components/seo/ContentDisclaimer";
import SignCta from "@/components/seo/SignCta";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getTrendArticleBySlug(slug);
  if (!article) return { title: "Trend İçerikler" };
  const title = decodeEntities(article.title);
  const description = cleanDescription(article.excerpt || "");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `/trend/${slug}` },
    ...ogMeta({
      title,
      description,
      path: `/trend/${slug}`,
      type: "article",
      image: article.cover_image ?? undefined,
      publishedTime: article.created_at as string,
      modifiedTime: (article.updated_at || article.created_at) as string,
    }),
  };
}

export default async function TrendDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getTrendArticleBySlug(slug);
  if (!article) notFound();

  const title = decodeEntities(article.title);
  const description = cleanDescription(article.excerpt || "");
  const tagLabel = trendTagLabel(article.tag);
  const authorName =
    (article as { author_name?: string }).author_name || "Marifetli Kedi";
  const sign = findSignInText(article.title, article.excerpt);
  const html = renderMarkdown(article.content);

  const published = new Date(article.created_at as string);
  const modified = article.updated_at ? new Date(article.updated_at as string) : null;
  const formatDate = (d: Date) => d.toLocaleDateString("tr-TR");

  const all = await getActiveTrendArticles();
  const related = all
    .filter((a) => a.slug !== slug)
    .sort((a, b) => Number(b.tag === article.tag) - Number(a.tag === article.tag))
    .slice(0, 3);

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Trend İçerikler", path: "/trend" },
    { name: title },
  ]);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description || undefined,
    image: article.cover_image
      ? absoluteUrl(article.cover_image)
      : absoluteUrl("/og-default.png"),
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: { "@type": "Organization", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "Marifetli Kedi",
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/trend/${slug}`) },
  };

  return (
    <main className="top-clear-2 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <article className="max-w-3xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
          <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
          <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
          <Link href="/trend" className="hover:text-on-surface transition-colors">Trend İçerikler</Link>
          <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface-variant truncate max-w-[200px]">{title}</span>
        </nav>

        <div className={`inline-block px-3 py-1 rounded-full bg-background/80 text-caption font-label-md mb-4 ${article.tag_color}`}>
          {tagLabel}
        </div>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-4 leading-tight">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-caption text-outline mb-6">
          <span>{authorName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={(article.created_at as string).slice(0, 10)}>
            {formatDate(published)}
          </time>
          {modified && (
            <>
              <span aria-hidden="true">·</span>
              <span>Güncelleme: {formatDate(modified)}</span>
            </>
          )}
        </div>

        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-10 bg-surface-bright/10">
          {article.cover_image ? (
            <img src={article.cover_image} alt={title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span aria-hidden="true" className="material-symbols-outlined text-6xl text-outline/30">image</span>
            </div>
          )}
        </div>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <ContentDisclaimer />

        <AdSlot name="content_inline" className="my-10" />

        <SignCta signName={sign?.name} signSlug={sign?.slug} />

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-headline-md font-headline-md text-primary mb-6 flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-lg">auto_stories</span>
              İlgili Yazılar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id as string}
                  href={`/trend/${r.slug}`}
                  className="glass p-4 rounded-2xl group no-underline border border-on-surface/5 hover:border-primary/30 transition-all"
                >
                  <span className="text-caption text-primary">{trendTagLabel(r.tag)}</span>
                  <h3 className="text-body-md text-on-surface group-hover:text-primary mt-2 line-clamp-3 font-medium">
                    {decodeEntities(r.title)}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AuthorBox updated={(article.updated_at || article.created_at) as string} />
      </article>
    </main>
  );
}
