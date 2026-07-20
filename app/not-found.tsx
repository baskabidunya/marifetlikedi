import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-[120px] font-sora font-bold text-primary/20 leading-none mb-4">404</div>
        <h1 className="font-sora text-headline-lg text-on-surface font-bold mb-4">
          Kaybolmuş Gibi Görünüyorsun
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
          Aradığın sayfa yıldızların arasında kaybolmuş olabilir. Ama endişe etme, sana yardım edecek yollar var.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-on-primary font-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 rounded-full border border-white/15 text-on-surface-variant font-label-md hover:bg-white/5 transition-all"
          >
            Gök Günlüğü
          </Link>
        </div>
        <div className="mt-12 text-on-surface-variant/50">
          <span className="material-symbols-outlined text-6xl">explore</span>
        </div>
      </div>
    </main>
  );
}
