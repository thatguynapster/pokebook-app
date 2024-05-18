import DropdownItem, { DropdownItemProps } from "@restart/ui/DropdownItem";
import { forwardRef } from "react";
import { classNames } from "@/libs";
import { clash } from "@/fonts";

export const Item = forwardRef<HTMLElement, DropdownItemProps>(
  ({ active, children, className, ...props }, ref) => {
    return (
      <DropdownItem
        ref={ref}
        className={classNames(
          clash.className,
          "text-lg font-medium",
          "py-1 rounded-md",
          "flex items-center justify-center",
          "hover:bg-[#F3F3F3] transition",
          "w-28",
          active && "bg-neutral-100",
          className
        )}
        {...props}
      >
        {children}
      </DropdownItem>
    );
  }
);

export default Item;
