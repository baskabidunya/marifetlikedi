"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  name,
  defaultValue = "",
  folder = "admin",
  label = "Görsel URL",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(defaultValue);
  const [preview, setPreview] = useState(defaultValue);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const supabase = createClient();
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
      setPreview(data.publicUrl);
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
      <div className="flex items-center gap-3">
        <input
          type="text"
          readOnly
          value={url}
          placeholder="Bilgisayardan görsel seçin veya URL yapıştırın"
          className="flex-1 bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface-variant focus:border-primary transition-all cursor-default"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all whitespace-nowrap disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-lg">
            {uploading ? "hourglass_top" : "upload"}
          </span>
          {uploading ? "Yükleniyor..." : "Bilgisayardan Ekle"}
        </button>
      </div>
      {url && (
        <img
          src={preview}
          alt="Önizleme"
          loading="lazy"
          className="w-20 h-20 rounded-xl object-cover border border-white/10 mt-2"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
        />
      )}
    </div>
  );
}
