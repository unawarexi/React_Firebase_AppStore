import React from "react";
import { motion } from "framer-motion";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 40, scale: 0.95 },
};

const UserListCard = ({
  data,
  idx = 0,
  updateUserRole,
  loadingUser,
  onView,
  onEdit,
  onDelete,
}) => {
  const photoURL =
    data.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      data.displayName || data.email || "User"
    )}&background=random`;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      layout
      className="bg-white w-full dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition max-w-xl m-2 flex-1"
      style={{ flexBasis: "340px" }}
    >
      <div className="flex items-center gap-5">
        <img
          src={photoURL}
          alt={data.name || data.email}
          className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover shadow"
        />
        <div>
          <div className="font-bold text-xl text-gray-900 dark:text-white break-words">
            {data.name || "No Name"}
          </div>
          <div className="text-gray-500 dark:text-gray-300 text-base break-words">
            {data.email}
          </div>
          <div className="text-xs mt-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white inline-block font-semibold uppercase tracking-wide">
            {data.role || "user"}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-auto">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base font-medium transition"
          onClick={() => onView(data)}
          title="View"
        >
          <FiEye /> View
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-base font-medium transition"
          onClick={() => onEdit(data)}
          title="Edit"
        >
          <FiEdit /> Edit
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-base font-medium transition"
          onClick={() => onDelete(data)}
          title="Delete"
        >
          <FiTrash2 /> Delete
        </button>
        {data.role === "admin" ? (
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-gray-900 dark:text-white text-base font-medium transition"
            onClick={() => updateUserRole(data, "member")}
            disabled={loadingUser === data.uid}
          >
            {loadingUser === data.uid ? "Updating..." : "Mark as Member"}
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-gray-900 dark:text-white text-base font-medium transition"
            onClick={() => updateUserRole(data, "admin")}
            disabled={loadingUser === data.uid}
          >
            {loadingUser === data.uid ? "Updating..." : "Mark as Admin"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default UserListCard;
