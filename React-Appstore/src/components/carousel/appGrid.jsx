/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';

// Split games into two arrays
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
function StarRating({ rating }) {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2;
  for (let i = 1; i <= 4; i++) {
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

export default function GameGrid({ cols = 5 }) {
  // Select games based on cols
  const games = cols === 1 ? gamesCol1 : gamesCol3;

  // Compute grid class based on cols prop
  const gridColsClass = cols === 1 ? "grid-cols-1" : `grid-cols-1 lg:grid-cols-${cols}`;
  const gridMaxWidthClass = cols === 4 ? "max-w-7xl mx-auto px-4" : "";

  // Helper to extract YouTube video ID
  function getYouTubeVideoId(url) {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*[\&|\?](?:v=|embed\/)))([^\"^\?^\&^\#]{11})/
    );
    return match && match[1];
  }

  // State to track which cards are showing video
  const [showVideo, setShowVideo] = useState(Array(games.length).fill(false));

  // Toggle video/thumbnail for a specific card
  const handleToggleVideo = (idx) => {
    setShowVideo((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  return (
    <div className="w-full">
      <div className={`grid ${gridColsClass} gap-4 w-full ${gridMaxWidthClass}`}>
        {games.map((game, idx) => (
          <motion.div 
            key={game.id}
            className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
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
                    <div className="bg-black bg-opacity-50 dark:bg-opacity-60 rounded-full w-12 h-12 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                    <div className="bg-black bg-opacity-50 dark:bg-opacity-60 rounded-full w-12 h-12 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
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
              {game.id === 5 && (
                <div className="absolute top-2 left-2 text-white text-xs font-bold">
                  NIKKE
                </div>
              )}
            </div>
            
            <div className={
              cols === 4
                ? "p-3 flex flex-col h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700"
                : "p-3 flex items-center"
            }>
              {cols === 4 ? (
                // Special layout for 5 columns
                <>
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden mr-2">
                      <img 
                        src={game.logo} 
                        alt={`${game.title} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <StarRating rating={game.rating} />
                      <span className="text-xs text-white">{game.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-white">{game.title}</h3>
                  <div className="flex text-xs text-indigo-100 dark:text-indigo-100 mb-2">
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
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                    <img 
                      src={game.logo} 
                      alt={`${game.title} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-gray-800 dark:text-white">{game.title}</h3>
                    <div className="flex text-xs text-gray-500 dark:text-gray-400">
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
                  
                  <div className="flex items-center">
                    <StarRating rating={game.rating} />
                    <span className="text-xs text-gray-700 dark:text-gray-200 ml-1">{game.rating}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}