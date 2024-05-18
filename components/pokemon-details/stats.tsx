"use client";

import React from "react";

import { PokemonDetailsProps } from ".";
import { classNames } from "@/libs";
import { clash } from "@/fonts";

export const Stats = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <div
      className={classNames(
        "bg-gradient-to-r from-[#FFFFFF] via-[#D9D9D945] to-[#FFFFFF]",
        "w-full flex flex-col items-center",
        "py-4",
        "divide-y divide-neutral-200"
      )}
    >
      {pokemon?.stats.map(({ stat, base_stat }: any, i: number) => (
        <div className="grid grid-cols-2 gap-10 py-2">
          <h2
            className={classNames(
              "text-xl text-right",
              clash.className,
              "capitalize"
            )}
          >
            {stat.name}
          </h2>
          <div className="flex items-center gap-4">
            <Meter value={base_stat} />
            <h2
              className={classNames(clash.className, "text-xl font-semibold")}
            >
              {base_stat}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

const Meter = ({ value }: { value: number }) => {
  const stat = (value / 255) * 100; //NOTE 255 is the max ev for each stat

  return (
    <div className="w-20 md:w-44 bg-gray-200 h-2">
      <div
        className={classNames(`bg-primary h-2`)}
        style={{ width: `${stat}%` }}
      ></div>
    </div>
  );
};
