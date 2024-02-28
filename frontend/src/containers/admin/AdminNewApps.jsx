import React, { useState } from "react";
import { InputContainer } from "../../components/ExpComp";

const AdminNewApps = () => {
  const [Title, setTitle] = useState("");
  console.log(Title);

  return (
    <div className="w-full flex flex-col items-center justify-start px-2 py-3">
      AdminNewApps
      <InputContainer
        placeholder="App title"
        onChangeText={(data) => setTitle(data)}
      />
    </div>
  );
};

export default AdminNewApps;
