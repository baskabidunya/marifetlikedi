import { Suspense } from "react";
import UyumSonucContent from "./UyumSonucContent";
import AdSlot from "@/components/ads/AdSlot";

export default function UyumSonucPage() {
  return (
    <>
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
