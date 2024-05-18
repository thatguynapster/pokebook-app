"use client";

import { ComponentType, ReactNode } from "react";
import { Nav, Tabs, TabsProps } from "@restart/ui";

import { Tab } from "./Components/Tab";
import { classNames } from "@/libs";

export interface LocalTabsProps extends TabsProps {
  tabs: { name: any; slug: string; component: ReactNode }[];
  navClassName?: string;
  componentClassName?: string;
}

export default function ({
  tabs,
  onSelect,
  activeKey,
  navClassName,
  componentClassName,
  ...props
}: LocalTabsProps) {
  /**
   * variables
   */
  const tab = tabs.find((i) => i.slug === activeKey);

  return (
    <Tabs
      {...{ activeKey, ...props }}
      onSelect={(key, e) => key && onSelect?.(String(key), e)}
    >
      <Nav
        className={classNames(
          "px-6 w-full overflow-x-auto",
          "border-b border-neutral-200",
          "flex flex-col sm:flex-row gap-1 sm:gap-6 whitespace-nowrap",
          "shadow-[0px_3px_2px_0px_#0000000F_inset]",
          navClassName
        )}
      >
        {tabs.map((tab, key) => (
          <Tab eventKey={tab.slug} key={key}>
            {tab.name}
          </Tab>
        ))}
      </Nav>
    </Tabs>
  );
}
