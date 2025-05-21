/* eslint-disable no-unused-vars */
import React, { use, useState } from "react";
import { auth } from "../config/Firebase.config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { HomeBanner, MainLoader } from "../components/ExpComp";
import useApps from "../hooks/apps/UseApps";
import { AnimatePresence, motion } from "framer-motion";
import { MdStar, MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { smoothPopIn } from "../animation/Animations";
// import { ClientChatContainer } from "../containers/ExpContainers";

import ResponsiveComponent from "../hooks/responsive/useResponsive";
import PlayStoreHome from "./playstore/PlayStoreHome";
import PromoCarousel from "../components/carousel/PromotionalCarousel";
import GameGrid from "../components/carousel/appGrid";
import MainCarousel from "../components/carousel/MainCarousel";
import RapidPlayStoreHome from "./rapid/Rapidplaystorehome";
import SubCarousel from "../components/carousel/SubCarousel";
import Footer from "../components/Footer";
import SubAppGrid from "../components/carousel/SubAppGrid";
import DiscountCarousel from "../components/carousel/DiscountCarousel";
import FooterEventCarousel from "../components/carousel/FooterEventCarousel";
import useResponsive from "../hooks/responsive/useResponsive";

const MainHome = () => {
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const {
    data: apps,
    isLoading: appsLoading,
    isError: appsError,
    refetch: refetchAllApp,
  } = useApps();

  if (appsLoading) {
    return <MainLoader />;
  }



  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div
        className={`${
          isMobile
            ? "w-full h-auto grid grid-cols-1 gap-4 px-2 py-2"
            : "w-full h-auto grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4"
        }`}
      >
        {/* Left section */}
        <div
          className={`col-span-12 lg:col-span-8 ${
            isMobile
              ? "overflow-visible"
              : "overflow-y-scroll scrollbar-none"
          }`}
        >
          {/* Content for the left section */}
          <HomeBanner />
          <MainCarousel />

          <section className={`${isMobile ? "mt-2" : "mt-6"}`}>
            <PlayStoreHome />
          </section>

          {/* Mannually added and fetched from firebase  */}
          <motion.div
            className={`${
              isMobile
                ? "mt-2 grid grid-cols-3 gap-2 w-full items-center justify-between"
                : isTablet
                ? "mt-3 grid grid-cols-3 gap-2 w-[80%] items-center justify-between mx-4"
                : "w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 py-4 my-6"
            }`}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {apps &&
              apps?.length > 0 &&
              apps.map((app, idx) => (
                <motion.div
                  key={app._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.04,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        }
                  }
                  className={`transition-all duration-200 flex flex-col items-center cursor-pointer relative group bg-gray-100 dark:bg-gray-800 rounded-lg
                    ${isMobile ? "p-1" : "p-3"}
                  `}
                >
                  <Link
                    to={`/detail/${app?._id}`}
                    className="w-full flex flex-col items-center"
                  >
                    <img
                      src={app?.AppIcon}
                      alt="cover"
                      className={`object-cover mb-2 border border-gray-200 dark:border-gray-700 rounded-lg
                        ${isMobile ? "w-10 h-10" : "w-14 h-14"}
                      `}
                    />
                    <div className="w-full flex flex-col items-center">
                      <p
                        className={`font-semibold text-gray-900 dark:text-white truncate w-full text-center
                        ${isMobile ? "text-xs" : "text-xs"}
                      `}
                      >
                        {app?.Title}
                      </p>
                      <p
                        className={`truncate w-full text-center text-gray-500 dark:text-gray-400
                        ${isMobile ? "text-[10px]" : "text-[10px]"}
                      `}
                      >
                        {app?.Company}
                      </p>
                    </div>
                  </Link>
                  {/* Optionally, add a subtle favorite or rating icon */}
                  {/* <FaHeart className="absolute top-2 right-2 text-gray-300 group-hover:text-red-400 transition" size={14} /> */}
                </motion.div>
              ))}
          </motion.div>
          <div className="w-full md:mt-6 lg:mt-0 mt-0">
            <GameGrid cols={isMobile ? 2 : isTablet ? 2 : 4} />
            {isMobile && (
              <div>
                <PromoCarousel />
                <GameGrid cols={1} />
              </div>
            )}
            {isTablet && (
              <div className="mt-6">
                <PromoCarousel />
                <GameGrid cols={2} />
              </div>
            )}
            <SubCarousel />
            <SubAppGrid />
          </div>
        </div>

        {/* Right section */}
        {isDesktop && (
          <div className="col-span-12 lg:col-span-4 h-full hidden lg:block">
            <PromoCarousel />
            <GameGrid cols={1} />
          </div>
        )}
      </div>
      {/* GameGrid cols={3} now full width, no px-6/py-4 */}
      <div className="w-full mt-8">
        <RapidPlayStoreHome />
        <DiscountCarousel />
      </div>
      <div className="w-full mt-8">
        <FooterEventCarousel />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainHome;
