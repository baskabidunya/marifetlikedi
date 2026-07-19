"use client";

import Link from "next/link";
import type { FunTest } from "@/lib/fun-tests";

export default function TestCard({ test }: { test: FunTest }) {
  return (
    <Link
      href={`/eglenceli-testler/${test.id}`}
      className="group block bg-surface/60 border border-outline/20 rounded-2xl p-6 hover:bg-surface hover:border-tertiary/40 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl shrink-0">{test.icon}</span>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-on-surface mb-1 group-hover:text-tertiary transition-colors">
            {test.title}
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {test.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-tertiary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Teste Başla
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}