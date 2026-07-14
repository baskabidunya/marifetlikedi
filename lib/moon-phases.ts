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

function phaseInfo(angle: number): Omit<MoonDay, "day"> {
  const a = ((angle % 360) + 360) % 360;
  if (a < 22.5 || a >= 337.5) return { name: "Yeni Ay", emoji: "🌑", isKey: true, kind: "new", phaseKey: "new" };
  if (a < 67.5) return { name: "Hilal", emoji: "🌒", isKey: false, kind: "none", phaseKey: "waxing-crescent" };
  if (a < 112.5) return { name: "İlk Dördün", emoji: "🌓", isKey: true, kind: "quarter", phaseKey: "first-quarter" };
  if (a < 157.5) return { name: "Şişkin Ay", emoji: "🌔", isKey: false, kind: "none", phaseKey: "waxing-gibbous" };
  if (a < 202.5) return { name: "Dolunay", emoji: "🌕", isKey: true, kind: "full", phaseKey: "full" };
  if (a < 247.5) return { name: "Sönen Şişkin", emoji: "🌖", isKey: false, kind: "none", phaseKey: "waning-gibbous" };
  if (a < 292.5) return { name: "Son Dördün", emoji: "🌗", isKey: true, kind: "quarter", phaseKey: "last-quarter" };
  return { name: "Sönen Hilal", emoji: "🌘", isKey: false, kind: "none", phaseKey: "waning-crescent" };
}

export function computeMonthMoonPhases(year: number, month: number): MoonDay[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result: MoonDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const time = Astronomy.MakeTime(new Date(year, month, day, 12, 0, 0));
    const angle = Astronomy.MoonPhase(time);
    const info = phaseInfo(angle);
    result.push({ day, angle, ...info });
  }

  return result;
}
