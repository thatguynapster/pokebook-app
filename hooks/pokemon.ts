"use client";

import useSWR, { SWRResponse } from "swr";

export function usePokemon(pokemon_name: string): SWRResponse<any> {
  return useSWR<any>(`/v2/pokemon/${pokemon_name}/`);
}

export default usePokemon;
