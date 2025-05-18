/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { layoutSmooth } from "../animation/Animations";

const ClientMenuListsItems = ({ menuItems, isClose }) => {
  const [isSubMenu, setisSubMenu] = useState(false);

  return (

    <React.Fragment>

         {/* {main menu items spacing} */}
      <li
        className={`group flex items-center gap-x-4 cursor-pointer p-2 px-3 bg-primary hover:bg-[#282828]
        hover:shadow-lg rounded-md w-full ${
          menuItems.spacing ? "mt-12" : "mt-4"
        } ${isSubMenu && "bg-[#282828]"}`}
        onClick={() => setisSubMenu(!isSubMenu)}
      >
         {/* {main menu items icon} */}
        <span
          className={`w-8 h-8 flex items-center justify-center rounded-full bg-third
        group-hover:bg-gradient-to-br group-hover:from-heroPrimary group-hover:to-heroSecodary
        ${isSubMenu && "bg-gradient-to-br from-heroPrimary to-heroSecodary"} `}
        >
          {
            <menuItems.Icon
              className={`text-xl block float-left text-textPrimary hover:text-textSecondary
              ${isSubMenu && "text-textSecondary"}`}
            />
          }
        </span>

        {/* {main menu items title} */}

        <span
          className={`text-textPrimary group-hover:text-textSecondary text-base font-medium
        flex-1 duration-200 ${isClose && "hidden"} ${
            isSubMenu && "text-textSecondary"
          }`}
        >
          {menuItems.title}
        </span>

         {/* {submenu items dropdown} */}

        {menuItems.submenu && !isClose && (
          <FaChevronDown
            className={`text-textPrimary duration-200 ${
              isSubMenu && "text-textSecondary rotate-180"
            }`}
          />
        )}
      </li>
       
        {/* {submenu items display} */}
      <AnimatePresence>
        {menuItems.submenu && isSubMenu && !isClose && (
          <motion.ul {...layoutSmooth} className="bg-primary mt-2 rounded-md ">
            {menuItems.subMenuItems.map((item, index) => (
              <li
                className={`group flex items-center gap-x-4 cursor-pointer py-3 px-4 w-full`}
              >
                <span>
                  {
                    <menuItems.Icon className="text-xl block float-left text-textPrimary group-hover:text-heroPrimary" />
                  }
                </span>
                <span
                  className={`text-textPrimary group-hover:text-heroPrimary text-base font-medium flex-1
               duration-200 ${isClose && "hidden"}`}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default ClientMenuListsItems;
