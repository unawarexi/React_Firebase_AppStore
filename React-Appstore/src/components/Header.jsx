/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, HelpCircle, User, ChevronDown, Sun, Moon, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderMenuItems from "./nav/HeaderMenuItems";
import useResponsive from "../hooks/responsive/useResponsive";
import useUser from "../hooks/user/UseUser";
import { AppleIcon, RectangleGogglesIcon } from "lucide-react";

const Header = ({ onPlatformChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Apps");
  const [activePlatform, setActivePlatform] = useState("PlayStore");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { data: user } = useUser();
  const navigate = useNavigate();

  const tabs = ["Games", "Apps", "Kids"];

  const platformOptions = [
    { id: "PlayStore", label: "Google Play Store", icon: RectangleGogglesIcon, 
      logo: "https://www.gstatic.com/images/branding/product/2x/play_prism_32dp.png", 
      name: "Google Play" },
    { id: "AppStore", label: "Apple App Store", icon: AppleIcon, 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png", 
      name: "App Store" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    } else {
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  const openPlatformModal = () => setIsPlatformModalOpen(true);
  const closePlatformModal = () => setIsPlatformModalOpen(false);

  const currentPlatform = platformOptions.find(p => p.id === activePlatform) || platformOptions[0];

  const isAdmin = user && (user.isAdmin || user.role === "admin");

  return (
    <motion.header 
      className="w-full bg-white dark:bg-dark-bg shadow-sm border-b border-gray-200 dark:border-dark-border fixed top-0 left-0 z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full flex items-center justify-between px-4 lg:px-6 py-3">
        <div className="flex items-center">
          <motion.div 
            className="flex items-center mr-2 md:mr-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={currentPlatform.logo}
              alt={currentPlatform.name}
              className="h-8 w-8 mr-0 md:mr-2"
            />
            {!isMobile && (
              <span className="text-lg font-medium text-gray-800 dark:text-white">{currentPlatform.name}</span>
            )}
          </motion.div>

          {!isMobile ? (
            <div className="relative mr-6">
              <motion.button
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
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
                    className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {platformOptions.map((platform) => (
                      <motion.button
                        key={platform.id}
                        className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                          activePlatform === platform.id 
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
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
          ) : (
            <motion.button
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={openPlatformModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Change platform"
            >
              <ChevronDown size={18} />
            </motion.button>
          )}

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
          <motion.button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bgSecondary transition"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          {isMobile && (
            <motion.button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={22} />
            </motion.button>
          )}

          <AnimatePresence>
            {isSearchOpen && isMobile ? (
              <motion.div
                className="fixed inset-0 z-50 bg-white/95 dark:bg-dark-bg/95 flex items-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <Search  onClick={toggleSearch} size={22} className="text-gray-500 mr-2" />
                <input
                  id="search-input"
                  type="text"
                  placeholder={`Search ${currentPlatform.name}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-dashed py-2 rounded-xl px-2 border-none text-base font-medium text-gray-800 w-full"
                />
                <motion.button
                  onClick={toggleSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-2"
                >
                  <X size={22} className="text-gray-500" />
                </motion.button>
              </motion.div>
            ) : isSearchOpen ? (
              <motion.div
                className="flex items-center bg-gray-100 rounded-full overflow-hidden px-4 py-2"
                initial={{ width: 48, opacity: 0 }}
                animate={{ width: 400, opacity: 1 }}
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

          {!isMobile && !isSearchOpen && (
            <>
              <motion.button
                className="p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HelpCircle size={20} className="text-gray-700" />
              </motion.button>
              <div className="relative">
                <motion.div
                  id="profile-menu-btn"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-700 text-white cursor-pointer overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileMenuOpen((v) => !v)}
                >
                  {user && (user.picture || user.photoURL) ? (
                    <img
                      src={user.picture || user.photoURL}
                      alt="User"
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  ) : (
                    <User size={16} />
                  )}
                </motion.div>
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 z-50"
                      style={{
                        left: "auto",
                        right: 0,
                        transform: "translateX(calc(100% - 320px))",
                        minWidth: 320,
                        maxWidth: 360,
                      }}
                    >
                      <HeaderMenuItems
                        user={user}
                        isAdmin={isAdmin}
                        onClose={() => setIsProfileMenuOpen(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              className="bg-white dark:bg-dark-bg w-4/5 max-w-xs h-full flex flex-col p-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Menu</span>
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={22} />
                </motion.button>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`w-full text-left px-4 py-2 rounded ${
                      activeTab === tab ? "bg-green-100 text-green-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                className="flex items-center px-4 py-2 rounded hover:bg-gray-100 mb-4"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPlatformModal();
                }}
              >
                <RectangleGogglesIcon size={18} className="mr-2" />
                <span>Switch Platform</span>
              </button>
              <button className="flex items-center px-4 py-2 rounded hover:bg-gray-100 mb-2">
                <HelpCircle size={18} className="mr-2" />
                <span>Help</span>
              </button>
              <div className="flex items-center px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsProfileMenuOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                {user && (user.picture || user.photoURL) ? (
                  <img
                    src={user.picture || user.photoURL}
                    alt="User"
                    className="w-7 h-7 object-cover rounded-full mr-2"
                  />
                ) : (
                  <User size={18} className="mr-2" />
                )}
                <span>Profile</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isPlatformModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePlatformModal}
          >
            <motion.div
              className="bg-white dark:bg-dark-bg rounded-lg shadow-lg p-6 w-80"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 text-lg font-semibold">Select Platform</div>
              {platformOptions.map((platform) => (
                <button
                  key={platform.id}
                  className={`flex items-center w-full px-4 py-3 rounded mb-2 ${
                    activePlatform === platform.id
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                  }`}
                  onClick={() => {
                    handlePlatformChange(platform.id);
                    closePlatformModal();
                  }}
                >
                  <platform.icon size={20} className="mr-3" />
                  {platform.label}
                </button>
              ))}
              <button
                className="mt-2 w-full py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={closePlatformModal}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobile && isProfileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProfileMenuOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-dark-bg rounded-lg shadow-lg p-4 w-80"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <HeaderMenuItems
                user={user}
                isAdmin={isAdmin}
                onClose={() => setIsProfileMenuOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;