import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getAllAppsFromCloud } from "../../api/UserApi";

const useApps = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "Apps",
    async () => {
      try {
        const apps = await getAllAppsFromCloud();
        return apps


      } catch (error) {
        console.log(error);
        toast.error(`Error : ${error}`);
        return null;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useApps;




