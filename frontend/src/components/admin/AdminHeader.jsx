import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/image";
import useUser from "../../hooks/user/UseUser";

import { FaNairaSign } from "react-icons/fa6";

const AdminHeader = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();
  return (
    <div className="w-full flex items-center justify-between">
      {/**logo */}

      <Link to={"/"}>
        <img src={Logo} alt="logo" className="w-16 h-auto object-contain" />
      </Link>

      {/** user profile section */}
      <div>
        {/**name content */}
        <div>
          <h2>{user?.name}</h2>
          <div>
            <div className="w-4 h-4 rounded-full flex items-center justify-center">
            <FaNairaSign />
            </div>
          </div>
        </div>
        {/**image content */}
      </div>
    </div>
  );
};

export default AdminHeader;
