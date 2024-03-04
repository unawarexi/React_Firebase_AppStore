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
      {getusers && getusers?.length > 0 ? (
        <React.Fragment>
          {getusers.map((users) => (
            <UserListCard key={users?.uid} data={users} />
          ))}
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
