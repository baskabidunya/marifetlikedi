"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAnnouncement, toggleAnnouncementActive } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";
import AnnouncementModal from "./AnnouncementModal";

const TYPE_BADGE: Record<string, { label: string; cls: string }> = {
  info: { label: "Bilgi", cls: "bg-primary/15 text-primary border-primary/30" },
  warning: { label: "Uyarı", cls: "bg-tertiary/15 text-tertiary border-tertiary/30" },
  success: { label: "Başarılı", cls: "bg-secondary/15 text-secondary border-secondary/30" },
};

function getStatus(item: { active: boolean; start_date: string; end_date: string | null }) {
  const now = Date.now();
  const start = new Date(item.start_date).getTime();
  const end = item.end_date ? new Date(item.end_date).getTime() : Infinity;
  if (!item.active) return { label: "Pasif", cls: "bg-white/10 text-outline border-white/10" };
  if (now < start) return { label: "Yaklaşan", cls: "bg-tertiary/15 text-tertiary border-tertiary/30" };
  if (now > end) return { label: "Süresi doldu", cls: "bg-white/10 text-outline border-white/10" };
  return { label: "Yayında", cls: "bg-secondary/15 text-secondary border-secondary/30" };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

function dateRange(a: { start_date: string; end_date: string | null }) {
  const s = formatDate(a.start_date);
  const e = a.end_date ? formatDate(a.end_date) : null;
  return e ? `${s} – ${e}` : s;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string;
  active: boolean;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

const STATUS_FILTERS = [
  { value: "all", label: "Tümü" },
  { value: "active", label: "Yayında" },
  { value: "upcoming", label: "Yaklaşan" },
  { value: "expired", label: "Süresi doldu" },
  { value: "inactive", label: "Pasif" },
];

export default function AnnouncementList({ items }: { items: Announcement[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);

  const filtered = items.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    const status = getStatus(a);
    if (statusFilter === "active") return status.label === "Yayında";
    if (statusFilter === "upcoming") return status.label === "Yaklaşan";
    if (statusFilter === "expired") return status.label === "Süresi doldu";
    if (statusFilter === "inactive") return status.label === "Pasif";
    return true;
  });

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(a: Announcement) {
    setEditing(a);
    setModalOpen(true);
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-headline-md font-headline-md text-on-surface">Duyuru Yönetimi</h1>
          <p className="text-caption text-outline mt-0.5">
            {items.length} duyuru, {filtered.length} tanesi listeleniyor
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-label-md hover:shadow-[0_0_15px_rgba(208,188,255,0.3)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Yeni Duyuru
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Duyuru ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container border border-white/10 rounded-lg text-body-sm text-on-surface focus:border-primary transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-surface-container border border-white/10 rounded-lg text-body-sm text-on-surface focus:border-primary transition-all cursor-pointer"
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-outline">
          <span className="material-symbols-outlined text-5xl mb-4 block opacity-30">campaign</span>
          <p>{search || statusFilter !== "all" ? "Arama sonucu bulunamadı" : "Henüz duyuru yok"}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-3 text-caption font-label-md text-outline">Başlık</th>
                <th className="pb-3 text-caption font-label-md text-outline hidden sm:table-cell">Tür</th>
                <th className="pb-3 text-caption font-label-md text-outline">Durum</th>
                <th className="pb-3 text-caption font-label-md text-outline hidden md:table-cell">Yayın Aralığı</th>
                <th className="pb-3 text-caption font-label-md text-outline text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const badge = TYPE_BADGE[a.type] || TYPE_BADGE.info;
                const status = getStatus(a);
                return (
                  <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => openEdit(a)}
                        className="text-body-sm text-on-surface hover:text-primary transition-colors text-left cursor-pointer"
                      >
                        {a.title}
                      </button>
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-caption border ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-caption border ${status.cls}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-caption text-outline hidden md:table-cell">
                      {dateRange(a)}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-outline hover:text-on-surface transition-all cursor-pointer"
                          title="Düzenle"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <form action={toggleAnnouncementActive} className="inline-flex">
                          <input type="hidden" name="id" value={a.id} />
                          <input type="hidden" name="active" value={a.active ? "true" : "false"} />
                          <button
                            type="submit"
                            className="p-1.5 rounded-lg hover:bg-white/10 text-outline hover:text-on-surface transition-all cursor-pointer"
                            title={a.active ? "Pasifleştir" : "Aktifleştir"}
                          >
                            <span className="material-symbols-outlined text-lg">
                              {a.active ? "toggle_on" : "toggle_off"}
                            </span>
                          </button>
                        </form>
                        <ConfirmButton formAction={deleteAnnouncement} name="id" value={a.id} label="Sil" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AnnouncementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        announcement={editing}
      />
    </>
  );
}
