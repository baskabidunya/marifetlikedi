import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import StarField from "@/components/ui/StarField";
import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Şifremi Unuttum - Marifetli Kedi",
  description: "Şifreni sıfırla ve kozmik yolculuğuna devam et.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-container-padding-mobile md:p-container-padding-desktop relative overflow-hidden">
      <div className="absolute inset-0 nebula-bg opacity-30 z-0" />
      <StarField />
      <div className="w-full max-w-md relative z-10 glass p-8 rounded-3xl inner-glow">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 mb-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>lock_reset</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-background mb-2 font-sora">
            Şifreni mi unuttun?
          </h1>
          <p className="text-base text-on-surface-variant">
            E-posta adresini gir, sana şifre sıfırlama bağlantısı gönderelim.
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="mt-8 text-center">
          <p className="text-base text-on-surface-variant">
            Hesabın yok mu?
            <Link href="/kayit" className="text-tertiary font-bold hover:underline underline-offset-4 ml-1">Kayıt Ol</Link>
          </p>
        </div>
      </div>

      <AdSlot
        name="static_page"
        className="my-12 max-w-md mx-auto"
      />
    </main>
  );
}
