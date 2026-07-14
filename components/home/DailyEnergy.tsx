export default function DailyEnergy() {
  return (
    <section className="py-12 -mt-24 relative z-20 px-container-padding-desktop max-w-7xl mx-auto">
      <div className="glass p-8 md:p-12 rounded-[2rem] inner-glow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-tertiary/10 scale-150 pointer-events-none group-hover:scale-[2] transition-transform duration-700">
          <span className="material-symbols-outlined text-9xl">bedtime</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-wrap justify-center gap-8 flex-shrink-0">
            {[
              { label: "Duygusal", value: "82", color: "tertiary", dur: "3s" },
              { label: "Zihinsel", value: "65", color: "primary", dur: "4s" },
              { label: "Fiziksel", value: "74", color: "secondary", dur: "5s" },
            ].map((g) => (
              <div key={g.label} className="flex flex-col items-center gap-2">
                <div className={`w-24 h-24 rounded-full border-4 border-${g.color} flex items-center justify-center relative`}>
                  <span className={`text-headline-md text-${g.color}`}>%{g.value}</span>
                  <div
                    className={`absolute inset-0 rounded-full border-4 border-white/10 border-t-${g.color} animate-spin`}
                    style={{ animationDuration: g.dur }}
                  />
                </div>
                <span className="text-label-md text-on-surface-variant">{g.label}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h2 className="font-sora text-headline-md text-white font-semibold">Günün Kozmik Enerjisi</h2>
            <p className="text-body-md text-on-surface-variant max-w-2xl">
              Merkür ve Jüpiter arasındaki olumlu açı bugün iletişim kanallarını
              sonuna kadar açıyor. Önemli kararlar almak ve yeni başlangıçlar
              yapmak için gökyüzü seni destekliyor. Sezgilerine güven, çünkü onlar
              seni bugün doğru yola iletecek.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-caption rounded-lg border border-tertiary/20">
                Şanslı Renk: Safir Mavisi
              </span>
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-caption rounded-lg border border-tertiary/20">
                Şanslı Sayı: 7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
