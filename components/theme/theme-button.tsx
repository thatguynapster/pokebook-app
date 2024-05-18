import { classNames } from "@/libs";
import React from "react";

export const ThemeButton = ({
  color,
  toggleSearch,
  onClick,
}: {
  color?: string;
  toggleSearch?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
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
            color ? `bg-[${color}]` : "bg-primary",
            "w-[34.5px] h-[34.5px]",
            "rounded-full"
          )}
        ></div>
      </div>
    </button>
  );
};
