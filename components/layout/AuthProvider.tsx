"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthUser = { loggedIn: boolean } | null;

const AuthContext = createContext<AuthUser>(null);

export function useAuthUser() {
  return useContext(AuthContext);
}

// Kullanıcı durumu istemci tarafında /api/me ile çözülür; böylece layout'ta
// cookies() kullanılmaz, public sayfalar statik kalır ve supabase-js
// (≈50 KB) ilk yükleme JavaScript'ine girmez.
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    let cancelled = false;

    const sync = () => {
      fetch("/api/me")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!cancelled && d) {
            setUser(d.loggedIn ? { loggedIn: true } : null);
          }
        })
        .catch(() => {});
    };

    sync();
    const onFocus = () => sync();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
