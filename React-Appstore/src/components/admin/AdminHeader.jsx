import React from "react";
import { Link } from "react-router-dom";
import UserProfileContainer from "../UserProfileContainer";
import { Logo } from "../../assets/image";
import ResponsiveComponent from "../../hooks/responsive/useResponsive";
import InputContainer from "./InputContainer";
import { FiBell } from "react-icons/fi"; // Notification bell icon

const AdminHeader = () => {
  const width = ResponsiveComponent();

  return (
    <header
      className={
        "w-full flex items-center justify-between px-6 py-1 shadow-lg rounded-b-2xl " +
        "bg-gray-800 dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-gray-900"
      }
      style={{
        minHeight: width <= 768 ? 70 : 90,
        zIndex: 30,
        position: "sticky",
        top: 30,
      }}
    >
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4 w-full max-w-lg">
        <Link to={"/"}>
          <img
            src={Logo}
            alt="logo"
            className="w-14 h-14 object-contain rounded-xl shadow-md bg-white p-2"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          />
        </Link>
        <div className="flex-1 hidden md:block">
          <InputContainer
            placeholder="Search apps, users, reviews..."
            onChangeText={() => {}}
            stateValue=""
          />
        </div>
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* Show search input on mobile */}
        {width <= 768 && (
          <div className="block w-32">
            <InputContainer
              placeholder="Search..."
              onChangeText={() => {}}
              stateValue=""
            />
          </div>
        )}
        {/* Notification Bell */}
        <button
          className="relative text-white hover:text-blue-300 transition-colors"
          title="Notifications"
        >
          <FiBell size={24} />
          {/* Notification dot */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 border-2 border-blue-900"></span>
        </button>
        {/* User Profile */}
        {width > 768 && <UserProfileContainer />}
      </div>
    </header>
  );
};

export default AdminHeader;
