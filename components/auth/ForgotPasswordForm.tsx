"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/app/sifremi-unuttum/actions";

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);

  return (
    <form action={action} className="space-y-6">
      {state?.success && (
        <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm">
          {state.success}
        </div>
      )}
      {state?.error && (
        <div className="p-3 rounded-xl bg-error-container/50 border border-error/30 text-error text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold tracking-wider text-on-surface-variant">
          E-posta Adresi
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">alternate_email</span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="isim@ornek.com"
            required
            className="w-full pl-12 pr-4 py-3.5 glass-input rounded-xl text-on-surface focus:outline-none placeholder:text-outline/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
      >
        <span>{pending ? "Gönderiliyor..." : "Bağlantı Gönder"}</span>
        <span className="material-symbols-outlined">send</span>
      </button>

      <div className="text-center">
        <Link href="/giris" className="text-sm font-semibold tracking-wider text-primary hover:text-primary-container transition-colors">
          Giriş sayfasına dön
        </Link>
      </div>
    </form>
  );
}
