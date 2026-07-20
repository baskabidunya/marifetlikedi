import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPostBySlug } from "@/lib/blog-public";
import { renderMarkdown, extractFaqItems, extractTocItems } from "@/lib/markdown";
import AdSlot from "@/components/ads/AdSlot";

export const dynamic = "force-dynamic";

const AUTHOR = {
  name: "Başka bir Dünya Astroloji Ekibi",
  bio: "Marifetli Kedi, Başka bir Dünya (baskabidunya.com) bünyesinde; astroloji, mitoloji ve kişisel gelişim alanında deneyimli bir ekip tarafından hazırlanır. İçeriklerimiz gök bilimsel hareketleri, klasik astroloji geleneğini ve günümüzün yaşam pratiklerini bir araya getirir.",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Gök Günlüğü - Marifetli Kedi" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
      images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630, alt: post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();
  const html = renderMarkdown(post.content);

  const authorName = post.author_name || AUTHOR.name;
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
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || undefined,
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
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.marifetlikedi.com" },
      { "@type": "ListItem", position: 2, name: "Gök Günlüğü", item: "https://www.marifetlikedi.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-container-padding-mobile md:px-container-padding-desktop top-clear-2 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/blog" className="hover:text-on-surface transition-colors">Gök Günlüğü</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant truncate max-w-[200px]">{post.title}</span>
      </nav>

      {post.cover_image && (
        <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="px-4 py-1.5 rounded-xl bg-primary/15 text-primary text-caption font-label-md">{post.category}</span>
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

      <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary mb-8">{post.title}</h1>

      {post.excerpt && (
        <p className="text-body-lg text-on-surface-variant italic mb-8 leading-relaxed">{post.excerpt}</p>
      )}

      {tocItems.length >= 3 && (
        <nav className="bg-surface-container/40 rounded-2xl border border-white/5 p-5 mb-8">
          <h2 className="text-label-md text-on-surface font-label-md mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">list</span>
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

      <div className="mt-12 rounded-2xl border border-white/10 bg-surface-container/40 p-5 flex items-start gap-4">
        <span className="material-symbols-outlined text-primary text-[28px]">auto_awesome</span>
        <div>
          <p className="text-label-md text-on-surface font-label-md">{authorName}</p>
          <p className="text-caption text-on-surface-variant mt-1 leading-relaxed">{AUTHOR.bio}</p>
        </div>
      </div>

      <AdSlot name="content_inline" className="my-10" />
    </div>
  );
}
