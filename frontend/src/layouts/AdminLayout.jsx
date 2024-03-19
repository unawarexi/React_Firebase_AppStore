import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AdminHeader, MainLoader } from "../components/ExpComp";
import useUser from "../hooks/user/UseUser";
import { FaHouse, FaHouseChimney } from "react-icons/fa6";

import ResponsiveComponent from "../hooks/responsive/useResponsive";

const AdminLayout = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (user?.role === "member" || !user)) {
      navigate("/", { replace: true });
    }
  }, [userLoading, user]);

  if (userLoading) {
    return <MainLoader />;
  }

  const width = ResponsiveComponent();

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-start px-4 py-3">
      <AdminHeader />

      {/* Navigation container  */}

      <div
        className={`
       
  
             "w-full h-auto flex items-center justify-center px-4 py-4 gap-8 lg:gap-12"`}
      >
        <Link to="/">
          <FaHouseChimney
            className={`lg:text-2xl text-lg hover:text-heroPrimary`}
          />
        </Link>

        <NavLink
          className={({ isActive }) =>
            `${
              width <= 768 ? "text-sm font-semibold" : "text-lg font-semibold "
            } ${isActive && "text-heroPrimary"}`
          }
          to={"/admin/home"}
        >
          {" "}
          Dashboard
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `${
              width <= 768 ? "text-sm font-semibold" : "text-lg font-semibold"
            }  ${isActive && "text-heroPrimary"}`
          }
          to={"/admin/apps"}
        >
          {" "}
          Apps
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              width <= 768 ? "text-sm font-semibold" : "text-lg font-semibold"
            }  ${isActive && "text-heroPrimary"}`
          }
          to={"/admin/users"}
        >
          Users
        </NavLink>
      </div>

      <Outlet></Outlet>
      {/* {admin footer} */}
    </div>
  );
};

export default AdminLayout;
