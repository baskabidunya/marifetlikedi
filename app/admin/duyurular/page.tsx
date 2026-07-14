import { getAnnouncements, saveAnnouncement, deleteAnnouncement } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

const TYPE_OPTIONS = [
  { value: "info", label: "Bilgi" },
  { value: "warning", label: "Uyarı" },
  { value: "success", label: "Başarılı" },
];

function scheduleStatus(item: {
  active: boolean;
  start_date: string;
  end_date: string | null;
}) {
  const now = Date.now();
  const start = new Date(item.start_date).getTime();
  const end = item.end_date ? new Date(item.end_date).getTime() : Infinity;
  if (!item.active) return { label: "Pasif", cls: "bg-white/10 text-outline border-white/10" };
  if (now < start) return { label: "Yaklaşan", cls: "bg-tertiary/15 text-tertiary border-tertiary/30" };
  if (now > end) return { label: "Süresi doldu", cls: "bg-white/10 text-outline border-white/10" };
  return { label: "Yayında", cls: "bg-secondary/15 text-secondary border-secondary/30" };
}

const inputCls =
  "w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all";
const labelCls = "block text-caption text-outline mb-1";

export default async function AdminDuyurularPage() {
  const items = await getAnnouncements();
  const nowLocal = toLocalInput(new Date().toISOString());
  const weekLocal = toLocalInput(new Date(Date.now() + 7 * 86400000).toISOString());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Duyuru Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">
          Banner ve duyuru alanı. Yayın aralığı (başlangıç–bitiş) ile içerik otomatik olarak haftalık döner.
        </p>
      </div>

      {/* Yeni Ekle */}
      <form
        action={saveAnnouncement}
        className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5"
      >
        <h2 className="text-title-md text-on-surface">Yeni Duyuru</h2>
        <input type="hidden" name="active" value="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Başlık</label>
            <input name="title" required placeholder="Duyuru başlığı" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tür</label>
            <select name="type" className={inputCls}>
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Yayın Başlangıcı</label>
            <input type="datetime-local" name="start_date" defaultValue={nowLocal} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Yayın Bitişi (opsiyonel)</label>
            <input type="datetime-local" name="end_date" defaultValue={weekLocal} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Link (opsiyonel)</label>
            <input name="link" placeholder="/bir-sayfa" className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Mesaj</label>
          <textarea name="message" required rows={3} placeholder="Duyuru mesajı..." className={inputCls} />
        </div>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all"
        >
          + Ekle
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item) => {
          const status = scheduleStatus(item);
          return (
            <form
              key={item.id}
              action={saveAnnouncement}
              className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5"
            >
              <input type="hidden" name="id" value={item.id} />
              <div className="flex items-center justify-between gap-3">
                <span className="text-label-md text-on-surface truncate">{item.title}</span>
                <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-caption border ${status.cls}`}>
                  {status.label}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Başlık</label>
                  <input name="title" defaultValue={item.title} required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Tür</label>
                  <select name="type" defaultValue={item.type} className={inputCls}>
                    {TYPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Yayın Başlangıcı</label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    defaultValue={toLocalInput(item.start_date)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Yayın Bitişi (opsiyonel)</label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    defaultValue={toLocalInput(item.end_date || undefined)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Durum</label>
                  <select
                    name="active"
                    defaultValue={item.active ? "true" : "false"}
                    className={inputCls}
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Link</label>
                  <input name="link" defaultValue={item.link || ""} className={inputCls} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Mesaj</label>
                  <textarea name="message" defaultValue={item.message} required rows={3} className={inputCls} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all"
                >
                  Kaydet
                </button>
                <ConfirmButton formAction={deleteAnnouncement} name="id" value={item.id} label="Sil" />
              </div>
            </form>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz duyuru yok</div>
      )}
    </div>
  );
}
