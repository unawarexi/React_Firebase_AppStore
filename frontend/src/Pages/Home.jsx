import React, { useState } from "react";
import { auth } from "../config/Firebase.config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { HomeBanner, MainLoader } from "../components/ExpComp";
import useApps from "../hooks/apps/UseApps";
import { AnimatePresence, motion } from "framer-motion";
import { MdStar } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { smoothPopIn } from "../animation/Animations";

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

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4">
      Home
      {/* {lefts ection} */}
      <div className=" col-span-12 lg:col-span-8 overflow-y-scroll scrollbar-none ">
        <HomeBanner />

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 py-4 my-6 ">
          {apps &&
            apps?.length > 0 &&
            apps.map((app) => (
              <React.Fragment>
                <div
                  className="duration-200 w-full rounded-md overflow-hidden relative"
                  onMouseEnter={() => setisHovered(true)}
                  onMouseLeave={() => setisHovered(false)}
                >
                  <img
                    src={app?.Cover}
                    alt="cover image"
                    className="w-full h-64 object-cover duration-200 "
                  />

                  <AnimatePresence>
                    {isHovered && (
                      <Link to={"#"}>
                        <motion.div
                          {...smoothPopIn}
                          className="absolute inset-0 bg-[rgba(0,0,0,0.8)] flex flex-col items-center justify-between px-2 py-4 "
                        >
                          <div className="w-full flex items-center justify-between">
                            <div className="flex items-center justify-center gap-2">
                              <MdStar className="text-heroPrimary text-base" />
                              <p className=" text-xs 2xl:text-base text-white">
                                {app?.TotalReviews}
                              </p>
                            </div>

                            <div className="flex items-center justify-center gap-1">
                              <FaHeart className="text-red-500 text-sm 2xl:text-base" />
                            </div>
                          </div>

                          <div className="w-full flex flex-col items-start justify-start gap-2">
                            <p className="text-sm 2xl:text-base text-[(255,255,255,0.8)]">
                              {app?.Title}
                            </p>
                            <p className="text-xs 2xl:text-base text-heroSecodary">
                              {app?.Company}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )}
                  </AnimatePresence>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      {/* {right section} */}
      <div className="col-span-4 h-full hidden lg:block">2</div>
    </div>
  );
};

export default Home;
