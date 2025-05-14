import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../../api/UserApi";

import { toast } from "react-toastify";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const userDetail = await getAuthenticatedUser();
        toast.success(`fine working`);
        return userDetail;
      } catch (error) {
        console.log(error);
        if (!error.message.includes("not authenticated")) {
          toast.error(`Error : ${error}`);
        }
        return null; // Ensure a value is always returned
      }
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, refetch };
};

export default useUser;
