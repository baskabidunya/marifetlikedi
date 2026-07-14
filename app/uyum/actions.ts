"use server";

import { calculateAstroChart } from "@/lib/astro-utils";
import { calculateSynastry, type SynastryResult } from "@/lib/astro-synastry";

export async function calculateCompatibility(
  _prev: unknown,
  formData: FormData,
): Promise<{ error?: string; result?: SynastryResult; partnerName?: string }> {
  const userDate = (formData.get("user_birth_date") as string) || "";
  const userTime = (formData.get("user_birth_time") as string) || "";
  const userPlace = (formData.get("user_birth_place") as string) || "";
  const partnerName = (formData.get("partner_name") as string) || "Partnerin";
  const partnerDate = (formData.get("partner_birth_date") as string) || "";
  const partnerTime = (formData.get("partner_birth_time") as string) || "";
  const partnerPlace = (formData.get("partner_birth_place") as string) || "";

  if (!userDate || !partnerDate) {
    return { error: "Her iki taraf için de doğum tarihi girin." };
  }

  const userChart = calculateAstroChart(userDate, userTime, userPlace);
  const synastry = calculateSynastry(userChart, partnerDate, partnerTime, partnerPlace);
  if (!synastry) return { error: "Uyum analizi hesaplanamadı." };

  return { result: synastry, partnerName };
}
