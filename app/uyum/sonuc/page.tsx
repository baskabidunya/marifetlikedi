import { Suspense } from "react";
import Link from "next/link";
import UyumSonucContent from "./UyumSonucContent";
import AdSlot from "@/components/ads/AdSlot";

export default function UyumSonucPage() {
  return (
    <>
      <nav className="top-clear-2 max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/uyum" className="hover:text-on-surface transition-colors">Uyum Analizi</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Sonuç</span>
      </nav>
      <Suspense fallback={
        <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto flex items-start justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4 pt-20">
            <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-on-surface-variant text-body-md">Yükleniyor...</p>
          </div>
        </main>
      }>
        <UyumSonucContent />
      </Suspense>

      <AdSlot
        name="uyum_result"
        className="my-12 max-w-5xl mx-auto"
      />
    </>
  );
}
