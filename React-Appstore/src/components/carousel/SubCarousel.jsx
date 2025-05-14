/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SubCarousel() {
  // Use the same games data as MainCarousel
  const games = [
    {
      id: 1,
      tag: "Now available",
      title: "Survive in a post-apocalyptic world",
      game: "Pixel Gun 3D - FPS Shooter",
      developer: "Pixel Gun 3D",
      ctaText: "Install",
      subtitle: "In-app purchases",
      image: "https://play-lh.googleusercontent.com/VaL3XYOWLBXy93wd-SjqlDjTk60hLWBvcZOirPvOlqyKl9LoYLP2_qszLbCKge_TzGU=w1702-h4320-rw",
      logo: "https://play-lh.googleusercontent.com/honIuEiw9hT2fvgVmRAwd5Q5J5l6wTvvpouyDublBrWlIRP3ppAPARaScd91E1dvVnk=s104-rw"
    },
    {
      id: 2,
      tag: "Ends in 6h",
      title: "Modern war jets flight simulator. Aircraft combat gun shooting battle game.",
      subtitle: "Work hard, fly harder! Celebrate the dedication of worker...",
      game: "Stumble Guys: Multiplayer Royale",
      developer: "Wildlife Studios",
      ctaText: "Install",
      secondaryText: "In-app purchases",
      image: "https://play-lh.googleusercontent.com/zPtfihC4HTA1XV_sxSqCwtoX7JRT5ggIRo7B--7KhTsKslbozissj5fed27N11sMYM0=w1702-h4320-rw",
      logo: "https://play-lh.googleusercontent.com/1b4arZ2f3fyfZKMBpFnYIIyPRgf0pqs2jfRg_8z3sSrVa66Mr13opXH5Rq4W6HDGQJQ=s104-rw"
    },
    {
      id: 3,
      tag: "Ends in 6 days",
      title: "Battle for Katana Kingdom!",
      subtitle: "Experience a thrilling story told across 4 manga chapters, unlock limited-time Wasabi Powers, and dive into new game modes. By joining Kenji's journey to rescue Kaze, you can earn his Hypercharge Oni Kenji Skin.",
      game: "War Machines",
      developer: "Supercell",
      ctaText: "Install",
      image: "https://play-lh.googleusercontent.com/qXz1M5c2rs1zkehBC4lW8Vc_GtC3vIIzjHuh0c0YRi_2VFDnP5j54BlWY-aYcId_ow=w1702-h4320-rw",
      logo: "https://play-lh.googleusercontent.com/UDvJF8oLGUgWWnZ3jzYPLAVfIzM5oY62_EhDQ6lKvOPDzZ3nFfHe6GKmYjr-DkWWGaA=s104-rw"
    }
  ];

  // Duplicate the games array to ensure infinite scrolling effect
  const extendedGames = [...games, ...games, ...games];
  
  // State for scroll position
  const [scrollX, setScrollX] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const slideInterval = 3500; // 3.5 seconds

  // Handle auto rotation
  useEffect(() => {
    // Set new interval
    intervalRef.current = setInterval(() => {
      setScrollX(prev => {
        const newScrollX = prev - 320; // Move by one card width
        
        // If we've scrolled far enough, reset position but maintain visual continuity
        if (newScrollX < -games.length * 320) {
          return -320;
        }
        
        return newScrollX;
      });
    }, slideInterval);
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [games.length]);

  // Calculate how many cards to display based on the viewport width
  const getCardWidthStyle = () => {
    return {
      flexBasis: "calc(33.333% - 16px)",
      flexShrink: 0,
      flexGrow: 0,
      margin: "0 8px",
      minWidth: "320px",
    };
  };

  // Render a single game card
  const renderGameCard = (game, index) => (
    <div 
      key={`${game.id}-${index}`} 
      style={getCardWidthStyle()}
      className="game-card bg-black rounded-2xl overflow-hidden relative shadow-2xl h-[360px]"
    >
      {/* Background Image */}
      <div className="relative h-3/5">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover"
        />
        {/* Tag Overlay */}
        {game.tag && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white text-sm rounded-md px-3 py-1">
            {game.tag}
          </div>
        )}
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h2 className="text-xl font-bold truncate">{game.title}</h2>
          {game.subtitle && <p className="text-sm mt-1 opacity-80 truncate">{game.subtitle}</p>}
        </div>
      </div>
      {/* Game Info Bar */}
      <div className="p-4 flex items-center justify-between bg-black bg-opacity-90 text-white border-t border-gray-800">
        <div className="flex items-center">
          {/* Game Logo */}
          <div className="w-12 h-12 rounded-xl overflow-hidden mr-3">
            <img 
              src={game.logo} 
              alt={`${game.game} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Game Details */}
          <div>
            <div className="font-semibold text-sm">{game.game}</div>
            <div className="text-xs text-gray-400">{game.developer}</div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex flex-col items-end">
          <button className="bg-white text-black rounded-full text-sm font-semibold px-4 py-1">
            {game.ctaText}
          </button>
          {game.secondaryText && (
            <span className="text-xs text-gray-400 mt-1">{game.secondaryText}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full mx-auto py-8 overflow-hidden">
      <motion.div 
        ref={carouselRef}
        className="flex"
        animate={{ x: scrollX }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        {extendedGames.map((game, index) => renderGameCard(game, index))}
      </motion.div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {games.map((_, i) => (
          <span
            key={i}
            className={`block w-2 h-2 rounded-full ${
              Math.abs(Math.floor(scrollX / 320)) % games.length === i 
                ? 'bg-blue-500' 
                : 'bg-gray-400'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
}