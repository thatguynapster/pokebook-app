"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import debounce from "lodash/debounce";

export interface SearchProps {
  onSearch: (search: string) => void;
  placeholder?: string;
  value?: string;
  delay?: number;
}

export function Search({
  value,
  delay = 500,
  onSearch,
  placeholder,
}: SearchProps) {
  /**
   * state
   */
  const [search, setSearch] = useState<string>(() => value || "");

  /**
   * function
   */
  const handleSearch = useCallback(
    debounce((search: string) => {
      onSearch(search);
    }, delay),
    []
  );

  return (
    <div className="pl-4 pr-1.5 py-1 bg-white flex items-center gap-1 rounded-full">
      <input
        type="search"
        name="search"
        value={search || ""}
        placeholder={placeholder || "Enter pokemon name"}
        className="w-full h-10 placeholder:text-[#7B7B7B] focus:outline-none"
        onChange={({
          currentTarget: { value },
        }: ChangeEvent<HTMLInputElement>) => {
          setSearch(value);
          handleSearch(value);
        }}
      />

      <span className="bg-primary  p-3.5 rounded-full">
        <MagnifyingGlassIcon className="h-5 w-5 stroke-[2.5px] text-white" />
      </span>
    </div>
  );
  {
  }
}
