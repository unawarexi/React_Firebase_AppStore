import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserProfileContainer from "../UserProfileContainer";
import { Logo } from "../../assets/image";
import InputContainer from "./InputContainer";
import { FiBell, FiSearch, FiX } from "react-icons/fi";
import useResponsive from "../../hooks/responsive/useResponsive";

const AdminHeader = () => {
  const { isMobile, isTablet } = useResponsive();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header
      className={
        "w-full flex items-center justify-between " +
        (isMobile
          ? "px-2 py-1"
          : isTablet
          ? "px-4 py-1"
          : "px-3 py-1") +
        " shadow-lg rounded-b-2xl " +
        "bg-gray-800 dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-800 dark:to-gray-900"
      }
      style={{
        minHeight: isMobile ? 56 : isTablet ? 70 : 56,
        zIndex: 30,
      }}
    >
      {/* Mobile: Full-screen search overlay */}
      {isMobile && showMobileSearch && (
        <div className="fixed inset-0  bg-gray-900/95 flex items-center px-4">
          <FiSearch size={22} className="text-gray-400 mr-2" />
          <input
            id="admin-mobile-search-input"
            type="text"
            placeholder="Search apps, users, reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent  outline-dashed outline-gray-200 py-2 rounded-xl px-2 border-none text-base font-medium text-gray-200 w-full"
            autoFocus
          />
          <button
            className="ml-2 text-gray-400 hover:text-white"
            onClick={() => {
              setShowMobileSearch(false);
              setSearchTerm("");
            }}
            aria-label="Close search"
          >
            <FiX size={22} />
          </button>
        </div>
      )}

      {/* Left: Logo + Search */}
      <div
        className={
          "flex items-center w-full " +
          (isMobile
            ? "gap-2 max-w-xs"
            : isTablet
            ? "gap-3 max-w-md"
            : "gap-2 max-w-sm")
        }
      >
        <Link to={"/"}>
          <img
            src={Logo}
            alt="logo"
            className={
              (isMobile
                ? "w-10 h-10"
                : isTablet
                ? "w-12 h-12"
                : "w-9 h-9") +
              " object-contain rounded-xl shadow-md bg-white p-1"
            }
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          />
        </Link>
        {/* Only show search bar on tablet/desktop */}
        {!isMobile && (
          <div className={"flex-1 md:block"}>
            <InputContainer
              placeholder="Search apps, users, reviews..."
              onChangeText={setSearchTerm}
              stateValue={searchTerm}
              inputClassName="text-xs py-1 px-2"
            />
          </div>
        )}
      </div>

      {/* Right: Notification + Profile */}
      <div
        className={
          "flex items-center " +
          (isMobile ? "gap-2" : isTablet ? "gap-4" : "gap-2")
        }
        style={{
          flex: isMobile ? 1 : undefined,
          justifyContent: isMobile ? "flex-end" : undefined,
        }}
      >
        {/* Mobile: Search icon, toggles input */}
        {isMobile && !showMobileSearch && (
          <button
            className="text-white hover:text-blue-300 transition-colors"
            title="Search"
            style={{
              minWidth: 32,
              minHeight: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowMobileSearch(true)}
            aria-label="Open search"
          >
            <FiSearch size={20} />
          </button>
        )}
        {/* Notification Bell */}
        <button
          className="relative text-white hover:text-blue-300 transition-colors"
          title="Notifications"
          style={{
            minWidth: isMobile ? 32 : 28,
            minHeight: isMobile ? 32 : 28,
          }}
        >
          <FiBell size={isMobile ? 20 : 16} />
          {/* Notification dot */}
          <span
            className="absolute"
            style={{
              top: isMobile ? 2 : 0,
              right: isMobile ? 2 : 0,
              height: isMobile ? 7 : 6,
              width: isMobile ? 7 : 6,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #1e3a8a",
              display: "block",
            }}
          ></span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
