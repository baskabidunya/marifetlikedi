"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TURKISH_CITIES } from "@/lib/cities";

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
          {TURKISH_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function CompatibilityCalculator() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const fields = [
      "user_birth_date", "user_birth_time", "user_birth_place",
      "partner_name", "partner_birth_date", "partner_birth_time", "partner_birth_place",
    ];
    for (const f of fields) {
      const v = fd.get(f);
      if (v) params.set(f, v as string);
    }
    router.push(`/uyum/sonuc?${params.toString()}`);
  };

  return (
    <div className="space-y-10">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BirthFields prefix="user" title="Senin Bilgilerin" />
          <BirthFields prefix="partner" title="Partnerinin Bilgileri" />
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">favorite</span>
          Uyumumuzu Hesapla
        </button>
      </form>

      <p className="text-center text-caption text-outline">
        Analiz, <Link href="/dogum-haritasi" className="text-primary hover:underline">doğum haritası</Link> hesaplamalarıyla aynı astrolojik modele dayanır.
      </p>
    </div>
  );
}
