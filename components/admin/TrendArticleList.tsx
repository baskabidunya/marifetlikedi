"use client";

import { useState } from "react";
import { saveTrendArticle, deleteTrendArticle } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";
import RichTextEditor from "@/components/admin/RichTextEditor";

const TAG_COLORS = [
  { value: "text-tertiary", label: "Altın (Tertiary)" },
  { value: "text-secondary", label: "Mor (Secondary)" },
  { value: "text-primary", label: "Açık Mor (Primary)" },
];

interface Article {
  id: string;
  title: string;
  slug: string;
  tag: string;
  tag_color: string;
  excerpt: string;
  content: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export default function TrendArticleList({ articles }: { articles: Article[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {articles.map((c) => {
        const open = openId === c.id;
        return (
          <div key={c.id} className="bg-surface-container/60 rounded-2xl border border-white/5 overflow-hidden">
            {/* Summary row */}
            <div className="flex items-center gap-3 p-4">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.active ? "bg-tertiary" : "bg-outline/40"}`} />
              <div className="flex-1 min-w-0">
                <h3 className="font-sora text-body-lg text-on-surface font-semibold truncate">{c.title}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-caption text-outline">
                  <span className={`px-2 py-0.5 rounded-full bg-background/60 ${c.tag_color}`}>{c.tag || "Genel"}</span>
                  <span>{new Date(c.created_at).toLocaleDateString("tr-TR")}</span>
                  <span className={c.active ? "text-tertiary" : "text-outline"}>{c.active ? "Yayında" : "Pasif"}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : c.id)}
                className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all shrink-0"
              >
                {open ? "Kapat" : "Düzenle"}
              </button>
            </div>

            {/* Expandable edit form */}
            {open && (
              <form action={saveTrendArticle} className="border-t border-white/10 p-4 space-y-3">
                <input type="hidden" name="id" value={c.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-caption text-outline mb-1">Başlık</label>
                    <input name="title" defaultValue={c.title} required
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Slug</label>
                    <input name="slug" defaultValue={c.slug}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Kategori / Etiket</label>
                    <input name="tag" defaultValue={c.tag}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Etiket Rengi</label>
                    <select name="tag_color" defaultValue={c.tag_color}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                      {TAG_COLORS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Sıra</label>
                    <input name="sort_order" defaultValue={c.sort_order} type="number"
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Durum</label>
                    <select name="active" defaultValue={c.active ? "true" : "false"}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                      <option value="true">Yayında</option>
                      <option value="false">Pasif</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Özet</label>
                  <textarea name="excerpt" defaultValue={c.excerpt} rows={2}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">İçerik</label>
                  <RichTextEditor value={c.content} />
                </div>
                <div className="flex items-center gap-2">
                  <button type="submit"
                    className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                    Kaydet
                  </button>
                  <ConfirmButton formAction={deleteTrendArticle} name="id" value={c.id} label="Sil" />
                </div>
              </form>
            )}
          </div>
        );
      })}

      {articles.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz trend içerik yok</div>
      )}
    </div>
  );
}
