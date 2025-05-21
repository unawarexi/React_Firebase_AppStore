/* eslint-disable no-unused-vars */
import { motion, useAnimation } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useResponsive from '../../hooks/responsive/useResponsive';

// Copy gamesCol3 from appGrid.jsx
const gamesCol3 = [
  {
    id: 6,
    title: "Diablo Immortal",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 4.2,
    thumbnail: "https://youtu.be/o5cz6nEsr_U",
    logo: "https://play-lh.googleusercontent.com/A_QC0wIirHO1pFegbvD2Dvh68vh-YVXf_flU1QAaG5BXB87zC9RJhQL4vT6ztn1Cb6c=s96-rw",
    thumbnailImage: "https://play-lh.googleusercontent.com/ZZmy2vdyWLIQ3Uw_u4s-IBMwyXCtpX-oktF2zNZ9hYwuHY9Pub5RO7soD6LSAMKnkg=w1052-h592-rw"
  },
  {
    id: 7,
    title: "Tomorrow: MMO Nuclear Quest",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 4.9,
    thumbnail: "https://youtu.be/zvAbhs1bU8E",
    logo: "https://play-lh.googleusercontent.com/lmZLYjEVapGq2I5tWc9GiTtzImhfxqHHVO7n2U1Y5ZPtPBhoWOvzSK2q5wgP7Ab9dMc=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/zvAbhs1bU8E/hqdefault.jpg"
  },
  {
    id: 8,
    title: "Fruit Ninja®",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.2,
    thumbnail: "https://youtu.be/K1yxIY0kgXg",
    logo: "https://play-lh.googleusercontent.com/eJ9OJnbRer1jjg5ZeNAnTXKcGd2B_NEqxCp2UsefcCABeFBaj_pNl_WKYBjup2GVGGc=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/K1yxIY0kgXg/hqdefault.jpg"
  },
  {
    id: 9,
    title: "World War Heroes — WW2 PvP FPS",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.2,
    thumbnail: "https://youtu.be/fet0KeSSNqU",
    logo: "https://play-lh.googleusercontent.com/cNZfRRDMvPv7ws6o_SgMtiSkJGuai0EsaS0Od0AuCWbBwGMM04Gml8PMiu52r_H1xU0=s96-rw",
    thumbnailImage: "https://img.youtube.com/vi/fet0KeSSNqU/hqdefault.jpg"
  },
  {
    id: 10,
    title: "Metalstorm",
    category: "Role Playing",
    subCategory: "Gun",
    rating: 3.2,
    thumbnail: "https://youtu.be/4ASauZeCSzo",
    logo: "https://play-lh.googleusercontent.com/HdlzZEGogG9QZ3SwqXDKGnzPU9cuu38z83L0UOEF9LIE50-pivuKXVAIotyCXDsyJg=s96-rw",
    thumbnailImage: "https://play-lh.googleusercontent.com/TD9i0bqdcU5HN-EXJ3IDFUTu4-vmo5xwgMT-U3NVbIYeedDWlFiPgO4PrYhVPZp1v34=w1052-h592-rw"
  }
];

// StarRating helper
function StarRating({ rating }) {
  const stars = [];

  const rounded = Math.round(rating * 2) / 2;
  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) {
      stars.push(
        <svg key={i} className="w-3 h-3 text-yellow-500 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (i - 0.5 === rounded) {
      stars.push(
        <svg key={i} className="w-3 h-3 text-yellow-500 mr-0.5" viewBox="0 0 24 24">
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
        <svg key={i} className="w-3 h-3 text-gray-300 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
  }
  return <span className="flex items-center">{stars}</span>;
}

// Helper to extract YouTube video ID
function getYouTubeVideoId(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*[\&|\?](?:v=|embed\/)))([^\"^\?^\&^\#]{11})/
  );
  return match && match[1];
}

export default function SubAppGrid() {
  const { isMobile } = useResponsive();
  const games = gamesCol3;
  const [showVideo, setShowVideo] = useState(Array(games.length).fill(false));
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  // Track current index for pagination and animation
  const [currentIndex, setCurrentIndex] = useState(0);

  // Card sizing for mobile: show 85-90% of current card and 10-15% of next card
  const CARD_WIDTH = isMobile ? 0.85 : 1; // 85% of viewport width for mobile, 100% for desktop
  const CARD_GAP = isMobile ? 12 : 16; // Gap between cards in pixels

  const handleToggleVideo = (idx) => {
    setShowVideo((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  // Handle user interaction with carousel
  const handleDragStart = () => {
    setIsPaused(true); // Pause auto-scrolling when user interacts
  };

  const handleDragEnd = () => {
    // Resume auto-scrolling 3 seconds after user interaction ends
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Calculate pixel width of a card (for animation)
  const getCardWidth = () => {
    if (!isMobile || !window) return 0;
    return (window.innerWidth * CARD_WIDTH) + CARD_GAP;
  };

  // Infinite auto-slide circular loop
  useEffect(() => {
    if (!isMobile) return;
    const totalCards = games.length;
    let idx = 0;
    let animationFrameId;
    let lastTimestamp = 0;
    const SLIDE_INTERVAL_MS = 3000;
    const ANIMATION_DURATION_MS = 800;

    const animateCarousel = async (timestamp) => {
      if (!isPaused) {
        if (timestamp - lastTimestamp > SLIDE_INTERVAL_MS) {
          lastTimestamp = timestamp;
          idx = (idx + 1) % totalCards;
          setCurrentIndex(idx);
          await controls.start({
            x: -idx * getCardWidth(),
            transition: { duration: ANIMATION_DURATION_MS / 1000, ease: "easeInOut" }
          });
          if (idx === totalCards - 1) {
            setTimeout(async () => {
              await controls.start({
                x: 0,
                transition: { duration: 0 }
              });
              idx = 0;
              setCurrentIndex(0);
            }, SLIDE_INTERVAL_MS);
          }
        }
      }
      animationFrameId = requestAnimationFrame(animateCarousel);
    };

    animationFrameId = requestAnimationFrame(animateCarousel);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, games.length, controls, isPaused]);

  // Make sure we account for window resize
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      // Recalculate position based on current card index
      controls.set({ x: -currentIndex * getCardWidth() });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, controls, currentIndex]);

  return (
    <div className="w-full">
      <div
        className={isMobile ? "overflow-hidden w-full px-4" : "w-full px-0 mx-0"}
        style={isMobile ? { WebkitOverflowScrolling: 'touch' } : {}}
      >
        <motion.div
          ref={containerRef}
          className={
            isMobile
              ? "flex gap-3 w-full select-none"
              : "grid grid-cols-3 gap-4 w-full"
          }
          drag={isMobile ? "x" : false}
          dragConstraints={isMobile ? { 
            left: -((games.length - 1) * getCardWidth()), 
            right: 0 
          } : undefined}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={isMobile ? { cursor: 'grab' } : {}}
        >
          {games.map((game, idx) => (
            <motion.div 
              key={game.id}
              className={
                "rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-500 flex-shrink-0 " +
                (isMobile ? `w-[${CARD_WIDTH * 100}vw]` : "")
              }
              style={isMobile ? { 
                width: `${CARD_WIDTH * 100}vw`,
                marginRight: `${CARD_GAP}px`
              } : {}}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                {!showVideo[idx] ? (
                  <>
                    <img
                      src={game.thumbnailImage}
                      alt={`${game.title} thumbnail`}
                      className="w-full object-cover aspect-video"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center focus:outline-none"
                      onClick={() => handleToggleVideo(idx)}
                    >
                      <div className="bg-black bg-opacity-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center focus:outline-none"
                      onClick={() => handleToggleVideo(idx)}
                    >
                      <div className="bg-black bg-opacity-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="5" width="4" height="14" />
                          <rect x="14" y="5" width="4" height="14" />
                        </svg>
                      </div>
                    </button>
                  </>
                )}
                {game.badge && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold rounded px-1.5 py-0.5">
                    {game.badge}
                  </div>
                )}
              </div>
              <div className={
                "flex items-center bg-gray-200 dark:bg-gray-800 " +
                (isMobile ? "p-2 gap-2" : "p-3")
              }>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden mr-2 sm:mr-3">
                  <img 
                    src={game.logo} 
                    alt={`${game.title} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-xs sm:text-sm text-gray-800 dark:text-white truncate">{game.title}</h3>
                  <div className="flex text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                    <span>{game.category}</span>
                    {game.subCategory && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{game.subCategory}</span>
                      </>
                    )}
                    {game.status && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{game.status}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center ml-1">
                  <StarRating rating={game.rating} />
                  <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 ml-1">{game.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Pagination indicators for mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          {games.map((_, idx) => (
            <button
              key={idx}
              className="w-2 h-2 mx-1 rounded-full bg-gray-300 focus:outline-none"
              style={{
                backgroundColor: currentIndex === idx 
                  ? '#6B7280' 
                  : '#D1D5DB'
              }}
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex(idx);
                controls.start({ 
                  x: -idx * getCardWidth(),
                  transition: { duration: 0.5, ease: "easeInOut" }
                });
                setTimeout(() => setIsPaused(false), 3000);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}