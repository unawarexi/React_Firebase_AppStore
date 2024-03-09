import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Flag, Logo } from "../assets/image";
import { ClientMenus } from "../utils/Helpers";
import { ClientMenuListsItem } from "../components/ExpComp";

const LeftLayoutContainer = () => {
  const [isClose, setisClose] = useState(true);
  return (
    <div
      className={`${
        isClose ? "w-20 px-3" : "w-80"
      } w-80 h-full py-3 relative bg-third border-r border-secondary
      duration-200 flex flex-col items-center justify-start`}
    >
      {/* {absolute action button} */}

      <div
        onClick={() => setisClose(!isClose)}
        className="absolute -right-3 px-1 py-4 bg-gradient-to-br from-heroPrimary to-heroSecodary
         rounded-md cursor-pointer group"
      >
        <FaChevronRight
          className={`text-sm text-white duration-200 ${
            !isClose && "rotate-[540deg]"
          }`}
        />
      </div>

      {/* {top section} */}
      <div
        className={`w-full duration-200 inline-flex items-center
         justify-between gap-2 ${!isClose && "px-6"}`}
      >
        {/* {image container} */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 min-w-[48px] object-contain h-auto block float-left mr-5 "
          />
          <p
            className={`font-serif text-textPrimary font-extrabold uppercase tracking-[5px] 
          ${isClose && "scale-0"}  duration-200`}
          >
            Oasis <span className="text-heroPrimary block">Bet</span>
          </p>
        </div>

        {/* {location change} */}

        <div className={`${isClose && "scale-0"} duration-200 relative`}>
          <div className="flex items-center justify-center">
            <img
              src={Flag}
              alt="flag img"
              className=" w-12 h-auto object-contain"
            />

            <div
              className="absolute -bottom-1 -right-2 w-4 h-4 flex items-center justify-center rounded-full
            bg-secondary"
            >
              <FaChevronDown className="text-[10px] text-gray-50" />
            </div>
          </div>
        </div>
      </div>

      {/* {menu section} */}
      <div>
        <ul className={`pt-2 w-full ${!isClose && "px-4"}`}>
          {ClientMenus.map((menu, index) => (
            <React.Fragment key={index}>
              <ClientMenuListsItem menuItems={menu} isClose={isClose} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftLayoutContainer;
