"use client";

import React from "react";

import { PokemonDetailsProps } from ".";
import { classNames } from "@/libs";
import { clash } from "@/fonts";

export const About = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <div
      className={classNames(
        "bg-gradient-to-r from-[#FFFFFF] via-[#D9D9D945] to-[#FFFFFF]",
        "w-full flex flex-col items-center",
        "py-4",
        "divide-y divide-neutral-200"
      )}
    >
      <div className="grid grid-cols-2 gap-10 py-2">
        <h2 className={classNames(clash.className, "text-xl text-right")}>
          Height
        </h2>
        <h2 className={classNames(clash.className, "text-xl font-semibold")}>
          {pokemon?.height}m
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-10 py-2">
        <h2 className={classNames(clash.className, "text-xl text-right")}>
          Weight
        </h2>
        <h2 className={classNames(clash.className, "text-xl font-semibold")}>
          {pokemon?.weight}kg
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-10 py-2">
        <h2 className={classNames(clash.className, "text-xl text-right")}>
          Abilities
        </h2>

        <h2 className={classNames(clash.className, "text-xl font-semibold")}>
          {pokemon?.abilities.map(({ ability }: any, i: number) => (
            <li key={i}>{ability.name}</li>
          ))}
        </h2>
      </div>
    </div>
  );
};
