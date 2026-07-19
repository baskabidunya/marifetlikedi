import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TestQuiz from "@/components/funtests/TestQuiz";
import AdSlot from "@/components/ads/AdSlot";
import { FUN_TESTS } from "@/lib/fun-tests";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return FUN_TESTS.map((test) => ({ id: test.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const test = FUN_TESTS.find((t) => t.id === id);
  if (!test) return { title: "Test Bulunamadı" };
  return {
    title: `${test.title} - Eğlenceli Testler - Marifetli Kedi`,
    description: test.description,
  };
}

export default async function TestPage({ params }: Props) {
  const { id } = await params;
  const test = FUN_TESTS.find((t) => t.id === id);
  if (!test) notFound();

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
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

      <TestQuiz test={test} />

      <AdSlot
        name="static_page"
        className="my-12 max-w-3xl mx-auto"
      />
    </main>
  );
}