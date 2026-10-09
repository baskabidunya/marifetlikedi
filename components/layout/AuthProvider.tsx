"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthUser = { id: string } | null;

const AuthContext = createContext<AuthUser>(null);

export function useAuthUser() {
  return useContext(AuthContext);
}

// Kullanıcı durumu istemci tarafında çözülür; böylece layout'ta cookies()
// kullanılmaz ve public sayfalar statik/ISR olabilir.
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(({ data }) => setUser(data.user ?? null))
      .catch(() => {});
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
