import { auth } from "../config/Firebase.config";

export const baseURL = "http://127.0.0.1:5001/mobile-appstore-fce23/us-central1"



export const Menus = [
    { id: 10001, menu: "My Profile", uri: "/profile" },
    { id: 10002, menu: "My Favourites", uri: "/favourites" },
    { id: 10003, menu: "Dashboard", uri: "/admin/home", isAdmin: true },
    { id: 10004, menu: "Users", uri: "/admin/users", isAdmin: true },
    { id: 10005, menu: `App's`, uri: "/admin/apps", isAdmin: true },
  ];
  


  export const signOutUser = async (queryClient) => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);
    });
  };



