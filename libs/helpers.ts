import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const scrollToDiv = (element: string) => {
  document.getElementById(element)?.scrollIntoView();
};

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
