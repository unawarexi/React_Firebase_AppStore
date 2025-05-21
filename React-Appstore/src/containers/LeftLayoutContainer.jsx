/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Smartphone
} from "lucide-react";
import { appStoreCategories } from "../utils/data/AppStoreCategories";
import { menuItemVariants, subMenuVariants } from "../animation/Animations";

const CategoryMenuItem = ({ item, isCollapsed, isMobile, onAnyItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const IconComponent = item.icon;

  const handleMenuClick = (e) => {
    e.preventDefault();
    if (item.submenu) {
      setIsOpen(!isOpen);
    } else if (item.route) {
      navigate(item.route);
      // Close mobile sidebar if on mobile
      if (isMobile && onAnyItemClick) onAnyItemClick();
    }
  };

  const handleSubMenuClick = (e, subItem) => {
    e.stopPropagation();
    if (subItem.route) {
      navigate(subItem.route);
      // Close mobile sidebar if on mobile
      if (isMobile && onAnyItemClick) onAnyItemClick();
    }
  };

  return (
    <>
      <motion.li
        className={`relative flex items-center w-full my-1 ${
          item.spacing ? "mt-4" : "mt-0"
        }`}
        variants={menuItemVariants}
      >
        <motion.div
          className={`flex items-center w-full rounded-lg cursor-pointer px-4 py-3 ${
            isOpen ? "bg-gray-700/10" : "hover:bg-gray-700/5"
          } transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMenuClick}
        >
          <motion.div
            className={`flex justify-center items-center rounded-lg text-gray-500 ${
              isOpen ? "text-blue-500" : ""
            }`}
          >
            <IconComponent size={18} />
          </motion.div>

          {!isCollapsed && (
            <motion.div className="flex w-full items-center justify-between">
              <motion.span className="ml-4 text-gray-500 font-medium">
                {item.title}
              </motion.span>
              {item.submenu && (
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight size={16} className="text-gray-400" />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.li>

      {/* Render submenu */}
      {item.submenu && !isCollapsed && (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="ml-7 mt-1 border-l border-gray-700 pl-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={subMenuVariants}
            >
              {item.subMenuItems.map((subItem, idx) => {
                const SubIcon = subItem.icon;
                return (
                  <motion.li
                    key={idx}
                    variants={menuItemVariants}
                    className="flex items-center py-2 px-3 rounded-lg my-1 cursor-pointer hover:bg-gray-500/5 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleSubMenuClick(e, subItem)}
                  >
                    <SubIcon size={14} className="text-gray-700" />
                    <span className="ml-3 text-gray-500 text-sm">{subItem.title}</span>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

const AppStoreSidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobileVisible,
  onToggleMobileMenu,
  isMobile,
  isTablet,
  isDesktop,
}) => {
  // Helper to close mobile sidebar on item click
  const handleAnyItemClick = () => {
    if (isMobile && onToggleMobileMenu) {
      onToggleMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && !isMobileVisible && (
        <div className="fixed top-20 left-0 z-50">
          <motion.button
            className="p-2 rounded-full bg-gray-800 text-white dark:bg-blue-600"
            whileTap={{ scale: 0.95 }}
            onClick={onToggleMobileMenu}
          >
            <Smartphone size={20} />
          </motion.button>
        </div>
      )}

      {/* Sidebar wrapper for desktop/tablet */}
      {!isMobile && (
        <motion.div
          className={`h-full bg-white dark:bg-gray-900 shadow-xl overflow-hidden border-r border-gray-200 dark:border-gray-700`}
          animate={{
            width: isCollapsed ? "5rem" : "16rem",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <motion.div
              className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              {!isCollapsed && (
                <motion.div
                  className="flex items-center"
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-white mr-2">App Store</span>
                </motion.div>
              )}

              <motion.button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-400"
                whileTap={{ scale: 0.95 }}
                onClick={onToggleCollapse}
              >
                <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }}>
                  <ChevronRight size={16} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Menu Items */}
            <motion.div className="flex-1 overflow-y-auto py-2 px-2">
              <motion.ul
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.07,
                    },
                  },
                }}
              >
                {appStoreCategories.map((item, index) => (
                  <CategoryMenuItem
                    key={index}
                    item={item}
                    isCollapsed={isCollapsed}
                    isMobile={false}
                  />
                ))}
              </motion.ul>
            </motion.div>

            {/* Footer */}
            <motion.div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
              {!isCollapsed && (
                <motion.div
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">© 2025 App Store</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Mobile Sidebar (full screen) */}
      {isMobile && (
        <AnimatePresence>
          {isMobileVisible && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-full h-screen z-40 bg-gray-900"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-white">App Store</span>
                  </div>
                  <button
                    className="p-2 rounded-full hover:bg-gray-800 text-gray-400"
                    onClick={onToggleMobileMenu}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex-1 overflow-y-auto py-2 px-4">
                  <motion.ul
                    initial="closed"
                    animate="open"
                    variants={{
                      open: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {appStoreCategories.map((item, index) => (
                      <CategoryMenuItem
                        key={index}
                        item={item}
                        isCollapsed={false}
                        isMobile={true}
                        onAnyItemClick={handleAnyItemClick}
                      />
                    ))}
                  </motion.ul>
                </div>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-gray-700 text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">© 2025 App Store</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

const LeftLayoutContainer = ({ isMobile, isTablet, isDesktop }) => {
  // For desktop/tablet: collapsed state, for mobile: sidebar visibility
  const [isCollapsed, setIsCollapsed] = useState(true); // changed from false to true
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleToggleMobileMenu = () => {
    setIsMobileVisible((prev) => !prev);
  };

  return (
    <AppStoreSidebar
      isCollapsed={isCollapsed}
      onToggleCollapse={handleToggleCollapse}
      isMobileVisible={isMobileVisible}
      onToggleMobileMenu={handleToggleMobileMenu}
      isMobile={isMobile}
      isTablet={isTablet}
      isDesktop={isDesktop}
    />
  );
};

export default LeftLayoutContainer;