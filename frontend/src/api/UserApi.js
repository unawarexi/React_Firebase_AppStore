import { auth } from "../config/Firebase.config";

export const getAuthenticatedUser = () => {
    let userData;

    const unsubscribe =  auth.onAuthStateChanged((userCred) => {
            if (userCred) {
              userCred.getIdToken().then((token) => {
                console.log(token);
              });
            }
          });
      
          //cleanup the event listener wghwen the componet unmounts
          return () => unsubscribe();

}