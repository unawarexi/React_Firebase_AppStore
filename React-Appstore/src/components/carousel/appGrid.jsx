/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useResponsive from '../../hooks/responsive/useResponsive';

// Split games into two arrays - keeping original data structure
const gamesCol1 = [
  {
    id: 1,
    title: "Into the Dead 2: Zombie Survival",
    category: "Action",
    status: "Offline",
    rating: 3.5,
    thumbnail: "https://youtu.be/s-5YPH56cQU",
    logo: "https://play-lh.googleusercontent.com/6HYUpw6sUqvP726qcaIuXZRD5_0hAuMTZkAMeBuoaiMPOM7oVBSD8PsGteUe89gP7XY=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/s-5YPH56cQU/hqdefault.jpg"
  },
  {
    id: 2,
    title: "Cover Fire: Offline Shooting",
    category: "Action",
    subCategory: "Millitary combat",
    rating: 4.5,
    thumbnail: "https://youtu.be/Ok4kaHX_EQE",
    logo: "https://play-lh.googleusercontent.com/5NQWxM-Tl0Dq18dKekmre3GWtEu86izDDa7yF3v6pSq8NmgTqai7g8r6Qd5A4euBHg=s96-rw",
    badge: "5+",
    thumbnailImage: "https://img.youtube.com/vi/Ok4kaHX_EQE/hqdefault.jpg"
  },
  {
    id: 3,
    title: "GODDESS OF VICTORY: NIKKE",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 4,
    thumbnail: "https://youtu.be/1Z-XYmxLIas",
    logo: "https://play-lh.googleusercontent.com/p9Kj_jrdcpbYmMgAWuzRIg3mXzkl2IhUDKjvn8xg_vKpumALYVzJ2OmLKxDmKzNfMo8=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/1Z-XYmxLIas/hqdefault.jpg"
  },
  {
    id: 4,
    title: "PUBG MOBILE",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 4.8,
    thumbnail: "https://youtu.be/pDAIE5wy5Lk",
    logo: "https://play-lh.googleusercontent.com/zCSGnBtZk0Lmp1BAbyaZfLktDzHmC6oke67qzz3G1lBegAF2asyt5KzXOJ2PVdHDYkU=s96-rw",
    thumbnailImage: "https://play-lh.googleusercontent.com/czRjvfzYB6jXZwwZzvLWnk5RaECAe2bUCPo3rPTJ4TPCSLfCJ8yjSET7SV_OrxX0kps=w1052-h592-rw"
  },
  {
    id: 5,
    title: "World War: Fight For Freedom",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.8,
    thumbnail: "https://youtu.be/8rSSkQGm_pc",
    logo: "https://play-lh.googleusercontent.com/BeF-GszyMEZgeU7qqxjurDc7f60yleGagLsYj3Rr6-rFrGt7m7rvMLqvIDac45WFQQ=s96-rw",
    thumbnailImage: "https://play-lh.googleusercontent.com/CeO8kOOrw2CWNptw8tJA2IEQJlItnWuix3M7-xp7IlIvq2FOsv-LdadDIRhovcwBUA=w1052-h592-rw"
  }
];

const gamesCol3 = [
  {
    id: 6,
    title: "Mortal Kombat",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 4.2,
    thumbnail: "https://youtu.be/BPtBbi_o8-k",
    logo: "https://play-lh.googleusercontent.com/LSNV5P_C6MafT84ioYM4OykRJkxRAz7roKXZ6Ljc2ApRGUYSgBcp3OxQjfyM4W1RePPy=s96-rw",
    thumbnailImage: "https://play-lh.googleusercontent.com/9V4nZMYRMhDne76w_BvzwSPT038jpZJx1nUlI7iD8BsGBXbB_NoCrm8ROXisyDdvcmI=w1052-h592-rw"
  },
  {
    id: 7,
    title: "Infinity Ops: Cyberpunk FPS",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 4.9,
    thumbnail: "https://youtu.be/Cwt-mEWlKhU",
    logo: "https://play-lh.googleusercontent.com/s1yj6Ryf6ZCkCp2f5i1I6AtAG55aViG2VolXW2Q-TMKLSBBE4KCMvidKsS4fn_0wLxo=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/Cwt-mEWlKhU/hqdefault.jpg"
  },
  {
    id: 8,
    title: "Arena Breakout: Realistic FPS",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.2,
    thumbnail: "https://youtu.be/gFyBZIMfyKk",
    logo: "https://play-lh.googleusercontent.com/WGZQlOqgq70CEtUbvx0CuFZMU3cTFZlGkfdens6vNzexOhsCdL9X0MT4jpruZjHCqg=s104-rw",
    thumbnailImage: "https://img.youtube.com/vi/gFyBZIMfyKk/hqdefault.jpg"
  },
  {
    id: 9,
    title: "Alien: Isolation",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.2,
    thumbnail: "https://youtu.be/aY0mLTj8wC0",
    logo: "https://play-lh.googleusercontent.com/WSWIHB-QdvM9MgaVHf-9BWVIu7kapJOJTU8RqaRdD2157ffEEoKZYhQPwQgJgEQpUtM=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/aY0mLTj8wC0/hqdefault.jpg"
  },
  {
    id: 10,
    title: "Modern Combat 5: mobile FPS",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.2,
    thumbnail: "https://youtu.be/Bmuzjul8wS4",
    logo: "https://play-lh.googleusercontent.com/N5OhX0Em8Uuu5B4JaXKZmwzy-0UUfGiF3OjDxdGic1m49DJyNujFgPFZSa0AJf4hiIKP=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/Bmuzjul8wS4/hqdefault.jpg"
  }
];

// Helper to render stars based on rating
function StarRating({ rating, size = "small" }) {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2;
  
  // Determine star size based on prop
  const starClass = size === "small" ? "w-3 h-3" : "w-4 h-4";
  
  for (let i = 1; i <= 4; i++) {
    if (i <= rounded) {
      stars.push(
        <svg key={i} className={`${starClass} text-yellow-500 mr-0.5`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (i - 0.5 === rounded) {
      stars.push(
        <svg key={i} className={`${starClass} text-yellow-500 mr-0.5`} viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half${i}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill={`url(#half${i})`} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className={`${starClass} text-gray-300 mr-0.5`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
  }
  return <span className="flex items-center">{stars}</span>;
}

export default function GameGrid({ cols = 5 }) {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showVideo, setShowVideo] = useState(Array(10).fill(false));
  const scrollRef = useRef(null);
  
  // Use all games for more content in carousel
  const allGames = [...gamesCol1, ...gamesCol3];
  
  // Select games based on device type and cols
  // On desktop with cols === 1, use gamesCol1
  const games = isMobile
    ? allGames
    : (isDesktop && cols === 1)
      ? gamesCol1
      : (cols === 1 ? gamesCol1 : gamesCol3);
  
  // Track if we're using carousel mode
  // On desktop with cols === 1, do NOT use carousel
  const useCarousel =
    isMobile ||
    (isTablet && cols > 2);
  
  // Track scroll position for carousel indicators
  const [scrollPosition, setScrollPosition] = useState(0);
  const [carouselProgress, setCarouselProgress] = useState(0);
  
  // Function to handle scroll events in carousel mode
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollPosition(scrollLeft);
      setCarouselProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };
  
  // Add scroll event listener for carousel mode
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (useCarousel && scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
      return () => scrollEl.removeEventListener('scroll', handleScroll);
    }
  }, [useCarousel]);
  
  // Helper to scroll horizontally in the carousel
  const scrollToCard = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Helper to extract YouTube video ID
  function getYouTubeVideoId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[\&|\?](?:v=|embed\/)))([^\"^\?^\&^\#]{11})/);
    return match && match[1];
  }
  
  // Toggle video/thumbnail for a specific card
  const handleToggleVideo = (idx) => {
    setShowVideo((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };
  
  // Calculate dynamic styling based on device type
  const getCardStyle = (idx) => {
    if (useCarousel) {
      return {
        width: isMobile ? '85vw' : '45vw',
        marginRight: '16px',
        flexShrink: 0
      };
    }
    return {};
  };
  
  // Function to render the appropriate layout based on device
  const renderGameCards = () => {
    return games.map((game, idx) => (
      <motion.div 
        key={game.id}
        className={`rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ${
          useCarousel ? 'flex-shrink-0' : ''
        }`}
        style={getCardStyle(idx)}
        whileHover={{ scale: isMobile ? 1.02 : 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="relative">
          {/* Show thumbnail or video based on state */}
          {!showVideo[idx] ? (
            <>
              <img
                src={game.thumbnailImage}
                alt={`${game.title} thumbnail`}
                className="w-full object-cover aspect-video"
              />
              {/* Play button overlay */}
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center focus:outline-none"
                onClick={() => handleToggleVideo(idx)}
              >
                <div className="bg-black bg-opacity-50 dark:bg-opacity-60 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform hover:scale-110">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </>
          ) : (
            <>
              <iframe
                className="w-full object-cover aspect-video"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(game.thumbnail)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(game.thumbnail)}`}
                title={game.title}
                allowFullScreen
              />
              {/* Pause button overlay */}
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center focus:outline-none"
                onClick={() => handleToggleVideo(idx)}
              >
                <div className="bg-black bg-opacity-50 dark:bg-opacity-60 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform hover:scale-110">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="5" width="4" height="14" />
                    <rect x="14" y="5" width="4" height="14" />
                  </svg>
                </div>
              </button>
            </>
          )}
          
          {/* Game badge if exists */}
          {game.badge && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded px-1.5 py-0.5">
              {game.badge}
            </div>
          )}
          
          {/* Game branding if applicable */}
          {game.id === 4 && (
            <div className="absolute top-2 left-2 text-white text-xs font-bold">
              NIKKE
            </div>
          )}
        </div>
        
        {/* Card content */}
        <div className={`
          ${isMobile ? 'p-2.5' : 'p-3'} 
          ${isTablet && 'p-2.5'}
          ${cols === 4 || (isMobile && idx % 3 === 0)
            ? 'flex flex-col h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700'
            : 'flex items-center'
          }
        `}>
          {/* Content layout for special cards or mobile featured cards */}
          {(cols === 4 || (isMobile && idx % 3 === 0)) ? (
            <>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden mr-2">
                  <img 
                    src={game.logo} 
                    alt={`${game.title} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <StarRating rating={game.rating} size={isMobile ? "small" : "medium"} />
                  <span className="text-xs text-white">{game.rating}</span>
                </div>
              </div>
              <h3 className="font-medium text-xs sm:text-sm md:text-base text-white line-clamp-1">{game.title}</h3>
              <div className="flex text-xs text-indigo-100 dark:text-indigo-100 mt-1">
                <span className="text-xs">{game.category}</span>
                {game.subCategory && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="text-xs">{game.subCategory}</span>
                  </>
                )}
                {game.status && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="text-xs">{game.status}</span>
                  </>
                )}
              </div>
            </>
          ) : (
            // Regular card layout
            <>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden mr-2 md:mr-3 flex-shrink-0">
                <img 
                  src={game.logo} 
                  alt={`${game.title} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-800 dark:text-white truncate">{game.title}</h3>
                <div className="flex text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                  <span className="text-xs truncate">{game.category}</span>
                  {game.subCategory && (
                    <>
                      <span className="mx-1 hidden sm:inline">•</span>
                      <span className="text-xs hidden sm:inline truncate">{game.subCategory}</span>
                    </>
                  )}
                  {game.status && (
                    <>
                      <span className="mx-1 hidden sm:inline">•</span>
                      <span className="text-xs hidden sm:inline">{game.status}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center flex-shrink-0 ml-1">
                <StarRating rating={game.rating} size={isMobile ? "small" : "medium"} />
                <span className="text-xs text-gray-700 dark:text-gray-200 ml-1">{game.rating}</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    ));
  };
  
  // Render horizontal carousel for mobile devices
  if (useCarousel) {
    return (
      <div className="w-full py-4 relative">
        {/* Carousel navigation buttons */}
        <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2">
          <button 
            onClick={() => scrollToCard('left')}
            className="bg-white dark:bg-gray-800 rounded-full shadow-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        {/* Carousel container */}
        <motion.div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderGameCards()}
        </motion.div>
        
        {/* Carousel navigation buttons - right */}
        <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2">
          <button 
            onClick={() => scrollToCard('right')}
            className="bg-white dark:bg-gray-800 rounded-full shadow-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="w-full mt-2 flex justify-center">
          <div className="w-1/2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
              style={{ width: `${carouselProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // For tablet and desktop: Responsive grid layout
  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return cols > 3 ? 'grid-cols-2' : `grid-cols-${cols}`;
    // On desktop with cols === 1, force grid-cols-1
    if (isDesktop && cols === 1) return 'grid-cols-1';
    return `grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols}`;
  };
  
  return (
    <div className="w-full">
      <div className={`grid ${getGridCols()} gap-3 md:gap-4 w-full max-w-7xl mx-auto px-2 md:px-4`}>
        {renderGameCards()}
      </div>
    </div>
  );
}