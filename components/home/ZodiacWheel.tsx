import Link from "next/link";
import { signSlug } from "@/lib/sign-slugs";

const zodiacs = [
  { name: "Koç", range: "21 Mart - 19 Nisan", symbol: "♈", gradient: "from-red-500/20 to-orange-500/20", color: "dark:text-orange-400 text-orange-700" },
  { name: "Boğa", range: "20 Nisan - 20 Mayıs", symbol: "♉", gradient: "from-emerald-500/20 to-teal-500/20", color: "dark:text-teal-400 text-teal-700" },
  { name: "İkizler", range: "21 Mayıs - 20 Haziran", symbol: "♊", gradient: "from-yellow-500/20 to-orange-500/20", color: "dark:text-yellow-400 text-yellow-700" },
  { name: "Yengeç", range: "21 Haziran - 22 Temmuz", symbol: "♋", gradient: "from-blue-500/20 to-indigo-500/20", color: "dark:text-indigo-400 text-indigo-700" },
  { name: "Aslan", range: "23 Temmuz - 22 Ağustos", symbol: "♌", gradient: "from-orange-500/20 to-red-500/20", color: "dark:text-red-400 text-red-700" },
  { name: "Başak", range: "23 Ağustos - 22 Eylül", symbol: "♍", gradient: "from-amber-500/20 to-yellow-500/20", color: "dark:text-amber-400 text-amber-700" },
  { name: "Terazi", range: "23 Eylül - 22 Ekim", symbol: "♎", gradient: "from-pink-500/20 to-rose-500/20", color: "dark:text-rose-400 text-rose-700" },
  { name: "Akrep", range: "23 Ekim - 21 Kasım", symbol: "♏", gradient: "from-purple-500/20 to-fuchsia-500/20", color: "dark:text-fuchsia-400 text-fuchsia-700" },
  { name: "Yay", range: "22 Kasım - 21 Aralık", symbol: "♐", gradient: "from-blue-500/20 to-cyan-500/20", color: "dark:text-cyan-400 text-cyan-700" },
  { name: "Oğlak", range: "22 Aralık - 19 Ocak", symbol: "♑", gradient: "from-stone-500/20 to-slate-500/20", color: "dark:text-slate-400 text-slate-700" },
  { name: "Kova", range: "20 Ocak - 18 Şubat", symbol: "♒", gradient: "from-sky-500/20 to-blue-500/20", color: "dark:text-sky-400 text-sky-700" },
  { name: "Balık", range: "19 Şubat - 20 Mart", symbol: "♓", gradient: "from-teal-500/20 to-cyan-500/20", color: "dark:text-cyan-400 text-cyan-700" },
];

export default function ZodiacWheel() {
  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-sora text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">Zodyak Çemberi</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        <p className="text-body-md text-on-surface-variant">
          Güneş burcunun derinliklerine in, karakterinin gizli yanlarını keşfet.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {zodiacs.map((z) => (
          <Link
            key={z.name}
            href={`/burclar/${signSlug(z.name)}`}
            className="glass group p-6 rounded-2xl text-center hover:-translate-y-2 transition-all duration-300 cursor-pointer inner-glow border-primary/5 hover:border-primary/40 block"
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${z.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              <span aria-hidden="true" className={`material-symbols-outlined text-3xl ${z.color}`}>
                {z.symbol}
              </span>
            </div>
            <div className="font-sora text-on-surface text-body-md">{z.name}</div>
            <div className="text-caption text-on-surface-variant">{z.range}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
