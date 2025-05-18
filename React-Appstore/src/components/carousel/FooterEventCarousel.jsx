/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FooterEventCarousel() {
  const events = [
    {
      id: 1,
      tag: "🔥 Limited Time Event",
      title: "Survive in Arena Breakout's post-apocalyptic world",
      game: "Arena Breakout: Realistic FPS",
      developer: "Exptional Global",
      ctaText: "Join Event",
      subtitle: "Earn exclusive Arena Breakout rewards!",
      image: "https://play-lh.googleusercontent.com/_AZ_RCtLFjUUi98YBKq9So7rpq-zcLYxNM7a-677-k04MKcNQImKdVM5yFs8yCZaYYI=w1702-h4320-rw",
      logo: "https://play-lh.googleusercontent.com/WGZQlOqgq70CEtUbvx0CuFZMU3cTFZlGkfdens6vNzexOhsCdL9X0MT4jpruZjHCqg=s96-rw"
    },
    {
      id: 2,
      tag: "⏰ Ends Soon",
      title: "Asphalt 8: Race modern jets and cars",
      subtitle: "Compete in Asphalt 8 for leaderboard prizes!",
      game: "Asphalt 8 - Car Racing Game",
      developer: "Gameloft SE",
      ctaText: "Participate",
      image: "https://play-lh.googleusercontent.com/dhOFRTswUhXAiuaiM1kf2uDbZXJ6UBw9iznSBSlRr79N_9TAPNUfiAKzhnEbeYs_-Eg=w1052-h592-rw",
      logo: "https://play-lh.googleusercontent.com/y1J3-OrqJIlezTtaung2sPOnHY9wS2hdJh26ADkwcc3kdZy4DTGyv94IN_YRvdKy0y4=s96-rw"
    },
    {
      id: 3,
      tag: "🎉 6 Days Left",
      title: "War Machines: Command 3D tank battles",
      subtitle: "Unlock special War Machines event tanks!",
      game: "War Machines",
      developer: "Wildlife Studios",
      ctaText: "Join Now",
      image: "https://play-lh.googleusercontent.com/xHaU36WnQig-izSgVVHpKt54T6IX6mP7PHGTJeu98HLzVXRB46Ppk4_nCXt5H6Q8pM8=w5120-h2880-rw",
      logo: "https://play-lh.googleusercontent.com/wEgle763Zm8qmttBKYmVyOJ65h4xNOHTgnPXy6-wo1GygMiU_QwGCX9OvzTZB2I82wg=s96-rw"
    },
    {
      id: 4,
      tag: "🏆 Tournament",
      title: "PUBG MOBILE: Battle Royale Showdown",
      subtitle: "Win the grand trophy in PUBG MOBILE!",
      game: "PUBG MOBILE",
      developer: "Level Infinite",
      ctaText: "Register",
      image: "https://play-lh.googleusercontent.com/1QwKzQw8n8n8kQwKzQw8n8kQwKzQw8n8kQwKzQw8n=w2560-h1440-rw",
      logo: "https://play-lh.googleusercontent.com/1QwKzQw8n8n8kQwKzQw8n8kQwKzQw8n8kQwKzQw8n=s96-rw"
    },
    {
      id: 5,
      tag: "🌟 New Release",
      title: "Genshin Impact: Explore magical kingdoms",
      subtitle: "Special Genshin Impact launch rewards!",
      game: "Genshin Impact",
      developer: "Cognosphere PTE. LTD.",
      ctaText: "Play Now",
      image: "https://play-lh.googleusercontent.com/AyNpzfHrv3aG4xBweq6UENulyFlDGQkjLVZ7-QUgY4XzAqBgmlHinMsBIBRZ3Ou7lgI=w1052-h592-rw",
      logo: "https://play-lh.googleusercontent.com/iP2i_f23Z6I-5hoL2okPS4SxOGhj0q61Iyb0Y1m4xdTsbnaCmrjs7xKRnL6o5R4h-Yg=s96-rw"
    },
    {
      id: 6,
      tag: "💎 Double XP",
      title: "Call of Duty®: Mobile Double XP Weekend",
      subtitle: "Level up twice as fast in Call of Duty®: Mobile.",
      game: "Call of Duty®: Mobile",
      developer: "Activision Publishing, Inc.",
      ctaText: "Join Now",
      image: "https://play-lh.googleusercontent.com/JxCiXExDbVpqlrh_xSOVVHpwq1rrWeN8SozakyVzAfGGgpkVboOdAa1bQYAUoLyW8w=w1052-h592-rw",
      logo: "https://play-lh.googleusercontent.com/ZRU4iJGXTfXqZjafhOI5fpGRxm1GxhJ2j1ZNWk-eOZ6DYFYXqDyGwfpm-lFv4caQmd-1=s96-rw"
    },
    {
      id: 7,
      tag: "🎁 Update favourite playlist",
      title: "Spotify: Unlock exclusive app themes",
      subtitle: "Limited time Spotify customization event!",
      game: "Spotify",
      developer: "Spotify AB",
      ctaText: "Claim Now",
      image: "https://play-lh.googleusercontent.com/46x29JdoFFfPtpIVUEcyk3mmbYPe796sTLTKVmKi0o3nVRdzTQ7JScFfyA_HhhtnGAY=w1052-h592-rw",
      logo: "https://play-lh.googleusercontent.com/7ynvVIRdhJNAngCg_GI7i8TtH8BqkJYmffeUHsG-mJOdzt1XLvGmbsKuc5Q1SInBjDKN=w480-h960-rw"
    },
    {
      id: 8,
      tag: "⚡ Stream Now",
      title: "Prime Video: Fastest binge challenge",
      subtitle: "Beat the clock for Prime Video prizes!",
      game: "Prime Video",
      developer: "Amazon Mobile LLC",
      ctaText: "Compete",
      image: "https://play-lh.googleusercontent.com/ehGp-f9S4WOeSgSBYSeNvP6VXUOjQzaHBXSZfaV1DnJXTJClwstI3XNPPTExaQdVmjI=w1052-h592-rw",
      logo: "https://play-lh.googleusercontent.com/mZ6pRo5-NnrO9GMwFNrK5kShF0UrN5UOARVAw64_5aFG6NgEHSlq-BX5I8TEXtTOk9s=w480-h960-rw"
    }
  ];

  // Duplicate events for infinite scroll effect
  const extendedEvents = [...events, ...events, ...events];

  // Always show 3 cards at a time
  const cardsPerView = 3;

  // Card width is 1/3 of container width
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    function updateCardWidth() {
      if (containerRef.current) {
        setCardWidth(containerRef.current.offsetWidth / cardsPerView);
      }
    }
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // State for scroll position
  const [scrollX, setScrollX] = useState(0);
  const intervalRef = useRef(null);
  const slideInterval = 4000;

  // Auto-scroll logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setScrollX(prev => {
        const maxScroll = -cardWidth * events.length;
        const next = prev - cardWidth;
        if (next < maxScroll) {
          return 0;
        }
        return next;
      });
    }, slideInterval);
    return () => clearInterval(intervalRef.current);
  }, [events.length, cardWidth]);

  // Dots indicator logic
  const currentIndex = cardWidth === 0 ? 0 : (Math.abs(Math.round(scrollX / cardWidth)) % events.length);

  // Render a single event card
  const renderEventCard = (event, idx) => (
    <div
      key={`${event.id}-${idx}`}
      style={{
        flex: `0 0 ${cardWidth}px`,
        minWidth: `${cardWidth}px`,
        maxWidth: `${cardWidth}px`,
        margin: "0 8px",
        boxSizing: "border-box"
      }}
      className="bg-white bg-opacity-10 rounded-2xl overflow-hidden relative shadow-lg h-full border-2 border-white border-opacity-20 flex flex-col"
    >
      {/* Background Image */}
      <div className="relative h-48 md:h-60">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Tag Overlay */}
        {event.tag && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-black/80 to-pink-600/80 text-white text-base font-semibold rounded-md px-3 py-1 shadow">
            {event.tag}
          </div>
        )}
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent w-full">
          <h2 className="text-2xl font-bold drop-shadow">{event.title}</h2>
          {event.subtitle && <p className="text-base mt-1 opacity-90">{event.subtitle}</p>}
        </div>
      </div>
      {/* Game Info Bar */}
      <div className="p-4 flex items-center justify-between bg-white bg-opacity-20 text-gray-500 border-t border-white border-opacity-10 mt-auto">
        <div className="flex items-center">
          {/* Game Logo */}
          <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 border-2 border-white border-opacity-40 shadow">
            <img
              src={event.logo}
              alt={`${event.game} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Game Details */}
          <div>
            <div className="font-semibold text-lg  text-gray-500 dark:text-gray-200">{event.game}</div>
            <div className="text-xs text-gray-500 dark:text-gray-200">{event.developer}</div>
          </div>
        </div>
        {/* CTA Button */}
        <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full text-base font-bold px-8 py-2 shadow-lg hover:scale-105 transition">
          {event.ctaText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative py-10 rounded-t-3xl bg-transparent">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-500 mb-8 text-center drop-shadow-lg tracking-wide">
        🎊 Featured Event Campaigns
      </h1>
      <div className="flex justify-center">
        <div
          className="w-full max-w-screen-2xl overflow-x-hidden px-0"
          ref={containerRef}
        >
          <motion.div
            className="flex"
            animate={{ x: scrollX }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          >
            {extendedEvents.map((event, idx) => renderEventCard(event, idx))}
          </motion.div>
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {events.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setScrollX(-cardWidth * idx)}
            aria-label={`Go to event ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
