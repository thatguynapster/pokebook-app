"use client";

import { SWRConfig } from "swr";

import { http } from "@/libs";

export function AppProvider({ children }: { children: any }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url) =>
            http
              .get(url, {
                params: {},
                headers: {},
              })
              .then((response) => response),
          dedupingInterval: 1000 * 60 * 1,
          shouldRetryOnError: false,
          revalidateOnFocus: false,
        }}
      >
        {children}
      </SWRConfig>
    </>
  );
}
