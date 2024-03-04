import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import useUser from "../../hooks/user/UseUser";
import { smoothPopIn } from "../../animation/Animations";
import { deleteAppFromCloud } from "../../api/UserApi";
import { toast } from "react-toastify";
import useApps from "../../hooks/apps/UseApps";

const AdminAppListCart = ({ data }) => {
  const { data: user, isLoading, isError, refetch } = useUser();
  const { data: apps,  refetch : refetchApps } = useApps();

  const [isDelete, setisDelete] = useState(false);

  const removeAnApp = async () => {
    await deleteAppFromCloud(data?._id).then(() => {
      toast.success("App Removed")
      refetchApps()
    })

  }

  return (
    <div
      className="border-2 flex  border-heroPrimary rounded-md px-3 py-2 items-center justify-start
     relative gap-3 w-full h-[100px]"
    >
      <img
        src={data?.AppIcon}
        className="w-16 h-16 object-cover rounded-md"
        alt="app-icon"
      />
      <h2 className="text-textPrimary font-semibold text-xl">
        {data?.Title}
        <span className="block font-normal text-base">{data?.Company}</span>
      </h2>

      {user?.role === "admin" && (
        <div
          className="w-6 h-6 rounded-md absolute bg-red-500 bottom-2 right-2 flex justify-center
        cursor-pointer items-center"
          onClick={() => setisDelete(true)}
        >
          <FaTrash className=" text-sm text-white " />
        </div>
      )}

      <AnimatePresence>
        {isDelete && (
          <motion.div {...smoothPopIn}
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          >
            <div
              className="border rounded-md border-heroPrimary p-4 flex flex-col items-center
              justify-center gap-4"
            >
              <h2 className=" font-medium text-2xl">
                Are you sure you want to Delete?
              </h2>
              <div className="flex items-center justify-center gap-2">
                <button
                onClick={removeAnApp()}
                  type="button"
                  className=" outline-none px-6 py-2 rounded-md text-black bg-red-400 hover:bg-red-600
                   transition-all ease-in-out duration-200"
                >
                  delete
                </button>
                <button
                  type="button"
                  className="outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-teal-500
                  hover:border-none hover:text-black"
                  onClick={() => setisDelete(false)}
                >
                  cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAppListCart;
