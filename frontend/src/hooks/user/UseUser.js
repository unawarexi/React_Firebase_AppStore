import { useQuery } from "react-query";
import { getAuthenticatedUser } from "../../api/UserApi";

import { toast } from "react-toastify";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getAuthenticatedUser();
        toast.success(`fine working`);
        return userDetail;
      } catch (error) {
        console.log(error);
        if (!error.message.includes("not authenticated")) {
          toast.error(`Error : ${error}`);
        }
      }
    },

    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, isError, refetch };
};

export default useUser;
