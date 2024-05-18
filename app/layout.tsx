import type { Metadata } from "next";

import { AppProvider, StoreProvider } from "@/providers";
import { classNames } from "@/libs";
import { general_sans } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokébook App",
  description: "FRONTEND ASSESSMENT - ENYATA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <StoreProvider>
          <body className={classNames(general_sans.className, "bg-[#F1F1F1]")}>
            {children}
          </body>
        </StoreProvider>
      </AppProvider>
    </html>
  );
}
