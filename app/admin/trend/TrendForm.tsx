"use client";

import { useState } from "react";
import { saveTrendArticle } from "@/lib/admin";
import RichTextEditor from "@/components/admin/RichTextEditor";
import AIGenerateButton from "@/components/admin/AIGenerateButton";

const TAG_COLORS = [
  { value: "text-tertiary", label: "Altın (Tertiary)" },
  { value: "text-secondary", label: "Mor (Secondary)" },
  { value: "text-primary", label: "Açık Mor (Primary)" },
];

export default function TrendForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tag, setTag] = useState("");
  const [tagColor, setTagColor] = useState("text-tertiary");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  function handleAI(data: { title: string; excerpt?: string; content?: string }) {
    if (data.title) {
      setTitle(data.title);
      setSlug(data.title.toLowerCase().replace(/[^a-z0-9ğüşıöç\s-]/g, "").replace(/\s+/g, "-").slice(0, 80));
    }
    if (data.excerpt) setExcerpt(data.excerpt);
    if (data.content) setContent(data.content);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-title-md text-on-surface">Yeni İçerik</h2>
        <AIGenerateButton type="trend" onGenerated={handleAI} />
      </div>
      <form action={saveTrendArticle} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
        <input type="hidden" name="active" value="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-caption text-outline mb-1">Başlık</label>
            <input name="title" required placeholder="Yazı başlığı" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Slug</label>
            <input name="slug" placeholder="otomatik-uretilir" value={slug} onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Kategori / Etiket</label>
            <input name="tag" placeholder="Burç Analizi" value={tag} onChange={(e) => setTag(e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-caption text-outline mb-1">Etiket Rengi</label>
            <select name="tag_color" value={tagColor} onChange={(e) => setTagColor(e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
              {TAG_COLORS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Özet</label>
          <textarea name="excerpt" rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">İçerik</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <div className="flex items-end">
          <button type="submit"
            className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
            + Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
