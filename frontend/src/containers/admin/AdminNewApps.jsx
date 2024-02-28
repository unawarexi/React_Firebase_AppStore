import React, { useState } from "react";
import { InputContainer } from "../../components/ExpComp";

const AdminNewApps = () => {
  const [Title, setTitle] = useState("");
  const [Company, setCompany] = useState("");
  const [AppIcon, setAppIcon] = useState("");
  const [Reviews, setReviews] = useState("");
  const [TotalReviews, setTotalReviews] = useState("");
  const [Download, setDownload] = useState("");
  const [Cover, setCover] = useState("");
  const [Banners, setBanners] = useState([]);
  const [ShortDescription, setShortDescription] = useState("");

  return (
    <div className="w-full flex flex-col items-center justify-start px-2 py-3 gap-2">
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App title"
        onChangeText={(data) => setTitle(data)}
      />

      <div className="w-full flex flex-col items-center justify-center">
        



      </div>
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="Company Name"
        onChangeText={(data) => setCompany(data)}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Icon Url"
        onChangeText={(data) => setAppIcon(data)}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Reviews"
        onChangeText={(data) => setReviews(data)}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Total Reviews"
        onChangeText={(data) => setTotalReviews(data)}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Total downloads"
        onChangeText={(data) => setDownload(data)}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="cover image URL"
        onChangeText={(data) => setCover(data)}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Short Description"
        onChangeText={(data) => setShortDescription(data)}
      />
      <textarea
        name=""
        id=""
        cols="0"
        rows="10"
        value={ShortDescription}
        onChange={(e) => setShortDescription(e.target.value) }
        placeholder="Description here"
        className="w-full roundd-md outline-none border border-third shadow-md bg-secondary
      px-4 text-lg font-semibold font-sans "
      />
    </div>
  );
};

export default AdminNewApps;
