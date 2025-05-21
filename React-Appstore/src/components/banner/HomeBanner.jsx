import React from "react";
import { Four, One, Three, Two } from "../../assets/image";

import { BiSolidCopyAlt } from "react-icons/bi";
import {
  MdConfirmationNumber,
  MdLogout,
  MdPoll,
  MdSportsBasketball,
  MdSportsFootball,
} from "react-icons/md";
import { FaAward } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeBanner = () => {
  return (
    <div className="w-full rounded-[20px] sm:rounded-[40px] h-44 sm:h-64 xl:h-96 overflow-hidden relative shadow-lg shadow-[rgba(0,0,0,0.6)]">
      {/* slider */}
      <Swiper
        spaceBetween={10}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={One} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Two} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Three} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={Four} />
        </SwiperSlide>
      </Swiper>
      <div className="absolute inset-0 flex items-end justify-end z-10">
        <div className="w-full h-auto px-3 sm:px-8 py-2 sm:py-4 backdrop-blur-md bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.9)] relative flex items-center justify-start gap-2 sm:gap-6 flex-wrap">
          {/*  */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 group">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-textSecondary group-hover:bg-secondary flex items-center justify-center">
              <MdConfirmationNumber className="text-heroPrimary text-base sm:text-lg" />
            </div>
            <p className="text-textSecondary text-xs sm:text-sm group-hover:text-secondary">
              Luck Numbers
            </p>
          </div>
          {/*  */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 group">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-secondary group-hover:bg-secondary flex items-center justify-center">
              <MdSportsFootball className="text-heroPrimary text-base sm:text-lg" />
            </div>
            <p className="text-white text-xs sm:text-sm group-hover:text-secondary">
              Soccer
            </p>
          </div>
          {/*  */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 group">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-textSecondary group-hover:bg-secondary flex items-center justify-center">
              <FaAward className="text-heroPrimary text-base sm:text-lg" />
            </div>
            <p className="text-textSecondary text-xs sm:text-sm group-hover:text-secondary">
              Jacpot
            </p>
          </div>
          {/*  */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 group">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-textSecondary group-hover:bg-secondary flex items-center justify-center">
              <MdPoll className="text-heroPrimary text-base sm:text-lg" />
            </div>
            <p className="text-textSecondary text-xs sm:text-sm group-hover:text-secondary">
              Bet Games
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Slide = ({ image }) => {
  return (
    <div className="w-full h-full relative">
      <img src={image} className="w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-transparent">
        <div className="w-full h-full flex flex-col items-start justify-start px-2 py-1 sm:px-4 sm:py-2 lg:px-8 lg:py-6">
          <h1
            className="text-xs sm:text-base lg:text-3xl font-bold text-white tracking-wide p-1 sm:p-4"
            style={{ textShadow: "5px 5px 8px rgba(0,0,0,0.6)" }}
          >
            We give money for the{" "}
            <span className="block">first registration!</span>
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-base text-white">
            <span className="text-secondary">Free $100!</span> Register and
            enter a special code
          </p>
          <div className="mt-2 sm:mt-3 flex items-center justify-center gap-3 sm:gap-8">
            <div className="px-2 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-dashed border-secondary bg-bgGlobal flex items-center justify-center gap-1 sm:gap-2">
              <BiSolidCopyAlt className="text-secondary text-base sm:text-lg" />
              <p className="text-xs sm:text-sm font-bold text-white">#FREE5</p>
            </div>
            <div className="bg-gradient-to-r from-heroPrimary to-heroSecondory rounded-full px-2 py-1 sm:px-4 sm:py-2 shadow-lg flex items-center justify-center gap-1 sm:gap-2">
              <MdLogout className="text-black text-base sm:text-lg" />
              <p className="text-xs sm:text-sm font-medium text-black">SignUp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
