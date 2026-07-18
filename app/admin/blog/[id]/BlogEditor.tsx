"use client";

import { useState, useEffect } from "react";
import { saveBlogPost } from "@/lib/admin";
import { getActiveBlogCategories } from "@/lib/admin";
import { getBlogTags } from "@/lib/admin";
import ImageUpload from "@/components/admin/ImageUpload";

interface BlogValues {
  id: string; title: string; slug: string; excerpt: string; content: string;
  cover_image: string; category: string; published: boolean; author_name: string;
  tags?: string[];
}

interface Category { id: string; name: string; slug: string; }
interface Tag { id: string; name: string; slug: string; }

export default function BlogEditor({ defaultValues }: { defaultValues: BlogValues }) {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(defaultValues.title);
  const [slug, setSlug] = useState(defaultValues.slug);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultValues.tags || []);

  useEffect(() => {
    getActiveBlogCategories().then(setCategories);
    getBlogTags().then(setTags);
  }, []);

  function generateSlug(val: string) {
    return val.toLowerCase()
      .replace(/[^a-z0-9çğıöşü\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-]+|[-]+$/g, "")
      .substring(0, 100);
  }

  function toggleTag(tagId: string) {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  }

  async function action(formData: FormData) {
    setSaving(true);
    try {
      selectedTags.forEach(id => formData.append("tags", id));
      await saveBlogPost(formData);
      window.location.href = "/admin/blog";
    } catch (e) {
      alert("Kaydedilemedi: " + (e as Error).message);
    }
    setSaving(false);
  }

  return (
    <form action={action} className="max-w-4xl space-y-6">
      <input type="hidden" name="id" value={defaultValues.id} />

      <div className="glass-card p-6 md:p-8 rounded-3xl space-y-5">
        <div>
          <label className="block text-label-md text-on-surface-variant mb-2">Başlık</label>
          <input name="title" value={title} onChange={e => { setTitle(e.target.value); setSlug(generateSlug(e.target.value)); }}
            className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary transition-all" />
        </div>

        <div>
          <label className="block text-label-md text-on-surface-variant mb-2">Slug (URL)</label>
          <input name="slug" value={slug} onChange={e => setSlug(e.target.value)}
            className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary transition-all font-mono" />
          <p className="text-caption text-outline mt-1">/{slug}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Kategori</label>
            <select name="category" defaultValue={defaultValues.category}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary transition-all">
              <option value="genel">Genel</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Yazar</label>
            <input name="author_name" defaultValue={defaultValues.author_name}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary transition-all" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Durum</label>
            <select name="published" defaultValue={defaultValues.published ? "true" : "false"}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary transition-all">
              <option value="false">Taslak</option>
              <option value="true">Yayında</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Etiketler</label>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <button key={t.id} type="button" onClick={() => toggleTag(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-caption font-label-md transition-all ${
                    selectedTags.includes(t.id)
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-surface-container border border-white/10 text-on-surface-variant hover:bg-white/5"
                  }`}>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <ImageUpload
            name="cover_image"
            defaultValue={defaultValues.cover_image}
            folder="blog"
            label="Kapak Görsel"
          />
        </div>

        <div>
          <label className="block text-label-md text-on-surface-variant mb-2">Özet</label>
          <textarea name="excerpt" defaultValue={defaultValues.excerpt} rows={3}
            className="w-full bg-surface-container border border-white/10 rounded-2xl p-4 text-body-md text-on-surface focus:border-primary transition-all resize-none" />
        </div>

        <div>
          <label className="block text-label-md text-on-surface-variant mb-2">İçerik</label>
          <textarea name="content" defaultValue={defaultValues.content} rows={16}
            className="w-full bg-surface-container border border-white/10 rounded-2xl p-4 text-body-md text-on-surface focus:border-primary transition-all font-mono resize-y" />
          <p className="text-caption text-outline mt-1">Markdown desteklenir</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
          {saving ? "Kaydediliyor..." : defaultValues.id ? "Güncelle" : "Yayınla"}
        </button>
        <a href="/admin/blog"
          className="px-8 py-3.5 rounded-2xl border border-white/10 text-on-surface-variant font-label-md hover:bg-white/5 transition-all">
          İptal
        </a>
      </div>
    </form>
  );
}
