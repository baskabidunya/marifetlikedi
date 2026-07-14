import { getCreditsOverview, adjustCredits } from "@/lib/admin";

export default async function AdminKredilerPage() {
  const { credits, recentTransactions, profileMap, analytics } = await getCreditsOverview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Kredi Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">Kullanıcı kredi bakiyeleri ve işlemleri</p>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-surface-container/60 rounded-2xl p-4">
          <p className="text-caption text-outline">Toplam Kredi</p>
          <p className="text-headline-sm font-headline-sm text-primary mt-1">{analytics.totalCredits}</p>
        </div>
        <div className="bg-surface-container/60 rounded-2xl p-4">
          <p className="text-caption text-outline">Kredi Olan Üye</p>
          <p className="text-headline-sm font-headline-sm text-on-surface mt-1">{analytics.totalUsers}</p>
        </div>
        <div className="bg-surface-container/60 rounded-2xl p-4">
          <p className="text-caption text-outline">Son 30 Gün Yeni Üye</p>
          <p className="text-headline-sm font-headline-sm text-secondary mt-1">{analytics.newSignups}</p>
        </div>
        <div className="bg-surface-container/60 rounded-2xl p-4">
          <p className="text-caption text-outline">Son 30 Gün Harcanan</p>
          <p className="text-headline-sm font-headline-sm text-error mt-1">{analytics.spentCredits}</p>
        </div>
      </div>

      {/* Distribution + Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-surface-container/60 rounded-2xl p-4">
          <p className="text-caption text-outline mb-3">Kredi Dağılımı</p>
          <div className="space-y-2">
            {[
              { label: "Boş (0)", count: analytics.dist.bos, color: "bg-outline/30" },
              { label: "Az (1-5)", count: analytics.dist.az, color: "bg-primary/40" },
              { label: "Orta (6-10)", count: analytics.dist.orta, color: "bg-secondary/40" },
              { label: "Çok (10+)", count: analytics.dist.cok, color: "bg-tertiary/40" },
            ].map(d => {
              const pct = analytics.totalUsers > 0 ? Math.round((d.count / analytics.totalUsers) * 100) : 0;
              return (
                <div key={d.label} className="flex items-center gap-3">
                  <span className="text-caption text-on-surface-variant w-20 shrink-0">{d.label}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.color}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-caption text-outline w-10 text-right">{d.count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-surface-container/60 rounded-2xl p-4">
          <p className="text-caption text-outline mb-3">Son 30 Gün Akışı</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-on-surface-variant">Günlük Kredi Kazanılan</span>
              <span className="text-label-md font-label-md text-primary">+{analytics.dailyCredits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-on-surface-variant">Reklam ile Kazanılan</span>
              <span className="text-label-md font-label-md text-secondary">+{analytics.adCredits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-on-surface-variant">Harcanan</span>
              <span className="text-label-md font-label-md text-error">-{analytics.spentCredits}</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Credits List */}
      <div>
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Üye Kredileri</p>
        <div className="bg-surface-container/50 rounded-2xl border border-white/5 overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-2.5 text-caption font-label-md text-outline">Kullanıcı</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline text-center">Kredi</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">Sıfırlanma</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {credits.map(c => (
                <tr key={c.user_id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-2.5 text-body-sm text-on-surface">
                    {profileMap[c.user_id] || c.user_id.slice(0, 8)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-caption font-label-md ${
                      c.credits === 0 ? "bg-white/5 text-outline" :
                      c.credits <= 5 ? "bg-primary/15 text-primary" :
                      c.credits <= 10 ? "bg-secondary/15 text-secondary" :
                      "bg-tertiary/15 text-tertiary"
                    }`}>
                      {c.credits}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden sm:table-cell">
                    {c.last_daily_reset ? new Date(c.last_daily_reset).toLocaleDateString("tr-TR") : "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    <form action={adjustCredits} className="flex items-center gap-1.5">
                      <input type="hidden" name="user_id" value={c.user_id} />
                      <input type="number" name="amount" required
                        className="w-16 bg-surface-container border border-white/10 rounded-lg px-2 py-1 text-caption text-on-surface focus:border-primary transition-colors text-center"
                        placeholder="±" />
                      <button type="submit"
                        className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                        Uygula
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {credits.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-outline text-body-sm">Henüz kredi verisi yok</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Son İşlemler</p>
        <div className="bg-surface-container/50 rounded-2xl border border-white/5 overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-2.5 text-caption font-label-md text-outline">Kullanıcı</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline text-center">Miktar</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">Tür</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden md:table-cell">Açıklama</th>
                <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden lg:table-cell">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(t => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-2.5 text-body-sm text-on-surface">
                    {profileMap[t.user_id] || t.user_id.slice(0, 8)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`text-caption font-label-md ${t.amount >= 0 ? "text-primary" : "text-error"}`}>
                      {t.amount >= 0 ? "+" : ""}{t.amount}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded-md text-caption ${
                      t.type === "daily" ? "bg-primary/10 text-primary" :
                      t.type === "ad_reward" ? "bg-secondary/10 text-secondary" :
                      "bg-white/5 text-outline"
                    }`}>
                      {t.type === "daily" ? "Günlük" : t.type === "ad_reward" ? "Reklam" : "Harcama"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden md:table-cell">{t.description || "—"}</td>
                  <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden lg:table-cell">
                    {new Date(t.created_at).toLocaleDateString("tr-TR")}
                  </td>
                </tr>
              ))}
              {recentTransactions.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-outline text-body-sm">Henüz işlem yok</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
