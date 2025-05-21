/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { InputContainer } from "../../components/ExpComp";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { saveAppDataToCloud } from "../../api/UserApi";
import { serverTimestamp } from "firebase/firestore";
import useUser from "../../hooks/user/UseUser";
import ResponsiveComponent from "../../hooks/responsive/useResponsive";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
    setCoverTrailer("");
    setShortDescription("");
  };

  const width = ResponsiveComponent();

  return (
    <motion.div
      className="w-full h-full flex flex-col gap-6 sm:gap-8 bg-[#f5f7fa] dark:bg-dark-bg shadow-md border border-white/20 transition-colors duration-300 rounded-md px-2 sm:px-4 py-3 sm:py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full h-full bg-white/80 dark:bg-dark-bgSecondary backdrop-blur-md rounded-md shadow-2xl p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 border border-white/20 transition-colors duration-300"
        variants={itemVariants}
        style={{
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
          border: "1.5px solid rgba(255,255,255,0.10)",
          borderRadius: "0.375rem",
        }}
      >
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Add New App
        </motion.h2>

        <motion.div className="flex flex-col gap-3 sm:gap-4" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="App title"
              onChangeText={(data) => setTitle(data)}
              stateValue={Title}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="Cover image URL"
              onChangeText={(data) => setCover(data)}
              stateValue={Cover}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>

          <motion.div
            className="w-full flex flex-col items-center justify-center p-2 sm:p-3 border border-gray-500 dark:border-white/30 border-dashed rounded-xl gap-2 sm:gap-3 bg-white/5"
            variants={itemVariants}
          >
            <div className="w-full flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-white/30 font-semibold">Banners</span>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1 sm:gap-2 cursor-pointer text-green-400 hover:text-green-300"
                onClick={handleAddInput}
              >
                <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Add Banner</span>
              </motion.div>
            </div>
            <AnimatePresence>
              {Banners.map((input) => (
                <motion.div
                  className="w-full flex items-center gap-2 sm:gap-3"
                  key={input.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <input
                    className="w-full h-10 sm:h-12 rounded-lg outline-none border border-white/30 shadow bg-white/10 px-2 sm:px-4 text-sm sm:text-base text-white font-medium font-sans transition-all"
                    type="text"
                    placeholder={"Banner image URL"}
                    value={input.uri}
                    onChange={(e) => bannerHnadleChange(input.id, e.target.value)}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "#f87171" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-red-400/80 cursor-pointer transition-all"
                    onClick={() => handleRemoveInput(input.id)}
                  >
                    <FaMinus className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="Company Name"
              onChangeText={(data) => setCompany(data)}
              stateValue={Company}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="App Icon Url"
              onChangeText={(data) => setAppIcon(data)}
              stateValue={AppIcon}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="App Trailer Url"
              onChangeText={(data) => setCoverTrailer(data)}
              stateValue={CoverTrailer}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="App Reviews"
              onChangeText={(data) => setReviews(data)}
              stateValue={Reviews}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="App Total Reviews"
              onChangeText={(data) => setTotalReviews(data)}
              stateValue={TotalReviews}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <InputContainer
              className="w-full"
              placeholder="App Total downloads"
              onChangeText={(data) => setDownload(data)}
              stateValue={Download}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <textarea
              cols="0"
              rows="7"
              value={ShortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Description here"
              className="w-full rounded-xl outline-none border border-white/30 shadow bg-white/10 px-2 sm:px-4 pt-3 sm:pt-4 text-sm sm:text-base text-white font-medium font-sans resize-none transition-all"
              style={{
                minHeight: "100px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "12px",
                border: "1.5px solid #fff3",
                color: "#fff",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-8 mt-4 sm:mt-6"
          variants={itemVariants}
        >
          <motion.button
            type="button"
            className="w-full sm:w-auto px-4 sm:px-8 py-2 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 text-white font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition-all active:scale-95 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={saveAllField}
          >
            Add
          </motion.button>
          <motion.button
            type="button"
            className="w-full sm:w-auto px-4 sm:px-8 py-2 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 text-white font-semibold shadow-lg hover:from-gray-500 hover:to-gray-700 transition-all active:scale-95 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={clearAllField}
          >
            Clear
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminNewApps;
