/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  getRedirectResult,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../config/Firebase.config";
import useUser from "../hooks/user/UseUser";
import { useNavigate } from "react-router-dom";
import { LoginBG } from "../assets/image";
import useResponsive from "../hooks/responsive/useResponsive";

const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();
  const { data: user, isLoading, isError, refetch } = useUser();
  const navigate = useNavigate();
  const [authProcessing, setAuthProcessing] = useState(false);
  const {isMobile, isTablet, isDesktop} = useResponsive();

  useEffect(() => {
    console.log("Authentication component mounted");
    let authStateUnsubscribe = () => {};
    
    const checkRedirectResult = async () => {
      try {
        setAuthProcessing(true);
        console.log("Checking for redirect result...");
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect sign-in successful:", result.user.uid);
          refetch();
        } else {
          console.log("No redirect result found");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error.message);
      } finally {
        setAuthProcessing(false);
      }
    };

    checkRedirectResult();

    authStateUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed in component:", currentUser ? `User: ${currentUser.uid}` : "No user");
      if (currentUser) {
        console.log("User is signed in, refreshing user data");
        refetch();
      }
    });

    return () => {
      console.log("Cleaning up auth component");
      authStateUnsubscribe();
    };
  }, [refetch]);

  useEffect(() => {
    console.log("User data state:", user ? "User data received" : "No user data", "isLoading:", isLoading);
  }, [user, isLoading]);

  useEffect(() => {
    if (!isLoading && user) {
      console.log("User authenticated, navigating to home");
      navigate("/", { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || authProcessing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const handleLoginAction = async () => {
    try {
      setAuthProcessing(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        console.log("Popup sign-in successful");
        refetch();
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    } finally {
      setAuthProcessing(false);
    }
  };

  return (
    <div className={`h-[100vh] w-screen flex bg-gray-50 dark:bg-gray-900 relative transition-colors duration-300
      ${isMobile || isTablet ? "flex-col" : ""}`}>
      {!isMobile && !isTablet && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 h-full w-1/2 overflow-hidden hidden lg:block"
          style={{
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <div
            style={{
              background: `url(${LoginBG})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              transform: "rotate(90deg) scale(1.5)",
              transformOrigin: "center center",
              height: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                zIndex: 2,
              }}
            />
          </div>
        </motion.div>
      )}

      <div className={`
        w-full h-screen flex flex-col 
        ${isDesktop ? "lg:flex-row items-center justify-center" : "items-start justify-start"}
        relative z-10
        ${isMobile ? "bg-white dark:bg-gray-900" : ""}
      `}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`
            w-full 
            ${isDesktop ? "lg:w-3/5 flex flex-col justify-center items-start px-6 lg:px-20" : ""}
            ${isTablet ? "px-6 py-8" : ""}
            ${isMobile ? "px-4 py-6" : ""}
            relative z-10
          `}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <span className="uppercase text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400">Application Portal</span>
          </motion.div>

          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`
              font-bold text-gray-800 dark:text-white mb-4
              ${isDesktop ? "text-4xl lg:text-5xl" : ""}
              ${isTablet ? "text-3xl" : ""}
              ${isMobile ? "text-2xl" : ""}
            `}
          >
            Find extensions to <span className="text-blue-600 dark:text-blue-400">boost</span> your  <br /> business
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`
              text-gray-600 dark:text-gray-300 mb-8 max-w-lg
              ${isMobile ? "text-base" : "text-lg"}
            `}
          >
            Access our marketplace of professional tools and extensions designed to help your business grow and succeed in today's competitive landscape.
          </motion.p>

          {isMobile && (
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-2 w-full mb-6"
            >
              <svg className="w-12 h-12 mb-2 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back</h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">Sign in to access your store and explore our marketplace</p>
              <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <motion.button
                onClick={handleLoginAction}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  w-full py-3 rounded-lg flex items-center justify-center bg-white dark:bg-gray-900
                  cursor-pointer gap-3 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition-all
                `}
              >
                <FcGoogle className="text-xl" />
                <p className="font-medium">Sign in with Google</p>
              </motion.button>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-4"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our <span className="text-blue-600 dark:text-blue-400 cursor-pointer">Terms of Service</span> and <span className="text-blue-600 dark:text-blue-400 cursor-pointer">Privacy Policy</span>
                </p>
              </motion.div>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className={`relative w-full max-w-md mb-8`}
          >
            <input
              type="text"
              placeholder="Search extensions..."
              className={`
                w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all
                bg-white dark:bg-gray-900 text-gray-900 dark:text-white
              `}
            />
            <motion.div 
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
          </motion.div>

          {isMobile && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mb-10 w-full"
            >
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">150+</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 text-center">Available Extensions</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 text-center">Active Users</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 text-center">Customer Support</div>
              </div>
            </motion.div>
          )}

          {isTablet && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-row gap-8 mb-10 w-full"
            >
              <div className="flex flex-col items-center justify-center gap-2 w-1/2">
                <svg className="w-12 h-12 mb-2 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back</h2>
                <p className="text-gray-600 dark:text-gray-300 text-center">Sign in to access your store and explore our marketplace</p>
                <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                <motion.button
                  onClick={handleLoginAction}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    w-full py-3 rounded-lg flex items-center justify-center bg-white dark:bg-gray-900
                    cursor-pointer gap-3 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-800 transition-all
                  `}
                >
                  <FcGoogle className="text-xl" />
                  <p className="font-medium">Sign in with Google</p>
                </motion.button>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-4"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    By signing in, you agree to our <span className="text-blue-600 dark:text-blue-400 cursor-pointer">Terms of Service</span> and <span className="text-blue-600 dark:text-blue-400 cursor-pointer">Privacy Policy</span>
                  </p>
                </motion.div>
              </div>
              <div className="flex flex-col justify-center gap-6 w-1/2">
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">150+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Available Extensions</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Customer Support</div>
                </div>
              </div>
            </motion.div>
          )}

          {isDesktop && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-row gap-8 mb-10 w-full lg:w-auto"
            >
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">150+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Available Extensions</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Customer Support</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {isDesktop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`
              w-full flex items-center justify-center px-6 relative z-10
              lg:w-2/5 lg:-ml-48
            `}
            style={{
              minHeight: "80vh",
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`
                w-full max-w-md p-8 lg:p-10 rounded-xl backdrop-blur-xl flex flex-col items-center justify-center gap-6
                bg-white dark:bg-gray-800 shadow-xl
              `}
              style={{ 
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center justify-center gap-2 w-full"
              >
                <svg className="w-12 h-12 mb-2 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor"/>
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back</h2>
                <p className="text-gray-600 dark:text-gray-300 text-center">Sign in to access your store and explore our marketplace</p>
              </motion.div>
              <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <motion.button
                onClick={handleLoginAction}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  w-full py-3 rounded-lg flex items-center justify-center bg-white dark:bg-gray-900
                  cursor-pointer gap-3 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition-all
                `}
              >
                <FcGoogle className="text-xl" />
                <p className="font-medium">Sign in with Google</p>
              </motion.button>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-4"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our <span className="text-blue-600 dark:text-blue-400 cursor-pointer">Terms of Service</span> and <span className="text-blue-600 dark:text-blue-400 cursor-pointer">Privacy Policy</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {(isMobile || isTablet) && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `url(${LoginBG})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
            filter: "blur(1px)",
          }}
        />
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 w-full text-center lg:hidden"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Business App. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default Authentication;