"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getProfile, updateProfile } from "@/lib/profile";
import { getAstroChart } from "@/lib/profile";
import { signOut } from "@/app/(auth)/actions";
import type { AstroChart } from "@/lib/astro-utils";
import AstroChartComponent, { Big3Section, HousesSection, PlanetsSection, AspectsSection, DetailModal, type DetailTarget } from "./AstroChart";
import PartnerSection from "./PartnerSection";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [chart, setChart] = useState<AstroChart | null>(null);
  const [detail, setDetail] = useState<DetailTarget | null>(null);

  const [state, action, pending] = useActionState(updateProfile, undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/giris");
        return;
      }
      setUser(data.user);
      const prof = await getProfile();
      setProfile(prof);
      setLoading(false);
    });
  }, [router]);

  useEffect(() => {
    if (state?.success) {
      setEditing(false);
      getProfile().then(setProfile);
    }
  }, [state]);

  useEffect(() => {
    if (profile?.birth_date) getAstroChart().then(setChart);
    else setChart(null);
  }, [profile?.birth_date, profile?.birth_time, profile?.birth_place]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-tertiary animate-spin">sync</span>
          <span className="text-on-surface-variant">Yükleniyor...</span>
        </div>
      </main>
    );
  }

  const email = user?.email ?? "";
  const initials = (profile?.display_name || email).charAt(0).toUpperCase();
  const displayName = profile?.display_name || email.split("@")[0];

  return (
    <main className="relative pt-32 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-[1280px] mx-auto">
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      {/* User Identity Hero */}
      <section className="glass-card rounded-xl p-10 mb-section-gap relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-tertiary to-secondary opacity-50 blur-xl group-hover:opacity-80 transition-opacity" />
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-tertiary p-1.5 relative z-10 overflow-hidden bg-surface-container flex items-center justify-center">
              <span className="text-5xl md:text-7xl text-tertiary font-bold font-sora">
                {initials}
              </span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-sora text-headline-lg text-on-background mb-4 font-bold">
              {displayName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">calendar_month</span>
                <span className="font-label-md text-on-surface-variant">
                  Katılma: {new Date(user!.created_at).toLocaleDateString("tr-TR")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setEditing(!editing)}
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-md hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">{editing ? "close" : "edit"}</span>
              {editing ? "Kapat" : "Profili Düzenle"}
            </button>
            <form action={signOut}>
              <button
                type="submit"
                className="px-6 py-3 rounded-full border border-error/30 text-error font-label-md hover:bg-error/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] text-primary">stars</span>
        </div>
      </section>

      {/* Edit Panel */}
      {editing && (
        <section className="glass-card rounded-xl p-8 mb-section-gap animate-fadeIn">
          <h2 className="font-sora text-headline-md text-on-background mb-6 font-bold">
            Profil Bilgilerini Düzenle
          </h2>
          <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state?.error && (
              <div className="md:col-span-2 p-3 rounded-xl bg-error-container/50 border border-error/30 text-error text-sm">
                {state.error}
              </div>
            )}
            {state?.success && (
              <div className="md:col-span-2 p-3 rounded-xl bg-tertiary/10 border border-tertiary/30 text-tertiary text-sm">
                {state.success}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">İsim</label>
              <input
                name="display_name"
                defaultValue={profile?.display_name || ""}
                placeholder="Adın Soyadın"
                className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">Telefon</label>
              <input
                name="phone"
                type="tel"
                defaultValue={profile?.phone || ""}
                placeholder="+90 5XX XXX XX XX"
                className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">Doğum Tarihi</label>
              <input
                name="birth_date"
                type="date"
                defaultValue={profile?.birth_date || ""}
                className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">Doğum Saati</label>
              <input
                name="birth_time"
                type="time"
                defaultValue={profile?.birth_time || ""}
                className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant">Doğum Yeri</label>
              <input
                name="birth_place"
                defaultValue={profile?.birth_place || ""}
                placeholder="Örn: İstanbul"
                className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="md:col-span-2 flex gap-4 pt-4">
              <button
                type="submit"
                disabled={pending}
                className="px-8 py-3 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all disabled:opacity-50 cursor-pointer"
              >
                {pending ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-8 py-3 glass text-white font-label-md rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                İptal
              </button>
            </div>
          </form>
        </section>
      )}

      {detail && <DetailModal target={detail} onClose={() => setDetail(null)} />}

      {/* Big 3 */}
      {chart && <Big3Section chart={chart} setDetail={setDetail} />}

      {/* Element + Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        <div className="md:col-span-8">
          <AstroChartComponent
            birthDate={profile?.birth_date || ""}
            birthTime={profile?.birth_time || ""}
            birthPlace={profile?.birth_place || ""}
            chart={chart}
            externalDetail={{ state: detail, setter: setDetail }}
          />
        </div>
        <div className="md:col-span-4">
          <section className="glass-card rounded-xl p-8">
            <h2 className="font-sora text-headline-md text-on-background mb-1 font-bold">
              Kozmik Enerji
            </h2>
            <p className="text-outline text-body-md mb-6">Evrenin bugünkü ritmini keşfet ve akışa uyum sağla.</p>
            {[
              { label: "Duygusal", percent: 75, icon: "favorite", color: "text-tertiary", stroke: "#f9bd22" },
              { label: "Zihinsel", percent: 50, icon: "psychology", color: "text-primary", stroke: "#d0bcff" },
              { label: "Fiziksel", percent: 32, icon: "bolt", color: "text-secondary", stroke: "#fbabff" },
            ].map((item) => {
              const r = 28;
              const circ = 2 * Math.PI * r;
              const offset = circ - (item.percent / 100) * circ;
              return (
                <div key={item.label} className="flex items-center gap-4 mb-5 last:mb-0">
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r={r} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                      <circle
                        cx="32" cy="32" r={r}
                        fill="transparent"
                        stroke={item.stroke}
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        strokeWidth="4"
                        style={{ transition: "stroke-dashoffset 1s ease" }}
                      />
                    </svg>
                    <span className={`absolute text-lg material-symbols-outlined ${item.color}`}>{item.icon}</span>
                  </div>
                  <div>
                    <div className="font-label-md text-on-background">{item.label}</div>
                    <div className="text-caption text-outline">%{item.percent}</div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {chart && (
        <div className="mb-section-gap space-y-8">
          <HousesSection chart={chart} setDetail={setDetail} />
          <PlanetsSection chart={chart} setDetail={setDetail} />
          <AspectsSection chart={chart} setDetail={setDetail} />
        </div>
      )}

      {/* Partner Compatibility */}
      <PartnerSection hasBirthInfo={!!profile?.birth_date} />

      {/* Son Aktiviteler */}
      <section className="glass-card rounded-xl p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="font-sora text-headline-md text-on-background font-bold">
              Son Aktiviteler
            </h2>
            <p className="text-outline text-body-md">
              Kehanet odası ve diğer aktivitelerin
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="material-symbols-outlined text-5xl text-outline/40 mb-4">history</span>
          <p className="text-on-surface-variant">Henüz bir aktiviten bulunmuyor.</p>
          <p className="text-caption text-outline mt-1">
            Kehanet odasını ziyaret ederek başlayabilirsin.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </main>
  );
}
