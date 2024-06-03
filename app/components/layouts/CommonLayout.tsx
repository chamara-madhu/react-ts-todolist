"use client";

import { ReactNode } from "react";
import Navbar from "../shared/headers/Navbar";

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="relative flex w-full">
        <div className="relative flex flex-col w-full p-5 sm:p-7 xl:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
