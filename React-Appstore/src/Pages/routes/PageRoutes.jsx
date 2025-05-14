import React from "react";
import { Route } from "react-router-dom";
import CategoryScreen from "../CategoryScreen";
import MainHome from "../MainHome";
import Social from "../social/Social"; // import Social

// This component returns the category-related routes
const CategoryRoutes = () => (
  <>
    <Route path="/category/:categoryId" element={<CategoryScreen />} />
    <Route path="/category/:categoryId/:subCategoryId" element={<CategoryScreen />} />
    <Route path="/category/apps/for-you" element={<MainHome />} />
    <Route path="/category/games/for-you" element={<MainHome />} />
    <Route path="/category/social" element={<Social />} /> 
  </>
);

export default CategoryRoutes;
