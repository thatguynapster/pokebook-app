import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/img/bg-main.jpg')",
      },
      colors: {
        primary: "rgba(var(--primary), var(--tw-bg-opacity))",
      },
    },
  },
  plugins: [],
};
export default config;
