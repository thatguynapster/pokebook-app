"use client";

import { classNames } from "@/libs";
import { useNavItem, NavItemProps } from "@restart/ui/NavItem";

// eslint-disable-next-line
export interface TabProps extends NavItemProps {}

export function Tab({ eventKey, as: Component = "a", ...props }: TabProps) {
  const [navItemProps, meta] = useNavItem({
    key: eventKey as string,
  });

  return (
    <Component
      {...props}
      {...navItemProps}
      className={classNames(
        "text-lg font-medium",
        "lg:py-3 lg:px-10",
        "py-2 px-5",
        "cursor-pointer",
        meta.isActive ? "bg-white rounded-full" : ""
      )}
    />
  );
}

export default Tab;
