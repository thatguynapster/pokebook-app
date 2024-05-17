"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import useSWR from "swr";

import { Pagination, PokemonCard } from "@/components";
import { classNames, http } from "@/libs";
import { FilterProps } from "@/types";
import { useStore } from "@/hooks";

const Page = () => {
  const { store } = useStore();
  const [filters, setFilters] = useState<Partial<FilterProps>>({
    offset: 0,
    limit: 8,
  });

  const { data, isLoading, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?${queryString.stringify(filters)}`,
    (key: string) => http.get<never, any>(key, {}).then((resp) => resp)
  );

  const pages = Math.ceil(data?.count / filters.limit!);

  useEffect(() => {
    const newLimit = store.limit ?? 8;
    const newOffset = ((store.page ?? 1) - 1) * newLimit;

    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: newLimit,
      offset: newOffset,
    }));
  }, [store.page, store.limit]);

  return (
    <div className="px-32 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: filters.limit! }, (_, i) => (
            <div
              key={i}
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
              <div className="h-fit" key={i}>
                <PokemonCard key={i} {...{ pokemon }} />
              </div>
            );
          })}
      </div>

      {data && <Pagination pages={pages} />}
    </div>
  );
};

export default Page;
