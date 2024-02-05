import React, {useCallback} from "react";
import { LoginBG } from "../assets/image";
import { FcGoogle } from "react-icons/fc";

import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/Firebase.config";


const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();

  const handleLoginAction = useCallback(async () => {
    try {
      const userCred = await signInWithRedirect(auth, googleProvider);
      console.log(userCred);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  }, []);

  return (
    <div
      style={{
        background: `url(${LoginBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-screen w-screen items-center justify-center flex px-4 py-6 "
    >
      <div
        className="w-full lg:w-96 px-4 py-6 rounded-md backdrop-blur-md flex items-center justify-center flex-col 
      bg-[rgba(255,255,255,0.1)] gap-8"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-2xl text-white">Welcome back</p>
          <p className="text-lg text-gray-200">sign in to access your store</p>
        </div>

        <div
          onClick={handleLoginAction}
          className="w-full lg:w-auto px-4 py-3 rounded-md flex items-center justify-center border border-gray-200
        cursor-pointer gap-3 active:scale-95 transition-all duration-150 ease-in-out   bg-[rgba(255,255,255,0.2)]"
        >
          <FcGoogle className="text-2xl" />
          <p className="font-semibold text-lg text-white">Sign in with Gmail</p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
