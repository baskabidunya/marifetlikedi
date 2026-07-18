"use client";

import ImageUpload from "@/components/admin/ImageUpload";
import { useRef } from "react";

export default function TarotCardForm({
  card,
  onSave,
  onDelete,
}: {
  card?: {
    id: string;
    name: string;
    number: number;
    arcana: string;
    icon: string;
    sort_order: number;
    active: boolean;
    upright_meaning: string;
    reversed_meaning: string;
    image_url: string;
  };
  onSave: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={onSave}
      className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
      {card && <input type="hidden" name="id" value={card.id} />}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div>
          <label className="block text-caption text-outline mb-1">Kart Adı</label>
          <input name="name" defaultValue={card?.name} required
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Numara</label>
          <input name="number" defaultValue={card?.number} type="number"
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Tür</label>
          <select name="arcana" defaultValue={card?.arcana || "major"}
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">İkon</label>
          <input name="icon" defaultValue={card?.icon}
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
        {card && (
          <div>
            <label className="block text-caption text-outline mb-1">Sıra</label>
            <input name="sort_order" defaultValue={card.sort_order} type="number"
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
          </div>
        )}
        {card && (
          <div>
            <label className="block text-caption text-outline mb-1">Durum</label>
            <select name="active" defaultValue={card.active ? "true" : "false"}
              className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </div>
        )}
        {!card && <input type="hidden" name="active" value="true" />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-caption text-outline mb-1">Dik Anlamı</label>
          <textarea name="upright_meaning" defaultValue={card?.upright_meaning} rows={2}
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
        </div>
        <div>
          <label className="block text-caption text-outline mb-1">Ters Anlamı</label>
          <textarea name="reversed_meaning" defaultValue={card?.reversed_meaning} rows={2}
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
        </div>
      </div>
      <ImageUpload name="image_url" defaultValue={card?.image_url} folder="tarot" />
      <div className="flex items-center gap-2">
        <button type="submit"
          className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
          {card ? "Kaydet" : "+ Ekle"}
        </button>
        {card && (
          <button type="button" onClick={() => {
            const fd = new FormData();
            fd.append("id", card.id);
            onDelete(fd);
          }}
            className="px-4 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-caption font-label-md hover:bg-red-500/20 transition-all">
            Sil
          </button>
        )}
      </div>
    </form>
  );
}
