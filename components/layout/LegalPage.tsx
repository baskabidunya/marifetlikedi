import type { ReactNode } from "react";
import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

export default function LegalPage({
  title,
  description,
  slug,
  children,
}: {
  title: string;
  description?: string;
  slug?: string;
  children: ReactNode;
}) {
  const breadcrumbJsonLd = slug
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://www.marifetlikedi.com" },
          { "@type": "ListItem", position: 2, name: title },
        ],
      }
    : null;

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
      {breadcrumbJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      )}

      {slug && (
        <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
          <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-on-surface-variant">{title}</span>
        </nav>
      )}

      <article className="space-y-6">
        <h1 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
          {title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        {description && (
          <p className="text-body-md text-on-surface-variant leading-relaxed">{description}</p>
        )}
        <div className="prose-cosmic text-body-lg text-on-surface-variant leading-relaxed space-y-4">
          {children}
        </div>
      </article>

      <AdSlot name="static_page" className="my-12 max-w-3xl mx-auto" />
    </main>
  );
}
