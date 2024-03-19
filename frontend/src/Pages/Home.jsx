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
import { ClientChatContainer } from "../containers/ExpContainers";

import ResponsiveComponent from "../hooks/responsive/useResponsive";

const Home = () => {
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

        <div
          className={`${
            width <= 768
              ? "mt-6 grid grid-cols-3 w-[90%] items-center justify-between"
              : "w-full grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 py-4 my-6"
          }`}
        >
          {apps &&
            apps?.length > 0 &&
            apps.map((app) => (
              <React.Fragment>
                <div
                  className="duration-200 w-full px-6 lg:px-0 rounded-md overflow-hidden relative "
                  onMouseEnter={() => setisHovered(true)}
                  onMouseLeave={() => setisHovered(false)}
                >
                  <img
                    src={app?.AppIcon}
                    alt="cover image"
                    className={`${
                      width <= 768
                        ? "w-20 h-auto rounded-lg"
                        : " grid grid-cols-5  rounded-md object-cover"
                    }`}
                  />

                  <Link to={`/detail/${app?._id}`}>
                    <motion.div
                      {...smoothPopIn}
                      className={`${
                        width <= 768
                          ? ""
                          : " flex flex-col items-center justify-between px-4 py-4 bg-[rgba(15,15,15,0.8)]"
                      }`}
                    >
                      {/* <div className="w-full lg:flex grid items-center justify-between">
                           {/* <div className="flex items-center justify-center gap-2">
                             <MdStar className="text-heroPrimary text-base" />
                             <p className=" text-[10px] lg:text-xs 2xl:text-base text-white">
                               {app?.TotalReviews}
                             </p>
                           </div> */}

                      {/* <div className="lg:flex grid items-center justify-center gap-1">
                             <FaHeart className="text-red-500 text-sm 2xl:text-base" />
                           </div> 
                         </div> */}

                      <div className="w-full flex flex-col items-start justify-start gap-2">
                        <p className="lg:text-sm text-[10px] 2xl:text-base text-[(255,255,255,0.8)] font-bold">
                          {app?.Title}
                        </p>
                        <p className="lg:text-xs text-[10px] 2xl:text-base text-heroSecodary">
                          {app?.Company}
                        </p>
                      </div>
                    </motion.div>
                  </Link>

                  {/*                  
                  <AnimatePresence>
                    {width <= 768 && (
                       
                     
                    )}
                  </AnimatePresence> */}
                </div>
              </React.Fragment>
            ))}
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
          <ClientChatContainer />
        </div>
      )}
      {isChatOpen && (
        <div className="fixed bottom-4  z-50  rounded-md shadow-md">
          <ClientChatContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
