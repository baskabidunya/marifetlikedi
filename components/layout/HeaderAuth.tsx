"use client";

import Link from "next/link";
import { useAuthUser } from "./AuthProvider";

export function MobileProfileLink() {
  const user = useAuthUser();
  if (!user) return null;
  return (
    <Link
      href="/profil"
      className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-primary-container to-secondary-container text-on-primary"
      aria-label="Profilim"
    >
      <span aria-hidden="true" className="material-symbols-outlined">account_circle</span>
    </Link>
  );
}

export function DesktopAuthArea() {
  const user = useAuthUser();

  if (user) {
    return (
      <Link
        href="/profil"
        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-full text-on-primary font-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
      >
        <span aria-hidden="true" className="material-symbols-outlined text-lg">account_circle</span>
        Profil
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/giris"
        className="hidden md:flex px-5 py-2.5 rounded-full text-on-surface-variant border border-on-surface/15 hover:border-primary/40 font-label-md hover:bg-on-surface/5 transition-all"
      >
        Giriş Yap
      </Link>
      <Link
        href="/kayit"
        className="hidden md:flex bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-full text-on-primary font-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
      >
        Kaydol
      </Link>
    </>
  );
}
