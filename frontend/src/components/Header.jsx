import React, { useState } from "react";
import { Rewards } from "../assets/image";
import UserProfileContainer from "./UserProfileContainer";

const Header = () => {
  const [SearchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full flex items-center justify-between bg-third pl-6">
      <img
        src={Rewards}
        alt="REWARDS"
        className="w-64 hidden lg:block h-auto object-cover"
      />

      {/* {searc optiin} */}

      <div className="flex items-center justify-center bg-[#2a2a2a] rounded-full shadow-lg px-4 py-3">
        <input
          type="text"
          placeholder="Search for apps..."
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none border-none text-base font-medium text-textSecondary
          placeholder:text-textPrimary tracking-wider lg:w-64 2xl:w-96"
        />
      </div>

      {/* {profile section} */}
      <UserProfileContainer />
    </div>
  );
};

export default Header;
