"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updatePassword } from "@/app/sifre-yenile/actions";

export default function ResetPasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, undefined);

  if (state?.success) {
    return (
      <div className="space-y-6 text-center">
        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary text-sm">
          {state.success}
        </div>
        <Link href="/giris" className="inline-block w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center gap-2 cursor-pointer">
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <div className="p-3 rounded-xl bg-error-container/50 border border-error/30 text-error text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold tracking-wider text-on-surface-variant">
          Yeni Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="w-full px-4 py-3.5 glass-input rounded-xl text-on-surface focus:outline-none placeholder:text-outline/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirm" className="block text-sm font-semibold tracking-wider text-on-surface-variant">
          Yeni Şifre (Tekrar)
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          placeholder="••••••••"
          required
          className="w-full px-4 py-3.5 glass-input rounded-xl text-on-surface focus:outline-none placeholder:text-outline/50"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <span>{pending ? "Güncelleniyor..." : "Şifreyi Güncelle"}</span>
        <span className="material-symbols-outlined">check_circle</span>
      </button>
    </form>
  );
}
