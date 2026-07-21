import * as Astronomy from "astronomy-engine";

export type MoonPhaseKind = "new" | "quarter" | "full" | "none";

export type MoonPhaseKey =
  | "new"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "full"
  | "waning-gibbous"
  | "last-quarter"
  | "waning-crescent";

export interface MoonDay {
  day: number;
  angle: number;
  name: string;
  emoji: string;
  isKey: boolean;
  kind: MoonPhaseKind;
  phaseKey: MoonPhaseKey;
}

export const TURKISH_MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function angleToPhase(angle: number): Omit<MoonDay, "day" | "angle" | "isKey" | "kind"> {
  const a = ((angle % 360) + 360) % 360;
  if (a < 22.5 || a >= 337.5) return { name: "Yeni Ay", emoji: "🌑", phaseKey: "new" };
  if (a < 67.5) return { name: "Hilal", emoji: "🌒", phaseKey: "waxing-crescent" };
  if (a < 112.5) return { name: "İlk Dördün", emoji: "🌓", phaseKey: "first-quarter" };
  if (a < 157.5) return { name: "Şişkin Ay", emoji: "🌔", phaseKey: "waxing-gibbous" };
  if (a < 202.5) return { name: "Dolunay", emoji: "🌕", phaseKey: "full" };
  if (a < 247.5) return { name: "Sönen Şişkin", emoji: "🌖", phaseKey: "waning-gibbous" };
  if (a < 292.5) return { name: "Son Dördün", emoji: "🌗", phaseKey: "last-quarter" };
  return { name: "Sönen Hilal", emoji: "🌘", phaseKey: "waning-crescent" };
}

function findPhaseDays(year: number, month: number): Set<number> {
  const keyDays = new Set<number>();
  const start = new Date(Date.UTC(year, month, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

  const searchPhases: { fn: (d: Date) => Date; kind: MoonPhaseKind }[] = [
    { fn: (d) => Astronomy.SearchMoonPhase(0, d, 40)?.date ?? new Date(0), kind: "new" },
    { fn: (d) => Astronomy.SearchMoonPhase(90, d, 40)?.date ?? new Date(0), kind: "quarter" },
    { fn: (d) => Astronomy.SearchMoonPhase(180, d, 40)?.date ?? new Date(0), kind: "full" },
    { fn: (d) => Astronomy.SearchMoonPhase(270, d, 40)?.date ?? new Date(0), kind: "quarter" },
  ];

  for (const { fn } of searchPhases) {
    try {
      let searchStart = new Date(start);
      for (let i = 0; i < 3; i++) {
        const found = fn(searchStart);
        if (found >= start && found <= end) {
          keyDays.add(found.getUTCDate());
        }
        searchStart = new Date(found.getTime() + 86400000);
      }
    } catch {
      // phase not found in this month
    }
  }

  return keyDays;
}

export function computeMonthMoonPhases(year: number, month: number): MoonDay[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const keyDays = findPhaseDays(year, month);
  const result: MoonDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const time = Astronomy.MakeTime(new Date(Date.UTC(year, month, day, 12, 0, 0)));
    const angle = Astronomy.MoonPhase(time);
    const phase = angleToPhase(angle);
    const isKey = keyDays.has(day);

    let kind: MoonPhaseKind = "none";
    if (isKey) {
      if (phase.phaseKey === "new") kind = "new";
      else if (phase.phaseKey === "full") kind = "full";
      else kind = "quarter";
    }

    result.push({ day, angle, isKey, kind, ...phase });
  }

  return result;
}
