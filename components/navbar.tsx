"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { classNames } from "@/libs";
import {
  MagnifyingGlassIcon,
  PowerIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { routes } from "@/routes";
import { clash } from "@/fonts";
import Link from "next/link";

export const Navbar = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const handleSearch = useCallback(
    debounce((search: string) => {
      router.push(routes.pokemon.index);
    }, 500),
    []
  );
  return (
    <div
      className={classNames(
        "sticky top-0 z-50 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8",
        "border-b border-neutral-20 dark:border-none",
        "bg-white dark:bg-neutral-gray"
      )}
    >
      <div className="flex justify-between items-center w-full">
        <Link href={routes.home} className="flex items-center gap-2">
          <div
            className={classNames(
              toggleSearch && "hidden md:block",
              "relative h-[84px] w-[129px]"
            )}
          >
            <Image
              src="/img/logo-small.png"
              fill
              className="mt-3"
              alt="Pkoeapp Logo"
              sizes="(max-width: 1200px) 50vw, 100vw"
            />
          </div>

          <p
            className={classNames(
              clash.className,
              "font-semibold text-2xl",
              "hidden md:flex"
            )}
          >
            Poké<span className="text-primary">book</span>
          </p>
        </Link>

        <div
          className={classNames(
            toggleSearch ? "pl-4 flex-grow" : "pl-1.5",
            "md:flex-grow p-2 bg-white border flex items-center gap-2 rounded-full max-w-[440px] shadow-md"
          )}
        >
          <span
            className="md:pointer-events-none pointer-events-auto"
            onClick={() => {
              setToggleSearch(!toggleSearch);
            }}
          >
            {toggleSearch ? (
              <XMarkIcon className="h-5 w-5 stroke-[2.5px] text-red-500" />
            ) : (
              <MagnifyingGlassIcon className="h-5 w-5 stroke-[2.5px] text-[#DFDFDF]" />
            )}
          </span>

          <input
            type="search"
            name="search"
            value={search || ""}
            placeholder={"Enter pokemon name"}
            className={classNames(
              !toggleSearch && "hidden md:block",
              "w-full placeholder:text-[#7B7B7B] focus:outline-none"
            )}
            onChange={({
              currentTarget: { value },
            }: ChangeEvent<HTMLInputElement>) => {
              setSearch(value);
              handleSearch(value);
            }}
          />
        </div>

        <div
          className={classNames(
            toggleSearch && "hidden md:block",
            "justify-end gap-x-4 lg:gap-x-6"
          )}
        >
          <div
            className={classNames(
              "w-[45px] h-[45px]",
              "border border-[#868686] rounded-full",
              "flex items-center justify-center"
            )}
          >
            <div className="w-[34.5px] h-[34.5px] bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
