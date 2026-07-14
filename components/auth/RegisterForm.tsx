"use client";

import { useActionState } from "react";
import { signUp } from "@/app/(auth)/actions";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="p-3 rounded-xl bg-error-container/50 border border-error/30 text-error text-sm">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/30 text-tertiary text-sm space-y-2">
          <p className="font-semibold">{state.success}</p>
          <p className="text-caption opacity-80">
            E-posta kutunu kontrol et. Onay bağlantısına tıkladıktan sonra giriş yapabilirsin.
          </p>
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

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="block text-sm font-semibold tracking-wider text-on-surface-variant">
            Şifre
          </label>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full pl-12 pr-12 py-3.5 glass-input rounded-xl text-on-surface focus:outline-none placeholder:text-outline/50"
          />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">visibility</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
      >
        <span>{pending ? "Kaydediliyor..." : "Kayıt Ol"}</span>
        <span className="material-symbols-outlined">auto_awesome</span>
      </button>
    </form>
  );
}
