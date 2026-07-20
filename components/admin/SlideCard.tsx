"use client";

import { useState, useTransition } from "react";
import ImageUpload from "./ImageUpload";

interface SlideData {
  id: string;
  type: string;
  slide_index: number;
  title: string;
  description: string;
  image_url: string;
  active: boolean;
  sign?: string;
  heading1?: string;
  heading2?: string;
  button1_text?: string;
  button1_link?: string;
  button2_text?: string;
  button2_link?: string;
}

export default function SlideCard({
  slide,
  saveAction,
  deleteAction,
  isHome,
}: {
  slide: SlideData;
  saveAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  isHome: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSave(formData: FormData) {
    startTransition(async () => {
      await saveAction(formData);
    });
  }

  function handleDelete() {
    const fd = new FormData();
    fd.append("id", slide.id);
    startTransition(async () => {
      await deleteAction(fd);
    });
  }

  const badge = isHome
    ? slide.heading1 || slide.title || "Slider"
    : `${slide.sign || ""} — ${slide.title || "Burç"}`;

  return (
    <div className="bg-surface-container/60 rounded-2xl border border-white/5 overflow-hidden">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
      >
        <span className="material-symbols-outlined text-lg text-primary">
          drag_indicator
        </span>
        <span className="text-caption font-mono bg-primary/20 text-primary px-2 py-0.5 rounded min-w-[2rem] text-center">
          {slide.slide_index}
        </span>
        {slide.image_url && (
          <img
            src={slide.image_url}
            alt=""
            loading="lazy"
            className="w-10 h-10 rounded-lg object-cover border border-white/10"
          />
        )}
        <span className="flex-1 text-body-sm text-on-surface truncate">
          {badge}
        </span>
        <span
          className={`text-caption px-2 py-0.5 rounded-full ${
            slide.active
              ? "bg-green-500/20 text-green-400"
              : "bg-white/10 text-outline"
          }`}
        >
          {slide.active ? "Aktif" : "Pasif"}
        </span>
        <span
          className="material-symbols-outlined text-lg text-outline transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          expand_more
        </span>
      </button>

      {/* BODY */}
      {open && (
        <form action={handleSave} className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
          <input type="hidden" name="id" value={slide.id} />
          <input type="hidden" name="type" value={slide.type} />

          <ImageUpload name="image_url" defaultValue={slide.image_url} folder="slides" label="Görsel" />

          {isHome ? (
            <>
              {/* Home fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Rozet Yazısı</label>
                  <input name="title" defaultValue={slide.title}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Aktif</label>
                  <select name="active" defaultValue={slide.active ? "true" : "false"}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Sıra</label>
                  <input name="slide_index" defaultValue={slide.slide_index} type="number"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Başlık Satır 1</label>
                  <input name="heading1" defaultValue={slide.heading1}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Başlık Satır 2 (Gradient)</label>
                  <input name="heading2" defaultValue={slide.heading2}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">1. Buton Yazısı</label>
                  <input name="button1_text" defaultValue={slide.button1_text} placeholder="Boşsa buton gizlenir"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">1. Buton Linki</label>
                  <input name="button1_link" defaultValue={slide.button1_link} placeholder="/burclar"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">2. Buton Yazısı</label>
                  <input name="button2_text" defaultValue={slide.button2_text} placeholder="Boşsa buton gizlenir"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">2. Buton Linki</label>
                  <input name="button2_link" defaultValue={slide.button2_link} placeholder="/tarot"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-caption text-outline mb-1">Açıklama</label>
                <textarea name="description" defaultValue={slide.description} rows={2}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
              </div>
            </>
          ) : (
            <>
              {/* Burclar fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Burç</label>
                  <select name="sign" defaultValue={slide.sign}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                    <option value="">Burç seçin</option>
                    <option value="Koç">♈ Koç</option>
                    <option value="Boğa">♉ Boğa</option>
                    <option value="İkizler">♊ İkizler</option>
                    <option value="Yengeç">♋ Yengeç</option>
                    <option value="Aslan">♌ Aslan</option>
                    <option value="Başak">♍ Başak</option>
                    <option value="Terazi">♎ Terazi</option>
                    <option value="Akrep">♏ Akrep</option>
                    <option value="Yay">♐ Yay</option>
                    <option value="Oğlak">♑ Oğlak</option>
                    <option value="Kova">♒ Kova</option>
                    <option value="Balık">♓ Balık</option>
                  </select>
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Başlık</label>
                  <input name="title" defaultValue={slide.title}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-caption text-outline mb-1">Aktif</label>
                    <select name="active" defaultValue={slide.active ? "true" : "false"}
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                      <option value="true">Aktif</option>
                      <option value="false">Pasif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-caption text-outline mb-1">Sıra</label>
                    <input name="slide_index" defaultValue={slide.slide_index} type="number"
                      className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-caption text-outline mb-1">Açıklama</label>
                <input name="description" defaultValue={slide.description}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all disabled:opacity-50"
            >
              {isPending ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="px-4 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-caption font-label-md hover:bg-red-500/20 transition-all disabled:opacity-50"
            >
              Sil
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
