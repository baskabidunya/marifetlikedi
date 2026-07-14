import { getPartners, deletePartner } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminPartnerlerPage() {
  const partners = await getPartners();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-primary">Partner Profilleri</h1>
          <p className="text-body-md text-on-surface-variant mt-1">{partners.length} partner</p>
        </div>
      </div>

      <div className="bg-surface-container/50 rounded-3xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant">İsim</th>
              <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant hidden sm:table-cell">Doğum</th>
              <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant hidden md:table-cell">Kullanıcı ID</th>
              <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant hidden lg:table-cell">Eklenme</th>
              <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant"></th>
            </tr>
          </thead>
          <tbody>
            {partners.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-body-md text-on-surface">{p.name}</td>
                <td className="px-6 py-4 text-body-md text-on-surface-variant hidden sm:table-cell">
                  {p.birth_date ? new Date(p.birth_date).toLocaleDateString("tr-TR") : "—"}
                </td>
                <td className="px-6 py-4">
                  <code className="text-caption text-outline font-mono">{p.user_id?.slice(0, 8)}…</code>
                </td>
                <td className="px-6 py-4 text-body-md text-on-surface-variant hidden lg:table-cell">
                  {new Date(p.created_at).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-6 py-4">
                  <ConfirmButton formAction={deletePartner} name="id" value={p.id} label="Sil" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
