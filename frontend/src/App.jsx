import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import {Home} from "./Pages/ExpComp"

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-sreen h-screen items-center flex justify-center text-blue-600 font-semibold">
        <Routes>
          <Route  element={<Layouts />} >
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
