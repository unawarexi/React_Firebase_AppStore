import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/ExpComp";

const RightLayoutContainer = () => {
  return (
    <div className="flex-1">
      {/* {header section} */}

      <Header />
       <section className="w-full h-[calc(100vh-80px)]">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default RightLayoutContainer;
