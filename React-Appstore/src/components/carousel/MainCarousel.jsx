/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResponsive from '../../hooks/responsive/useResponsive';

export default function MainCarousel() {
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(true);
  const carouselRef = useRef(null);
  
  const games = [
    {
      id: 1,
      tag: "Now available",
      title: "Survive in a post-apocalyptic world",
      game: "Once Human",
      developer: "Exptional Global",
      ctaText: "Install",
      subtitle: "In-app purchases",
      image: "https://play-lh.googleusercontent.com/Mmb9oOiUi0kW-qLOv6gMVTE-QMktkDN5ZL1bc48r74xUbb5CCOqRGTWnFQLsdc9aCJwN=w1702-h4320-rw",
      logo: "https://play-lh.googleusercontent.com/2kD49Sc5652DmjJNf7Kh17DEXx9HiD2Zz3LsNc6929yTW6VBbGBCr-CQLoOA7iUf6hk=s96-rw"
    },
    {
      id: 2,
      tag: "Ends in 6h",
      title: "Modern war jets flight simulator. Aircraft combat gun shooting battle game.",
      subtitle: "Work hard, fly harder! Celebrate the dedication of worker...",
      game: "Sky Warriors: Airplane Games",
      developer: "Wildlife Studios",
      ctaText: "Install",
      secondaryText: "In-app purchases",
      image: "https://play-lh.googleusercontent.com/Ga9IF3rYQHE1E_vgVlWnMHgw42OTThzJFOO-zPC2a7vHRPQiVBg-bhoBVWEovRcnsg=w1702-h4320-rw",
      logo: "https://play-lh.googleusercontent.com/uJYgqWE0xsznQjTMbG5og41hehR66W0QD-cKUbHgACuAulf8fEm63VrGiSB35Jyrbg=s96-rw"
    },
    {
      id: 3,
      tag: "Ends in 6 days",
      title: "Command 3D tank battles, fight on the...",
      subtitle: "Frontlines Fiesta. Celeb...",
      game: "War Machines",
      developer: "Wildlife Studios",
      ctaText: "Install",
      image: "https://play-lh.googleusercontent.com/xHaU36WnQig-izSgVVHpKt54T6IX6mP7PHGTJeu98HLzVXRB46Ppk4_nCXt5H6Q8pM8=w5120-h2880-rw",
      logo: "https://play-lh.googleusercontent.com/wEgle763Zm8qmttBKYmVyOJ65h4xNOHTgnPXy6-wo1GygMiU_QwGCX9OvzTZB2I82wg=s96-rw"
    }
  ];

  // Check if we can scroll left or right
  const checkScrollButtons = () => {
  
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    // Show left button if we've scrolled to the right
    setShowLeftNav(scrollLeft > 10); // Small threshold to account for rounding
    
    // Show right button if there's more content to scroll to
    setShowRightNav(scrollLeft < scrollWidth - clientWidth - 10); // Buffer for rounding errors
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      // Initial check
      checkScrollButtons();
      
      // Set up ResizeObserver to check buttons when window resizes
      const resizeObserver = new ResizeObserver(() => {
        checkScrollButtons();
      });
      
      resizeObserver.observe(carousel);
      
      return () => {
        carousel.removeEventListener('scroll', checkScrollButtons);
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Handle navigation
  const scrollLeft = () => {
    if (!carouselRef.current) return;
    
    // Calculate a single card's width
    const itemWidth = carouselRef.current.querySelector('.carousel-item')?.offsetWidth || 0;
    const gap = 16; // Gap between items
    carouselRef.current.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    
    // Calculate a single card's width
    const itemWidth = carouselRef.current.querySelector('.carousel-item')?.offsetWidth || 0;
    const gap = 16; // Gap between items
    carouselRef.current.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full mx-auto px-4 py-6">
      {/* Left Navigation Button */}
      <AnimatePresence>
        {showLeftNav && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg ml-1"
            onClick={scrollLeft}
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 sm:pb-4 hide-scrollbar snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {games.map((game) => (
          <div 
            key={game.id} 
            className="carousel-item flex-shrink-0 w-[92%] sm:w-[45%] md:w-[45%] lg:w-[45%] snap-start"
          >
            <div className="bg-black rounded-xl overflow-hidden relative shadow-md h-full">
              {/* Background Image */}
              <div className="relative h-36 sm:h-48 md:h-60">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Tag Overlay */}
                {game.tag && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black bg-opacity-75 text-white text-xs sm:text-sm rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1">
                    {game.tag}
                  </div>
                )}
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 p-2 sm:p-4 text-white">
                  <h2 className="text-base md:text-sm lg:text-xl font-bold leading-tight">{game.title}</h2>
                  {game.subtitle && <p className="text-xs md:text-xs lg:text-sm mt-0.5 sm:mt-1 opacity-80">{game.subtitle}</p>}
                </div>
              </div>
              
              {/* Game Info Bar */}
              <div className="p-2 sm:p-3 flex items-center justify-between bg-black bg-opacity-90 text-white border-t border-gray-800">
                <div className="flex items-center">
                  {/* Game Logo */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden mr-2 sm:mr-3">
                    <img 
                      src={game.logo} 
                      alt={`${game.game} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Game Details */}
                  <div>
                    <div className="font-medium text-xs md:text-xs lg:text-sm">{game.game}</div>
                    <div className="text-[10px] md:text-[11px] lg:text-xs text-gray-400">{game.developer}</div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="flex flex-col items-end">
                  <button className="bg-white text-black rounded-full text-xs md:text-xs lg:text-sm font-medium px-4 sm:px-6 py-1 sm:py-1.5">
                    {game.ctaText}
                  </button>
                  {game.secondaryText && (
                    <span className="text-[10px] md:text-[11px] lg:text-xs text-gray-400 mt-0.5 sm:mt-1">{game.secondaryText}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Navigation Button */}
      <AnimatePresence>
        {showRightNav && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg mr-1"
            onClick={scrollRight}
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}