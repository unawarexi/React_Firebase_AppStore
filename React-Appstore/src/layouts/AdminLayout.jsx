/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AdminHeader, MainLoader } from "../components/ExpComp";
import useUser from "../hooks/user/UseUser";
import { FaHouseChimney } from "react-icons/fa6";
import ResponsiveComponent from "../hooks/responsive/useResponsive";
import { motion } from "framer-motion";

const navItems = [
  {
    type: "link",
    to: "/",
    label: <FaHouseChimney className="text-xl" />,
    minWidth: "90px",
    extraClass: "mr-2",
  },
  {
    type: "navlink",
    to: "/admin/home",
    label: "Dashboard",
    minWidth: "110px",
  },
  {
    type: "navlink",
    to: "/admin/apps",
    label: "Apps",
    minWidth: "90px",
  },
  {
    type: "navlink",
    to: "/admin/users",
    label: "Users",
    minWidth: "90px",
  },
];

const AdminLayout = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (user?.role === "member" || !user)) {
      navigate("/", { replace: true });
    }
  }, [userLoading, user]);

  if (userLoading) {
    return <MainLoader />;
  }
  const { isMobile } = ResponsiveComponent();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-4 py-2  bg-white dark:bg-gray-900 ">
      <AdminHeader />

      {/* Navigation container */}
      <div
        className={`
          w-full h-auto flex items-center justify-center 
          px-2 py-2  gap-4 lg:gap-8 border-b border-gray-200 dark:border-gray-700
        `}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {isMobile ? (
          <motion.div
            className="w-full"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <div className="flex flex-row my-4 mt-10 gap-4 lg:gap-8 overflow-x-auto scrollbar-hide w-full">
              {navItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.to}
                  className={({ isActive }) =>
                    `
                      flex items-center justify-center
                      px-3 py-1.5 text-sm rounded-lg
                      sm:px-4 sm:py-2 sm:text-base sm:rounded-full
                      border-2
                      border-blue-600
                      bg-blue-200
                      text-gray-800
                      dark:bg-blue-900
                      dark:border-blue-400
                      dark:text-blue-100
                      font-semibold
                      shadow-md
                      transition-all
                      duration-200
                      hover:bg-blue-500 hover:text-white hover:border-blue-700
                      dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-300
                      active:bg-blue-600
                      dark:active:bg-blue-700
                      min-w-[${item.minWidth}]
                      text-center
                      ${item.extraClass || ""}
                      ${
                        isActive
                          ? "bg-indigo-500 text-white border-indigo-700 dark:bg-indigo-600 dark:text-white dark:border-indigo-300"
                          : ""
                      }
                    `
                  }
                  style={{ minWidth: item.minWidth }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-row my-4 mt-10 gap-4 lg:gap-8">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) =>
                  `
                    flex items-center justify-center
                    px-3 py-1.5 text-sm rounded-lg
                    sm:px-4 sm:py-2 sm:text-base sm:rounded-full
                    border-2
                    border-blue-600
                    bg-blue-200
                    text-gray-800
                    dark:bg-blue-900
                    dark:border-blue-400
                    dark:text-blue-100
                    font-semibold
                    shadow-md
                    transition-all
                    duration-200
                    hover:bg-blue-500 hover:text-white hover:border-blue-700
                    dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-300
                    active:bg-blue-600
                    dark:active:bg-blue-700
                    min-w-[${item.minWidth}]
                    text-center
                    ${item.extraClass || ""}
                    ${
                      isActive
                        ? "bg-indigo-500 text-white border-indigo-700 dark:bg-indigo-600 dark:text-white dark:border-indigo-300"
                        : ""
                    }
                  `
                }
                style={{ minWidth: item.minWidth }}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <Outlet />
      {/* {admin footer} */}
    </div>
  );
};

export default AdminLayout;
