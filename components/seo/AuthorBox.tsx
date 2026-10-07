const SITE_NAME = "Marifetli Kedi Astroloji Masası";
const DESCRIPTION =
  "Kozmik göstergeler ve efemeris verileri doğrultusunda hazırlanmış, eğlence ve kişisel farkındalık odaklı içerik.";

export default function AuthorBox({ updated }: { updated?: string }) {
  const updatedLabel = updated
    ? new Date(updated).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <aside
      className="mt-12 p-6 md:p-8 rounded-3xl border border-on-surface/10 bg-surface-container-low/60 flex items-start gap-5"
      aria-label="Yayın bilgisi"
    >
      <div className="shrink-0 w-14 h-14 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
      </div>
      <div className="min-w-0">
        <p className="text-caption font-label-md uppercase tracking-widest text-outline mb-1">Yayın Ekibi</p>
        <p className="text-headline-md font-headline-md text-on-surface mb-1.5">{SITE_NAME}</p>
        <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">{DESCRIPTION}</p>
        {updatedLabel && (
          <p className="text-caption font-label-md text-outline mt-2">Son güncelleme: {updatedLabel}</p>
        )}
      </div>
    </aside>
  );
}
