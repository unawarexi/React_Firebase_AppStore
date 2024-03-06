import React from "react";
import { Avatar } from "../../assets/image";

const UserListCard = ({ data }) => {
  console.log(data);
  return (
    <div className="p-4 border border-zinc-700 rounded-md flex flex-col items-center justify-center gap-3">
      <img
        src={data?.picture ? data?.picture : Avatar}
        alt="User image"
        className="w-24 h-24 object-cover rounded-md"
      />

      <p className="text-xl font-semibold">{data?.name}</p>
      <p>Role: {data?.role}</p>
    </div>
  );
};

export default UserListCard;
