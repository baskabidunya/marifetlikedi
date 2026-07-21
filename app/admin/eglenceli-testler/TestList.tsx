"use client";

import { useState } from "react";
import { saveFunTest, deleteFunTest } from "@/lib/admin-fun-tests";
import ConfirmButton from "@/components/admin/ConfirmButton";

interface DbTest {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  questions: unknown[];
  results: unknown[];
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export default function TestList({ tests }: { tests: DbTest[] }) {
  const [editing, setEditing] = useState<DbTest | null>(null);
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowNew(true)}
        className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-label-md hover:bg-primary/30 transition-all"
      >
        Yeni Test Ekle
      </button>

      <div className="space-y-3 w-full">
        {tests.length === 0 && (
          <p className="text-on-surface-variant text-body-sm">Henüz test eklenmemiş.</p>
        )}
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-surface-container/60 rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{test.icon}</span>
                <div>
                  <h3 className="text-body-md font-label-md text-on-surface truncate">{test.title}</h3>
                  <p className="text-caption text-outline">
                    @{test.slug} — {(test.questions as unknown[]).length} soru, {(test.results as unknown[]).length} sonuç
                    {!test.active && " (pasif)"}
                  </p>
                </div>
              </div>
            </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditing(test)}
                  className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all"
                >
                  Düzenle
                </button>
                <ConfirmButton formAction={deleteFunTest} name="id" value={test.id} label="Sil" />
              </div>
          </div>
        ))}
      </div>

      {(editing || showNew) && (
        <TestFormModal
          test={editing}
          onClose={() => { setEditing(null); setShowNew(false); }}
        />
      )}
    </>
  );
}

function TestFormModal({ test, onClose }: { test: DbTest | null; onClose: () => void }) {
  const t = test;
  const [questionsText, setQuestionsText] = useState(
    JSON.stringify(t?.questions || [], null, 2)
  );
  const [resultsText, setResultsText] = useState(
    JSON.stringify(t?.results || [], null, 2)
  );
  const [error, setError] = useState("");

  function validateJson(value: string, label: string): string {
    try {
      JSON.parse(value);
      return "";
    } catch {
      return `Geçersiz JSON formatı: ${label}`;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-container border border-white/10 rounded-2xl p-6 w-full max-w-3xl mx-4 shadow-2xl">
        <h2 className="text-headline-sm font-headline-md text-on-surface mb-6">
          {test ? "Testi Düzenle" : "Yeni Test Ekle"}
        </h2>

        <form
          action={async (fd) => {
            const qErr = validateJson(fd.get("questions") as string, "Sorular");
            const rErr = validateJson(fd.get("results") as string, "Sonuçlar");
            if (qErr || rErr) {
              setError(qErr || rErr);
              return;
            }
            setError("");
            await saveFunTest(fd);
            onClose();
          }}
          className="space-y-4"
        >
          {test && <input type="hidden" name="id" value={test.id} />}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-caption text-outline mb-1">Slug</label>
              <input
                name="slug" defaultValue={t?.slug || ""} required
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Icon (emoji)</label>
              <input
                name="icon" defaultValue={t?.icon || "📝"}
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input name="active" type="checkbox" defaultChecked={t?.active ?? true} className="rounded" />
                <span className="text-caption text-outline">Aktif</span>
              </label>
              <div>
                <label className="block text-caption text-outline mb-1">Sıra</label>
                <input
                  name="sort_order" type="number" defaultValue={t?.sort_order ?? 0}
                  className="w-20 bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-caption text-outline mb-1">Başlık</label>
            <input
              name="title" defaultValue={t?.title || ""} required
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-caption text-outline mb-1">Açıklama</label>
            <textarea
              name="description" defaultValue={t?.description || ""} required rows={2}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-caption text-outline mb-1">
              Sorular (JSON) — {(() => { try { return JSON.parse(questionsText).length; } catch { return 0; } })()} soru
            </label>
            <textarea
              name="questions" value={questionsText}
              onChange={(e) => { setQuestionsText(e.target.value); setError(""); }}
              rows={8}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all font-mono text-xs resize-y"
            />
          </div>

          <div>
            <label className="block text-caption text-outline mb-1">
              Sonuçlar (JSON) — {(() => { try { return JSON.parse(resultsText).length; } catch { return 0; } })()} sonuç
            </label>
            <textarea
              name="results" value={resultsText}
              onChange={(e) => { setResultsText(e.target.value); setError(""); }}
              rows={6}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all font-mono text-xs resize-y"
            />
          </div>

          {error && (
            <p className="text-red-400 text-body-sm">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg text-on-surface-variant text-caption font-label-md hover:bg-white/5 transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all"
            >
              {test ? "Kaydet" : "Oluştur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
