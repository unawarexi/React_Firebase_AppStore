import React from "react";
import { Link } from "react-router-dom";
import UserProfileContainer from "../UserProfileContainer";
import { Logo } from "../../assets/image";

const AdminHeader = () => {
  return (
    <div className="w-full flex items-center justify-between">
      {/**logo */}

      <Link to={"/"}>
        <img src={Logo} alt="logo" className="w-16 h-auto object-contain" />
      </Link>

      {/** user profile section */}
      <UserProfileContainer />
    </div>
  );
};

export default AdminHeader;
