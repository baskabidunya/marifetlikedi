"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { getUserCredits, spendCredit } from "@/lib/credits";

type CreditState = {
  credits: number;
  authenticated: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
  useCredit: () => Promise<{ success: boolean; error?: string }>;
};

const CreditContext = createContext<CreditState>({
  credits: 0,
  authenticated: false,
  loading: true,
  refresh: async () => {},
  useCredit: async () => ({ success: false, error: "Henüz hazır değil." }),
});

export function CreditProvider({ children }: { children: ReactNode }) {
  const [credits, setCredits] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const result = await getUserCredits();
    setCredits(result.credits);
    setAuthenticated(result.authenticated);
    setLoading(false);
  }, []);

  const useCredit = useCallback(async () => {
    const result = await spendCredit();
    if (result.success) {
      setCredits(result.credits!);
    }
    return result;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <CreditContext.Provider value={{ credits, authenticated, loading, refresh, useCredit }}>
      {children}
    </CreditContext.Provider>
  );
}

export const useCredits = () => useContext(CreditContext);
