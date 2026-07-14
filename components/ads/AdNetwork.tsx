"use client";

import Script from "next/script";
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
      {clientId ? (
        <Script
          id="adsbygoogle"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client={clientId}
        />
      ) : null}
      {children}
    </AdClientContext.Provider>
  );
}
