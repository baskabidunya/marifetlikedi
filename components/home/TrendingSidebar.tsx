export default function TrendingSidebar() {
  return (
    <aside className="lg:col-span-4">
      <h2 className="text-headline-md flex items-center gap-2 mb-6">
        <span className="text-secondary">💫</span> Çok Konuşulanlar
      </h2>
      <div className="space-y-4">
        <div className="glass-card p-4 rounded-xl flex gap-4 items-center">
          <div className="text-headline-md font-bold text-outline-variant opacity-30">
            01
          </div>
          <div className="flex-1">
            <h4 className="font-label-md text-sm line-clamp-2">
            &quot;Merkür retrosu beni mahvetti&quot; diyenler burada mı?
            </h4>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">favorite</span> 12.4k
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">chat_bubble</span> 856
              </span>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex gap-4 items-center">
          <div className="text-headline-md font-bold text-outline-variant opacity-30">
            02
          </div>
          <div className="flex-1">
            <h4 className="font-label-md text-sm line-clamp-2">
              Burçlara Göre Tatil Rotaları: Nereye Gitmelisin?
            </h4>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">favorite</span> 8.9k
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">chat_bubble</span> 243
              </span>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl flex gap-4 items-center">
          <div className="text-headline-md font-bold text-outline-variant opacity-30">
            03
          </div>
          <div className="flex-1">
            <h4 className="font-label-md text-sm line-clamp-2">
              Ritüeller Gerçekten İşe Yarıyor mu? Bilim ve Ezoterizm
            </h4>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">favorite</span> 7.2k
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">chat_bubble</span> 512
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
