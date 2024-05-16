"use client";

import React, { useState } from "react";
import queryString from "query-string";
import useSWR from "swr";

import { classNames, http } from "@/libs";
import PokemonCard from "@/components/pokemon-card";

const page = () => {
  const [filters, setFilters] = useState<any>({ limit: 8 });

  const { data, isLoading, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?${queryString.stringify({
      ...filters,
    })}`,
    (key: string) => http.get<never, any>(key, {}).then((resp) => resp)
  );
  console.log(data);

  const pokemons = (() => {
    return data?.results.map((res: any) => res);
  })();
  console.log(pokemons);

  return (
    <div className="px-32 flex flex-col gap-[67px]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: filters.limit }, (_, j) => (
            <div
              className={classNames(
                "h-[268px]",
                "bg-neutral-300 animate-pulse",
                "rounded-[20px] shadow-md"
              )}
            ></div>
          ))}

        {data &&
          data.results.map((pokemon: any, i: number) => {
            return (
              <div className="h-fit">
                <PokemonCard key={i} {...{ pokemon }} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
