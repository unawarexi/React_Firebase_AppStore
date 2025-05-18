import React from "react";
import useApps from "../../hooks/apps/UseApps";
import PuffLoader from "react-spinners/PuffLoader";
import { AdminAppListCart } from "../../components/ExpComp";

const ListOfApps = () => {
  const { data: apps, isLoading, isError, refetch } = useApps();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px] bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <PuffLoader color="#ffbb0b" size={40} />
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 transition-colors duration-300 border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps?.length > 0 && apps ? (
          <>
            {apps?.map((app) => (
              <AdminAppListCart key={app?._id} data={app} />
            ))}
          </>
        ) : (
          <div className="col-span-full flex justify-center items-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOfApps;
