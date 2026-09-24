"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  name: string;
  defaultValue?: string;
  folder?: string;
  label?: string;
}

export default function CoverImageField({
  name,
  defaultValue = "",
  folder = "trend",
  label = "Kapak Görseli",
}: Props) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const supabase = createClient();
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      alert("Yükleme başarısız: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-caption text-outline">{label}</label>
      <input type="hidden" name={name} value={url} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all whitespace-nowrap disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">
            {uploading ? "hourglass_top" : "add_photo_alternate"}
          </span>
          {uploading ? "Yükleniyor..." : "Ekle"}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-on-surface-variant text-caption font-label-md hover:bg-white/5 transition-all whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
            Kaldır
          </button>
        )}
        <span className="text-caption text-outline truncate">{url || "Görsel seçilmedi"}</span>
      </div>
      {url && (
        <img
          src={url}
          alt="Kapak önizleme"
          loading="lazy"
          className="w-40 h-24 rounded-xl object-cover border border-white/10"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
        />
      )}
    </div>
  );
}
