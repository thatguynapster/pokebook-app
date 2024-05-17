"use client";

import { clash } from "@/fonts";
import Image from "next/image";

import { usePokemon } from "@/hooks";
import { classNames } from "@/libs";
import { EyeIcon } from "@heroicons/react/16/solid";
import { FC } from "react";

interface PokemonCardProps {
  pokemon: any;
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  console.log(pokemon);
  const { data, isLoading, error } = usePokemon(pokemon.name);

  return (
    <div className={getCardClasses(isLoading)}>
      <div className={getImageContainerClasses(isLoading)}>
        {data && (
          <Image
            alt={pokemon.name}
            src={data.sprites?.front_default ?? "/img/logo-small.png"}
            height={187}
            width={191}
            className="absolute left-0 right-0 bottom-0 w-full"
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw"
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-1 w-full">
        <h2 className={getNameClasses()}>{pokemon.name}</h2>

        <div className="flex gap-2.5">{renderTypes(data, isLoading)}</div>
      </div>

      <button className={getButtonClasses()}>
        <span>View Pokemon</span>
        <EyeIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

// Helper functions
const getCardClasses = (isLoading: boolean) =>
  classNames(
    "bg-white shadow-[0px_4px_40px_0px_#0000000F] rounded-[20px]",
    "items-center gap-4",
    "flex flex-col",
    "p-2.5 pb-4",
    "group hover:z-10 h-fit",
    "relative",
    "mb-16 hover:mb-0"
  );

const getImageContainerClasses = (isLoading: boolean) =>
  classNames(
    "bg-[#F1F1F1] rounded-2xl p-2.5",
    "w-full h-[148px]",
    "relative",
    isLoading && "animate-pulse"
  );

const getNameClasses = () =>
  classNames(clash.className, "text-2xl font-medium", "line-clamp-1");

const renderTypes = (data: any, isLoading: boolean) => {
  if (isLoading) {
    return Array.from({ length: 2 }, (_, i) => (
      <div
        key={i}
        className={classNames(
          "bg-[#EEEEEE] animate-pulse",
          "h-8 w-20 rounded-full",
          "px-3 py-1"
        )}
      ></div>
    ));
  }

  if (data) {
    return data.types.map(({ type }: { type: any }, i: number) => (
      <div
        key={i}
        className={classNames(
          "bg-[#EEEEEE] rounded-full",
          "px-3 py-1",
          "h-8 w-20",
          "text-center capitalize"
        )}
      >
        <p className="">{type.name}</p>
      </div>
    ));
  }

  return null;
};

const getButtonClasses = () =>
  classNames(
    "hidden",
    "group-hover:flex",
    "w-full px-5 py-3 rounded-2xl",
    "bg-primary text-white",
    "justify-between",
    "transition duration-300"
  );
