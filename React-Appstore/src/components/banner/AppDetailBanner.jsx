/* eslint-disable no-useless-escape */
import { FaComputer } from "react-icons/fa6";
import { MdArrowBack, MdBookmarkAdd, MdShare, MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AppDetailBanner = ({ LoadedApp }) => {
  const navigate = useNavigate();

  function getYouTubeVideoId(url) {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*[\&|\?](?:v=|embed\/)))([^\"^\?^\&^\#]{11})/
    );
    return match && match[1];
  }

  return (
    <div className="lg:w-full w-auto lg:h-[550px] m h-[1000px]  bg-[#282828] relative  banner-gradient">
     {LoadedApp?.CoverTrailer && ( // Check if LoadedApp?.CoverTrailer is defined
    <iframe
      className="w-full h-full object-fill banner-gradient"
      src={`https://www.youtube.com/embed/${getYouTubeVideoId(LoadedApp?.CoverTrailer)}?autoplay=1&mute=1&loop=true`}
      title="YouTube video player"
      allowFullScreen
     
    /> 
  )}

      {/* absolute overlay */}
      <div className="banner-gradient absolute inset-0  flex flex-col items-start justify-between z-10 ">
        <div
          className="px-8 pt-8 hover:translate-x-3 duration-200 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack className="text-3xl text-gray-200" />
        </div>
        <div className="w-full px-8 py-12  h-full flex items-start justify-start flex-col gap-5 ">
          {/* Title */}
          <h2 className="text-gray-200 text-xl lg:text-5xl font-medium">
            {LoadedApp?.Title}
          </h2>

          {/* company details */}
          <div className="flex flex-col items-start justify-start">
            <p className=" text-heroSecodary font-medium">
              {LoadedApp?.Company}
            </p>
            <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
              Contains ads
              <span>
                <div className="w-[1px] h-[1px] rounded-full bg-gray-400"></div>
              </span>
              In-app purchases
            </p>
          </div>

          {/* logo , ratings sections */}
          <div className=" lg:flex grid items-center justify-center gap-8">
            <img
              src={LoadedApp?.AppIcon}
              className="  w-24 h-24 rounded-lg object-cover"
              alt=""
            />
            {/* ratings */}
            <div className="flex flex-col lg:items-center lg:justify-center gap-1  items-start justify-start  w-[50%]">
              <p className="text-base font-medium text-gray-200 flex items-center justify-center">
                {LoadedApp?.Reviews}
                <MdStar className="text-gray-200 text-xs" />
              </p>
              <span className="text-[12px]  text-gray-400">
                {LoadedApp?.TotalReviews} reviews
              </span>
            </div>

            {/* downloads */}
            <div className="flex flex-col lg:items-center lg:justify-center gap-1  items-start justify-start  w-[50%]">
              <p className="text-base font-medium text-gray-200">
                {LoadedApp?.Download}
              </p>
              <span className="text-[12px]  text-gray-400">Downloads</span>
            </div>

            {/* rated */}
            <div className="flex flex-col lg:items-center lg:justify-center gap-1  items-start justify-start w-[50%]">
              <p className="text-sm font-medium text-black flex  items-center justify-center bg-gray-200">
                {LoadedApp?.rated}
              </p>
              <span className="text-[12px]  text-gray-400 text-left">
                Rated for: {LoadedApp?.ShortDescription}
              </span>
            </div>
          </div>

          {/* download */}
          <div className="flex items-center justify-center gap-8">
            <button className="border-none outline-none bg-gradient-to-r from-heroPrimary bg-heroSecondory rounded-md px-12 py-2 font-medium">
              Install
            </button>

            <MdShare className=" text-white text-2xl cursor-pointer" />

            <MdBookmarkAdd className="text-heroPrimary text-2xl cursor-pointer" />
          </div>

          <div className="lg:flex grid items-center justify-center flex-wrap gap-8">
            <div className="flex items-center justify-center gap-2">
              <FaComputer className="text-gray-400 text-sm" />
              <p className="text-gray-400 text-xs">
                This app is not available for your device
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/1d_Ubja0DGaHuhzY8zJga9oG7gS0xwPomKryvehUMEnT667MbNI_SIV2uf6C_BYcX17dlpioO28Qr-dq9ngIbUVcOpNxBrF_D9_yJ7mfDRFG5zbN7Q=s1000"
                alt=""
                className="w-4 h-auto object-contain"
              />
              <p className="text-gray-400 text-xs">
                Get items in this app or game with Play Points. Learn more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetailBanner;
