import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPostBySlug } from "@/lib/blog-public";
import { renderMarkdown, extractFaqItems, extractTocItems } from "@/lib/markdown";
import { getRelatedPosts } from "@/lib/blog-public";
import { ogMeta, jsonLd, cleanDescription, decodeEntities, absoluteUrl } from "@/lib/seo";
import { findSignInText } from "@/lib/sign-slugs";
import AdSlot from "@/components/ads/AdSlot";
import ContentDisclaimer from "@/components/seo/ContentDisclaimer";
import SignCta from "@/components/seo/SignCta";

export const revalidate = 300;

const AUTHOR = {
  name: "Başka bir Dünya Astroloji Ekibi",
  bio: "Marifetli Kedi, Başka bir Dünya (baskabidunya.com) bünyesinde; astroloji, mitoloji ve kişisel gelişim alanında deneyimli bir ekip tarafından hazırlanır. İçeriklerimiz gök bilimsel hareketleri, klasik astroloji geleneğini ve günümüzün yaşam pratiklerini bir araya getirir.",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Gök Günlüğü" };
  const title = decodeEntities(post.title);
  const description = cleanDescription(post.excerpt || "");
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `/blog/${slug}` },
    ...ogMeta({
      title,
      description,
      path: `/blog/${slug}`,
      type: "article",
      image: post.cover_image ?? undefined,
      publishedTime: post.created_at as string,
      modifiedTime: (post.updated_at || post.created_at) as string,
    }),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();
  const html = renderMarkdown(post.content);
  const relatedPosts = await getRelatedPosts(post);

  const authorName = post.author_name || AUTHOR.name;
  const title = decodeEntities(post.title);
  const description = cleanDescription(post.excerpt || "");
  const sign = findSignInText(post.title, post.excerpt);
  const faqItems = extractFaqItems(post.content);
  const tocItems = extractTocItems(post.content);
  const faqJsonLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const updatedAt = post.updated_at && post.updated_at !== post.created_at
    ? new Date(post.updated_at).toLocaleDateString("tr-TR")
    : null;

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || undefined,
    image: post.cover_image
      ? absoluteUrl(post.cover_image)
      : absoluteUrl("/og-default.png"),
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { "@type": "Organization", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "Marifetli Kedi",
      logo: { "@type": "ImageObject", url: "https://www.marifetlikedi.com/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.marifetlikedi.com/blog/${slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Gök Günlüğü", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-container-padding-mobile md:px-container-padding-desktop top-clear-2 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogPostingJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd)} />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(faqJsonLd)}
        />
      )}

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/blog" className="hover:text-on-surface transition-colors">Gök Günlüğü</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant truncate max-w-[200px]">{decodeEntities(post.title)}</span>
      </nav>

      {post.cover_image && (
        <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8">
          <img src={post.cover_image} alt={decodeEntities(post.title)} loading="eager" fetchPriority="high" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Link href={`/blog?kategori=${encodeURIComponent(post.category)}`} className="px-4 py-1.5 rounded-xl bg-primary/15 text-primary text-caption font-label-md hover:bg-primary/25 transition-colors">{post.category}</Link>
        <span className="text-caption text-outline">{authorName}</span>
        <span className="text-caption text-outline">{new Date(post.created_at).toLocaleDateString("tr-TR")}</span>
        {updatedAt && (
          <span className="text-caption text-outline">· Güncelleme: {updatedAt}</span>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full mt-2">
            {post.tags.map((t) => (
              <Link
                key={t.slug}
                href={`/blog?etiket=${encodeURIComponent(t.slug)}`}
                className="text-caption px-2.5 py-1 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/30 hover:bg-tertiary/20 transition-colors"
              >
                #{t.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-8">{decodeEntities(post.title)}</h1>

      {post.excerpt && (
        <p className="text-body-lg text-on-surface-variant italic mb-8 leading-relaxed">{decodeEntities(post.excerpt)}</p>
      )}

      {tocItems.length >= 3 && (
        <nav className="bg-surface-container/40 rounded-2xl border border-on-surface/5 p-5 mb-8">
          <h2 className="text-label-md text-on-surface font-label-md mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-lg">list</span>
            İçindekiler
          </h2>
          <ul className="space-y-1.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-body-md text-on-surface-variant hover:text-primary transition-colors block py-0.5"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <ContentDisclaimer />

      <SignCta signName={sign?.name} signSlug={sign?.slug} />

      <div className="mt-12 rounded-2xl border border-on-surface/10 bg-surface-container/40 p-5 flex items-start gap-4">
        <span aria-hidden="true" className="material-symbols-outlined text-primary text-[28px]">auto_awesome</span>
        <div>
          <p className="text-label-md text-on-surface font-label-md">{authorName}</p>
          <p className="text-caption text-on-surface-variant mt-1 leading-relaxed">{AUTHOR.bio}</p>
          {updatedAt && (
            <p className="text-caption text-outline mt-1.5">Son güncelleme: {updatedAt}</p>
          )}
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-headline-md text-primary font-headline-md mb-6 flex items-center gap-2">
            <span aria-hidden="true" className="material-symbols-outlined text-lg">auto_stories</span>
            Benzer Yazılar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.id}
                href={`/blog/${rp.slug}`}
                className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all"
              >
                {rp.cover_image && (
                  <div className="h-36 overflow-hidden">
                    <img src={rp.cover_image} alt={rp.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-4">
                  <span className="text-caption px-2 py-0.5 rounded bg-primary/15 text-primary">{rp.category}</span>
                  <h3 className="text-body-md font-label-md text-on-surface mt-2 group-hover:text-primary transition-colors line-clamp-2">
                    {decodeEntities(rp.title)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdSlot name="content_inline" className="my-10" />
    </div>
  );
}
