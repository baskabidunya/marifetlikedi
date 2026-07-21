import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import StarField from "@/components/ui/StarField";
import Link from "next/link";
import { Suspense } from "react";
import AdSlot from "@/components/ads/AdSlot";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <section className="hidden md:flex relative w-1/2 nebula-bg items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-container-lowest to-background z-0" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse z-0" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[100px] z-0" />
        <StarField />
        <div className="relative z-10 text-center space-y-8 max-w-lg drop-shadow-2xl">
          <div className="inline-block p-6 rounded-full glass-card mb-4">
            <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-on-background leading-tight font-sora">
            Kaderin <span className="text-tertiary">Yıldızlarda</span> Gizli.
          </h2>
          <p className="text-lg text-on-surface-variant/80 max-w-md mx-auto">
            Evrenin fısıltılarını keşfetmek ve ruhunun haritasını okumak için portalı arala. Marifetli Kedi seni bekliyor.
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/10 rounded-full pointer-events-none border-dashed animate-[spin_60s_linear_infinite]" />
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center bg-surface-container-lowest p-container-padding-mobile md:p-container-padding-desktop relative">
        <div className="md:hidden absolute inset-0 nebula-bg opacity-30 z-0" />
        <div className="w-full max-w-md relative z-10">
          <div className="text-center md:text-left mb-10">
            <div className="md:hidden mx-auto w-20 h-20 mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-background mb-2 font-sora">
              Marifetli Kedi&apos;ye hoşgeldin
            </h1>
            <p className="text-base text-on-surface-variant">
              Giriş yap ve kozmik yolculuğuna kaldığın yerden devam et.
            </p>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-surface-container-lowest text-outline text-sm font-semibold tracking-wider uppercase">veya şununla devam et</span>
            </div>
          </div>

          <SocialLogin />

          <div className="mt-12 text-center">
            <p className="text-base text-on-surface-variant">
              Henüz bir hesabın yok mu?
              <Link href="/kayit" className="text-tertiary font-bold hover:underline underline-offset-4 ml-1">Kayıt Ol</Link>
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 text-xs text-outline/30 select-none">
          MARİFETLİ KEDİ © 2026 • Kozmik Rehberin
        </div>
      </section>

      <AdSlot
        name="static_page"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[300px]"
      />
    </main>
  );
}
