import React from "react";
import getUsers from "../../hooks/user/getUsers";
import { MainLoader } from "../../components/ExpComp";
import { UserListCard } from "../../containers/ExpContainers";

const AdminUsers = () => {
  const { data: getusers, isLoading, isError, refetch } = getUsers();
  if (isLoading) {
    return <MainLoader />;
  }
  return (
    <div className="w-full flex flex-wrap items-center justify-evenly gap-4">
      {getusers?.length > 0 && getusers ? (
        <React.Fragment>
          {getusers.map((user) => (<UserListCard key={user?.uid} data = {user}  />))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>No Data</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default AdminUsers;
