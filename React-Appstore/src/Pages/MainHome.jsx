import React, { useState } from "react";
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
import PromoCarousel from "../components/PromotionalCarousel";
import GameGrid from "../components/appGrid";
import MainCarousel from "../components/MainCarousel";
import RapidPlayStoreHome from "./rapid/Rapidplaystorehome";
import SubCarousel from "../components/SubCarousel";
import Footer from "../components/Footer";

const MainHome = () => {
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);
  const {
    data: apps,
    isLoading: appsLoading,
    isError: appsError,
    refetch: refetchAllApp,
  } = useApps();

  if (appsLoading) {
    return <MainLoader />;
  }

  const width = ResponsiveComponent();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div
        className={`${
          width <= 768
            ? "w-[50%] h-full grid grid-cols-1 gap-10 "
            : "w-full h-auto grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4"
        }`}
      >
        {/* Left section */}
        <div className="col-span-12 lg:col-span-8 overflow-y-scroll scrollbar-none">
          {/* Content for the left section */}
          <HomeBanner />
          <MainCarousel />

          <section className=" mt-6">
          <PlayStoreHome />
            
           
          </section>

          {/* Mannually added and fetched from firebase  */}
          <motion.div
            className={`${
              width <= 768
                ? "mt-6 grid grid-cols-3 gap-3 w-[90%] items-center justify-between"
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
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                  className="transition-all duration-200 flex flex-col items-center p-3 cursor-pointer relative group"
                >
                  <Link to={`/detail/${app?._id}`} className="w-full flex flex-col items-center">
                    <img
                      src={app?.AppIcon}
                      alt="cover"
                      className="w-14 h-14 rounded-lg object-cover mb-2 border border-gray-200"
                    />
                    <div className="w-full flex flex-col items-center">
                      <p className="text-xs font-semibold text-gray-900 truncate w-full text-center">
                        {app?.Title}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate w-full text-center">
                        {app?.Company}
                      </p>
                    </div>
                  </Link>
                  {/* Optionally, add a subtle favorite or rating icon */}
                  {/* <FaHeart className="absolute top-2 right-2 text-gray-300 group-hover:text-red-400 transition" size={14} /> */}
                </motion.div>
              ))}
          </motion.div>
          <div className="w-full">
        <GameGrid cols={5} />
      </div>
      <div>
          <SubCarousel />
        </div>
        </div>

        {/* Right section */}
        {width <= 900 ? (
          <div
            className="fixed bottom-4 right-4 z-[999] bg-white rounded-full p-2 shadow-md cursor-pointer "
            onClick={toggleChat}
          >
            <MdOutlineMarkUnreadChatAlt
              size={24}
              className=" text-heroSecodary"
            />
          </div>
        ) : (
          <div className="col-span-12 lg:col-span-4 h-full hidden lg:block">
            <PromoCarousel />

            <GameGrid cols={1} />
          </div>
        )}
      </div>
      {/* GameGrid cols={3} now full width, no px-6/py-4 */}
      <div className="w-full">
        <GameGrid cols={5} />
      </div>
      <div className="w-full mt-8">
        <RapidPlayStoreHome />
      </div>
      <div>
            <Footer />
          </div>
    </div>
  );
};

export default MainHome;
