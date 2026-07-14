import Link from "next/link";

export default function RelationshipLab() {
  return (
    <section className="relative py-section-gap overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-40 grayscale-[20%]"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgB5QZkXrUQvA74_oow5BZ9Ax94CNRxjfrBzDUa00BQrZNlNCf0XmNepsPOB7qImo4HEMDYy7zinkf5mMLf20DbalqjK4oa1I1jhBkZCiwiGEdLniQaAKL1orhxRCR5uNMwJxbz36AwBL0RPg53S_20GPs5i8twhT0tt5ZkmuSFkmfrPRA2O31NlBB7VGnq7E-Lp8HiqvlmY8g8sudAU2_WWzeWFBk_m7cyf41b6WXquUEywdW5UYC")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>
      <div className="container mx-auto px-container-padding-desktop relative z-10">
        <div className="max-w-2xl space-y-8">
          <h2 className="font-sora text-headline-lg text-white font-bold">İlişki Laboratuvarı</h2>
          <p className="text-body-lg text-on-surface-variant">
            Yıldızlar aşk hayatın hakkında ne diyor? Senin ve partnerinin doğum
            haritalarını karşılaştırarak uyumunuzu, potansiyel zorlukları ve kader
            bağlarınızı keşfedin.
          </p>
          <div className="glass p-8 rounded-3xl inner-glow max-w-lg space-y-6">
            <p className="text-body-md text-on-surface-variant">
              Her iki tarafın doğum tarihi, saati ve yerini girerek anında uyum
              analizini oluştur.
            </p>
            <Link
              href="/uyum"
              className="block w-full py-4 text-center bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md rounded-xl hover:shadow-[0_0_20px_rgba(174,5,198,0.3)] transition-all cursor-pointer"
            >
              Uyumumuzu Hesapla
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
