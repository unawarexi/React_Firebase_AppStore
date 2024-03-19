import React, { useState } from "react";
import { InputContainer } from "../../components/ExpComp";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { saveAppDataToCloud } from "../../api/UserApi";
import { serverTimestamp } from "firebase/firestore";
import useUser from "../../hooks/user/UseUser";

import ResponsiveComponent from "../../hooks/responsive/useResponsive";

const AdminNewApps = () => {
  const [Title, setTitle] = useState("");
  const [Company, setCompany] = useState("");
  const [AppIcon, setAppIcon] = useState("");
  const [Reviews, setReviews] = useState("");
  const [TotalReviews, setTotalReviews] = useState("");
  const [Download, setDownload] = useState("");
  const [Cover, setCover] = useState("");
  const [Banners, setBanners] = useState([]);
  const [CoverTrailer, setCoverTrailer] = useState("");
  const [ShortDescription, setShortDescription] = useState("");

  const { refetch: refetchAllApps } = useUser();

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

  const saveAllField = async () => {
    const id = `${Date.now()}`;
    const timestamp = serverTimestamp();
    const _doc = {
      _id: id,
      Title,
      Company,
      AppIcon,
      Reviews,
      TotalReviews,
      Download,
      Cover,
      Banners,
      CoverTrailer,
      ShortDescription,
      timestamp,
    };

    await saveAppDataToCloud(_doc).then((appData) => {
      clearAllField();
      toast.success("Data saved in the cloud");
      refetchAllApps();
    });
  };

  const clearAllField = () => {
    setTitle("");
    setCompany("");
    setAppIcon("");
    setReviews("");
    setTotalReviews("");
    setDownload("");
    setCover("");
    setBanners([]);
    setCoverTrailer("")
    setShortDescription("");
  };

  const width = ResponsiveComponent();

  return (
    <div className="w-full flex flex-col items-center justify-start px-2 py-3 gap-4">
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3 "
        placeholder="App title"
        onChangeText={(data) => setTitle(data)}
        stateValue={Title}
      />

      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="cover image URL"
        onChangeText={(data) => setCover(data)}
        stateValue={Cover}
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
              className={`${
                width <= 768
                  ? " text-sm font-normal w-full h-12 rounded-md outline-none border border-third shadow-md bg-secondary px-4  font-sans "
                  : "w-full h-12 rounded-md outline-none border border-third shadow-md bg-secondary px-4 text-lg font-semibold font-sans "
              }`}
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
        stateValue={Company}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Icon Url"
        onChangeText={(data) => setAppIcon(data)}
        stateValue={AppIcon}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Trailer Url"
        onChangeText={(data) => setCoverTrailer(data)}
        stateValue={CoverTrailer}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Reviews"
        onChangeText={(data) => setReviews(data)}
        stateValue={Reviews}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Total Reviews"
        onChangeText={(data) => setTotalReviews(data)}
        stateValue={TotalReviews}
      />
      <InputContainer
        className="w-full flex flex-col items-center justify-start px-4 py-3"
        placeholder="App Total downloads"
        onChangeText={(data) => setDownload(data)}
        stateValue={Download}
      />

      <textarea
        name=""
        id=""
        cols="0"
        rows="10"
        value={ShortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="Description here"
        className={`${
          width <= 768
            ? " text-sm font-normal w-full rounded-md outline-none border border-third shadow-md bg-secondary px-4 pt-4 font-sans"
            : "w-full rounded-md outline-none border border-third shadow-md bg-secondary px-4 text-lg font-semibold font-sans"
        }`}
      />

      <div className="w-full flex items-center justify-end gap-20">
        <button
          type="button"
          className="border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary cursor-pointer
           hover:text-black transition-all ease-in-out duration-200 active:scale-95"
          onClick={saveAllField}
        >
          Add
        </button>
        <button
          type="button"
          className="border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary cursor-pointer
           hover:text-black transition-all ease-in-out duration-200 active:scale-95"
          onClick={clearAllField}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default AdminNewApps;
