import React, { useState } from "react";
import { InputContainer } from "../../components/ExpComp";
import { FaMinus, FaPlus } from "react-icons/fa6";

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

  const bannerHnadleChange = (id, value) => {
    const updated = Banners.map((item) =>
      item.id === id ? { ...item, uri: value } : item
    );
    setBanners(updated);
  };

  const handleAddInput = () => {
    const newInput = {
      id: Banners.length + 1,
      uri: "",
    };

    setBanners((preState) => [...preState, newInput]);
  };

  const handleRemoveInput = (id) => {
    const updatedBanners = Banners.filter((item) => item.id !== id);
    setBanners(updatedBanners);
  };

  const saveAllField = () => {
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      Title,
      Company,
      Reviews,
      TotalReviews,
      Download,
      Cover,
      Banners,
      ShortDescription,
    };

    console.log(_doc)
  };

  const clearAllField = () => {};

  return (
    <div className="w-full flex flex-col items-center justify-start px-2 py-3 gap-4">
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App title"
        onChangeText={(data) => setTitle(data)}
      />

      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="cover image URL"
        onChangeText={(data) => setCover(data)}
      />

      <div
        className="w-full flex flex-col items-center justify-center p-2 border border-gray-600 border-dashed
       rounded-md gap-2"
      >
        {Banners.map((input) => (
          <div
            className="w-full flex items-center justify-center gap-2"
            key={input.id}
          >
            <input
              className="w-full h-12 rounded-md outline-none border border-third shadow-md bg-secondary
            px-4 text-lg font-semibold font-sans "
              type="text"
              placeholder={"Banner image URL"}
              value={input.uri}
              onChange={(e) => bannerHnadleChange(input.id, e.target.value)}
            />
            <div
              className=" w-10 h-10 rounded-md flex items-center justify-center bg-red-400 cursor-pointer"
              onClick={() => handleRemoveInput(input.id)}
            >
              <FaMinus className="text-textPrimary" />
            </div>
          </div>
        ))}

        <div
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={handleAddInput}
        >
          <FaPlus />
        </div>
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

      <textarea
        name=""
        id=""
        cols="0"
        rows="10"
        value={ShortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="Description here"
        className="w-full roundd-md outline-none border border-third shadow-md bg-secondary
      px-4 text-lg font-semibold font-sans "
      />

      <div className="w-full flex items-center justify-end gap-20">
        <button
          type="button"
          className="border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary cursor-pointer hover:text-black transition-all ease-in-out duration-200 active:scale-95"
          onClick={saveAllField}
        >
          Add
        </button>
        <button
          type="button"
          className="border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary cursor-pointer hover:text-black transition-all ease-in-out duration-200 active:scale-95"
          onClick={clearAllField}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default AdminNewApps;
