import React, { useState } from "react";
import { Avatar } from "../../assets/image";
import { updateUserDataToCloud } from "../../api/UserApi";
import useUser from "../../hooks/user/UseUser";
import { toast } from "react-toastify";

const UserListCard = ({ data }) => {

   

  const {
    data : users,
    isLoading,
    isError,
    refetch,
  } = useUser();

  const updateUserRole = async (role) => {
    await updateUserDataToCloud({ _id: data?.uid, role: role }).then(
      (data) => {
        toast.success("user Role updated");
        refetch();
      }
    );
  };

  return (

    <div className="p-4 border border-zinc-700 rounded-md flex flex-col items-center justify-center gap-3">
  <img
    src={data?.picture ? data?.picture : Avatar}
    alt="User image"
    className="lg:w-24   lg:h-24 md:w-24 md:h-24 w-10 h-10 object-cover rounded-md"
  />

  <p className="text-sm  md:text-xl lg:text-xl font-semibold text-center">{data?.name}</p>
  <p className="text-xs md:texl-sm lg:text-base">Role: {data?.role}</p>

  {data?.role === "admin" ? (
    <button
      onClick={() => updateUserRole("member")}
      className="text-xs lg:text-sm font-semibold px-2 py-1 bg-zinc-700 rounded-md cursor-pointer"
    >
      Mark as Member
    </button>
  ) : (
    <button
      onClick={() => updateUserRole("admin")}
      className="text-xs lg:text-sm font-semibold px-2 py-1 bg-zinc-700 rounded-md cursor-pointer"
    >
      Mark as Admin
    </button>
  )}
</div>

   
  );
};

export default UserListCard;
