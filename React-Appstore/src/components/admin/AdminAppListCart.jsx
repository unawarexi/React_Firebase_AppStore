/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import useUser from "../../hooks/user/UseUser";
import { smoothPopIn } from "../../animation/Animations";
import { deleteAppFromCloud } from "../../api/UserApi";
import { toast } from "react-toastify";
import useApps from "../../hooks/apps/UseApps";
import ResponsiveComponent from "../../hooks/responsive/useResponsive";

// Framer Motion variants for card and button animations
const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
  exit: { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.18 } }
};

const buttonVariants = {
  hover: { scale: 1.04, boxShadow: "0px 2px 8px rgba(0,0,0,0.06)" },
  tap: { scale: 0.96 }
};

const trashVariants = {
  hover: { scale: 1.12, rotate: -8, backgroundColor: "#ef4444" },
  tap: { scale: 0.93 }
};

// New modal variants for better positioning
const modalVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

const AdminAppListCart = ({ data }) => {
  const { data: user } = useUser();
  const { refetch: refetchApps } = useApps();
  const [isDelete, setisDelete] = useState(false);
  const width = ResponsiveComponent();

  const removeAnApp = async () => {
    await deleteAppFromCloud(data?._id).then(() => {
      toast.success("App Removed");
      refetchApps();
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.07)", scale: 1.005 }}
      className="bg-white/60 border border-gray-300/60 shadow-sm rounded-lg px-3 py-2 flex items-center gap-3 w-full max-w-xl min-h-[70px] relative transition-all"
      style={{ backdropFilter: "blur(1.5px)" }}
    >
      <motion.img
        src={data?.AppIcon}
        className="w-10 h-10 object-cover rounded-md border border-gray-200 shadow-xs"
        alt="app-icon"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, duration: 0.28 }}
      />
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-gray-900 font-semibold text-sm mb-0.5 flex items-center gap-1">
          {data?.Title}
        </h2>
        <span className="block font-normal text-gray-500 text-xs">{data?.Company}</span>
      </div>
      {user?.role === "admin" && (
        <motion.div
          className="w-6 h-6 rounded-md absolute bottom-2 right-2 flex justify-center items-center cursor-pointer bg-red-400/80 hover:bg-red-500 transition"
          variants={trashVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setisDelete(true)}
        >
          <FaTrash className="text-[13px] text-white" />
        </motion.div>
      )}

      <AnimatePresence>
        {isDelete && (
          <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center pointer-events-auto">
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
              onClick={() => setisDelete(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex flex-col items-center gap-3 w-full max-w-xs mx-4 z-50 relative"
            >
              <h2 className={`${width <= 768 ? "text-xs font-normal" : "font-medium text-xs"} text-gray-800 text-center`}>
                Are you sure you want to delete this app?
              </h2>
              <div className="flex items-center justify-center gap-2 w-full">
                <motion.button
                  onClick={removeAnApp}
                  type="button"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-1.5 rounded-md text-white font-medium text-xs bg-red-500 hover:bg-red-600 transition-all shadow"
                >
                  Delete
                </motion.button>
                <motion.button
                  type="button"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 font-medium text-xs hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all shadow"
                  onClick={() => setisDelete(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminAppListCart;