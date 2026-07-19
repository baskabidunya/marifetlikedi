import Link from "next/link";
import { FUN_TESTS } from "@/lib/fun-tests";

export default function FunTestsSection() {
  const latestTests = FUN_TESTS.slice(0, 3);

  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div className="space-y-2">
          <h2 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
            Eğlenceli Testler
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Kendini keşfetmek için eğlenceli testleri çöz, içsel dünyanda keyifli bir yolculuğa çık.
          </p>
        </div>
        <Link
          href="/eglenceli-testler"
          className="text-primary font-label-md hover:underline shrink-0"
        >
          Tüm Testleri Gör
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {latestTests.map((test) => (
          <Link
            key={test.id}
            href={`/eglenceli-testler/${test.id}`}
            className="group bg-surface/60 border border-outline/20 rounded-2xl p-6 hover:bg-surface hover:border-tertiary/40 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl mb-4">{test.icon}</span>
              <h3 className="text-lg font-semibold text-on-surface mb-2 group-hover:text-tertiary transition-colors">
                {test.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                {test.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-tertiary font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Teste Başla
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}