/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import {
  AdminApps,
  AdminHome,
  AdminUsers,
  AppDetailPage,
  Authentication,
  Home,
  UserProfile,
} from "./Pages/ExpPages";
import { AdminLayout, AuthLayout, Layouts } from "./layouts/ExpLayouts";
// import { auth } from "./config/Firebase.config";

// Remove old react-query imports
// import { QueryClient, QueryClientProvider, useQuery } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// Add @tanstack/react-query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CategoryRoutes from "./Pages/routes/PageRoutes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Routes>
            {/* {====== CLIENT USER ROUTE ======= } */}
            <Route element={<Layouts />}>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:appid" element={<AppDetailPage />} />
              <Route path="/profile/:uid" element={<UserProfile />} />

              {/* === CATEGORY ROUTES === */}
              {CategoryRoutes()}

              {/* === ADMIN ROUTE === */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="home" element={<AdminHome />} />
                <Route path="apps" element={<AdminApps />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>

              {/* === AUTHENTICATION ROUTE === */}
              <Route path="/auth/*" element={<AuthLayout />}>
                <Route index element={<Authentication />} />
              </Route>
            </Route>
          </Routes>
          {/* ================= END OF LAYOUT ROUTE ================== */}
        </div>
      </Suspense>

      {/* ================= Devtools to handle the state library ================== */}
      <ReactQueryDevtools initialIsOpen={false} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </QueryClientProvider>
  );
};

export default App;
