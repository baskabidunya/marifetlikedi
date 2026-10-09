import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TestQuiz from "@/components/funtests/TestQuiz";
import AdSlot from "@/components/ads/AdSlot";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";
import { getFunTestBySlug, getFunTestsMeta } from "@/lib/fun-tests-db";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const test = await getFunTestBySlug(id);
  if (!test) return { title: "Test Bulunamadı" };
  return {
    title: `${test.title} - Eğlenceli Testler`,
    description: test.description,
    alternates: { canonical: `/eglenceli-testler/${id}` },
    ...ogMeta({
      title: `${test.title} - Eğlenceli Testler`,
      description: test.description,
      path: `/eglenceli-testler/${id}`,
      type: "article",
    }),
  };
}

export default async function TestPage({ params }: Props) {
  const { id } = await params;
  const test = await getFunTestBySlug(id);
  if (!test) notFound();

  const related = (await getFunTestsMeta())
    .filter((t) => t.id !== test.id)
    .slice(0, 3);
  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Eğlenceli Testler", path: "/eglenceli-testler" },
    { name: test.title },
  ]);

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/eglenceli-testler" className="hover:text-on-surface transition-colors">Eğlenceli Testler</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant truncate max-w-[200px]">{test.title}</span>
      </nav>
      <div className="mb-6">
        <Link
          href="/eglenceli-testler"
          className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tüm Testler
        </Link>
      </div>

      <section className="mb-8 bg-surface/60 border border-outline/20 rounded-2xl p-6 md:p-8">
        <h1 className="text-headline-sm font-headline-sm text-on-surface mb-4">
          {test.title}
        </h1>
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-4">
          {test.description}
        </p>
      </section>

      <TestQuiz test={test} related={related} />

      <AdSlot
        name="static_page"
        className="my-12 max-w-3xl mx-auto"
      />
    </main>
  );
}