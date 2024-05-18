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
      <div className="mt-[50px] min-h-[calc(100vh-130px)]">{children}</div>
    </>
  );
};

export default layout;
