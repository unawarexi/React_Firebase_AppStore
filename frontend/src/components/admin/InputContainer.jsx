import React from "react";
import ResponsiveComponent from "../../hooks/responsive/useResponsive";

const InputContainer = ({ onChangeText, placeholder, stateValue }) => {
  const handleChange = (e) => {
    onChangeText(e.target.value);
  };

  const width = ResponsiveComponent();
  return (
    <input
      className={`${
        width <= 768
          ? " text-sm font-normal w-full h-12 rounded-md outline-none border border-third shadow-md bg-secondary px-4 font-sans"
          : "w-full h-12 rounded-md outline-none border border-third shadow-md bg-secondary px-4 text-lg font-semibold font-sans "
      }`}
      type="text"
      placeholder={placeholder}
      value={stateValue}
      onChange={handleChange}
    />
  );
};

export default InputContainer;
