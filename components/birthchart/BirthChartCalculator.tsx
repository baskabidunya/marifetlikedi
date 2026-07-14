"use client";

import { useActionState } from "react";
import Link from "next/link";
import { calculateBirthChart, type BirthResult } from "@/app/dogum-haritasi/actions";
import { signSlug } from "@/lib/sign-slugs";
import { ZODIAC_UI, elementBadgeClass, SIGN_DESCRIPTIONS, RISING_DESCRIPTIONS } from "@/lib/zodiac-ui";

const CITIES = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya",
  "Gaziantep", "Mersin", "Diyarbakır", "Kayseri", "Eskişehir", "Trabzon",
  "Samsun", "Malatya", "Erzurum", "Van", "Batman", "Kahramanmaraş", "Şanlıurfa",
];

interface CardDef {
  key: string;
  label: string;
  icon: string;
  data: { sign: string; degree: number; minute: number };
  desc: string;
}

export default function BirthChartCalculator({ focus }: { focus?: string }) {
  const [state, action, pending] = useActionState(calculateBirthChart, undefined);
  const result = state?.result as BirthResult | undefined;

  const cards: CardDef[] = result
    ? [
        { key: "sun", label: "Güneş Burcu", icon: "light_mode", data: result.sun, desc: SIGN_DESCRIPTIONS[result.sun.sign] || "" },
        { key: "rising", label: "Yükselen Burç", icon: "arrow_upward", data: result.rising, desc: RISING_DESCRIPTIONS[result.rising.sign] || "" },
        { key: "moon", label: "Ay Burcu", icon: "dark_mode", data: result.moon, desc: SIGN_DESCRIPTIONS[result.moon.sign] || "" },
        { key: "venus", label: "Venüs Burcu", icon: "female", data: result.venus, desc: SIGN_DESCRIPTIONS[result.venus.sign] || "" },
      ]
    : [];

  return (
    <div className="space-y-10">
      <form action={action} className="glass p-6 md:p-8 rounded-3xl inner-glow space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-label-md text-on-surface-variant">Doğum Tarihi</label>
            <input
              type="date"
              name="birth_date"
              required
              className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-label-md text-on-surface-variant">Doğum Saati</label>
            <input
              type="time"
              name="birth_time"
              className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-label-md text-on-surface-variant">Doğum Yeri</label>
            <select
              name="birth_place"
              className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
            >
              <option value="">Şehir seçin</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-caption text-outline">
          Yükselen burç için doğum saati ve yerini girmek daha isabetli sonuç verir.
        </p>
        {state?.error && (
          <div className="p-3 rounded-xl bg-error-container/50 border border-error/30 text-error text-sm">
            {state.error}
          </div>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          {pending ? "Hesaplanıyor..." : "Doğum Haritamı Hesapla"}
        </button>
      </form>

      {result && (
        <div className="space-y-6">
          {!result.hasRising && (
            <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/30 text-tertiary text-sm">
              Yükselen burç yalnızca doğum saati ve yeri girildiğinde hesaplanır; şu an Güneş burcun temel alınmıştır.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((c) => {
              const ui = ZODIAC_UI[c.data.sign];
              const isFocus = focus === c.key;
              return (
                <Link
                  key={c.key}
                  href={`/burclar/${signSlug(c.data.sign)}`}
                  className={`block glass p-6 rounded-3xl inner-glow border transition-all hover:-translate-y-1 hover:border-primary/40 ${isFocus ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-3xl text-primary">{c.icon}</span>
                    <span className="font-label-md text-on-surface-variant">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-5xl ${ui.textColor}`}>{ui.emoji}</span>
                    <div>
                      <div className="font-sora text-headline-md text-white font-bold">{c.data.sign}</div>
                      <div className="text-caption text-outline">
                        {c.data.degree}° {c.data.minute}'
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className={`text-caption px-2 py-0.5 rounded-full ${elementBadgeClass(ui.element)}`}>{ui.element}</span>
                    <span className="text-caption text-outline">Yönetici: {ui.ruler}</span>
                  </div>
                  <p className="mt-3 text-body-sm text-on-surface-variant leading-relaxed">{c.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
