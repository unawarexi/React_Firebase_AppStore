import { toast } from "react-toastify";
import { auth } from "../config/Firebase.config";
import { baseURL } from "../utils/Helpers";

export const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then(async (token) => {
          console.log("token : ", token);
          await fetch(`${baseURL}/validateUserJWTToken`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                reject(
                  new Error(
                    `Network response was not ok : ${response.statusText}`
                  )
                );
              } else {
                return response.json();
              }
            })
            .then((data) => {
              resolve(data?.user);
            });
        });
      } else {
        reject(new Error("user is not authenticated"));
      }

      //  unsubscribe listener
      unsubscribe();
    });
  });
};


export const saveAppDataToCloud = async (appData) => {
  try {
    const res = await fetch(`${baseURL}/createNewApp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appData),
    });
    if (res.ok) {
      toast.error("Try to create an App");
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error ${error}`);
  }
};
