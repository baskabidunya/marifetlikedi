"use server";

import { calculateAstroChart } from "@/lib/astro-utils";

export interface SignResult {
  sign: string;
  degree: number;
  minute: number;
}

export interface BirthResult {
  sun: SignResult;
  moon: SignResult;
  rising: SignResult;
  venus: SignResult;
  hasRising: boolean;
}

export async function calculateBirthChart(
  _prev: unknown,
  formData: FormData,
): Promise<{ error?: string; result?: BirthResult }> {
  const birthDate = (formData.get("birth_date") as string) || "";
  const birthTime = (formData.get("birth_time") as string) || "";
  const birthPlace = (formData.get("birth_place") as string) || "";

  if (!birthDate) return { error: "Lütfen doğum tarihi girin." };

  const chart = calculateAstroChart(birthDate, birthTime, birthPlace);
  if (!chart) return { error: "Doğum haritası hesaplanamadı." };

  const venus = chart.planets.find((p) => p.name === "Venüs");

  return {
    result: {
      sun: { sign: chart.sun.sign, degree: chart.sun.degree, minute: chart.sun.minute },
      moon: { sign: chart.moon.sign, degree: chart.moon.degree, minute: chart.moon.minute },
      rising: { sign: chart.rising.sign, degree: chart.rising.degree, minute: chart.rising.minute },
      venus: venus
        ? { sign: venus.sign, degree: venus.degree, minute: venus.minute }
        : { sign: chart.sun.sign, degree: 0, minute: 0 },
      hasRising: Boolean(birthTime && birthPlace),
    },
  };
}
