import type { ReactNode } from "react";
import AdSlot from "@/components/ads/AdSlot";

export default function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
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
