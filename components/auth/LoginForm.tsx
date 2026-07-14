"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/app/(auth)/actions";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/";
  const [state, action, pending] = useActionState(signIn, undefined);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      router.push(redirectTo);
    }
  }, [state, router, redirectTo]);

  return (
    <form action={action} className="space-y-6">
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

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="block text-sm font-semibold tracking-wider text-on-surface-variant">
            Şifre
          </label>
          <Link href="/sifremi-unuttum" className="text-sm font-semibold tracking-wider text-primary hover:text-primary-container transition-colors">
            Şifremi Unuttum
          </Link>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full pl-12 pr-12 py-3.5 glass-input rounded-xl text-on-surface focus:outline-none placeholder:text-outline/50"
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="remember"
          className="w-5 h-5 rounded border-outline-variant bg-surface-container text-primary focus:ring-primary focus:ring-offset-surface"
        />
        <label htmlFor="remember" className="text-base text-on-surface-variant cursor-pointer">Beni Hatırla</label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 rounded-xl cta-glow text-on-primary font-bold flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
      >
        <span>{pending ? "Giriş yapılıyor..." : "Giriş Yap"}</span>
        <span className="material-symbols-outlined">auto_awesome</span>
      </button>
    </form>
  );
}
