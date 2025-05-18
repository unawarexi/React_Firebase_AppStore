/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import useApps from "../../hooks/apps/UseApps";
import { AppDetailBanner, MainLoader } from "../../components/ExpComp";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Icons
import { 
  MdArrowForward, 
  MdStar, 
  MdStarHalf, 
  MdStarOutline, 
  MdDownload, 
  MdUpdate, 
  MdCalendarToday, 
  MdPhoneAndroid, 
  MdLaptop, 
  MdTablet, 
  MdShare, 
  MdInfo, 
  MdSecurity, 
  MdLock, 
  MdDeleteOutline, 
  MdPeople,
  MdVerified,
  MdExpandMore,
  MdExpandLess
} from "react-icons/md";

// Import styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Mock data for reviews and comments (would be fetched from an API in a real app)
import { reviewsData } from "../../utils/data/AppReviews"; 

const AppDetailPage = () => {
  const { appid } = useParams();
  const [LoadedApp, setLoadedApp] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [expandedSection, setExpandedSection] = useState(null);
  const [ratingPercentages, setRatingPercentages] = useState([0, 0, 0, 0, 0]);
  const [showAllComments, setShowAllComments] = useState(false);
  
  // References for scroll
  const overviewRef = useRef(null);
  const reviewsRef = useRef(null);
  const dataPrivacyRef = useRef(null);
  
  // Intersection observers for animations
  const [ratingRef, ratingInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
  }, [apps, appid]);

  // Load reviews
  useEffect(() => {
    if (LoadedApp) {
      // In real app, you'd fetch reviews based on the appid
      let appReviews = reviewsData.filter(review => review.appId === appid);
      // Fallback for demo/mock: if no reviews for this appid, use the mock appId "123456"
      if (appReviews.length === 0) {
        appReviews = reviewsData.filter(review => review.appId === "123456");
      }
      setReviews(appReviews);
    }
  }, [LoadedApp, appid]);

  // Calculate initial rating percentages
  useEffect(() => {
    if (reviews.length) {
      setRatingPercentages(
        [5, 4, 3, 2, 1].map(rating => {
          const count = reviews.filter(review => Math.floor(review.rating) === rating).length;
          return (count / reviews.length) * 100;
        })
      );
    }
  }, [reviews]);

  // Animate rating bars every 30 seconds
  useEffect(() => {
    if (!reviews.length) return;
    const interval = setInterval(() => {
      setRatingPercentages(prev =>
        prev.map(percent => {
          // Randomly increase or decrease by up to 10%, clamp between 5% and 95%
          const change = (Math.random() - 0.5) * 10;
          let next = percent + change;
          if (next < 5) next = 5;
          if (next > 95) next = 95;
          return Math.round(next * 10) / 10;
        })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Scroll handling for tabs
  const scrollToSection = (section) => {
    setActiveTab(section);
    if (section === "overview" && overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "reviews" && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "privacy" && dataPrivacyRef.current) {
      dataPrivacyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter reviews based on device
  const filteredReviews = deviceFilter === "all" 
    ? reviews 
    : reviews.filter(review => review.device === deviceFilter);

  // Load more reviews
  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 5);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<MdStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<MdStarOutline key={i} className="text-gray-400" />);
      }
    }
    
    return stars;
  };

  // Rating distribution calculation
  const calculateRatingPercentage = (rating) => {
    if (!reviews.length) return 0;
    const count = reviews.filter(review => Math.floor(review.rating) === rating).length;
    return (count / reviews.length) * 100;
  };

  // User comments logic
  const userComments = reviews; // All reviews are comments in this mock
  const displayedComments = showAllComments ? userComments : userComments.slice(0, 4);

  if (appsLoading) {
    return <MainLoader />;
  }
  
  return (
    <div className="overflow-y-scroll scrollbar-none h-auto bg-white dark:bg-gray-900">
      <AppDetailBanner LoadedApp={LoadedApp} />

      {/* Sticky Navigation Bar */}
      <motion.div 
        className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              {LoadedApp?.AppIcon && (
                <img 
                  src={LoadedApp.AppIcon} 
                  alt={LoadedApp.Title} 
                  className="w-10 h-10 rounded-lg"
                />
              )}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-xs">
                {LoadedApp?.Title}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center"
              >
                <MdDownload className="mr-2" /> Install
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-200 text-gray-900 rounded-full dark:bg-gray-700 dark:text-white"
              >
                <MdShare />
              </motion.button>
            </div>
          </div>
          
          <div className="flex space-x-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <button 
              className={`text-sm font-medium ${activeTab === "overview" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => scrollToSection("overview")}
            >
              Overview
            </button>
            <button 
              className={`text-sm font-medium ${activeTab === "reviews" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => scrollToSection("reviews")}
            >
              Reviews
            </button>
            <button 
              className={`text-sm font-medium ${activeTab === "privacy" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => scrollToSection("privacy")}
            >
              Data Safety
            </button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 lg:px-8 py-6">
          {/* Left section - Main content */}
          <div className="col-span-12 lg:col-span-8 flex flex-col items-center justify-start gap-6">
            {/* Overview Section */}
            <section ref={overviewRef} className="w-full">
              {/* Screenshots Slider */}
              <motion.div 
                className="w-full overflow-hidden rounded-xl my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  grabCursor={true}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                  }}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper"
                >
                  {LoadedApp?.Banners &&
                    LoadedApp?.Banners?.map((img, index) => (
                      <SwiperSlide key={index}>
                        <motion.div 
                          className="duration-200 w-full h-64 rounded-lg overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <img
                            src={img?.uri}
                            className="w-full h-full object-cover rounded-lg"
                            alt={`Screenshot ${index + 1}`}
                          />
                        </motion.div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </motion.div>

              {/* App Info Cards */}
              <motion.div 
                className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 my-6"
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {/* Downloads */}
                <motion.div 
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 }}
                >
                  <MdDownload className="text-3xl text-blue-500 mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Downloads</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">10M+</p>
                </motion.div>
                
                {/* Age Rating */}
                <motion.div 
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  <MdPeople className="text-3xl text-green-500 mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Age Rating</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">12+</p>
                </motion.div>
                
                {/* Updated On */}
                <motion.div 
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <MdUpdate className="text-3xl text-purple-500 mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Updated On</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Apr 12, 2025</p>
                </motion.div>
              </motion.div>

              {/* About this game */}
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-4 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">About this game</h3>
                    <MdArrowForward className="text-xl text-gray-500 dark:text-gray-400" />
                  </div>
                </div>

                <motion.div
                  className="text-gray-700 dark:text-gray-300 space-y-4"
                  initial={{ height: "auto" }}
                  animate={{ height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-medium">The Ultimate AAA Shooter Available Worldwide!</p>
                  <p>Now, blow it ALL up!</p>
                  
                  <AnimatePresence>
                    {showFullDescription && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-300">
                          [First Mobile Warfare: In All Out 24v24 Combat]<br/>
                          Experience never-seen-before modern wars on mobile in this epic All-Out Warfare. 48 players clash across land, sea, and air. Pilot a variety of vehicles including jets, helicopters, tanks, and more across massive detailed battlefields.
                        </p>
                        
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">KEY FEATURES:</h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Experience intense 24v24 multiplayer battles</li>
                            <li>Command powerful vehicles across diverse environments</li>
                            <li>Customize your loadout with over 70 weapons</li>
                            <li>Progress through an immersive ranking system</li>
                            <li>Join weekly events and seasonal content</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.button
                    className="text-blue-600 dark:text-blue-400 flex items-center mt-2"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showFullDescription ? (
                      <>
                        Show less <MdExpandLess className="ml-1" />
                      </>
                    ) : (
                      <>
                        Read more <MdExpandMore className="ml-1" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Available on section */}
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-4 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Available on</h3>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <MdPhoneAndroid className="text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Android</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                    <MdLaptop className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Windows</span>
                  </div>
                </div>
              </motion.div>

              {/* Tags/Categories */}
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Tags</h3>
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">#1 top free action</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">Action</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">Shooter</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">Tactical shooter</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">Realistic</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">Weapons</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm">Gun</span>
                </div>
              </motion.div>

              {/* What's New Section */}
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-4 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What's New</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Version 2.8.5</span>
                </div>
                
                <div className="text-gray-700 dark:text-gray-300 space-y-2">
                  <p className="text-sm">Latest update includes:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>New map: Urban Jungle</li>
                    <li>5 new weapons including the XM5 and SR-25</li>
                    <li>Performance optimizations</li>
                    <li>Bug fixes and stability improvements</li>
                  </ul>
                </div>
              </motion.div>
            </section>

            {/* Reviews Section */}
            <section ref={reviewsRef} className="w-full mb-8">
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-6 bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                ref={ratingRef}
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                    Ratings and reviews 
                    <span className="ml-2 flex items-center text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-lg">
                      <MdVerified className="text-blue-500 mr-1" /> Verified
                    </span>
                  </h3>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rating Summary */}
                  <motion.div 
                    className="flex flex-col items-center justify-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={ratingInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-6xl font-bold text-gray-900 dark:text-white">4.5</h2>
                    <div className="flex items-center">
                      {renderStars(4.5)}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">99.1K reviews</p>
                  </motion.div>

                  {/* Rating Bars */}
                  <motion.div 
                    className="flex flex-col gap-2 justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={ratingInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {[5, 4, 3, 2, 1].map((rating, idx) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400 w-3">{rating}</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full"
                            style={{
                              background: "linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
                            }}
                            initial={false}
                            animate={{ width: `${ratingPercentages[idx]}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Device Filter */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm ${deviceFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                    onClick={() => setDeviceFilter("all")}
                  >
                    All reviews
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full text-sm flex items-center ${deviceFilter === "phone" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                    onClick={() => setDeviceFilter("phone")}
                  >
                    <MdPhoneAndroid className="mr-1" /> Phone
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full text-sm flex items-center ${deviceFilter === "chromebook" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                    onClick={() => setDeviceFilter("chromebook")}
                  >
                    <MdLaptop className="mr-1" /> Chromebook
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full text-sm flex items-center ${deviceFilter === "tablet" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                    onClick={() => setDeviceFilter("tablet")}
                  >
                    <MdTablet className="mr-1" /> Tablet
                  </button>
                </div>

                {/* Reviews List */}
                <div className="w-full mt-4 space-y-4">
                  <AnimatePresence>
                    {filteredReviews.slice(0, visibleReviews).map((review, index) => (
                      <motion.div 
                        key={review.id}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-gray-900 dark:text-white">
                            {review.username.charAt(0).toUpperCase()}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-gray-900 dark:text-white">{review.username}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                            </div>
                            
                            <div className="flex items-center mt-1">
                              {renderStars(review.rating)}
                            </div>
                            
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p>

                            {review.developerResponse && (
                              <div className="mt-3 pl-4 border-l-2 border-blue-500">
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Developer response:</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{review.developerResponse}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {filteredReviews.length > visibleReviews && (
                    <div className="flex justify-center mt-6">
                      <motion.button
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium"
                        onClick={loadMoreReviews}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Load more reviews
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </section>

            {/* Data Safety Section */}
            <section ref={dataPrivacyRef} className="w-full mb-8">
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">Data safety</h3>
                    <MdArrowForward className="text-xl text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Safety starts with understanding how developers collect and share your data. 
                  Data privacy and security practices may vary based on your use, region, and age. 
                  The developer provided this information and may update it over time.
                </p>

                {/* Data Safety Items */}
                <div className="w-full space-y-4 mt-2">
                  {/* No data shared */}
                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(229, 231, 235, 0.7)" }}
                    onClick={() => toggleSection("sharing")}
                  >
                    <div className="text-gray-700 dark:text-gray-300 mt-1">
                      <MdShare className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">No data shared with third parties</h4>
                        {expandedSection === "sharing" ? (
                          <MdExpandLess className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdExpandMore className="text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Learn more about how developers declare sharing</p>
                      
                      <AnimatePresence>
                        {expandedSection === "sharing" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <p>
                              This app doesn't share your data with other companies or organizations.
                              The developer has certified that they don't share user data with third parties.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  
                  {/* Data collection */}
                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(229, 231, 235, 0.7)" }}
                    onClick={() => toggleSection("collection")}
                  >
                    <div className="text-gray-700 dark:text-gray-300 mt-1">
                      <MdInfo className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">This app may collect these data types</h4>
                        {expandedSection === "collection" ? (
                          <MdExpandLess className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdExpandMore className="text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location, Photos and videos and 2 others</p>
                      
                      <AnimatePresence>
                        {expandedSection === "collection" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="font-medium">Location:</span> 
                                <span>Approximate location is used to find servers with the lowest latency for multiplayer games</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="font-medium">Photos and videos:</span> 
                                <span>Only accessed if you choose to share screenshots or clips</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="font-medium">App activity:</span> 
                                <span>Used for analytics and crash reporting</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="font-medium">Device ID:</span> 
                                <span>Used for account verification and anti-cheat measures</span>
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  
                  {/* Data encryption */}
                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(229, 231, 235, 0.7)" }}
                    onClick={() => toggleSection("encryption")}
                  >
                    <div className="text-gray-700 dark:text-gray-300 mt-1">
                      <MdLock className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">Data is encrypted in transit</h4>
                        {expandedSection === "encryption" ? (
                          <MdExpandLess className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdExpandMore className="text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {expandedSection === "encryption" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <p>
                              Data is encrypted during transmission using industry-standard TLS protocols.
                              This helps prevent unauthorized access to your data while it's being sent to our servers.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  
                  {/* Data deletion */}
                  <motion.div 
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(229, 231, 235, 0.7)" }}
                    onClick={() => toggleSection("deletion")}
                  >
                    <div className="text-gray-700 dark:text-gray-300 mt-1">
                      <MdDeleteOutline className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">You can request that data be deleted</h4>
                        {expandedSection === "deletion" ? (
                          <MdExpandLess className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdExpandMore className="text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {expandedSection === "deletion" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <p>
                              You can request deletion of your account and associated data through the app's settings menu or by contacting our support team.
                              Data deletion requests are typically processed within 30 days.
                            </p>
                            <motion.button
                              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              See details
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </section>
            
            {/* Legal Information */}
            <section className="w-full mb-8">
              <motion.div 
                className="w-full flex flex-col items-start justify-start gap-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Legal</h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All content, including text, images, graphics, and multimedia
                  files, displayed on this website/application, is protected by
                  copyright law and owned by {LoadedApp?.Company}. No part
                  of this content may be reproduced, distributed, modified, or
                  transmitted in any form or by any means, including electronic,
                  mechanical, photocopying, recording, or otherwise, without prior
                  written permission from the copyright owner. Unauthorized use of
                  this content may result in legal action. All rights reserved.
                  {LoadedApp?.Company} © 2025
                </p>
              </motion.div>
            </section>
          </div>

          {/* Right section - Similar apps */}
          <div className="col-span-12 lg:col-span-4 h-full px-2 py-4 hidden lg:flex flex-col items-start justify-start gap-4 sticky top-24">
            <motion.div 
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Similar Apps</h3>
                  <MdArrowForward className="text-xl text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                {apps &&
                  apps
                    .filter((game) => game._id !== appid)
                    .slice(0, 5)
                    .map((value, index) => (
                      <motion.div
                        className="w-full flex items-start gap-3 p-2 rounded-lg cursor-pointer"
                        key={index}
                        whileHover={{ backgroundColor: "rgba(229, 231, 235, 0.3)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={value?.AppIcon}
                          className="w-16 h-16 rounded-xl object-cover"
                          alt=""
                        />
                        <div className="flex flex-col items-start justify-center gap-1">
                          <p className="text-base font-medium text-gray-900 dark:text-white line-clamp-1">
                            {value?.Title}
                          </p>
                          <div className="flex items-center justify-start gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <MdStar 
                                  key={i} 
                                  className={i < Math.floor(value?.Reviews || 4) ? "text-yellow-400" : "text-gray-400 dark:text-gray-600"} 
                                />
                              ))}
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {value?.Downloads || "10M+"}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">
                            {value?.Category || "Action, Shooter"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
              </div>
              
              <motion.button
                className="w-full mt-4 py-2 text-center text-blue-600 dark:text-blue-400 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See more
              </motion.button>
            </motion.div>
            
            {/* Developer Info */}
            <motion.div 
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mt-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Developer</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {LoadedApp?.Company ? LoadedApp.Company.charAt(0) : "D"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{LoadedApp?.Company || "Developer Name"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Top Developer</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Contact</p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm">support@developer.com</a>
                </div>
                
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Privacy Policy</p>
                  <a href="#" className="text-blue-600 dark:text-blue-400 text-sm">View privacy policy</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetailPage;