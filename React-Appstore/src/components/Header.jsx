/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, HelpCircle, User, ChevronDown } from "lucide-react";
import UserProfileContainer from "./UserProfileContainer";
import useResponsive from "../hooks/responsive/useResponsive";

import { AppleIcon, RectangleGogglesIcon } from "lucide-react";

const Header = ({ onPlatformChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Apps");
  const [activePlatform, setActivePlatform] = useState("PlayStore");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const tabs = ["Games", "Apps", "Kids"];

  const platformOptions = [
    { id: "PlayStore", label: "Google Play Store", icon: RectangleGogglesIcon, 
      logo: "https://www.gstatic.com/images/branding/product/2x/play_prism_32dp.png", 
      name: "Google Play" },
    { id: "AppStore", label: "Apple App Store", icon: AppleIcon, 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png", 
      name: "App Store" },
  ];

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    } else {
      // Clear search when closing
      setSearchTerm("");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePlatformChange = (platform) => {
    setActivePlatform(platform);
    setIsDropdownOpen(false);
    if (onPlatformChange) {
      onPlatformChange(platform);
    }
  };

  // Find active platform details
  const currentPlatform = platformOptions.find(p => p.id === activePlatform) || platformOptions[0];

  return (
    <motion.header 
      className="w-full bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Logo and Navigation */}
        <div className="flex items-center">
          <motion.div 
            className="flex items-center mr-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={currentPlatform.logo}
              alt={currentPlatform.name}
              className="h-8 w-8 mr-2"
            />
            <span className="text-lg font-medium text-gray-800">{currentPlatform.name}</span>
          </motion.div>

          {/* Platform Dropdown */}
          <div className="relative mr-6">
            <motion.button
              className="flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              onClick={toggleDropdown}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium mr-1">
                {currentPlatform.label}
              </span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {platformOptions.map((platform) => (
                    <motion.button
                      key={platform.id}
                      className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                        activePlatform === platform.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePlatformChange(platform.id)}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                    >
                      <platform.icon size={16} className="mr-2" />
                      {platform.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Tabs - Always visible on large screens regardless of search state */}
          {!isMobile && (
            <nav className="hidden md:flex">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-5 py-3 relative text-sm font-medium ${
                    activeTab === tab ? "text-green-700" : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-green-700"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">

        </div>

        {/* Search and Profile */}
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                className="flex items-center bg-gray-100 rounded-full overflow-hidden px-4 py-2"
                initial={{ width: 48, opacity: 0 }}
                animate={{ width: isMobile ? "100%" : 400, opacity: 1 }}
                exit={{ width: 48, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Search size={20} className="text-gray-500 mr-2" />
                <input
                  id="search-input"
                  type="text"
                  placeholder={`Search ${currentPlatform.name}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none border-none text-base font-medium text-gray-800 w-full"
                />
                <motion.button
                  onClick={toggleSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-gray-500" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={toggleSearch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search size={20} className="text-gray-700" />
              </motion.button>
            )}
          </AnimatePresence>

          {(!isMobile || !isSearchOpen) && (
            <>
              <motion.button
                className="p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HelpCircle size={20} className="text-gray-700" />
              </motion.button>
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={16} />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;