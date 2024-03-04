import React from "react";
import { Avatar } from "../../assets/image";

const UserListCard = ({ user }) => {
  return (
    <div className="p-4 border border-zinc-700 rounded-md flex flex-col items-center justify-center gap-3">
      <img
        src={user?.picture ? user?.picture : Avatar}
        alt="User image"
        className="w-24 h-24 object-cover rounded-md"
      />

      <p className="text-xl font-semibold">{user?.name}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
};

export default UserListCard;
