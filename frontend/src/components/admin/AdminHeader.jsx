import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Logo } from "../../assets/image";
import useUser from "../../hooks/user/UseUser";

import { FaNairaSign } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { Menus } from "../../utils/Helpers";

const AdminHeader = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();
  return (
    <div className="w-full flex items-center justify-between">
      {/**logo */}

      <Link to={"/"}>
        <img src={Logo} alt="logo" className="w-16 h-auto object-contain" />
      </Link>

      {/** user profile section */}
      <div className="flex justify-center items-center gap-4 cursor-pointer relative">
        {/**name content */}
        <div className="flex flex-col items-start justify-start gap-1">
          <h2 className="text-lg font-bold text-heroPrimary capitalize">
            {user?.name}
          </h2>

          <div className="flex items-center justify-center gap-2 ">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary border-2 border-gray-500">
              <FaNairaSign className="text-sm text-heroSecodary" />
            </div>

            {user?.walletBalance ? (
              <React.Fragment className="text-lg font-semibold text-heroPrimary">
                <p>{user?.walletBalance}</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className="text-lg font-semibold text-heroPrimary">0</p>
              </React.Fragment>
            )}
          </div>
        </div>
        {/**image content */}

        <div
          className=" w-16 h-16 rounded-full flex items-center p-1 justify-center relative
         bg-gradient-to-b from-bg-heroPrimary to bg-heroSecodary"
        >
          <img
            src={user?.picture ? user?.picture : Avatar}
            alt="profilepic"
            className="w-full h-full object-cover rounded-full"
          />
          <div
            className=" w-4 h-4 rounded-full  bg-heroSecodary absolute bottom-1 right-0
           flex justify-center items-center border border-gray-600"
          >
            <FaChevronDown className="text-[10px] text-textSecondary" />
          </div>
        </div>

        {/**drop down section */}

        <div
          className="absolute top-12 right-0 bg-secondary shadow-md flex flex-col items-start justify-start
        w-64"
        >
          {Menus &&
            Menus.map((menu) => {
              <React.Fragment>
                {menu.isAdmin ? (
                  <Link key={menu.id}>{menu.menu}</Link>
                ) : (
                  <Link key={menu.id}>{menu.menu}</Link>
                )}
              </React.Fragment>;
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
