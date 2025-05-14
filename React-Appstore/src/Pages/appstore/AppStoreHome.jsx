/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from 'react-query';
import AppStoreApi from '../../api/AppStoreApi'; // Update path as needed

// Initialize the API client
const appStoreApi = new AppStoreApi();

// App Store Categories
const categories = {
  ALL: "All Categories",
  GAMES: "Games",
  ENTERTAINMENT: "Entertainment",
  PHOTO_VIDEO: "Photo & Video",
  SOCIAL_NETWORKING: "Social Networking",
  UTILITIES: "Utilities",
  PRODUCTIVITY: "Productivity",
  HEALTH_FITNESS: "Health & Fitness",
  EDUCATION: "Education",
  FINANCE: "Finance",
  SHOPPING: "Shopping",
  TRAVEL: "Travel",
  FOOD_DRINK: "Food & Drink",
  LIFESTYLE: "Lifestyle",
  SPORTS: "Sports",
  MUSIC: "Music",
  NEWS: "News",
  BOOKS: "Books"
};

// Chart types
const chartTypes = {
  TOPSELLING_FREE: "topselling_free",
  TOPSELLING_PAID: "topselling_paid",
  TOPGROSSING: "topgrossing",
  TOP_RATED: "top_rated"
};

// App Card Component - Grid style
const AppCard = ({ app }) => {
  return (
    <motion.div 
      className="flex flex-col w-full p-2 cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-2 rounded-2xl overflow-hidden">
        <img 
          src={app.icon || "/api/placeholder/144/144"} 
          alt={app.title} 
          className="w-full aspect-square object-cover rounded-2xl"
        />
      </div>
      <div className="px-1">
        <h3 className="text-sm font-medium truncate">{app.title}</h3>
        <p className="text-xs text-gray-500 truncate">{app.developer || app.seller}</p>
        <div className="flex items-center mt-1">
          <div className="flex text-gray-400">
            <span className="text-xs mr-1">{app.rating?.toFixed(1) || "N/A"}</span>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.round(app.rating || 0) ? "text-gray-400" : "text-gray-200"}`}>★</span>
            ))}
          </div>
        </div>
        <div className="mt-1">
          <span className="text-xs font-medium rounded-full bg-gray-100 px-2 py-0.5">
            {app.price > 0 ? `$${app.price}` : "GET"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Featured App Card Component
const FeaturedAppCard = ({ app }) => {
  return (
    <motion.div 
      className="flex flex-col p-4 cursor-pointer bg-white rounded-2xl shadow-sm"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex">
        <div className="w-20 h-20 overflow-hidden rounded-xl">
          <img 
            src={app.icon || "/api/placeholder/80/80"} 
            alt={app.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 flex-1">
          <span className="text-xs text-blue-500 font-medium uppercase">Featured</span>
          <h3 className="font-bold text-lg">{app.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{app.short_description || app.subtitle || "Discover this amazing app"}</p>
          <div className="mt-2">
            <span className="text-xs font-medium rounded-full bg-gray-100 px-3 py-1">
              {app.price > 0 ? `$${app.price}` : "GET"}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-3 line-clamp-2">
        {app.description?.substring(0, 120) || "An amazing app for your iOS device with lots of features to explore."}...
      </p>
    </motion.div>
  );
};

// Today's App Component
const TodaysApp = ({ app }) => {
  return (
    <motion.div 
      className="p-4 cursor-pointer bg-white rounded-2xl shadow-sm"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="uppercase text-xs font-semibold text-blue-500 mb-1">App of the Day</div>
      <h3 className="font-bold text-xl mb-2">{app.title}</h3>
      <div className="rounded-xl overflow-hidden mb-3">
        <img 
          src={app.screenshots?.[0] || "/api/placeholder/640/320"} 
          alt={app.title} 
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="flex items-center">
        <div className="w-12 h-12 overflow-hidden rounded-xl">
          <img 
            src={app.icon || "/api/placeholder/48/48"} 
            alt={app.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-semibold">{app.title}</h4>
          <p className="text-xs text-gray-500">{app.developer || app.seller}</p>
        </div>
        <div>
          <button className="bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
            {app.price > 0 ? `$${app.price}` : "GET"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Top Chart App Row Component
const AppRow = ({ app, index }) => {
  return (
    <motion.div 
      className="flex items-center p-3 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
    >
      <span className="text-gray-400 w-8 text-center font-medium">{index + 1}</span>
      <div className="w-16 h-16 mx-3">
        <img 
          src={app.icon || "/api/placeholder/64/64"} 
          alt={app.title} 
          className="w-16 h-16 rounded-2xl"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium truncate">{app.title}</h3>
        <p className="text-xs text-gray-500 truncate">{app.developer || app.seller}</p>
        <p className="text-xs text-gray-500 mt-1">{app.primary_genre}</p>
      </div>
      <div className="ml-2 w-16 text-center">
        <button className="bg-gray-100 text-blue-600 rounded-full px-3 py-1 text-sm font-medium">
          {app.price > 0 ? `$${app.price}` : "GET"}
        </button>
      </div>
    </motion.div>
  );
};

// App Section Component
const AppSection = ({ title, apps, viewAll, horizontal = true }) => {
  if (!apps || apps.length === 0) return null;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAll && (
          <button className="text-blue-500 font-medium">See All</button>
        )}
      </div>
      
      {horizontal ? (
        <div className="flex overflow-x-auto pb-4 px-4 hide-scrollbar">
          {apps.map((app, index) => (
            <div key={app.id || index} className="min-w-[160px] max-w-[160px] mr-4">
              <AppCard app={app} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl mx-4 shadow-sm overflow-hidden">
          {apps.map((app, index) => (
            <AppRow key={app.id || index} app={app} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

// App Grid Component
const AppGrid = ({ apps, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
      {apps?.map((app, index) => (
        <AppCard key={app.id || index} app={app} />
      ))}
    </div>
  );
};

// Main AppStoreHome Component
const AppStoreHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedChartType, setSelectedChartType] = useState(chartTypes.TOPSELLING_FREE);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("today");
  const queryClient = useQueryClient();

  // Function to fetch top charts
  const fetchTopCharts = useCallback(async () => {
    try {
      const result = await appStoreApi.getTopCharts(
        selectedChartType, 
        selectedCategory === "ALL" ? '36' : selectedCategory,
        'iphone',
        'US',
        20
      );
      return result.results || [];
    } catch (error) {
      console.error("Error fetching top charts:", error);
      return [];
    }
  }, [selectedCategory, selectedChartType]);

  // Function to search apps
  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery) return [];
    
    try {
      const result = await appStoreApi.searchApps(searchQuery, 20);
      return result.results || [];
    } catch (error) {
      console.error("Error searching apps:", error);
      return [];
    }
  }, [searchQuery]);

  // Function to get featured apps
  const fetchFeaturedApps = useCallback(async () => {
    try {
      // Using search as a substitute since there's no direct "featured" endpoint
      const result = await appStoreApi.searchApps("featured app", 5, {
        min_rating: 4.5
      });
      return result.results || [];
    } catch (error) {
      console.error("Error fetching featured apps:", error);
      return [];
    }
  }, []);

  // Function to get apps by category
  const fetchAppsByCategory = useCallback(async (category) => {
    try {
      // Using advanced query to get apps by category
      const result = await appStoreApi.advancedQuery({
        primaryGenreId: category,
        limit: 10
      });
      return result.results || [];
    } catch (error) {
      console.error(`Error fetching apps for category ${category}:`, error);
      return [];
    }
  }, []);

  // Queries
  const topChartsQuery = useQuery(
    ['appstore-topCharts', selectedCategory, selectedChartType],
    fetchTopCharts,
    { enabled: activeTab === 'charts' || activeTab === 'today' }
  );
  
  const searchResultsQuery = useQuery(
    ['appstore-search', searchQuery],
    fetchSearchResults,
    { enabled: !!searchQuery }
  );
  
  const featuredAppsQuery = useQuery(
    ['appstore-featured'],
    fetchFeaturedApps,
    { enabled: activeTab === 'today' }
  );

  // Category queries - only fetch when needed
  const gameAppsQuery = useQuery(
    ['appstore-category', 'GAMES'],
    () => fetchAppsByCategory('GAMES'),
    { enabled: activeTab === 'games' || activeTab === 'today' }
  );

  const arcadeAppsQuery = useQuery(
    ['appstore-category', 'ARCADE'],
    () => fetchAppsByCategory('ARCADE'),
    { enabled: activeTab === 'games' }
  );

  // Handle search input with debounce
  const handleSearchInput = (e) => {
    const value = e.target.value;
    const timerId = setTimeout(() => {
      setSearchQuery(value);
      if (value) setActiveTab('search');
    }, 500);
    
    return () => clearTimeout(timerId);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    queryClient.invalidateQueries(['appstore-topCharts']);
  };
  
  // Handle chart type change
  const handleChartTypeChange = (e) => {
    setSelectedChartType(e.target.value);
    queryClient.invalidateQueries(['appstore-topCharts']);
  };

  // Get a random featured app
  const featuredApp = featuredAppsQuery.data?.[0] || null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="bg-white pt-4 pb-2 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for apps"
              className="w-full py-2 px-4 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              onChange={handleSearchInput}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === 'today' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('today')}
            >
              Today
            </button>
            <button
              className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === 'games' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('games')}
            >
              Games
            </button>
            <button
              className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === 'apps' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('apps')}
            >
              Apps
            </button>
            <button
              className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === 'arcade' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('arcade')}
            >
              Arcade
            </button>
            <button
              className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === 'charts' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('charts')}
            >
              Charts
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto pb-12">
        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold px-4 mb-4">Search Results for "{searchQuery}"</h2>
            <AppGrid 
              apps={searchResultsQuery.data} 
              isLoading={searchResultsQuery.isLoading} 
            />
          </div>
        )}

        {/* Today Tab Content */}
        {activeTab === 'today' && !searchQuery && (
          <>
            {/* App of the Day */}
            {featuredApp && (
              <div className="px-4 mb-8">
                <TodaysApp app={featuredApp} />
              </div>
            )}

            {/* Featured Apps Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold px-4 mb-3">Featured Apps</h2>
              <div className="px-4 space-y-4">
                {featuredAppsQuery.data?.slice(0, 3).map((app, index) => (
                  <FeaturedAppCard key={app.id || index} app={app} />
                ))}
              </div>
            </div>

            {/* Top Free Apps */}
            <AppSection 
              title="Top Free Apps" 
              apps={topChartsQuery.data} 
              viewAll={true} 
            />

            {/* Games You Might Like */}
            <AppSection 
              title="Games You Might Like" 
              apps={gameAppsQuery.data} 
              viewAll={true} 
            />
          </>
        )}

        {/* Games Tab Content */}
        {activeTab === 'games' && !searchQuery && (
          <>
            <div className="px-4 mb-6">
              <h1 className="text-3xl font-bold mb-1">Games</h1>
              <p className="text-gray-500">The best gaming experiences on iPhone</p>
            </div>

            <AppSection 
              title="New Games We Love" 
              apps={gameAppsQuery.data} 
              viewAll={true} 
            />

            <div className="mb-8">
              <h2 className="text-2xl font-bold px-4 mb-3">Featured Game</h2>
              <div className="px-4">
                {gameAppsQuery.data?.[0] && (
                  <FeaturedAppCard app={gameAppsQuery.data[0]} />
                )}
              </div>
            </div>

            <AppSection 
              title="Top Free Games" 
              apps={topChartsQuery.data?.filter(app => app.primary_genre === 'Games')} 
              viewAll={true} 
              horizontal={false}
            />
          </>
        )}

        {/* Charts Tab Content */}
        {activeTab === 'charts' && !searchQuery && (
          <>
            <div className="px-4 mb-6">
              <h1 className="text-3xl font-bold mb-1">Charts</h1>
              <p className="text-gray-500">See what's popular right now</p>
            </div>

            {/* Charts Filters */}
            <div className="bg-white shadow-sm mb-6">
              <div className="px-4 py-2 overflow-x-auto">
                <div className="flex items-center space-x-4">
                  <div className="whitespace-nowrap">
                    <label htmlFor="category" className="text-sm font-medium text-gray-700 mr-2">Category:</label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="py-1 px-2 border border-gray-300 rounded text-sm"
                    >
                      {Object.entries(categories).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="whitespace-nowrap">
                    <label htmlFor="chartType" className="text-sm font-medium text-gray-700 mr-2">Chart Type:</label>
                    <select
                      id="chartType"
                      value={selectedChartType}
                      onChange={handleChartTypeChange}
                      className="py-1 px-2 border border-gray-300 rounded text-sm"
                    >
                      <option value={chartTypes.TOPSELLING_FREE}>Top Free</option>
                      <option value={chartTypes.TOPSELLING_PAID}>Top Paid</option>
                      <option value={chartTypes.TOPGROSSING}>Top Grossing</option>
                      <option value={chartTypes.TOP_RATED}>Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Chart Apps */}
            <AppSection 
              title={selectedChartType === chartTypes.TOPSELLING_FREE ? "Top Free Apps" : 
                    selectedChartType === chartTypes.TOPSELLING_PAID ? "Top Paid Apps" : 
                    selectedChartType === chartTypes.TOPGROSSING ? "Top Grossing Apps" : 
                    "Top Rated Apps"} 
              apps={topChartsQuery.data} 
              viewAll={false} 
              horizontal={false}
            />
          </>
        )}

        {/* Apps Tab Content */}
        {activeTab === 'apps' && !searchQuery && (
          <>
            <div className="px-4 mb-6">
              <h1 className="text-3xl font-bold mb-1">Apps</h1>
              <p className="text-gray-500">The best apps for your iPhone</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold px-4 mb-3">App of the Day</h2>
              <div className="px-4">
                {featuredApp && (
                  <TodaysApp app={featuredApp} />
                )}
              </div>
            </div>

            <AppSection 
              title="Must-Have Apps" 
              apps={topChartsQuery.data} 
              viewAll={true} 
            />

            <div className="mb-8">
              <h2 className="text-xl font-bold px-4 mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
                {Object.entries(categories).slice(1, 9).map(([key, label]) => (
                  <motion.div
                    key={key}
                    className="bg-white rounded-xl shadow-sm p-4 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      setSelectedCategory(key);
                      setActiveTab('charts');
                    }}
                  >
                    <h3 className="font-medium text-center">{label}</h3>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button className="text-blue-500 font-medium">
                  See All Categories
                </button>
              </div>
            </div>
          </>
        )}

        {/* Arcade Tab Content */}
        {activeTab === 'arcade' && !searchQuery && (
          <>
            <div className="px-4 mb-6">
              <h1 className="text-3xl font-bold mb-1">Apple Arcade</h1>
              <p className="text-gray-500">Unlimited games, no ads, no in-app purchases</p>
            </div>

            <div className="px-4 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h2 className="font-bold text-2xl mb-2">Try Apple Arcade</h2>
                <p className="mb-4">Play 200+ incredibly fun games with no ads and no in-app purchases.</p>
                <button className="bg-white text-blue-600 font-bold rounded-full px-4 py-2">
                  Try It Free
                </button>
              </div>
            </div>

            <AppSection 
              title="Popular Arcade Games" 
              apps={arcadeAppsQuery.data} 
              viewAll={true} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AppStoreHome;