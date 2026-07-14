"use client";

import { useState, useActionState, useEffect } from "react";
import { getPartners, addPartner, updatePartner, deletePartner, getAllPartnerScores } from "@/lib/partners";
import type { CompatibilityScores } from "@/lib/astro-synastry";
import Link from "next/link";

interface PartnerProfile {
  id: string;
  name: string;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  avatar: string;
}

function PartnerForm({ partner, onDone }: { partner?: PartnerProfile | null; onDone: () => void }) {
  const action = partner ? updatePartner : addPartner;
  const [state, formAction, pending] = useActionState(action, undefined);
  const label = partner ? "Güncelle" : "Ekle";

  useEffect(() => {
    if (state?.success) onDone();
  }, [state, onDone]);

  return (
    <form action={formAction} className="space-y-4">
      {partner && <input type="hidden" name="id" value={partner.id} />}
      {state?.error && (
        <div className="p-3 rounded-xl bg-error-container/50 border border-error/30 text-error text-sm">{state.error}</div>
      )}
      {state?.success && (
        <div className="p-3 rounded-xl bg-tertiary/10 border border-tertiary/30 text-tertiary text-sm">{state.success}</div>
      )}
      <div className="space-y-2">
        <label className="text-label-md text-on-surface-variant">Partner İsmi *</label>
        <input name="name" defaultValue={partner?.name || ""} required
          className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-label-md text-on-surface-variant">Doğum Tarihi</label>
          <input name="birth_date" type="date" defaultValue={partner?.birth_date || ""}
            className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary" />
        </div>
        <div className="space-y-2">
          <label className="text-label-md text-on-surface-variant">Doğum Saati</label>
          <input name="birth_time" type="time" defaultValue={partner?.birth_time || ""}
            className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-label-md text-on-surface-variant">Doğum Yeri</label>
        <input name="birth_place" defaultValue={partner?.birth_place || ""} placeholder="Örn: İstanbul"
          className="w-full px-4 py-3 bg-background/50 border border-outline-variant rounded-xl text-on-surface focus:ring-primary focus:border-primary" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending}
          className="px-6 py-3 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all disabled:opacity-50 cursor-pointer">
          {pending ? "Kaydediliyor..." : label}
        </button>
        <button type="button" onClick={onDone}
          className="px-6 py-3 glass text-white font-label-md rounded-full hover:bg-white/10 transition-all cursor-pointer">
          İptal
        </button>
      </div>
    </form>
  );
}

export default function PartnerSection({ hasBirthInfo }: { hasBirthInfo: boolean }) {
  const [partners, setPartners] = useState<PartnerProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, CompatibilityScores>>({});
  const [scoresLoading, setScoresLoading] = useState(false);

  const load = () => Promise.all([getPartners(), getAllPartnerScores()]).then(([p, s]) => {
    setPartners(p);
    setScores(s);
    setScoresLoading(false);
  });
  useEffect(() => { setScoresLoading(true); load(); }, []);

  return (
    <section className="mb-section-gap">
      <div className="glass-card rounded-xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-sora text-headline-md text-on-background font-bold">Partner Uyumu</h2>
            <p className="text-outline text-body-md">Partnerinin doğum bilgilerini ekle, haritanızı karşılaştıralım</p>
          </div>
          {hasBirthInfo && !showForm && (
            <button onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-primary text-on-primary font-label-md rounded-full hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span className="material-symbols-outlined text-lg">add</span>
              Partner Ekle
            </button>
          )}
        </div>

        {!hasBirthInfo && (
          <div className="p-6 rounded-xl bg-amber-900/10 border border-amber-500/20 text-center">
            <span className="material-symbols-outlined text-amber-400 text-3xl mb-2">info</span>
            <p className="text-on-surface-variant">Önce kendi doğum bilgilerini profiline ekle.</p>
          </div>
        )}

        {showForm && (
          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <h3 className="font-sora text-headline-sm text-on-background font-bold mb-4">Yeni Partner</h3>
            <PartnerForm onDone={() => { setShowForm(false); load(); }} />
          </div>
        )}

        {partners.length === 0 && hasBirthInfo && !showForm && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="material-symbols-outlined text-5xl text-outline/40 mb-4">favorite</span>
            <p className="text-on-surface-variant">Henüz partner eklemedin.</p>
            <p className="text-caption text-outline mt-1">Partnerinin doğum bilgilerini ekleyerek uyum analizini gör.</p>
          </div>
        )}

        <div className="space-y-3">
          {partners.map(p => (
            <div key={p.id}>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                <Link href={`/profil/uyum/${p.id}`} className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center shrink-0 border border-white/5 no-underline hover:border-primary/40 transition-all">
                  <span className="material-symbols-outlined text-xl text-primary/80">{p.avatar || "auto_awesome"}</span>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/profil/uyum/${p.id}`} className="no-underline">
                    <div className="font-sora font-bold text-on-background hover:text-primary transition-colors">{p.name}</div>
                    <div className="text-caption text-outline mt-0.5 truncate">
                      {p.birth_date || "Doğum tarihi yok"}
                      {p.birth_place ? ` · ${p.birth_place}` : ""}
                    </div>
                  </Link>
                  {scores[p.id] && p.birth_date && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                      <div className="flex items-center gap-1.5 text-caption text-on-surface-variant">
                        <span className="text-primary/80 material-symbols-outlined text-sm">star</span>
                        <span className="font-label-md text-outline">Temel</span>
                        <div className="w-14 h-1 rounded-full bg-white/5 overflow-hidden flex">
                          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${scores[p.id].temel}%` }} />
                        </div>
                        <span className="font-semibold tabular-nums text-on-surface-variant">{scores[p.id].temel}%</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-caption text-on-surface-variant">
                        <span>❤️</span>
                        <span className="font-label-md text-outline">Aşk</span>
                        <div className="w-14 h-1 rounded-full bg-white/5 overflow-hidden flex">
                          <div className="h-full bg-primary/60 rounded-full transition-all" style={{ width: `${(scores[p.id].ask / 10) * 100}%` }} />
                        </div>
                        <span className="font-semibold tabular-nums">{scores[p.id].ask}/10</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-caption text-on-surface-variant">
                        <span>💬</span>
                        <span className="font-label-md text-outline">İletişim</span>
                        <div className="w-14 h-1 rounded-full bg-white/5 overflow-hidden flex">
                          <div className="h-full bg-secondary/60 rounded-full transition-all" style={{ width: `${(scores[p.id].iletisim / 10) * 100}%` }} />
                        </div>
                        <span className="font-semibold tabular-nums">{scores[p.id].iletisim}/10</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-caption text-on-surface-variant">
                        <span>🔥</span>
                        <span className="font-label-md text-outline">Tutku</span>
                        <div className="w-14 h-1 rounded-full bg-white/5 overflow-hidden flex">
                          <div className="h-full bg-tertiary/60 rounded-full transition-all" style={{ width: `${(scores[p.id].tutku / 10) * 100}%` }} />
                        </div>
                        <span className="font-semibold tabular-nums">{scores[p.id].tutku}/10</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-caption text-on-surface-variant">
                        <span>🏡</span>
                        <span className="font-label-md text-outline">Vade</span>
                        <div className="w-14 h-1 rounded-full bg-white/5 overflow-hidden flex">
                          <div className="h-full bg-amber-400/60 rounded-full transition-all" style={{ width: `${(scores[p.id].uzunVade / 10) * 100}%` }} />
                        </div>
                        <span className="font-semibold tabular-nums">{scores[p.id].uzunVade}/10</span>
                      </div>
                    </div>
                  )}
                  {scoresLoading && p.birth_date && !scores[p.id] && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className="text-caption text-outline">Uyum hesaplanıyor...</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2 shrink-0">
                  {p.birth_date && (
                    <Link href={`/profil/uyum/${p.id}`}
                      className="px-3 py-1.5 text-xs bg-primary/20 text-primary font-label-md rounded-full hover:bg-primary/30 transition-all no-underline inline-block whitespace-nowrap">
                      Analiz
                    </Link>
                  )}
                  <button onClick={() => setEditing(editing === p.id ? null : p.id)}
                    className="p-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button onClick={async () => {
                    if (confirm("Partneri silmek istediğine emin misin?")) {
                      await deletePartner(p.id);
                      load();
                    }
                  }}
                    className="p-1.5 text-error/60 hover:text-error cursor-pointer">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
              {editing === p.id && (
                <div className="mt-3 p-6 rounded-xl bg-white/[0.02] border border-white/10">
                  <h3 className="font-sora text-headline-sm text-on-background font-bold mb-4">Partneri Düzenle</h3>
                  <PartnerForm partner={p} onDone={() => { setEditing(null); load(); }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
