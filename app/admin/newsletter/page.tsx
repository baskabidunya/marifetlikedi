import { getNewsletterSubscribers, toggleSubscriber, deleteSubscriber } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminNewsletterPage() {
  const subscribers = await getNewsletterSubscribers();
  const activeCount = subscribers.filter(s => s.active).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Newsletter</h1>
        <p className="text-caption text-outline mt-0.5">{subscribers.length} abone, {activeCount} aktif</p>
      </div>

      <div className="bg-surface-container/50 rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">E-posta</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">İsim</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline text-center">Durum</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden md:table-cell">Tarih</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map(s => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-2.5 text-body-sm text-on-surface">{s.email}</td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden sm:table-cell">{s.name || "—"}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-md text-caption ${s.active ? "bg-primary/15 text-primary" : "bg-white/5 text-outline"}`}>
                    {s.active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden md:table-cell">
                  {new Date(s.subscribed_at).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <form action={toggleSubscriber}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="active" value={s.active ? "false" : "true"} />
                      <button type="submit"
                        className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-caption hover:bg-primary/30 transition-all">
                        {s.active ? "Pasifleştir" : "Aktifleştir"}
                      </button>
                    </form>
                    <ConfirmButton formAction={deleteSubscriber} name="id" value={s.id} label="Sil" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {subscribers.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz abone yok</div>
      )}
    </div>
  );
}
