import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/admin";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Sayfa Bulunamadı - Marifetli Kedi" };
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || "",
  };
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <main className="pt-28 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
      <article className="space-y-6">
        <h1 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
          {page.title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="prose-cosmic text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">
          {page.content}
        </div>
      </article>
    </main>
  );
}
