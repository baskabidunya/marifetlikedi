"use server";

import { computeMonthMoonPhases } from "@/lib/moon-phases";

export async function getMonthMoonPhases(year: number, month: number) {
  return computeMonthMoonPhases(year, month);
}
