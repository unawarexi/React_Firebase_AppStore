import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import useUser from "../../hooks/user/UseUser";

const AdminAppListCart = ({ data }) => {
  const { data: user, isLoading, isError, refetch } = useUser();

  const [isDelete, setisDelete] = useState(false);

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
        >
          <FaTrash className=" text-sm text-white " />
        </div>
      )}

      <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center">
        <div
          className="border rounded-md border-heroPrimary p-4 flex flex-col items-center
         justify-center gap-4"
        >
          <h2 className=" font-medium text-2xl">
            Are you sure you want to Delete?
          </h2>
          <div className="p-4">
            <button
              type="button"
              className=" outline-none px-6 py-2 rounded-md
                  text-white bg-red-400 hover:bg-red-600"
            >
              delete
            </button>
            <button
              type="button"
              className="outline-none px-6 py-2 rounded-md
                 border border-heroPrimary hover:bg-teal-500  hover:border-none hover:text-white"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppListCart;
