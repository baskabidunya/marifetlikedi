import Link from "next/link";

export default function PlanetTools() {
  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      <h3 className="font-sora text-headline-lg text-white mb-10 font-bold">Gezegen Etkilerini Keşfet</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl inner-glow group hover:bg-white/5 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">keyboard_double_arrow_up</span>
          <h4 className="font-sora text-headline-md text-white mb-2 font-semibold">Yükselen Burç</h4>
          <p className="text-body-md text-on-surface-variant mb-6">
            Dış dünyaya gösterdiğin maskeyi ve sosyal imajını keşfet.
          </p>
          <Link href="/dogum-haritasi?focus=rising" className="inline-flex items-center text-primary font-label-md group-hover:gap-2 transition-all">
            Hesapla <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </Link>
        </div>
        <div className="glass p-8 rounded-3xl inner-glow group hover:bg-white/5 transition-all cursor-pointer border-l-4 border-l-tertiary">
          <span className="material-symbols-outlined text-4xl text-tertiary mb-4">dark_mode</span>
          <h4 className="font-sora text-headline-md text-white mb-2 font-semibold">Ay Burcu</h4>
          <p className="text-body-md text-on-surface-variant mb-6">
            İç dünyanı, duygularını ve bilinçaltı ihtiyaçlarını anla.
          </p>
          <Link href="/dogum-haritasi?focus=moon" className="inline-flex items-center text-tertiary font-label-md group-hover:gap-2 transition-all">
            Hesapla <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </Link>
        </div>
        <div className="glass p-8 rounded-3xl inner-glow group hover:bg-white/5 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">favorite</span>
          <h4 className="font-sora text-headline-md text-white mb-2 font-semibold">Venüs Burcu</h4>
          <p className="text-body-md text-on-surface-variant mb-6">
            Sevme biçimini, değerlerini ve estetik anlayışını öğren.
          </p>
          <Link href="/dogum-haritasi?focus=venus" className="inline-flex items-center text-secondary font-label-md group-hover:gap-2 transition-all">
            Hesapla <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
