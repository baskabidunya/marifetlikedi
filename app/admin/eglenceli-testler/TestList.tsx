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

interface Question {
  text: string;
  options: { text: string; score: number }[];
}

interface Result {
  title: string;
  description: string;
  advice: string;
  scoreRange: [number, number];
}

function parseQuestions(raw: unknown[]): Question[] {
  return (raw as Question[]).map(q => ({
    text: q.text || "",
    options: (q.options || []).map(o => ({ text: o.text || "", score: o.score ?? 0 })),
  }));
}

function parseResults(raw: unknown[]): Result[] {
  return (raw as Result[]).map(r => ({
    title: r.title || "",
    description: r.description || "",
    advice: r.advice || "",
    scoreRange: [r.scoreRange?.[0] ?? 0, r.scoreRange?.[1] ?? 0] as [number, number],
  }));
}

export default function TestList({ tests }: { tests: DbTest[] }) {
  const [editing, setEditing] = useState<DbTest | null>(null);
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-headline-md font-headline-md text-on-surface">Eğlenceli Testler</h1>
        <button
          onClick={() => setShowNew(true)}
          className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-label-md hover:bg-primary/30 transition-all"
        >
          Yeni Test Ekle
        </button>
      </div>

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
  const [questions, setQuestions] = useState<Question[]>(
    test ? parseQuestions(test.questions as unknown[]) : []
  );
  const [results, setResults] = useState<Result[]>(
    test ? parseResults(test.results as unknown[]) : []
  );
  const [error, setError] = useState("");

  function addQuestion() {
    setQuestions([...questions, { text: "", options: [{ text: "", score: 0 }] }]);
  }

  function removeQuestion(idx: number) {
    setQuestions(questions.filter((_, i) => i !== idx));
  }

  function updateQuestion(idx: number, text: string) {
    const copy = [...questions];
    copy[idx] = { ...copy[idx], text };
    setQuestions(copy);
  }

  function addOption(qIdx: number) {
    const copy = [...questions];
    copy[qIdx] = { ...copy[qIdx], options: [...copy[qIdx].options, { text: "", score: 0 }] };
    setQuestions(copy);
  }

  function removeOption(qIdx: number, oIdx: number) {
    const copy = [...questions];
    copy[qIdx] = { ...copy[qIdx], options: copy[qIdx].options.filter((_, i) => i !== oIdx) };
    setQuestions(copy);
  }

  function updateOption(qIdx: number, oIdx: number, field: "text" | "score", value: string | number) {
    const copy = [...questions];
    copy[qIdx] = {
      ...copy[qIdx],
      options: copy[qIdx].options.map((o, i) => i === oIdx ? { ...o, [field]: value } : o),
    };
    setQuestions(copy);
  }

  function addResult() {
    setResults([...results, { title: "", description: "", advice: "", scoreRange: [0, 10] }]);
  }

  function removeResult(idx: number) {
    setResults(results.filter((_, i) => i !== idx));
  }

  function updateResult(idx: number, field: keyof Result, value: string | [number, number]) {
    const copy = [...results];
    if (field === "scoreRange") {
      copy[idx] = { ...copy[idx], scoreRange: value as [number, number] };
    } else {
      copy[idx] = { ...copy[idx], [field]: value as string };
    }
    setResults(copy);
  }

  function handleSubmit(formData: FormData) {
    if (questions.length === 0 || results.length === 0) {
      setError("En az 1 soru ve 1 sonuç ekleyin.");
      return;
    }
    for (const q of questions) {
      if (!q.text.trim()) { setError("Tüm soruların metni girilmeli."); return; }
      if (q.options.length < 2) { setError("Her soruda en az 2 seçenek olmalı."); return; }
      for (const o of q.options) {
        if (!o.text.trim()) { setError("Tüm seçeneklerin metni girilmeli."); return; }
      }
    }
    for (const r of results) {
      if (!r.title.trim() || !r.description.trim()) {
        setError("Her sonucun başlık ve açıklaması girilmeli.");
        return;
      }
    }
    setError("");
    const fd = new FormData();
    fd.set("questions", JSON.stringify(questions));
    fd.set("results", JSON.stringify(results));
    for (const [k, v] of formData.entries()) {
      if (k !== "questions" && k !== "results") fd.set(k, v);
    }
    saveFunTest(fd);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-container border border-white/10 rounded-2xl p-6 w-full max-w-4xl mx-4 shadow-2xl">
        <h2 className="text-headline-sm font-headline-md text-on-surface mb-6">
          {test ? "Testi Düzenle" : "Yeni Test Ekle"}
        </h2>

        <form
          action={handleSubmit}
          className="space-y-4"
        >
          {test && <input type="hidden" name="id" value={test.id} />}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-caption text-outline mb-1">Slug</label>
              <input
                name="slug" defaultValue={test?.slug || ""} required
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-caption text-outline mb-1">Icon (emoji)</label>
              <input
                name="icon" defaultValue={test?.icon || "📝"}
                className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
              />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input name="active" type="checkbox" defaultChecked={test?.active ?? true} className="rounded" />
                <span className="text-caption text-outline">Aktif</span>
              </label>
              <div>
                <label className="block text-caption text-outline mb-1">Sıra</label>
                <input
                  name="sort_order" type="number" defaultValue={test?.sort_order ?? 0}
                  className="w-20 bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-caption text-outline mb-1">Başlık</label>
            <input
              name="title" defaultValue={test?.title || ""} required
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-caption text-outline mb-1">Açıklama</label>
            <textarea
              name="description" defaultValue={test?.description || ""} required rows={2}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-body-md font-label-md text-on-surface">Sorular ({questions.length})</label>
              <button type="button" onClick={addQuestion}
                className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all"
              >
                + Soru Ekle
              </button>
            </div>
            <div className="space-y-4">
              {questions.map((q, qi) => (
                <div key={qi} className="bg-surface rounded-xl p-4 border border-white/5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-caption font-label-md text-outline mt-2 shrink-0">Soru {qi + 1}</span>
                    <button type="button" onClick={() => removeQuestion(qi)}
                      className="text-red-400 text-caption hover:text-red-300 transition-all shrink-0 mt-1"
                    >
                      Sil
                    </button>
                  </div>
                  <input
                    value={q.text} onChange={(e) => updateQuestion(qi, e.target.value)}
                    placeholder="Soru metni"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all mb-3"
                  />
                  <div className="space-y-2">
                    {q.options.map((o, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input
                          value={o.text} onChange={(e) => updateOption(qi, oi, "text", e.target.value)}
                          placeholder={`Seçenek ${oi + 1}`}
                          className="flex-1 bg-surface-container border border-white/10 rounded-lg px-3 py-1.5 text-body-sm text-on-surface focus:border-primary transition-all"
                        />
                        <input
                          type="number" value={o.score} onChange={(e) => updateOption(qi, oi, "score", parseInt(e.target.value) || 0)}
                          className="w-16 bg-surface-container border border-white/10 rounded-lg px-2 py-1.5 text-body-sm text-on-surface focus:border-primary transition-all text-center"
                          title="Puan"
                        />
                        <button type="button" onClick={() => removeOption(qi, oi)}
                          className="text-red-400 text-caption hover:text-red-300 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addOption(qi)}
                      className="text-caption text-primary hover:text-primary/80 transition-all"
                    >
                      + Seçenek Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-body-md font-label-md text-on-surface">Sonuçlar ({results.length})</label>
              <button type="button" onClick={addResult}
                className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all"
              >
                + Sonuç Ekle
              </button>
            </div>
            <div className="space-y-4">
              {results.map((r, ri) => (
                <div key={ri} className="bg-surface rounded-xl p-4 border border-white/5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-caption font-label-md text-outline mt-2 shrink-0">Sonuç {ri + 1}</span>
                    <button type="button" onClick={() => removeResult(ri)}
                      className="text-red-400 text-caption hover:text-red-300 transition-all shrink-0 mt-1"
                    >
                      Sil
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-caption text-outline mb-1">Başlık</label>
                      <input
                        value={r.title} onChange={(e) => updateResult(ri, "title", e.target.value)}
                        placeholder="Sonuç başlığı"
                        className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <label className="block text-caption text-outline mb-1">Min Puan</label>
                        <input
                          type="number" value={r.scoreRange[0]}
                          onChange={(e) => updateResult(ri, "scoreRange", [parseInt(e.target.value) || 0, r.scoreRange[1]])}
                          className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-caption text-outline mb-1">Max Puan</label>
                        <input
                          type="number" value={r.scoreRange[1]}
                          onChange={(e) => updateResult(ri, "scoreRange", [r.scoreRange[0], parseInt(e.target.value) || 0])}
                          className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-caption text-outline mb-1">Açıklama</label>
                    <textarea
                      value={r.description} onChange={(e) => updateResult(ri, "description", e.target.value)}
                      placeholder="Sonuç açıklaması" rows={2}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Tavsiye</label>
                    <textarea
                      value={r.advice} onChange={(e) => updateResult(ri, "advice", e.target.value)}
                      placeholder="Kullanıcıya tavsiye" rows={2}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
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