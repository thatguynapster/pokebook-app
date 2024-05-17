import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import React, { Dispatch, Fragment, SetStateAction } from "react";
import { classNames } from "@/libs";
import { FilterProps } from "@/types";
import { useStore } from "@/hooks";
import { Dropdown } from ".";
import { Button } from "@restart/ui";

interface PageLimitProps {
  setFilters: Dispatch<SetStateAction<Partial<FilterProps>>>;
}

export const PageLimit = ({ setFilters }: PageLimitProps) => {
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
        <div className="py-1 px-4 bg-white rounded">{store.limit}</div>
        <ChevronDownIcon className="w-5 h-5" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="max-h-[315px] overflow-y-auto">
        {limits.map(
          (limit, index) =>
            limit !== store.limit && (
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