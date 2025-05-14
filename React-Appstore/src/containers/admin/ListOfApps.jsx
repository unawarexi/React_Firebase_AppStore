import React from "react";
import useApps from "../../hooks/apps/UseApps";
import PuffLoader from "react-spinners/PuffLoader";
import { AdminAppListCart } from "../../components/ExpComp";

const ListOfApps = () => {
  const { data: apps, isLoading, isError, refetch } = useApps();

  if (isLoading) {
    return <PuffLoader color="#ffbb0b" size={40} />;
  }
  return (
    <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {apps?.length > 0 && apps ? (
        <React.Fragment>
          {apps?.map((app) => (
            <AdminAppListCart key={app?._id} data = {app} />

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

export default ListOfApps;
