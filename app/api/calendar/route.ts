import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { computeMonthMoonPhases } from "@/lib/moon-phases";

// Ay verisi y/m anahtarıyla cache'lenir; route handler kendisi dinamik kalır
// (force-static/revalidate tek-entry sorununa yol açar).
const getCachedMonth = unstable_cache(
  async (y: number, m: number) => computeMonthMoonPhases(y, m),
  ["calendar-month-phases"],
  { revalidate: 3600 }
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const y = Number(searchParams.get("y"));
  const m = Number(searchParams.get("m"));

  if (
    !Number.isInteger(y) || y < 1970 || y > 2100 ||
    !Number.isInteger(m) || m < 0 || m > 11
  ) {
    return NextResponse.json({ error: "Geçersiz parametre" }, { status: 400 });
  }

  return NextResponse.json({ days: await getCachedMonth(y, m) });
}
