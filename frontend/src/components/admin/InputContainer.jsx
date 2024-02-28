import React, { useState } from "react";

const InputContainer = ({ onChangeText, placeholder }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value)
    onChangeText(e.target.value)

  }
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputContainer;
