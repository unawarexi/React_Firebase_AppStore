/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      tag: "Ends on 05/19",
      title: "Apr. 21: claim 5 skins, Universal Keys, and gear!",
      game: "Arena Breakout: Realistic...",
      developer: "Level Infinite",
      cta: "Install on more devices",
      subtext: "In-app purchases",
      image: "https://play-lh.googleusercontent.com/PlzuIY5SeyaFwBoXgSEBkJhaAdssOgkneKQIb2OhS8tLBNWRakWjtsAZyn2QtmSjis0=w1702-h4320-rw",
      logo: "/api/placeholder/48/48"
    },
    {
      id: 2,
      tag: "Essentials",
      title: "Hone your skills in these top shooter games",
      subtitle: "Aim for victory",
      image: "https://play-lh.googleusercontent.com/gP-nyQxYUlve2phvZSht2jx0ffqpTjQMim3My_w79kyhkv8RwLjiowADyEo8UmqPLw5Zu5mFX9M=w2592-h4320-rw"
    },
    {
      id: 3,
      tag: "Now available",
      title: "Survive in a post",
      game: "Once Human",
      developer: "Exptional Global",
      image: "https://play-lh.googleusercontent.com/JHAqApT-oA6v51Fvafgj0cmt5owUkJyWGlA5shKNcs3RJYVZuhyemLzQBWy8ZsFHt1we=w1052-h592-rw",
      logo: "/api/placeholder/48/48"
    }
  ];

  const timeoutRef = useRef(null);
  
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000);
    
    return () => {
      resetTimeout();
    };
  }, [currentSlide, slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    resetTimeout();
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
      <div className="relative w-full overflow-hidden rounded-xl">
        <motion.div 
          className="flex"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-shrink-0 w-full relative">
              <div className={`relative overflow-hidden rounded-xl h-64 ${index === 0 ? 'bg-gray-100' : index === 1 ? 'bg-blue-900' : 'bg-red-900'}`}>
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                />
                
                {slide.tag && (
                  <div className="absolute top-3 left-3 bg-white bg-opacity-80 text-black text-sm rounded-md px-2 py-1 font-medium">
                    {slide.tag}
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 p-4 text-white z-10 w-full">
                  <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
                  {slide.subtitle && <p className="text-lg">{slide.subtitle}</p>}
                  
                  {(slide.game || slide.developer) && (
                    <div className="flex items-center mt-4">
                      {slide.logo && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                          <img src={slide.logo} alt="Game logo" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        {slide.game && <div className="font-medium">{slide.game}</div>}
                        {slide.developer && <div className="text-sm opacity-80">{slide.developer}</div>}
                      </div>
                      
                      {slide.cta && (
                        <div className="ml-auto">
                          <button className="bg-white text-black text-sm px-3 py-1 rounded-md">
                            {slide.cta}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}