import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeader } from "../components/ExpComp";
import useUser from "../hooks/user/UseUser";

const AdminLayout = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user?.role === "member") {
      navigate("/", { replace: true });
    }
  }, [userLoading, user]);

  if (userLoading) {
    return <div>Loaading...</div>;
  }

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-start px-4 py-3">
      <AdminHeader />
      <Outlet></Outlet>
      <p>admin footer</p>
    </div>
  );
};

export default AdminLayout;
