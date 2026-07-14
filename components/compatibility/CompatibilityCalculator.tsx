"use client";

import { useActionState } from "react";
import Link from "next/link";
import { calculateCompatibility } from "@/app/uyum/actions";
import SynastryContent from "@/components/profile/SynastryContent";
import type { SynastryResult } from "@/lib/astro-synastry";

const CITIES = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya",
  "Gaziantep", "Mersin", "Diyarbakır", "Kayseri", "Eskişehir", "Trabzon",
  "Samsun", "Malatya", "Erzurum", "Van", "Batman", "Kahramanmaraş", "Şanlıurfa",
];

function BirthFields({ prefix, title }: { prefix: string; title: string }) {
  return (
    <div className="glass p-5 rounded-2xl inner-glow space-y-4">
      <h3 className="font-sora text-headline-sm text-white font-semibold">{title}</h3>
      {prefix === "partner" && (
        <div className="space-y-2">
          <label className="text-label-md text-on-surface-variant">İsim (opsiyonel)</label>
          <input
            type="text"
            name="partner_name"
            placeholder="Partnerinin adı"
            className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
          />
        </div>
      )}
      <div className="space-y-2">
        <label className="text-label-md text-on-surface-variant">Doğum Tarihi</label>
        <input
          type="date"
          name={`${prefix}_birth_date`}
          required
          className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-label-md text-on-surface-variant">Doğum Saati</label>
        <input
          type="time"
          name={`${prefix}_birth_time`}
          className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <label className="text-label-md text-on-surface-variant">Doğum Yeri</label>
        <select
          name={`${prefix}_birth_place`}
          className="w-full bg-background/50 border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:ring-primary focus:border-primary"
        >
          <option value="">Şehir seçin</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function CompatibilityCalculator() {
  const [state, action, pending] = useActionState(calculateCompatibility, undefined);
  const result = state?.result as SynastryResult | undefined;

  return (
    <div className="space-y-10">
      <form action={action} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BirthFields prefix="user" title="Senin Bilgilerin" />
          <BirthFields prefix="partner" title="Partnerinin Bilgileri" />
        </div>
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
          <span className="material-symbols-outlined">favorite</span>
          {pending ? "Hesaplanıyor..." : "Uyumumuzu Hesapla"}
        </button>
      </form>

      {result && (
        <SynastryContent synastry={result} partnerName={state?.partnerName || "Partnerin"} />
      )}

      {!result && (
        <p className="text-center text-caption text-outline">
          Analiz, <Link href="/dogum-haritasi" className="text-primary hover:underline">doğum haritası</Link> hesaplamalarıyla aynı astrolojik modele dayanır.
        </p>
      )}
    </div>
  );
}
