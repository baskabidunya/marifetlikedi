import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import StarField from "@/components/ui/StarField";
import AdSlot from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "Şifre Yenile - Marifetli Kedi",
  description: "Yeni şifreni belirle.",
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-container-padding-mobile md:p-container-padding-desktop relative overflow-hidden">
      <div className="absolute inset-0 nebula-bg opacity-30 z-0" />
      <StarField />
      <div className="w-full max-w-md relative z-10 glass p-8 rounded-3xl inner-glow">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 mb-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>key</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-background mb-2 font-sora">
            Yeni Şifre Belirle
          </h1>
          <p className="text-base text-on-surface-variant">
            Hesabın için yeni bir şifre oluştur.
          </p>
        </div>

        <ResetPasswordForm />
      </div>

      <AdSlot
        name="auth"
        className="my-12 max-w-md mx-auto"
      />
    </main>
  );
}
