import Link from "next/link";
import { computeMonthMoonPhases, TURKISH_MONTHS, type MoonDay } from "@/lib/moon-phases";

const dayHeaders = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const legend = [
  { key: "new", label: "Yeni Ay" },
  { key: "waxing-crescent", label: "Hilal" },
  { key: "first-quarter", label: "İlk Dördün" },
  { key: "full", label: "Dolunay" },
  { key: "last-quarter", label: "Son Dördün" },
  { key: "waning-crescent", label: "Sönen Hilal" },
] as const;

export default function CelestialCalendar({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const today = new Date();
  const phases = computeMonthMoonPhases(year, month);

  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const nav = (m: number, y: number) =>
    `/?km=${m}&ky=${y}#celestial-calendar`;

  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto relative overflow-hidden" id="celestial-calendar">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-sora text-headline-lg text-white font-bold">Kozmik Takvim</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-tertiary to-transparent mx-auto" />
        <p className="text-body-md text-on-surface-variant">
          Ayın döngülerini ve kozmik olayları takip edin
        </p>
      </div>
      <div className="glass p-8 rounded-[3rem] inner-glow border border-white/10">
        <div className="flex justify-between items-center mb-8 px-4">
          <h3 className="font-sora text-headline-md md:text-headline-lg text-white font-bold">
            {TURKISH_MONTHS[month]} <span className="text-tertiary">{year}</span>
          </h3>
          <div className="flex gap-4">
            <Link
              href={nav(prevMonth, prevYear)}
              aria-label="Önceki ay"
              className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </Link>
            <Link
              href={nav(nextMonth, nextYear)}
              aria-label="Sonraki ay"
              className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {dayHeaders.map((h) => (
            <div key={h} className="text-center text-label-md text-tertiary font-bold py-2">
              {h}
            </div>
          ))}

          {cells.map((day, i) => {
            if (day === null) {
              return <div key={i} className="h-24 md:h-32" />;
            }
            const phase: MoonDay = phases[day - 1];
            const todayCell = isToday(day);

            let borderCls = "border border-white/5";
            let labelCls = "text-on-surface-variant";
            if (phase?.isKey) {
              if (phase.kind === "new") {
                borderCls = "border-2 border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(208,188,255,0.3)]";
                labelCls = "text-primary";
              } else if (phase.kind === "full") {
                borderCls = "border-2 border-tertiary/50 bg-tertiary/10 shadow-[0_0_15px_rgba(249,189,34,0.3)]";
                labelCls = "text-tertiary";
              } else {
                borderCls = "border-2 border-secondary/50 bg-secondary/10";
                labelCls = "text-secondary";
              }
            }

            if (todayCell) {
              borderCls = "border-2 border-green-400 bg-green-500/15 shadow-[0_0_15px_rgba(34,197,94,0.35)] ring-1 ring-green-400/40";
              labelCls = "text-green-300";
            }

            return (
              <div
                key={i}
                className={`h-24 md:h-32 glass rounded-2xl ${borderCls} flex flex-col items-center justify-center gap-1 transition-all`}
              >
                <span className={`text-caption font-bold ${labelCls}`}>{day}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/moon/${phase.phaseKey}.svg`}
                  alt={phase.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 md:w-10 md:h-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
                />
                {phase?.isKey && (
                  <span className={`text-[10px] uppercase font-bold tracking-tighter ${labelCls}`}>
                    {phase.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 pt-8 border-t border-white/5">
          {legend.map((l) => (
            <div key={l.key} className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/moon/${l.key}.svg`} alt={l.label} width={20} height={20} className="w-5 h-5" />
              <span className="text-caption text-on-surface-variant">{l.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-caption text-on-surface-variant">Bugün</span>
          </div>
        </div>
      </div>
    </section>
  );
}
