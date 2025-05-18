import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/ExpComp";
import SubNav from "../components/nav/SubNav";

const RightLayoutContainer = () => {
  return (
    <div className="h-full w-full overflow-y-auto">
      {/* {header section} */}
      <section className="w-full h-full">
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default RightLayoutContainer;
