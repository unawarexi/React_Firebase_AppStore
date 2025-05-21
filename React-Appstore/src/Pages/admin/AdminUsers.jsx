/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import getUsers from "../../hooks/user/getUsers";
import { MainLoader } from "../../components/ExpComp";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { updateUserDataToCloud } from "../../api/UserApi";
import { toast } from "react-toastify";
import UserListCard from "../../containers/admin/UserListCard";

const AdminUsers = () => {
  const { data: getusers, isLoading, isError, refetch } = getUsers();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loadingUser, setLoadingUser] = useState(null);

  // Filtered and searched users
  const filteredUsers = useMemo(() => {
    let users = getusers || [];
    if (filterRole !== "all") {
      users = users.filter((u) => u.role === filterRole);
    }
    if (search.trim()) {
      users = users.filter(
        (u) =>
          u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return users;
  }, [getusers, search, filterRole]);

  // Role update logic
  const updateUserRole = async (user, role) => {
    setLoadingUser(user.uid);
    await updateUserDataToCloud({ _id: user.uid, role: role })
      .then(() => {
        toast.success("User role updated");
        refetch();
        setLoadingUser(null);
      })
      .catch(() => setLoadingUser(null));
  };

  // Handlers for view, edit, delete
  const handleView = (user) => {
    alert(`View user: ${user.displayName || user.email}`);
  };
  const handleEdit = (user) => {
    alert(`Edit user: ${user.displayName || user.email}`);
  };
  const handleDelete = (user) => {
    if (window.confirm(`Delete user ${user.displayName || user.email}?`)) {
      toast.info("Delete functionality not implemented.");
    }
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-6 md:py-10 px-2 md:px-4 min-h-screen transition-colors">
      <motion.div
        className="max-w-5xl mx-auto mb-6 md:mb-8 flex flex-col items-center justify-between gap-3 md:gap-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 md:mb-0 text-center md:text-left">
          Admin - All Users
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch w-full md:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              className="pl-9 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full text-sm md:text-base"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
          <select
            className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="user">User</option>
          </select>
          <button
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition self-center"
            title="Refresh"
            onClick={refetch}
          >
            <FiRefreshCw size={18} />
          </button>
        </div>
      </motion.div>
      <div
        className="
          w-full
          grid
          grid-cols-1
          gap-4
          md:gap-6
          md:grid-cols-1
          md:justify-center
          md:items-center
          lg:flex
          lg:flex-row
          lg:justify-evenly
          sm:flex-col
          sm:items-center
          sm:justify-center
          md:mx-auto
        "
      >
        <AnimatePresence>
          {filteredUsers?.length > 0 ? (
            <>
              {filteredUsers.map((user, idx) => (
                <UserListCard
                  key={user?.uid}
                  data={user}
                  idx={idx}
                  updateUserRole={updateUserRole}
                  loadingUser={loadingUser}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-10 md:py-20 w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <p className="text-gray-500 dark:text-gray-300 text-lg md:text-xl">No Data</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminUsers;

