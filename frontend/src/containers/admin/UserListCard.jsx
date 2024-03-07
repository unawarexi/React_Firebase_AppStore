import React from "react";
import { Avatar } from "../../assets/image";
import { updateUserDataToCloud } from "../../api/UserApi";
import useUser from "../../hooks/user/UseUser";
import { toast } from "react-toastify";

const UserListCard = ({ data }) => {
 const {data: users, isLoading, isError, refetch : refetchAllUser} = useUser()

  const updateUserRole = async (role) => {
    await updateUserDataToCloud({ _id: users?.uid, role: role }).then((data) => {
      toast.success("user Role updated");
      refetchAllUser();
    });
  };

  return (
    <div className="p-4 border border-zinc-700 rounded-md flex flex-col items-center justify-center gap-3">
      <img
        src={data?.picture ? data?.picture : Avatar}
        alt="User image"
        className="w-24 h-24 object-cover rounded-md"
      />

      <p className="text-xl font-semibold">{data?.name}</p>
      <p>Role: {data?.role}</p>

      {data?.role === "admin" ? (
        <button
          onClick={() => updateUserRole("member")}
          className="text-sm font-semibold px-2 py-1 bg-zinc-700 rounded-md cursor-pointer"
        >
          Mark as member
        </button>
      ) : (
        <button className="text-sm font-semibold px-2 py-1 bg-zinc-700 rounded-md cursor-pointer">
          Mark as Admin
        </button>
      )}
    </div>
  );
};

export default UserListCard;
