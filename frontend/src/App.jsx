import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import { AdminHome, Home, UserProfile } from "./Pages/ExpComp";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-sreen h-screen items-center flex justify-center text-blue-600 font-semibold">
        <Routes>
          <Route element={<Layouts />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:uid" element={<UserProfile />} />

            {/* ================= ADMIN ROUTE ================== */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route  index element={<AdminHome />} />
            </Route>
            {/* ================= END OF ADMIN ROUTE ================== */}
          </Route>
        </Routes>
        {/* ================= END OF LAYOUT ROUTE ================== */}
      </div>
    </Suspense>
  );
};

export default App;
