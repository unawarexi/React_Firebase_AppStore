import React, { useEffect, useState } from "react";
import useApps from "../hooks/apps/UseApps";
import { AppDetailBanner, MainLoader } from "../components/ExpComp";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdArrowForward, MdStar } from "react-icons/md";

const AppDetailPage = () => {
  const { appid } = useParams();
  const [LoadedApp, setLoadedApp] = useState(null);
  const {
    data: apps,
    isLoading: appsLoading,
    isError: appsError,
    refetch: refetchAllApp,
  } = useApps();

  useEffect(() => {
    if (appid && apps && apps?.length > 0) {
      setLoadedApp(apps.filter((app) => app?._id === appid)[0]);
    }
  }, [apps]);

  if (appsLoading) {
    return <MainLoader />;
  }
  return (
    <div className="overflow-y-scroll scrollbar-none h-auto ">
      <AppDetailBanner LoadedApp={LoadedApp} />

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-8 py-4 ">
        {/* left section */}
        <div className="col-span-12 lg:col-span-8  flex flex-col items-center justify-start gap-3">
          {/* Slider */}
          <div className="w-full  overflow-x-scroll scrollbar-none py-6">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              grabCursor={true}
              centeredSlides={false}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {LoadedApp?.Banners &&
                LoadedApp?.Banners?.map((img, index) => (
                  <SwiperSlide style={{ width: 500 }} key={index}>
                    <div className="duration-200 w-auto h-64 rounded-md  overflow-hidden relative">
                      <img
                        src={img?.uri}
                        className="w-auto h-full object-cover rounded-md"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* about this game */}
          <div className=" lg:w-full h-full flex-wrap flex lg:flex-col items-start justify-start gap-3 py-6 " >

            <div className="flex items-center justify-center gap-12">
              <p className="text-2xl text-gray-300">About this game</p>

              <MdArrowForward className="text-2xl text-gray-300" />
            </div>

            <p className="text-sm md:text-base lg:text-base text-gray-400">
              {LoadedApp?.ShortDescription}
            </p>

            <p className="text-base text-gray-400 bg-slate-600  px-4 py-4 rounded-md">
              All content, including text, images, graphics, and multimedia
              files, displayed on this website/application, is protected by
              copyright law and owned by {LoadedApp?.Company}. No part
              of this content may be reproduced, distributed, modified, or
              transmitted in any form or by any means, including electronic,
              mechanical, photocopying, recording, or otherwise, without prior
              written permission from the copyright owner. Unauthorized use of
              this content may result in legal action. All rights reserved.
              {LoadedApp?.Company} © 2024
            </p>
          </div>

        </div>

        {/* Simillar card section */}
        <div className="col-span-4 h-full px-2 py-4 hidden lg:flex flex-col items-start justify-start gap-4">
          <div className="flex items-center justify-center gap-12">
            <p className="text-2xl text-gray-300">Simillar Apps</p>

            <MdArrowForward className="text-2xl text-gray-300" />
          </div>
          {apps &&
            apps
              .filter((game) => game._id !== appid)
              .map((value, index) => (
                <div
                  className="w-full px-3 py-2 flex items-start justify-start gap-2"
                  key={index}
                >
                  <img
                    src={value?.AppIcon}
                    className="w-12 h-12 rounded-md object-cover"
                    alt=""
                  />
                  <div className="flex flex-col items-start justify-start gap-2">
                    <p className="text-base font-medium text-gray-400">
                      {value?.Title}
                    </p>
                    <div className="flex items-center justify-start gap-1">
                      <p className="text-sm font-medium text-gray-600">
                        {value?.Reviews}
                      </p>
                      <MdStar className="text-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AppDetailPage;
