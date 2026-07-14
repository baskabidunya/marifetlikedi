import { getActiveFaqItems } from "@/lib/public-queries";

export const metadata = {
  title: "Sıkça Sorulan Sorular - Marifetli Kedi",
  description: "Astroloji, tarot ve kozmik rehberlik hakkında merak edilenler.",
};

export default async function SssPage() {
  const items = await getActiveFaqItems();

  return (
    <main className="pt-28 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
      <div className="text-center mb-12 space-y-4">
        <h1 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
          Sıkça Sorulan Sorular
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        <p className="text-body-md text-on-surface-variant">
          Astroloji ve kozmik rehberlik yolculuğunda merak edilenleri yanıtladık.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-on-surface-variant">Henüz eklenmiş bir soru bulunmuyor.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.id}
              className="group bg-surface-container/60 rounded-2xl border border-white/5 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none text-body-md text-on-surface font-medium">
                {item.question}
                <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-5 text-body-md text-on-surface-variant leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
}
