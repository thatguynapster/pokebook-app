"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { classNames } from "@/libs";
import { useStore } from "@/hooks";
import { routes } from "@/routes";
import { clash } from "@/fonts";
import { Theme } from "./theme";

export const Navbar = () => {
  const { store, setStore } = useStore();

  const [search, setSearch] = useState<string>("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        "sticky top-0 z-20 h-20 shrink-0 items-center px-4 md:py-0 sm:px-6 lg:px-8",
        "border-b border-neutral-20 dark:border-none",
        "bg-white dark:bg-neutral-gray"
      )}
    >
      <div className="flex justify-between items-center gap-x-4 sm:gap-x-6 w-full">
        <Link href={routes.home} className="flex items-center gap-2">
          <div
            className={classNames(
              toggleSearch && "hidden md:block",
              "relative h-[80px] w-[129px]"
            )}
          >
            <Image
              src="/img/logo-small.png"
              fill
              priority
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
            toggleSearch ? "pl-4 flex-grow my-4" : "pl-1.5",
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
              if (value === "") {
                setStore({ ...store, search: null });
              }
            }}
          />

          {search && (
            <button
              className="bg-primary  p-1 rounded-full"
              disabled={!search}
              onClick={() => {
                if (search !== "") {
                  return setStore({ ...store, search: { name: search } });
                }
                setStore({ ...store, search: null });
              }}
            >
              <MagnifyingGlassIcon className="h-4 w-4 stroke-[2.5px] text-white" />
            </button>
          )}
        </div>

        <Theme>
          {({ proceed }) => (
            <button
              onClick={proceed}
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
                <div
                  className={classNames(
                    "w-[34.5px] h-[34.5px]",
                    "rounded-full",
                    "bg-primary"
                  )}
                ></div>
              </div>
            </button>
          )}
        </Theme>
      </div>
    </div>
  );
};
