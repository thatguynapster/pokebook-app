import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ColorThief from "colorthief";

export const scrollToDiv = (element: string) => {
  document.getElementById(element)?.scrollIntoView();
};

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const get_average_rgb = async (src: string) => {
  return new Promise((resolve: (value: number[]) => void, reject) => {
    console.log(src);
    // if (src) {
    const img = document.createElement("IMG");
    const colorThief = new ColorThief();
    img.setAttribute("src", src);

    // @ts-ignore
    img.crossOrigin = "Anonymous";

    // @ts-ignore
    if (img.complete) {
      resolve(colorThief.getColor(img));
    } else {
      img.addEventListener("load", function () {
        resolve(colorThief.getColor(img));
      });
    }
    // }
    // reject("Invalid Image");
  });
};

// Convert RGB to hexadecimal
export const RGBToHex = (r: number, g: number, b: number) => {
  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
