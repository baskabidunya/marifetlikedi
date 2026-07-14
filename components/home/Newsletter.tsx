import { subscribeNewsletter } from "@/lib/admin";

export default function Newsletter() {
  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto text-center">
      <div className="glass p-8 md:p-12 rounded-[1.5rem] md:rounded-[3rem] inner-glow relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">
            Yıldızlardan Haber Al
          </h2>
          <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
            Haftalık astrolojik yorumlar ve gökyüzü olaylarından anında haberdar
            olmak için e-bültenimize katıl.
          </p>
          <form action={subscribeNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              name="email"
              required
              type="email"
              className="flex-1 bg-background/50 border border-outline-variant rounded-full px-6 py-4 text-on-surface focus:ring-primary focus:border-primary"
              placeholder="E-posta adresin"
            />
            <button
              type="submit"
              className="bg-primary text-on-primary font-label-md px-8 py-4 rounded-full hover:scale-105 transition-transform cursor-pointer whitespace-nowrap"
            >
              Abone Ol
            </button>
          </form>
          <p className="text-caption text-outline">
            Verilerin yıldızlar kadar güvende. İstediğin zaman ayrılabilirsin.
          </p>
        </div>
      </div>
    </section>
  );
}
