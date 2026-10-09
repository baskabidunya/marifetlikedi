"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CalendarGrid from "./CalendarGrid";
import type { MoonDay } from "@/lib/moon-phases";

type CalendarData = { year: number; month: number; days: MoonDay[] };

function CalendarInner({
  initialYear,
  initialMonth,
  initialDays,
}: {
  initialYear: number;
  initialMonth: number;
  initialDays: MoonDay[];
}) {
  const searchParams = useSearchParams();
  const km = searchParams.get("km");
  const ky = searchParams.get("ky");
  const m = km !== null ? Number(km) : NaN;
  const y = ky !== null ? Number(ky) : NaN;
  const wantMonth = Number.isInteger(m) && m >= 0 && m <= 11 ? m : initialMonth;
  const wantYear = Number.isInteger(y) && y >= 1970 && y <= 2100 ? y : initialYear;

  const [cal, setCal] = useState<CalendarData>({
    year: initialYear,
    month: initialMonth,
    days: initialDays,
  });

  useEffect(() => {
    if (wantYear === cal.year && wantMonth === cal.month) return;
    let cancelled = false;
    fetch(`/api/calendar?y=${wantYear}&m=${wantMonth}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.days)) {
          setCal({ year: wantYear, month: wantMonth, days: data.days });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [wantYear, wantMonth, cal.year, cal.month]);

  return <CalendarGrid year={cal.year} month={cal.month} phases={cal.days} />;
}

// Statik ana sayfada ?km/?ky istemci tarafında işlenir; takvim astronomy-engine
// istemci paketine girmez, ay verisi /api/calendar'dan çekilir.
export default function CalendarSection({
  initialYear,
  initialMonth,
  initialDays,
}: {
  initialYear: number;
  initialMonth: number;
  initialDays: MoonDay[];
}) {
  return (
    <Suspense
      fallback={
        <CalendarGrid year={initialYear} month={initialMonth} phases={initialDays} />
      }
    >
      <CalendarInner
        initialYear={initialYear}
        initialMonth={initialMonth}
        initialDays={initialDays}
      />
    </Suspense>
  );
}
