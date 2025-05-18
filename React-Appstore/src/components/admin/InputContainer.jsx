import React from "react";
import ResponsiveComponent from "../../hooks/responsive/useResponsive";
import { FiSearch } from "react-icons/fi";

const InputContainer = ({ onChangeText, placeholder, stateValue }) => {
  const handleChange = (e) => {
    onChangeText(e.target.value);
  };

  const width = ResponsiveComponent();
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch size={18} />
      </span>
      <input
        className={`pl-10 pr-4 ${
          width <= 768
            ? "text-sm font-normal w-full h-10 rounded-xl outline-none border border-transparent shadow bg-white/90 focus:ring-2 focus:ring-blue-400 transition"
            : "w-full h-12 rounded-2xl outline-none border border-transparent shadow bg-white/90 px-4 text-base font-medium focus:ring-2 focus:ring-blue-400 transition"
        }`}
        type="text"
        placeholder={placeholder}
        value={stateValue}
        onChange={handleChange}
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />
    </div>
  );
};

export default InputContainer;
