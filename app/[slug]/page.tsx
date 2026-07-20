import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/admin";
import { renderMarkdown } from "@/lib/markdown";
import AdSlot from "@/components/ads/AdSlot";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Sayfa Bulunamadı - Marifetli Kedi" };
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || "",
    alternates: { canonical: `/${slug}` },
  };
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.marifetlikedi.com" },
      { "@type": "ListItem", position: 2, name: page.title },
    ],
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">{page.title}</span>
      </nav>

      <article className="space-y-6">
        <h1 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
          {page.title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(page.content) }}
        />
      </article>

      <AdSlot
        name="static_page"
        className="my-12 max-w-3xl mx-auto"
      />
    </main>
  );
}
