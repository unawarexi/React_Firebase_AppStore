import { useQuery } from "react-query";
import { getAuthenticatedUser } from "../../api/UserApi";


 const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getAuthenticatedUser();
        return userDetail;
      } catch (error) {
        console.log(error);
      }
    },

    {
      refetchOnWindowFocus: false,
    }
  );

  return data, isLoading, isError, refetch;
};

export default useUser;