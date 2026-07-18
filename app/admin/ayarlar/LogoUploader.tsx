"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { updateSetting } from "@/lib/admin";

export default function LogoUploader({ currentValue }: { currentValue: string }) {
  const [uploading, setUploading] = useState(false);
  const [logo, setLogo] = useState(currentValue);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `logo/site-logo.${ext}`;
      const supabase = createClient();
      const { error } = await supabase.storage
        .from("media")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setLogo(data.publicUrl);

      const fd = new FormData();
      fd.append("key", "site_logo");
      fd.append("value", data.publicUrl);
      await updateSetting(fd);
    } catch (err) {
      alert("Yükleme başarısız: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    setLogo("");
    const fd = new FormData();
    fd.append("key", "site_logo");
    fd.append("value", "");
    await updateSetting(fd);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-headline-md font-headline-md text-on-surface">Site Logosu</label>
        <p className="text-body-md text-on-surface-variant mt-1">
          Header&apos;da görünen logo görseli. Boş bırakılırsa &quot;Marifetli Kedi&quot; yazısı gösterilir.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-48 h-20 rounded-2xl bg-surface-container border border-white/10 flex items-center justify-center overflow-hidden">
          {logo ? (
            <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain p-2" />
          ) : (
            <span className="text-caption text-outline">Logo yok</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">
              {uploading ? "hourglass_top" : "upload"}
            </span>
            {uploading ? "Yükleniyor..." : "Bilgisayardan Ekle"}
          </button>
          {logo && (
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-caption font-label-md hover:bg-red-500/20 transition-all"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
              Logoyu Kaldır
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
