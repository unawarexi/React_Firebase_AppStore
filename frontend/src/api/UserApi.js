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



export const getAllUsersFromCloud = async () => {
  try {
    const res = await fetch(`${baseURL}/getAllUsers`);
    console.log(res)

    if (!res.ok) {
      toast.error("Try adding users");
    
    }

    const users = await res.json();
    return users;

  } catch (error) {
    toast.error(`Error ${error}`);
  }
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
    if (!res.ok) {
      toast.error("Try to create an App");
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error ${error}`);
  }
};

export const getAllAppsFromCloud = async (apps) => {
  try {
    const res = await fetch(`${baseURL}/getAllApps`);

    if (!res.ok) {
      toast.error("Try to create an App");
    }

    const apps = await res.json();
    return apps;
  } catch (error) {
    toast.error(`Error ${error}`);
  }
};

export const deleteAppFromCloud = async (id) => {
  try {
    const response = await fetch(`${baseURL}/deleteAnApp?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if necessary (e.g., authorization token)
      },
    });
    if (response.ok) {
      toast.success("deleted successfully");
      return true;
    } else {
      toast.error("Failed to delete App");
    }
  } catch (error) {
    // Handle network errors or other exceptions
    toast.error(`Error : ${error}`);
    return false;
  }
};



export const updateUserDataToCloud = async (data) => {
  try {
    const res = await fetch(`${baseURL}/updateTheUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Try to create an update");
    }
    const resData = await res.json();
    return resData;
  } catch (error) {
    toast.error(`Error ${error}`);
  }
};