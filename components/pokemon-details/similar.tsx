"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import type SwiperType from "swiper";
import useSWR from "swr";

import { PokemonDetailsProps } from ".";
import { classNames, http } from "@/libs";
import { PokemonCard } from "../pokemon-card";

export const Similar = ({ pokemon }: PokemonDetailsProps) => {
  const pokemonType = pokemon.types[0].type.name;

  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const { data, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/type/${pokemonType}/`,
    (key: string) => http.get<never, any>(key, {}).then((resp) => resp)
  );
  console.log(data);

  return (
    <Swiper
      className="w-full h-full py-3.5 px-7"
      spaceBetween={16}
      slidesPerView={2}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {data?.pokemon
        ?.slice(0, 5)
        .filter(
          ({ pokemon: f_pokemon }: any) => pokemon.name !== f_pokemon.name
        )
        .map(({ pokemon }: any, index: number) => (
          <SwiperSlide className="w-full h-full" key={index}>
            <PokemonCard {...{ pokemon }} with_types={false} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
