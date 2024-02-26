import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useUser from "../../hooks/user/UseUser";

import { useQueryClient } from "react-query";
import UserProfileContainer from "../UserProfileContainer";
import { Logo } from "../../assets/image";

const AdminHeader = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();
  const queryClient = useQueryClient();


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
