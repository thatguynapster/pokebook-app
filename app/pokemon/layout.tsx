import { Navbar } from "@/components/navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className="mt-[60px] min-h-[calc(100vh-124px)]">{children}</div>
    </>
  );
};

export default layout;
