/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useUser from "../hooks/user/UseUser";
import useApps from "../hooks/apps/UseApps";
import { Header, MainLoader } from "../components/ExpComp";
import {LeftLayoutContainer, RightLayoutContainer} from "../containers/ExpContainers";
import SubNav from "../components/SubNav";
import useResponsive from "../hooks/responsive/useResponsive";
import Footer from "../components/Footer";


const Layouts = () => {
  const {isMobile, isTablet, isDesktop} = useResponsive();
  const [currentPlatform, setCurrentPlatform] = useState("PlayStore");
  const handlePlatformChange = (platform) => {
    setCurrentPlatform(platform);
  };
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
    <main className="w-screen flex-col h-screen">
      <Header onPlatformChange={handlePlatformChange} />
      <SubNav platform={currentPlatform} />
      <div className="flex flex-row w-full mt-20 h-[calc(100vh-80px)]">
        {/* Set explicit widths for left and right containers */}
        <div className="h-full">
          <LeftLayoutContainer 
            isMobile={isMobile} 
            isTablet={isTablet} 
            isDesktop={isDesktop} 
          />
        </div>
        <div className="h-full" style={{ width: "100%" }}>
          <RightLayoutContainer />
        </div>
        
      </div>
    </main>
  );
};

export default Layouts;
