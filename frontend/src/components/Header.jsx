import React, { useEffect, useState } from "react";
import { Rewards } from "../assets/image";
import UserProfileContainer from "./UserProfileContainer";
import ResponsiveComponent from "../hooks/responsive/useResponsive";



const Header = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const width = ResponsiveComponent(); // Access the width returned by ResponsiveComponent

  return (
    <div className="w-full flex items-center justify-between bg-third px-4 lg:px-6 py-3">
    <img
      src={Rewards}
      alt="REWARDS"
      className={`w-64 hidden lg:block h-auto object-cover ${width <= 768 ? 'hidden' : 'block'}`}
    />
  
    {/* Search option */}
    <div className="flex-grow mx-4 lg:mx-0 lg:ml-4 flex items-center justify-center bg-[#2a2a2a] rounded-full shadow-lg px-4 py-3">
      <input
        type="text"
        placeholder="Search for apps..."
        value={SearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none border-none text-base font-medium text-textSecondary
        placeholder:text-textPrimary tracking-wider lg:w-1/2 2xl:w-3/4"
      />
    </div>
  
    {/* Profile section */}
    <div className={`${width > 768 ? 'block' : 'block'}`}>
      <UserProfileContainer />
    </div>
  </div>
  );
};

export default Header;
