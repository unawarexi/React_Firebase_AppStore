import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { AdminHome, Authentication, Home, UserProfile } from "./Pages/ExpPages";
import { AdminLayout, AuthLayout, Layouts } from "./layouts/ExpLayouts";
import { auth } from "./config/Firebase.config";

const App = () => {
  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
      }
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-sreen h-screen items-center flex justify-center text-blue-600 font-semibold">
        <Routes>
          <Route element={<Layouts />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:uid" element={<UserProfile />} />

            {/* === ADMIN ROUTE === */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
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
  );
};

export default App;
