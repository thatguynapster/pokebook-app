"use client";

import { useEffect, useState } from "react";

import { StoreContext, StoreInterface } from "@/context";

export function StoreProvider({ children }: { children: any }) {
  const [store, setStore] = useState<Partial<StoreInterface>>(() => {
    if (typeof window !== "undefined") {
      const store = window.localStorage.getItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"]!
      );

      if (store) {
        return JSON.parse(store);
      }
    }

    return null;
  });

  useEffect(() => {
    if (store) {
      window.localStorage.setItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"]!,
        JSON.stringify(store)
      );
    }
  }, [store]);

  return (
    <StoreContext.Provider value={{ store: { ...store }, setStore }}>
      {children}
    </StoreContext.Provider>
  );
}
