import React from "react";
import { useParams } from "react-router-dom";
import { Ban } from "lucide-react";

const CategoryScreen = () => {
  const { categoryId, subCategoryId } = useParams();

  // You can add logic here to check if the screen is available in the region
  // For now, always show "not available" message
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <Ban size={48} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">
        {subCategoryId ? subCategoryId.replace(/-/g, " ") : categoryId.replace(/-/g, " ")}
      </h2>
      <p className="text-gray-500 text-lg">Screen not available in your region.</p>
    </div>
  );
};

export default CategoryScreen;
