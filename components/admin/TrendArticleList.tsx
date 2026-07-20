"use client";

import { useState, Fragment } from "react";
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
    <div className="bg-surface-container/50 rounded-2xl overflow-hidden border border-white/5">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-2.5 text-caption font-label-md text-outline">Başlık</th>
            <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">Etiket</th>
            <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden md:table-cell">Durum</th>
            <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden lg:table-cell">Tarih</th>
            <th className="px-4 py-2.5 text-caption font-label-md text-outline"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((c) => {
            const open = openId === c.id;
            return (
              <Fragment key={c.id}>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : c.id)}
                      className="text-body-sm text-on-surface hover:text-primary transition-colors text-left"
                    >
                      {c.title}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-full bg-background/60 ${c.tag_color}`}>{c.tag || "Genel"}</span>
                  </td>
                  <td className="px-4 py-2.5 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-md text-caption font-label-md ${
                      c.active ? "bg-primary/20 text-primary" : "bg-white/5 text-outline"
                    }`}>
                      {c.active ? "Yayında" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden lg:table-cell">
                    {new Date(c.created_at).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : c.id)}
                        className="text-caption font-label-md text-primary hover:text-primary/80 transition-colors"
                      >
                        Düzenle
                      </button>
                      <ConfirmButton formAction={deleteTrendArticle} name="id" value={c.id} label="Sil" />
                    </div>
                  </td>
                </tr>

                {open && (
                  <tr className="border-b border-white/5 bg-background/30">
                    <td colSpan={5} className="px-4 py-4">
                      <form action={saveTrendArticle} className="space-y-3">
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
                          <button type="button" onClick={() => setOpenId(null)}
                            className="px-4 py-1.5 rounded-lg border border-white/10 text-on-surface-variant text-caption font-label-md hover:bg-white/5 transition-all">
                            İptal
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {articles.length === 0 && (
        <div className="text-center py-12 text-outline">
          <p className="text-body-sm">Henüz trend içerik yok</p>
        </div>
      )}
    </div>
  );
}
