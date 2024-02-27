import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AdminHeader } from "../components/ExpComp";
import useUser from "../hooks/user/UseUser";
import { FaHouse, FaHouseChimney } from "react-icons/fa6";

const AdminLayout = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (user?.role === "member" || !user)) {
      navigate("/", { replace: true });
    }
  }, [userLoading, user]);

  if (userLoading) {
    return <div>Loaading...</div>;
  }

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-start px-4 py-3">
      <AdminHeader />

      {/* Navigation container  */}

      <div className="w-full h-auto flex items-center justify-center px-4 py-4 gap-12">
        <Link to="/">
          <FaHouseChimney className="text-2xl hover:text-heroPrimary" />
        </Link>

        <NavLink
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && "text-heroPrimary"}`
          }
          to={"/admin/home"}
        >  Dashboard
          
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && "text-heroPrimary"}`
          }
          to={"/admin/apps"}
        >
          {" "}
          Apps
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-lg font-semibold ${isActive && "text-heroPrimary"}`
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
