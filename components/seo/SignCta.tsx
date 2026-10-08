import Link from "next/link";

export default function SignCta({
  signName,
  signSlug,
}: {
  signName?: string;
  signSlug?: string;
}) {
  const showSign = Boolean(signName && signSlug);
  return (
    <section
      className={`mt-8 grid grid-cols-1 gap-4 ${showSign ? "sm:grid-cols-2" : ""}`}
      aria-label="İlgili araçlar"
    >
      {showSign && (
        <Link
          href={`/burclar/${signSlug}`}
          className="glass-card p-5 rounded-2xl border border-primary/15 hover:border-primary/40 transition-all group no-underline flex items-start gap-3"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-primary text-2xl mt-0.5"
          >
            star
          </span>
          <span>
            <span className="block font-label-md text-on-surface group-hover:text-primary transition-colors">
              {signName} Burcu Rehberi
            </span>
            <span className="block text-caption text-on-surface-variant mt-1">
              Genel özellikler, aşk ve kariyer yorumlarını keşfet.
            </span>
          </span>
        </Link>
      )}
      <Link
        href="/uyum"
        className={`glass-card p-5 rounded-2xl border border-secondary/15 hover:border-secondary/40 transition-all group no-underline flex items-start gap-3 ${showSign ? "" : "sm:max-w-md"}`}
      >
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-secondary text-2xl mt-0.5"
        >
          favorite
        </span>
        <span>
          <span className="block font-label-md text-on-surface group-hover:text-secondary transition-colors">
            Uyumumuzu Hesapla
          </span>
          <span className="block text-caption text-on-surface-variant mt-1">
            Doğum bilgilerinizi girerek iki kişi arasındaki kozmik uyumu görün.
          </span>
        </span>
      </Link>
    </section>
  );
}
