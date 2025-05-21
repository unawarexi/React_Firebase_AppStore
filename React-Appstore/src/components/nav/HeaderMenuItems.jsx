/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  LayoutGrid,
  CreditCard,
  History,
  Gift,
  Ticket,
  Home,
  Shield,
  Settings,
  UserSquare2,
  LogOut,
  Heart,
  Star,
  Users,
  BarChart3,
  AppWindow,
  X // <-- add X icon
} from "lucide-react";
import useResponsive from "../../hooks/responsive/useResponsive";
import { useQueryClient } from "@tanstack/react-query";
import { signOutUser } from "../../utils/Helpers";

export default function HeaderMenuItems({ user, isAdmin, onClose }) {
  const [activeItem, setActiveItem] = useState(null);
  const {isMobile, isTablet, isDesktop} = useResponsive();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const menuItems = [
    {
      id: 1,
      title: "Library & devices",
      icon: <LayoutGrid size={20} className="text-gray-600" />,
      uri: "/library-devices", // <-- add uri
    },
    {
      id: 2,
      title: "Payments & subscriptions",
      icon: <CreditCard size={20} className="text-gray-600" />,
      uri: "/payments-subscriptions", // <-- add uri
    },
    {
      id: 3,
      title: "My Play activity",
      icon: <History size={20} className="text-gray-600" />,
      uri: "/my-play-activity", // <-- add uri
    },
    {
      id: 4,
      title: "Offers",
      icon: <Gift size={20} className="text-gray-600" />,
      uri: "/offers", // <-- add uri
    },
    {
      id: 5,
      title: "Play Pass",
      icon: <Ticket size={20} className="text-gray-600" />,
      uri: "/play-pass", // <-- add uri
    },
    {
      id: 6,
      title: "Family",
      icon: <Home size={20} className="text-gray-600" />,
      uri: "/family", // <-- add uri
    },
    {
      id: 7,
      title: "Personalization in Play",
      icon: <Shield size={20} className="text-gray-600" />,
      uri: "/personalization", // <-- add uri
    },
    {
      id: 8,
      title: "Settings",
      icon: <Settings size={20} className="text-gray-600" />,
      uri: "/settings", // <-- add uri
    },
    {
      id: 9,
      title: "Switch account",
      icon: <UserSquare2 size={20} className="text-gray-600" />,
      uri: "/switch-account", // <-- add uri
    },
    {
      id: 10,
      title: "Sign out",
      icon: <LogOut size={20} className="text-gray-600" />,
      // no uri for sign out
    },
    {
      id: 10001,
      title: "My Profile",
      uri: "/profile",
      icon: <User size={20} className="text-gray-600" />,
    },
    {
      id: 10002,
      title: "My Favourites",
      uri: "/favourites",
      icon: <Heart size={20} className="text-gray-600" />,
    },
    {
      id: 10003,
      title: "Dashboard",
      uri: "/admin/home",
      isAdmin: true,
      icon: <BarChart3 size={20} className="text-gray-600" />,
    },
    {
      id: 10004,
      title: "Users",
      uri: "/admin/users",
      isAdmin: true,
      icon: <Users size={20} className="text-gray-600" />,
    },
    {
      id: 10005,
      title: "App's",
      uri: "/admin/apps",
      isAdmin: true,
      icon: <AppWindow size={20} className="text-gray-600" />,
    },
  ].filter(item => !item.isAdmin || isAdmin);

  const handleMenuClick = async (id, uri) => {
    setActiveItem(id);
    if (onClose) onClose();
    if (id === 10) {
      // Sign out logic
      await signOutUser(queryClient);
      navigate("/auth");
      return;
    }
    if (uri) {
      navigate(uri);
    }
  };

  return (
    <div
      className={`
        md:min-w-[320px] md:max-w-[360px] overflow-y-auto rounded-lg shadow-2xl bg-white  dark:bg-gray-900 border border-gray-100 dark:border-gray-800
        ${isMobile ? 
        " h-[80vh] max-h-[80vh]  " : 
        ((isTablet || isDesktop) ? "h-[70vh] max-h-[70vh]" : "")}
      `}
      style={{
        marginLeft: 0,
        marginRight: 0,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Close icon in top-right */}
      <div className="flex justify-end pt-3 pr-3">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          style={{ lineHeight: 0 }}
        >
          <X size={22} className="text-gray-500" />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`p-5 pb-3 flex items-center ${isMobile ? "p-3 pb-2" : ""}`}
      >
        {user && (user.picture || user.photoURL) ? (
          <img
            src={user.picture || user.photoURL}
            alt="User"
            className={`bg-teal-500 rounded-full object-cover ${isMobile ? "h-9 w-9" : "h-12 w-12"}`}
          />
        ) : (
          <div className={`bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold ${isMobile ? "h-9 w-9 text-lg" : "h-12 w-12 text-xl"}`}>
            {user && user.displayName ? user.displayName[0] : "U"}
          </div>
        )}
        <div className={`ml-4 ${isMobile ? "ml-2" : ""}`}>
          <h2 className={`font-medium text-gray-900 dark:text-white ${isMobile ? "text-base" : "text-xl"}`}>{user?.name || "User"}</h2>
          <p className={`text-gray-600 dark:text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}>{user?.email || ""}</p>
        </div>
      </motion.div>

      <div className={`py-2 px-5 ${isMobile ? "py-1 px-3" : ""}`}>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://myaccount.google.com/?utm_source=chrome-profile-chooser&pli=1"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-full text-center text-gray-800 dark:text-gray-200 block bg-white dark:bg-gray-900
            ${isMobile ? "py-1 px-2 text-xs" : ""}
          `}
        >
          Manage your Google Account
        </motion.a>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        className={`pb-2 ${isMobile ? "pb-1" : ""}`}
      >
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.id === 7 && <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>}
            <motion.div
              whileHover={{}}
              className={`
                flex items-center px-5 py-3 cursor-pointer
                ${activeItem === item.id
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'bg-white dark:bg-gray-900'}
                hover:bg-gray-100 dark:hover:bg-gray-800
                hover:text-gray-900 dark:hover:text-white
                transition-colors
                ${isMobile ? "px-3 py-2" : ""}
              `}
              onClick={() => handleMenuClick(item.id, item.uri)}
            >
              <div className={`w-8 flex-shrink-0 ${isMobile ? "w-6" : ""}`}>{item.icon}</div>
              <span className={`ml-4 text-gray-800 dark:text-gray-200 ${isMobile ? "ml-2 text-sm" : ""}`}>{item.title}</span>
            </motion.div>
            {item.id === 10 && <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>}
          </div>
        ))}
      </motion.div>

      <div className={`pb-5 pt-2 flex justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${isMobile ? "pb-2 pt-1 text-xs" : ""}`}>
        <span>Privacy Policy</span>
        <span>•</span>
        <span>Terms of Service</span>
      </div>
    </div>
  );
}