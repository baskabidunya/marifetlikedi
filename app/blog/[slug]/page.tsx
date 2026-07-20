import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPostBySlug } from "@/lib/blog-public";
import { renderMarkdown, extractFaqItems } from "@/lib/markdown";
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
  return { title: `${post.title} - Marifetli Kedi`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();
  const html = renderMarkdown(post.content);

  const authorName = post.author_name || AUTHOR.name;
  const faqItems = extractFaqItems(post.content);
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

  return (
    <div className="max-w-4xl mx-auto px-container-padding-mobile md:px-container-padding-desktop top-clear-2 pb-32">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Link href="/blog"
        className="inline-flex items-center gap-2 text-label-md text-outline hover:text-on-surface transition-colors mb-8">
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Gök Günlüğü'ne Dön
      </Link>

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
