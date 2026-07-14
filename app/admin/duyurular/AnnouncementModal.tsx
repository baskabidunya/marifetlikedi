"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveAnnouncement } from "@/lib/admin";

function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

const inputCls =
  "w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all";
const labelCls = "block text-caption text-outline mb-1";

interface Props {
  open: boolean;
  onClose: () => void;
  announcement?: {
    id: string;
    title: string;
    message: string;
    type: string;
    link: string;
    active: boolean;
    start_date: string;
    end_date: string | null;
  } | null;
}

export default function AnnouncementModal({ open, onClose, announcement }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!announcement;

  useEffect(() => {
    if (open) {
      setError("");
      setPending(false);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setPending(true);
    setError("");
    try {
      const formData = new FormData(formRef.current);
      await saveAnnouncement(formData);
      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-container rounded-2xl border border-white/10 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-surface-container border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-title-md text-on-surface">
            {isEdit ? "Duyuruyu Düzenle" : "Yeni Duyuru"}
          </h2>
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          {announcement && <input type="hidden" name="id" value={announcement.id} />}
          <input type="hidden" name="active" value={announcement?.active ? "true" : "true"} />

          {error && (
            <div className="p-3 rounded-lg bg-error-container/50 border border-error/30 text-error text-sm">
              {error}
            </div>
          )}

          <div>
            <label className={labelCls}>Başlık</label>
            <input
              name="title"
              defaultValue={announcement?.title || ""}
              required
              placeholder="Duyuru başlığı"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tür</label>
              <select name="type" defaultValue={announcement?.type || "info"} className={inputCls}>
                <option value="info">Bilgi</option>
                <option value="warning">Uyarı</option>
                <option value="success">Başarılı</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Durum</label>
              <select
                name="active"
                defaultValue={announcement?.active ? "true" : "true"}
                className={inputCls}
              >
                <option value="true">Aktif</option>
                <option value="false">Pasif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Yayın Başlangıcı</label>
              <input
                type="datetime-local"
                name="start_date"
                defaultValue={toLocalInput(announcement?.start_date)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Yayın Bitişi</label>
              <input
                type="datetime-local"
                name="end_date"
                defaultValue={toLocalInput(announcement?.end_date || undefined)}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Link (opsiyonel)</label>
            <input
              name="link"
              defaultValue={announcement?.link || ""}
              placeholder="/bir-sayfa"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Mesaj</label>
            <textarea
              name="message"
              defaultValue={announcement?.message || ""}
              required
              rows={4}
              placeholder="Duyuru mesajı..."
              className={inputCls}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-on-primary text-label-md hover:shadow-[0_0_15px_rgba(208,188,255,0.3)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {pending ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-white/10 text-on-surface text-label-md hover:bg-white/5 transition-all cursor-pointer"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
