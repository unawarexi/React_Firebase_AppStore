/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Tv, 
  Watch, 
  Laptop,
  AppleIcon,
  Airplay,  
  Gamepad2,
  Music
} from "lucide-react";
import useResponsive from "../../hooks/responsive/useResponsive";

const SubNav = ({ platform = "PlayStore" }) => {
  const [activeDevice, setActiveDevice] = useState(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Device options based on platform
  const getDeviceOptions = () => {
    if (platform === "AppStore") {
      return [
        { id: "iphone", label: "iPhone", icon: Smartphone },
        { id: "ipad", label: "iPad", icon: Tablet },
        { id: "mac", label: "Mac", icon: Laptop },
        { id: "applewatch", label: "Apple Watch", icon: Watch },
        { id: "appletv", label: "Apple TV", icon: Tv },
        { id: "airpods", label: "AirPods", icon: Airplay },
        { id: "arcade", label: "Arcade", icon: Gamepad2 },
        { id: "music", label: "Apple Music", icon: Music },
      ];
    } else {
      return [
        { id: "windows", label: "Windows", icon: Laptop },
        { id: "phone", label: "Phone", icon: Smartphone },
        { id: "tablet", label: "Tablet", icon: Tablet },
        { id: "tv", label: "TV", icon: Tv },
        { id: "chromebook", label: "Chromebook", icon: Monitor },
        { id: "watch", label: "Watch", icon: Watch },
      ];
    }
  };

  // Reset active device when platform changes
  useEffect(() => {
    setActiveDevice(null);
  }, [platform]);

  const deviceOptions = getDeviceOptions();

  return (
    <motion.div
      className="w-full bg-white border-b border-gray-200 px-4 py-4 overflow-hidden sticky top-[56px] left-0 z-30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="max-w-full overflow-x-auto no-scrollbar mx-auto">
        <div className="flex items-center space-x-2 py-1">
          {deviceOptions.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full border ${
                activeDevice === id
                  ? platform === "AppStore" 
                    ? "border-blue-400 bg-blue-50" 
                    : "border-gray-400 bg-gray-100"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setActiveDevice(id === activeDevice ? null : id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon size={18} className={`mr-2 ${
                activeDevice === id 
                  ? platform === "AppStore" ? "text-blue-600" : "text-gray-800" 
                  : "text-gray-600"
              }`} />
              <span className={`text-sm font-medium ${
                activeDevice === id 
                  ? platform === "AppStore" ? "text-blue-600" : "text-gray-800" 
                  : "text-gray-600"
              }`}>
                {label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Display selected device info based on platform */}
      <AnimatedDeviceInfo activeDevice={activeDevice} platform={platform} />
    </motion.div>
  );
};

// This component would display relevant information when a device is selected
const AnimatedDeviceInfo = ({ activeDevice, platform }) => {
  if (!activeDevice) return null;

  const getDeviceInfo = () => {
    if (platform === "AppStore") {
      return {
        iphone: "Apps & games for iPhone",
        ipad: "Apps & games optimized for iPad",
        mac: "Apps for your Mac",
        applewatch: "Apps for Apple Watch",
        appletv: "Entertainment for your Apple TV",
        airpods: "Audio apps for AirPods",
        arcade: "Apple Arcade subscription games",
        music: "Apple Music streaming service",
      };
    } else {
      return {
        windows: "Apps & games for Windows devices",
        phone: "Apps & games for Android phones",
        tablet: "Apps & games optimized for tablets",
        tv: "Entertainment for your TV",
        chromebook: "Apps for your Chromebook",
        watch: "Apps for WearOS devices",
      };
    }
  };

  const deviceInfo = getDeviceInfo();
  const bgColor = platform === "AppStore" ? "bg-blue-50" : "bg-blue-50";
  const textColor = platform === "AppStore" ? "text-blue-800" : "text-blue-800";

  return (
    <motion.div
      className={`mt-2 px-4 py-2 ${bgColor} ${textColor} rounded-lg text-sm`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {deviceInfo[activeDevice]}
    </motion.div>
  );
};

// Custom component to handle horizontal scrolling with mouse wheel
const ScrollContainer = ({ children }) => {
  const handleWheel = (e) => {
    const container = e.currentTarget;
    if (container) {
      container.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <div 
      className="overflow-x-auto no-scrollbar" 
      onWheel={handleWheel}
      style={{ scrollBehavior: "smooth" }}
    >
      {children}
    </div>
  );
};

export default SubNav;