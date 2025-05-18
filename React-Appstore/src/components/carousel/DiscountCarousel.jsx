/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Star } from 'lucide-react';

// Sample data for games with diverse information
const gamesData = [
  {
    id: 1,
    title: "Epic Quest Legends",
    developer: "Mythic Studios",
    category: "RPG",
    rating: 4.8,
    downloads: "10M+",
    image: "https://play-lh.googleusercontent.com/RM7-1eCnEWqMcEiA7P8KA25JbXrOSR0DDRP3Qif9hFps5Mc_7Tq0Iwfx7c2KTDb3YJY=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Embark on an epic journey through magical realms and face legendary creatures.",
    featured: true
  },
  {
    id: 2,
    title: "Evil Lands: Epic MMORPG online",
    developer: "Rage Quit Games LLC",
    category: "Fighting",
    rating: 4.5,
    downloads: "5M+",
    image: "https://play-lh.googleusercontent.com/xbt1AzjREFjU6qeevp_XuWB9O66GdKcNrRMtmIosjpcCP9yPJAsWpTr2T5Sahc_epw=w1052-h592-rw",
    price: "$2.99",
    platform: "Android",
    description: "High-speed futuristic racing across galactic tracks with customizable vehicles.",
    featured: false
  },
  {
    id: 3,
    title: "Puzzle Dimension",
    developer: "BrainTrust Games",
    category: "Puzzle",
    rating: 4.7,
    downloads: "8M+",
    image: "https://play-lh.googleusercontent.com/ZqiW81OW3Uu_XFVeVGFadOyaXlxV4902S0NTtditOsAsia4nWermZlER-63FmeDRSqo=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Challenge your mind with ever-evolving 4D puzzles that defy physics.",
    featured: true
  },
  {
    id: 4,
    title: "Survival Island",
    developer: "Wilderness Interactive",
    category: "Survival",
    rating: 4.6,
    downloads: "12M+",
    image: "https://play-lh.googleusercontent.com/0USB-GVWd53ArOQDJFoiDI6vKAO-AA7v4hkFqa4a-Uctaj67mTvzQDEYd9bcpwY3M_g=w1052-h592-rw",
    price: "$4.99",
    platform: "iOS & Android",
    description: "Craft, build, and survive in a procedurally generated island full of dangers.",
    featured: false
  },
  {
    id: 5,
    title: "Tower Defense Master",
    developer: "Strategic Minds",
    category: "Strategy",
    rating: 4.3,
    downloads: "7M+",
    image: "https://play-lh.googleusercontent.com/8thxj4TIH2x1NbnC5FPIOPryAkLEi3ckl3pr4BDbrM2FOiCeg-Xckwxtq9u8rYbhu0mm=w1052-h592-rw",
    price: "Free",
    platform: "Android",
    description: "Defend your realm with advanced towers and unique heroes against waves of enemies.",
    featured: true
  },
  {
    id: 6,
    title: "City Builder 2025",
    developer: "Urban Simulations",
    category: "Simulation",
    rating: 4.9,
    downloads: "15M+",
    image: "https://play-lh.googleusercontent.com/PHNJTLE2FHwaWsT-ZHIZAgFiLWwwogc8UQcK41rGFbF3v60iwcszC0kPyxaFc2rjwEzJ=w1052-h592-rw",
    price: "$6.99",
    platform: "iOS",
    description: "Create and manage your dream city with realistic economics and citizen needs.",
    featured: false
  },
  {
    id: 7,
    title: "Zombie Apocalypse",
    developer: "Undead Studios",
    category: "Action",
    rating: 4.4,
    downloads: "20M+",
    image: "https://play-lh.googleusercontent.com/MGapnJW2mwyK4SKoTgGGm__ClVyW1tiKq7CwH-854eJMWDrrbEDcGQSPzO-zHtEI-_g=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Fight for survival in a world overrun by zombies with realistic graphics.",
    featured: true
  },
  {
    id: 8,
    title: "Fantasy Football Manager",
    developer: "Sports Interactive",
    category: "Sports",
    rating: 4.7,
    downloads: "9M+",
    image: "https://play-lh.googleusercontent.com/s1zFdj7s1KeHAhldz9mEi2waaYSziJ-4OAX_CEWzZdZFCxYd_0YDcKo1BN6oJb2fibs=w1052-h592-rw",
    price: "$3.99",
    platform: "iOS & Android",
    description: "Manage your football team with real-world statistics and advanced AI opponents.",
    featured: false
  },
  {
    id: 9,
    title: "Word Masters",
    developer: "Lexicon Games",
    category: "Word",
    rating: 4.8,
    downloads: "6M+",
    image: "https://play-lh.googleusercontent.com/PXJdOMI3oYD_yAFyxtBT2E3vIMqFfL6UXtZ_0ak7qLY8kcy_cZeg-1_ZZjYxwbKxCg=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Expand your vocabulary with thousands of puzzles and daily challenges.",
    featured: true
  },
  {
    id: 10,
    title: "Space Colonizer",
    developer: "Galactic Studios",
    category: "Strategy",
    rating: 4.6,
    downloads: "4M+",
    image: "https://play-lh.googleusercontent.com/tNcuU1yNLXjiwpfJBv1e0a81V5Hx7wZVjkyK4RRDIWtwON-HCYAHhvSWpiuh3xWHVIb3=w1052-h592-rw",
    price: "$5.99",
    platform: "Android",
    description: "Build and expand your interstellar empire across procedurally generated galaxies.",
    featured: false
  },
  {
    id: 11,
    title: "Dragon Tamer",
    developer: "Mythical Creations",
    category: "Adventure",
    rating: 4.9,
    downloads: "14M+",
    image: "https://play-lh.googleusercontent.com/AKPhPSII3wRHGJdSyvXkrA_q7k96iLi4u4Rezf1GQbQWldsXy4IoruhzIPFTvWbg0q36=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Collect, train and battle with over 200 unique dragons in a vast open world.",
    featured: true
  },
  {
    id: 12,
    title: "Stock Market Simulator",
    developer: "Financial Games",
    category: "Simulation",
    rating: 4.2,
    downloads: "3M+",
    image: "https://play-lh.googleusercontent.com/iW9FOfFqewGHLUzG1YXubI3cL68VVOp3w2NvI2Oq_BNZvhXsYHE7AZ3aF7Vb8A_08Jc=w1052-h592-rw",
    price: "$1.99",
    platform: "iOS",
    description: "Learn real investment strategies with realistic market simulations.",
    featured: false
  },
  {
    id: 13,
    title: "Ninja Warrior",
    developer: "Shadow Games",
    category: "Action",
    rating: 4.7,
    downloads: "18M+",
    image: "https://play-lh.googleusercontent.com/0TXBnvvG1sWuBQTxjWjxLDmlj4gKp8FXbEEEiQDQ0PX7De5IGOlcnSKD741PfagcUw=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Master the art of stealth and combat in this challenging action platformer.",
    featured: true
  },
  {
    id: 14,
    title: "Cooking Fever",
    developer: "Culinary Arts",
    category: "Simulation",
    rating: 4.8,
    downloads: "25M+",
    image: "https://play-lh.googleusercontent.com/XXckbm2URtF4b3KUaovl0raeCZ6JV_2Sc6EBHtkHdaA-Ol61LdtmnPFsV6RbvF-Y6A=w1052-h592-rw",
    price: "$2.99",
    platform: "iOS & Android",
    description: "Run your own restaurant empire with over 100 unique recipes to master.",
    featured: false
  },
  {
    id: 15,
    title: "Highway Racer",
    developer: "Speed Studios",
    category: "Racing",
    rating: 4.4,
    downloads: "16M+",
    image: "https://play-lh.googleusercontent.com/QHRt5kbOWkZosi9Su5Cau_zAhXUc7mFTv8fQpRtJf-6TUyR1tkfar5S9RIlbNeu1o68=w1052-h592-rw",
    price: "Free",
    platform: "Android",
    description: "Race through traffic at breakneck speeds with realistic car physics.",
    featured: true
  },
  {
    id: 16,
    title: "Mystery Manor",
    developer: "Enigma Games",
    category: "Hidden Object",
    rating: 4.6,
    downloads: "7M+",
    image: "https://play-lh.googleusercontent.com/SGSxRtwNHF6Mnlk91ehbLkcOtNui-FU5S0M92Vaijm1edqXWIjOEZH6MCRo4kQAbElv0=w1052-h592-rw",
    price: "$3.99",
    platform: "iOS",
    description: "Solve intricate mysteries in a spooky mansion with thousands of hidden objects.",
    featured: false
  },
  {
    id: 17,
    title: "Battle Royale Heroes",
    developer: "Victory Studios",
    category: "Action",
    rating: 4.7,
    downloads: "30M+",
    image: "https://play-lh.googleusercontent.com/TA-jlrcuABow61aPEt9ok-ilYPiwkwZAcjw85BalsAv73gRE7hkfeKuAe6Y087ZWKGU=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Be the last player standing in intense 100-player battles with unique character abilities.",
    featured: true
  },
  {
    id: 18,
    title: "Piano Tiles Master",
    developer: "Melody Games",
    category: "Music",
    rating: 4.5,
    downloads: "22M+",
    image: "https://play-lh.googleusercontent.com/auG8OVia0vT_7hiC02yibxNcEe9MAxe77AoN0otZ8BE8FQbZWoydy2XaR_PzH8GstLk=w1052-h592-rw",
    price: "Free",
    platform: "iOS & Android",
    description: "Test your reflexes with this addictive rhythm game featuring classical masterpieces.",
    featured: false
  },
  {
    id: 19,
    title: "Farming Paradise",
    developer: "Harvest Games",
    category: "Simulation",
    rating: 4.8,
    downloads: "13M+",
    image: "https://play-lh.googleusercontent.com/mNZXKYIlrlZXnoISwsk8kEi_rpOe8wQQW3-tm2N2zrRpzxp_V3_3r6RFGPx4iJJ9FEo=w1052-h592-rw",
    price: "$0.99",
    platform: "iOS & Android",
    description: "Build and manage your dream farm with seasonal crops and adorable animals.",
    featured: true
  },
  {
    id: 20,
    title: "Pixel Dungeon",
    developer: "Retro Studios",
    category: "Roguelike",
    rating: 4.9,
    downloads: "8M+",
    image: "https://play-lh.googleusercontent.com/SaSTFNBW56JkkVNxeZzzOLn3pthn8_t5E9SfeQZ0kEEjMIwIecIMaKx5J_bWcgTTmiz9=w1052-h592-rw",
    price: "$1.99",
    platform: "Android",
    description: "Explore randomly generated dungeons in this challenging pixel art adventure.",
    featured: false
  }
];

// Component for the Discounttional games carousel
export default function DiscountCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const updateDimensions = () => {
      setWidth(window.innerWidth);
      
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      const maxIndex = Math.ceil(gamesData.length / itemsPerPage) - 1;
      setCurrentIndex(prevIndex => prevIndex >= maxIndex ? 0 : prevIndex + 1);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage, autoPlay]);

  // Navigation functions
  const nextSlide = () => {
    const maxIndex = Math.ceil(gamesData.length / itemsPerPage) - 1;
    setCurrentIndex(prevIndex => prevIndex >= maxIndex ? 0 : prevIndex + 1);
  };

  const prevSlide = () => {
    const maxIndex = Math.ceil(gamesData.length / itemsPerPage) - 1;
    setCurrentIndex(prevIndex => prevIndex <= 0 ? maxIndex : prevIndex - 1);
  };

  // Calculate games to display based on current index and items per page
  const displayGames = () => {
    const startIndex = currentIndex * itemsPerPage;
    return gamesData.slice(startIndex, startIndex + itemsPerPage);
  };

  // Pagination dots
  const totalPages = Math.ceil(gamesData.length / itemsPerPage);
  
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Featured Promotions
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setAutoPlay(!autoPlay)}
            className="px-3 py-1 bg-indigo-100 rounded-md text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            {autoPlay ? 'Pause' : 'Auto Play'}
          </button>
        </div>
      </div>
      
      <div className="relative">
        {/* Navigation arrows */}
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all -ml-3 focus:outline-none dark:bg-gray-700/80 dark:hover:bg-gray-700"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-indigo-700 dark:text-white" />
        </button>
        
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all -mr-3 focus:outline-none dark:bg-gray-700/80 dark:hover:bg-gray-700"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-indigo-700 dark:text-white" />
        </button>
        
        {/* Carousel container */}
        <div className="overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="flex gap-4"
              initial={{ opacity: 0.5, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.5, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {displayGames().map((game) => (
                <div 
                  key={game.id} 
                  className={`flex-1 min-w-0 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:bg-gray-800 dark:border-gray-700`}
                >
                  {/* Game image */}
                  <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-full object-cover"
                    />
                    {game.featured && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white font-bold truncate">{game.title}</p>
                          <p className="text-gray-300 text-sm truncate">{game.developer}</p>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-white text-sm">{game.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Game details */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs font-medium dark:bg-gray-700 dark:text-white">
                        {game.category}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${game.price === "Free" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"}`}>
                        {game.price}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 dark:text-gray-300">
                      {game.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm dark:text-gray-400">
                        <Download className="w-4 h-4 mr-1" />
                        {game.downloads}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {game.platform}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <div className="px-4 pb-4">
                    <button className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors dark:from-indigo-700 dark:to-purple-700">
                      Download Now
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-indigo-600 w-8 dark:bg-indigo-400" 
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}