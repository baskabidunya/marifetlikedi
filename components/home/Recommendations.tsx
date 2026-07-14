const items = [
  {
    icon: "psychology",
    title: "Mental Sağlık ve Ay Döngüleri",
    desc: "Duygusal dengeni gezegenlerle uyumla.",
  },
  {
    icon: "diamond",
    title: "Şans Getiren Kristallerin",
    desc: "Burcuna en uygun taşları keşfet.",
  },
  {
    icon: "coffee",
    title: "Kozmik Sabah Rutini",
    desc: "Güne enerjik başlatan meditasyonlar.",
  },
  {
    icon: "nightlight",
    title: "Uyku Hijyeni ve Yıldızlar",
    desc: "Daha derin uyku için astrolojik tüyolar.",
  },
];

export default function Recommendations() {
  return (
    <section className="mb-section-gap">
      <h2 className="text-headline-md flex items-center gap-2 mb-6">
        <span className="text-primary">💜</span> Senin İçin Seçtik
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {items.map((item, i) => (
          <div
            key={i}
            className="glass-card p-4 rounded-2xl border-primary/20 shadow-[0_0_20px_rgba(208,188,255,0.15)] group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary">
                {item.icon}
              </span>
            </div>
            <h4 className="font-label-md text-sm mb-2">{item.title}</h4>
            <p className="text-[10px] text-on-surface-variant">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
