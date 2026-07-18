"use client";

import { createContext, useContext, type ReactNode } from "react";

const AdClientContext = createContext<string>("");

export const useAdClient = () => useContext(AdClientContext);

export default function AdNetwork({
  clientId,
  children,
}: {
  clientId: string;
  children: ReactNode;
}) {
  return (
    <AdClientContext.Provider value={clientId}>
      {children}
    </AdClientContext.Provider>
  );
}
