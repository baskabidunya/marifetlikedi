import { getApprovedTestimonialsPublic } from "@/lib/public-queries";

export default async function Testimonials() {
  const items = await getApprovedTestimonialsPublic();
  if (items.length === 0) return null;

  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
          Yol Arkadaşlarımızın Yıldızları
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        <p className="text-body-md text-on-surface-variant">
          Kozmik yolculuğumuzda bize eşlik edenlerin deneyimleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t) => (
          <div
            key={t.id}
            className="bg-surface-container/60 rounded-2xl p-6 border border-white/5 inner-glow"
          >
            <div className="flex items-center gap-1 text-tertiary mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: i < t.rating ? '"FILL" 1' : '"FILL" 0' }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed mb-4">
              &ldquo;{t.content}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-label-md">
                {t.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-body-md text-on-surface font-medium">{t.name}</p>
                {t.title ? (
                  <p className="text-caption text-on-surface-variant">{t.title}</p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
