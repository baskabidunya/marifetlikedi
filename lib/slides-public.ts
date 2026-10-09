"use server";

import { getCachedSlides } from "@/lib/public-cache";

export async function getActiveSlides(type?: "home" | "burclar") {
  return getCachedSlides(type);
}
