"use client";

import { Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Image from "next/image";

import { RGBToHex, classNames, get_average_rgb } from "@/libs";
import { usePokemon, useStore } from "@/hooks";
import Tabs, { LocalTabsProps } from "../Tabs/Tabs";
import { clash } from "@/fonts";
import { About } from "./about";
import { Stats } from "./stats";
import { Similar } from "./similar";
import { renderTypes } from "../pokemon-card";
import { motion } from "framer-motion";

export interface PokemonDetailsProps {
  pokemon?: any;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  const [dominantColor, setDominantColor] = useState<string>("#f1f1f1");

  const { data, isLoading, error } = usePokemon(pokemon && pokemon.name);
  // console.log(data, error);

  const tabs: LocalTabsProps["tabs"] = [
    {
      name: "About",
      slug: "about",
      component: <About pokemon={data} />,
    },
    {
      name: "Stats",
      slug: "stats",
      component: <Stats pokemon={data} />,
    },
    {
      name: "Similar",
      slug: "similar",
      component: <Similar pokemon={data} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="p-4">
        {isLoading && (
          <div className="bg-neutral-200 w-full h-[340px] rounded-2xl relative animate-pulse">
            <div className="w-1/2 h-80 mt-20 bg-neutral-200 absolute left-1/4 rounded-2xl"></div>
          </div>
        )}

        <div
          className="w-full h-[340px] rounded-2xl relative bg-neutral-200"
          style={{
            backgroundImage: `linear-gradient(${dominantColor}aa, ${dominantColor})`,
          }}
        >
          {data && (
            <Image
              alt={data.name}
              src={
                data?.sprites?.other?.dream_world.front_default ??
                data?.sprites?.front_default ??
                "/img/logo-small.png"
              }
              onError={(e) => {
                e.currentTarget.src = "/img/logo-small.png";
              }}
              onLoad={() => {
                get_average_rgb(
                  data?.sprites?.other?.dream_world.front_default ??
                    data?.sprites?.front_default
                )
                  .then((color) => {
                    setDominantColor(RGBToHex(color[0], color[1], color[2]));
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              priority
              fill
              className={classNames(
                error && "grayscale !mt-0",
                "!w-5/6 sm:!w-1/2 mx-auto mt-20"
              )}
              sizes="(max-width: 768px) 10vw, (max-width: 1200px) 30vw, 50vw"
            />
          )}

          {error && (
            <Image
              alt={"Missing pokemon"}
              src={"/img/logo-small.png"}
              priority
              fill
              className={classNames("!w-2/3 !h-auto", "mx-auto grayscale")}
              sizes="(max-width: 768px) 10vw, (max-width: 1200px) 30vw, 50vw"
            />
          )}
        </div>

        {data && (
          <div className="flex flex-col gap-2 items-center mt-20">
            <h1
              className={classNames(
                "text-5xl font-semibold capitalize",
                clash.className
              )}
            >
              {data.name}
            </h1>
            <div className="flex gap-2.5">{renderTypes(data, isLoading)}</div>
          </div>
        )}

        {data && (
          <div className="mt-10 max-w-[516px] min-h-48 mx-auto">
            <motion.div
              key={activeTab ? activeTab.slug : "empty"}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center w-full">
                <div className="bg-white py-3 shadow-[0px_-28px_24px_-24px_#00000040] w-full">
                  <h1
                    className={classNames(
                      "text-2xl font-semibold text-center",
                      clash.className
                    )}
                  >
                    {activeTab.name}
                  </h1>
                </div>
                <hr
                  className={classNames(
                    "h-0.5 w-full",
                    "bg-gradient-to-r from-[#FFFFFF] via-[#D9D9D945] to-[#FFFFFF]"
                  )}
                />
                {activeTab.component}
              </div>
            </motion.div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-48">
            <p className="text-2xl font-semibold text-center">
              Hmmm... <br /> We could not find the pokémon
            </p>
          </div>
        )}
      </div>

      {data && (
        <div
          className={classNames(
            "sticky bottom-0",
            "bg-white shadow-[0px_0px_94px_0px_#00000012]",
            "w-full mt-auto py-4",
            "justify-center flex"
          )}
        >
          <Tabs
            tabs={tabs}
            activeKey={activeTab.slug}
            navClassName={classNames(
              "flex items-center w-max bg-[#E9E9E9] rounded-3xl md:rounded-full",
              "p-2"
            )}
            onSelect={(key) => {
              setActiveTab(tabs.find((tab) => key === tab.slug)!);
            }}
          />
        </div>
      )}
    </div>
  );
};
