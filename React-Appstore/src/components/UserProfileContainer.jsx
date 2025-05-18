/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//custom hook
import useUser from "../hooks/user/UseUser";

//icons
import { FaNairaSign } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

//animation
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../animation/Animations";

//react-queries
import { useQueryClient } from "react-query";

//assests
import { Avatar } from "../assets/image";
//utils
import { Menus, signOutUser } from "../utils/Helpers";

//spinner
import PuffLoader from "react-spinners/PuffLoader";

const UserProfileContainer = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();
  const queryClient = useQueryClient();

  if (userLoading) {
    return <PuffLoader color="#ffbb0b" size={40} />;
  }

  const [isHover, setisHover] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    setisHover(true);
    // Clear any existing timeout
    clearTimeout(timeoutId);
  };

  const handleMouseOut = () => {
    // Set a new timeout to close the dropdown
    const id = setTimeout(() => {
      setisHover(false);
    }, 1000);
    // Store the timeout ID for later reference
    setTimeoutId(id);
  };

  // Clear the timeout when the component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className="flex justify-center items-center gap-4 cursor-pointer relative px-40">
      {/**name content */}
      <div className="flex flex-col items-start justify-start gap-1">
        <h2 className="text-lg font-bold text-heroPrimary capitalize">
          {user?.name}
        </h2>

        <div className="flex items-center justify-center gap-2 ">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary border-2 border-gray-500">
            <FaNairaSign className="text-sm text-heroSecodary" />
          </div>

          {user?.walletBalance ? (
            <React.Fragment className="text-lg font-semibold text-heroPrimary">
              <p>{user?.walletBalance}</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="text-lg font-semibold text-heroPrimary">0</p>
            </React.Fragment>
          )}
        </div>
      </div>
      {/**image content */}

      <div
        //--------- handles auto close without options hover and
        // -------- handles display after hover
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOut}
        className=" w-16 h-16 rounded-full flex items-center p-1 justify-center relative
     bg-gradient-to-b from-bg-heroPrimary to bg-heroSecodary"
      >
        <img
          src={user?.picture ? user?.picture : Avatar}
          alt="profilepic"
          className="w-full h-full object-cover rounded-full"
        />
        <div
          className=" w-4 h-4 rounded-full  bg-heroSecodary absolute bottom-1 right-0
       flex justify-center items-center border border-gray-600"
        >
          <FaChevronDown className="text-[10px] text-textSecondary" />
        </div>
      </div>

      {/**drop down section */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            //--------- handles close after hover and
            // -------- resets auto close timer during hover
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseOut}
            {...fadeInUp}
            className="absolute top-20  bg-secondary shadow-md flex flex-col items-start justify-start
          w-64 px-4 py-2 gap-4 rounded-md z-[999]"
          >
            {Menus &&
              Menus.map((menu) => (
                <React.Fragment key={menu.id}>
                  {menu.isAdmin ? (
                    <Link
                      to={menu.uri}
                      className="py-2 px-1 font-semibold hover:text-heroSecodary "
                    >
                      {menu.menu}
                    </Link>
                  ) : (
                    <Link
                      to={menu.uri}
                      className="py-2 px-1 font-semibold hover:text-heroSecodary "
                    >
                      {menu.menu}
                    </Link>
                  )}
                </React.Fragment>
              ))}

            <button
              type="button"
              onClick={() => signOutUser(queryClient)}
              className="px-4 py-2 w-full rounded-md bg-textPrimary text-primary
      active:scale-95 transition-all ease-in-out duration-300"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileContainer;
