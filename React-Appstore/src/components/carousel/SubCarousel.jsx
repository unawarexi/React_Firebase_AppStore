/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function SubCarousel() {
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
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const slideInterval = 3500; // 3.5 seconds
  const cardWidth = 320; // px

  // Framer Motion controls for imperative animation
  const controls = useAnimation();

  // Handle auto rotation
  useEffect(() => {
    if (isDragging) return; // Pause auto-slide while dragging

    intervalRef.current = setInterval(() => {
      setScrollX(prev => {
        const newScrollX = prev - cardWidth;
        if (newScrollX < -games.length * cardWidth) {
          return -cardWidth;
        }
        return newScrollX;
      });
    }, slideInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [games.length, isDragging]);

  // Animate scrollX changes
  useEffect(() => {
    controls.start({ x: scrollX, transition: { ease: "easeInOut", duration: 0.5 } });
  }, [scrollX, controls]);

  // Responsive card width style
  const getCardWidthStyle = () => ({
    flexBasis: "calc(33.333% - 16px)",
    flexShrink: 0,
    flexGrow: 0,
    margin: "0 8px",
    minWidth: "320px",
  });

  // Render a single game card
  const renderGameCard = (game, index) => (
    <div
      key={`${game.id}-${index}`}
      style={getCardWidthStyle()}
      className="game-card bg-black rounded-2xl overflow-hidden relative shadow-2xl h-[360px] 
        sm:h-[320px] xs:h-[260px] xs:min-w-[220px] xs:max-w-[260px] xs:mx-1
        transition-all duration-200"
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
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black bg-opacity-75 text-white text-xs sm:text-sm rounded-md px-2 py-0.5 sm:px-3 sm:py-1">
            {game.tag}
          </div>
        )}
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 p-2 sm:p-4 text-white">
          <h2 className="text-base sm:text-lg font-bold truncate">{game.title}</h2>
          {game.subtitle && <p className="text-xs sm:text-sm mt-0.5 sm:mt-1 opacity-80 truncate">{game.subtitle}</p>}
        </div>
      </div>
      {/* Game Info Bar */}
      <div className="p-2 sm:p-4 flex items-center justify-between bg-black bg-opacity-90 text-white border-t border-gray-800">
        <div className="flex items-center">
          {/* Game Logo */}
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl overflow-hidden mr-2 sm:mr-3">
            <img
              src={game.logo}
              alt={`${game.game} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Game Details */}
          <div>
            <div className="font-semibold text-xs sm:text-sm">{game.game}</div>
            <div className="text-[10px] sm:text-xs text-gray-400">{game.developer}</div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex flex-col items-end">
          <button className="bg-white text-black rounded-full text-xs sm:text-sm font-semibold px-3 sm:px-4 py-0.5 sm:py-1">
            {game.ctaText}
          </button>
          {game.secondaryText && (
            <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">{game.secondaryText}</span>
          )}
        </div>
      </div>
    </div>
  );

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    // Snap to nearest card
    let offset = info.offset.x;
    let newScroll = scrollX + offset;
    // Snap to nearest card width
    let snapped = Math.round(newScroll / cardWidth) * cardWidth;
    // Clamp so we don't go out of bounds
    if (snapped > 0) snapped = 0;
    if (snapped < -games.length * cardWidth) snapped = -games.length * cardWidth;
    setScrollX(snapped);
  };

  return (
    <div className="relative w-full mx-auto py-6 sm:py-8 overflow-hidden">
      <motion.div
        ref={carouselRef}
        className="flex cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="x"
        dragConstraints={{ left: -games.length * cardWidth, right: 0 }}
        dragElastic={0.15}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ touchAction: "pan-y" }}
      >
        {extendedGames.map((game, index) => renderGameCard(game, index))}
      </motion.div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 gap-1 sm:gap-2">
        {games.map((_, i) => (
          <span
            key={i}
            className={`block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              Math.abs(Math.floor(scrollX / cardWidth)) % games.length === i
                ? 'bg-blue-500'
                : 'bg-gray-400'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
}