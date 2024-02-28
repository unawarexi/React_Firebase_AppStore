import React, { useState } from "react";

const InputContainer = ({ onChangeText, placeholder }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value)
    onChangeText(e.target.value)

  }
  return (
    <input
     className="w-full h-12 rounded-md outline-none border border-third shadow-md bg-secondary
      px-4 text-lg font-semibold font-sans "
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputContainer;
