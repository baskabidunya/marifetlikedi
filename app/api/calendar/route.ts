import { NextResponse } from "next/server";
import { computeMonthMoonPhases } from "@/lib/moon-phases";

export const dynamic = "force-static";
export const revalidate = 600;

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

  return NextResponse.json({ days: computeMonthMoonPhases(y, m) });
}
