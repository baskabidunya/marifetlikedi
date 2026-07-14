export default function AlertsSection() {
  return (
    <section className="mb-section-gap">
      <div className="bg-gradient-to-r from-surface-container-high/50 to-primary/10 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute right-[-50px] top-[-50px] opacity-20">
          <span className="material-symbols-outlined text-[200px] text-primary">
            rocket_launch
          </span>
        </div>
        <div className="relative z-10">
          <h2 className="text-headline-md flex items-center gap-2 mb-2">
            <span className="text-secondary">🚀</span> Kaçırma
          </h2>
          <p className="text-on-surface-variant mb-6 font-body-md">
            Gökyüzündeki kritik olayları anında takip et.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-4 bg-surface/50 backdrop-blur-md p-4 rounded-2xl border border-error/30">
              <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-error">
                  warning
                </span>
              </div>
              <div>
                <p className="font-label-md text-error">
                  Merkür Retrosu Uyarısı
                </p>
                <p className="text-caption text-on-surface-variant">
                  Başlangıç: 2 saat sonra. İletişime dikkat!
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-4 bg-surface/50 backdrop-blur-md p-4 rounded-2xl border border-tertiary/30">
              <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">
                  brightness_4
                </span>
              </div>
              <div>
                <p className="font-label-md text-tertiary">Yeni Ay Yarın</p>
                <p className="text-caption text-on-surface-variant">
                  Yeni niyetler ve başlangıçlar için ideal zaman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
