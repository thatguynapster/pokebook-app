"use client";

import React, { ReactNode, useState } from "react";

import { SlideOver as PokemonDetailsSlide } from "./slide-over";
import { PokemonDetails } from "./pokemon-details";

const PokemonCardDetails = ({
  pokemon,
  children,
}: {
  pokemon: any;
  children: (props: { proceed: () => void }) => ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children({ proceed: () => setOpen(true) })}
      <PokemonDetailsSlide
        show={open}
        onHide={() => {
          setOpen(false);
        }}
      >
        <PokemonDetails {...{ pokemon }} />
      </PokemonDetailsSlide>
    </>
  );
};

export default PokemonCardDetails;
