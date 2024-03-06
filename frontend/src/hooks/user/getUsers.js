import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getAllUsersFromCloud } from "../../api/UserApi";

const getUsers = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "getusers",
    async () => {
      try {
        const users = await getAllUsersFromCloud();
        return users;
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

export default getUsers;