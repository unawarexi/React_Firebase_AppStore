import React from "react";
import { Outlet } from "react-router-dom";
import useUser from "../hooks/user/UseUser";
import useApps from "../hooks/apps/UseApps";
import { MainLoader } from "../components/ExpComp";

const Layouts = () => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchAllUser,
  } = useUser();
  const {
    data: apps,
    isLoading: appsLoading,
    isError: appsError,
    refetch: refetchAllApp,
  } = useApps();

  if (userLoading || appsLoading) {
    return <MainLoader />;
  }
  return (
    <main className="w-screen h-screen flex-1 flex items-start justify-start ">
      {/* -------- left section ------- */}

      {/* -------- right section ------- */}
    </main>
  );
};

export default Layouts;
