"use client";

import { useState } from "react";

type ContentType = "blog" | "trend" | "announcement" | "burc";

interface Props {
  type: ContentType;
  onGenerated: (data: {
    title: string;
    excerpt?: string;
    content?: string;
    message?: string;
    imageUrl: string;
  }) => void;
}

const TYPE_LABELS: Record<ContentType, string> = {
  blog: "Blog Yazısı",
  trend: "Trend Makale",
  announcement: "Duyuru",
  burc: "Burç İçeriği",
};

const TYPE_PLACEHOLDERS: Record<ContentType, string> = {
  blog: "Örn: 2026'da Mars Retrosu Burçları Nasıl Etkileyecek?",
  trend: "Örn: Bu Hafta En Çok Konuşulan Astrolojik Olaylar",
  announcement: "Örn: Venüs-Neptün Kavuşumu Yaklaşıyor",
  burc: "Örn: Koç Burcu 2026 Yılı",
};

export default function AIGenerateButton({ type, onGenerated }: Props) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, topic: topic.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bir hata oluştu");

      onGenerated(data);
      setOpen(false);
      setTopic("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2.5 rounded-lg bg-tertiary/20 text-tertiary text-label-md hover:bg-tertiary/30 transition-all flex items-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">auto_awesome</span>
        AI ile Oluştur
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-surface-container rounded-2xl border border-white/10 shadow-2xl w-full max-w-md mx-4">
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-title-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
                {TYPE_LABELS[type]} Üret
              </h3>
              <button onClick={() => setOpen(false)} className="text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-caption text-outline mb-1">Konu / Başlık</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={TYPE_PLACEHOLDERS[type]}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2.5 text-body-sm text-on-surface focus:border-tertiary transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-error-container/50 border border-error/30 text-error text-sm">
                  {error}
                </div>
              )}

              <p className="text-caption text-outline">
                Gemini AI, verilen konuda {TYPE_LABELS[type].toLowerCase()} içeriği oluşturacak.
              </p>

              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || loading}
                className="w-full py-2.5 rounded-lg bg-tertiary text-on-tertiary text-label-md hover:shadow-[0_0_15px_rgba(249,189,34,0.3)] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    Oluştur
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
