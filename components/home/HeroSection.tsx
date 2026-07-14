import Link from "next/link";
import { getActiveSlides } from "@/lib/slides-public";

export default async function HeroSection() {
  const slides = await getActiveSlides("home");
  const slide = slides[0];

  const badge = slide?.title || "Gökyüzü Rehberin Burada";
  const heading1 = slide?.heading1 || "Kendini ve";
  const heading2 = slide?.heading2 || "Evreni Keşfet";
  const description = slide?.description || "Yıldızların kadim bilgeliği ile modern astrolojinin birleştiği noktada, hayatına ışık tutacak içgörüleri keşfetmeye hazır mısın?";
  const button1 = slide?.button1_text || "";
  const button1Link = slide?.button1_link?.trim() || "";
  const button2 = slide?.button2_text || "";
  const button2Link = slide?.button2_link?.trim() || "";
  const heroImage = slide?.image_url || "https://lh3.googleusercontent.com/aida/AP1WRLsqY1BhpObepJyDIkvONQCH-QB5r4mgf-TmSbTfhNZL3xaKY4Kfx4reHi_BPh14PliDFYPSeieIwccxqclitqGC2UTipHtlvXDoUzud-jtpkZRul0hIVZMCjceNV0mv9BcYl9cjowRg1Gj0v5y93XX8jrBuq8Bn4BXBp6tpRQYLd3puCYXgUNJ7NJ7SNSJG1bIiw5rba8Ut5ZOuuQvUVEgS_RTKP-nIWXZF8DZi9VcJ5Y0os6Ygvu0sf4k";

  return (
    <section className="relative h-[90vh] min-h-[700px] overflow-hidden flex items-center" style={{marginTop: '-80px', paddingTop: '80px'}}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>
      <div className="container mx-auto px-container-padding-desktop relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 animate-pulse">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span className="text-label-md">{badge}</span>
          </div>
          <h1 className="font-sora text-display-lg text-white leading-tight font-bold">
            {heading1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
              {heading2}
            </span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            {button1 && button1Link && button1Link !== "#" && (
              <Link href={button1Link}
                className="px-8 py-4 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all">
                {button1}
              </Link>
            )}
            {button2 && button2Link && button2Link !== "#" && (
              <Link href={button2Link}
                className="px-8 py-4 glass text-white font-label-md rounded-full hover:bg-white/10 transition-all">
                {button2}
              </Link>
            )}
          </div>
        </div>
        <div className="hidden lg:block relative group">
          <div className="absolute -inset-4 bg-tertiary/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
          <img
            alt="Celestial Illustration"
            className="relative z-10 w-full drop-shadow-2xl animate-float"
            src={heroImage}
          />
        </div>
      </div>
    </section>
  );
}
