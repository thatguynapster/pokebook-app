import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Button } from "@restart/ui";

import { FilterProps } from "@/types";
import { classNames } from "@/libs";
import { useStore } from "@/hooks";
import { Dropdown } from ".";

export const PageLimit = () => {
  const { store, setStore } = useStore();
  const limits = [8, 12, 16, 24];

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={Button}
        className={classNames(
          "flex items-center gap-4",
          "p-1 rounded-lg",
          "bg-[#E1E1E1]"
        )}
      >
        <div className="py-1 px-4 bg-white rounded font-medium">
          {store.limit ?? 8}
        </div>
        <ChevronDownIcon className="w-5 h-5" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="max-h-[315px] overflow-y-auto">
        {limits.map(
          (limit, index) =>
            limit !== (store.limit ?? 8) && (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  setStore({ ...store, page: 1, limit });
                }}
                active={limit === store.limit}
              >
                {limit}
              </Dropdown.Item>
            )
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
