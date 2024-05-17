"use client";

import { Dispatch, SetStateAction, createContext } from "react";

export interface StoreInterface {
  theme: string;
  page: number;
  limit: number;
}

export const StoreContext = createContext<{
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}>({
  store: {},
  setStore: () => null,
});
