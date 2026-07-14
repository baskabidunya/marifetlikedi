import { getUsers, setUserRole, deleteUser } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminKullanicilarPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-headline-md font-headline-md text-on-surface">Kullanıcılar</h1>
          <p className="text-caption text-outline mt-0.5">{users.length} kullanıcı</p>
        </div>
        <a href="/kayit"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 text-sm">
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Yeni Kullanıcı
        </a>
      </div>

      <div className="bg-surface-container/50 rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">E-posta</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">Ad</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden md:table-cell">Burç</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">Rol</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden lg:table-cell">Kayıt</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-2.5 text-body-sm text-on-surface">{u.email}</td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface hidden sm:table-cell">{u.display_name || "—"}</td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface hidden md:table-cell">{u.sun_sign || "—"}</td>
                <td className="px-4 py-2.5">
                  <form action={setUserRole} className="flex items-center gap-1.5">
                    <input type="hidden" name="user_id" value={u.id} />
                    <select name="role" defaultValue={u.role}
                      className="bg-surface-container border border-white/10 rounded-lg px-2 py-1 text-caption text-on-surface focus:border-primary transition-colors">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button type="submit"
                      className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                      Kaydet
                    </button>
                  </form>
                </td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden lg:table-cell">
                  {new Date(u.created_at).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-2.5">
                  <ConfirmButton formAction={deleteUser} name="user_id" value={u.id} label="Sil" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
