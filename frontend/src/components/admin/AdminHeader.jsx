import React from "react";
import { Link } from "react-router-dom";
import UserProfileContainer from "../UserProfileContainer";
import { Logo } from "../../assets/image";

import ResponsiveComponent from "../../hooks/responsive/useResponsive";

const AdminHeader = () => {
  const width = ResponsiveComponent();

  return (
    <div className="w-full flex items-center justify-between">
      {/**logo */}

      <Link to={"/"}>
        <img src={Logo} alt="logo" className="w-16 h-auto object-contain" />
      </Link>

      {/** user profile section */}
      {`${width <= 768 ? "" : <UserProfileContainer />}`}

      
    </div>
  );
};

export default AdminHeader;
