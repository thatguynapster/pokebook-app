"use client";

import React, { useEffect, useState } from "react";
import queryString from "query-string";
import useSWR from "swr";

import {
  PageLimit,
  Pagination,
  PokemonCard,
  PokemonDetails,
  SlideOver as SearchDetails,
} from "@/components";
import { classNames, http } from "@/libs";
import { FilterProps } from "@/types";
import { useStore } from "@/hooks";

const Page = () => {
  const { store, setStore } = useStore();
  const [filters, setFilters] = useState<Partial<FilterProps>>({
    offset: 0,
    limit: 8,
  });

  const { data, isLoading } = useSWR(
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
    <>
      <div className="px-8 lg:px-32 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {isLoading &&
            Array.from({ length: filters.limit! }, (_, i) => (
              <div
                key={i}
                className={classNames(
                  "h-[258px]",
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

        {data && (
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-12">
            <Pagination pages={pages} />
            <PageLimit />
          </div>
        )}
      </div>

      <SearchDetails
        show={store.search ?? false}
        onHide={() => {
          setStore({ ...store, search: null });
        }}
      >
        <PokemonDetails pokemon={store.search} />
      </SearchDetails>
    </>
  );
};

export default Page;
