import type { Metadata } from "next";
import { Inter } from "next/font/google";
import local from "next/font/local";
import "./globals.css";
import { classNames } from "@/libs";
import { general_sans } from "@/fonts";
import { AppProvider } from "@/providers";

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
        <body className={classNames(general_sans.className, "bg-[#F1F1F1]")}>
          {children}
        </body>
      </AppProvider>
    </html>
  );
}
