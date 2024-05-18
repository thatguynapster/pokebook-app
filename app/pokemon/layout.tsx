"use client";

import { Navbar } from "@/components/navbar";
import { useStore } from "@/hooks";
import React, { useEffect } from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { store } = useStore();

  useEffect(() => {
    store.theme &&
      document.documentElement.style.setProperty("--primary", store.theme!);
  }, [store]);

  return (
    <>
      <Navbar />
      <div className="mt-[50px] min-h-[calc(100vh-130px)]">{children}</div>
    </>
  );
};

export default layout;
