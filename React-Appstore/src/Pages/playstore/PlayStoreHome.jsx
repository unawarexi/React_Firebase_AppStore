/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
// Change react-query imports to @tanstack/react-query
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AppQueryUtil from '../../utils/PlayStoreHelper';

// Initialize the utility
const queryUtil = new AppQueryUtil();

// Get categories and chart types from utility
const allCategories = queryUtil.getAllCategories();
const chartTypes = queryUtil.getChartTypes();
const contentRatings = queryUtil.getContentRatings();
const timePeriods = queryUtil.getTimePeriods();

// Create a flattened list of all categories for UI display
const categoryOptions = [
  { key: "ALL", label: "All Categories" },
  ...Object.entries(allCategories.main).map(([key, label]) => ({ key, label })),
  ...Object.entries(allCategories.family).map(([key, label]) => ({ key, label: `🧒 ${label}` }))
];

// App Card Component
const AppCard = ({ app }) => {
  return (
    <motion.div 
      className="flex flex-col w-32 p-2 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-full mb-2">
        <img 
          src={app.icon || "/api/placeholder/64/64"} 
          alt={app.title} 
          className="w-16 h-16 rounded-xl mx-auto"
        />
      </div>
      <h3 className="text-sm font-medium truncate">{app.title}</h3>
      <div className="flex items-center mt-1">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.round(app.rating || 0) ? "text-yellow-500" : "text-gray-300"}`}>★</span>
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">{app.rating?.toFixed(1) || "N/A"}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1 truncate">{app.price_text || "Free"}</p>
    </motion.div>
  );
};

// App Row Component
const AppRow = ({ app, index }) => {
  return (
    <motion.div 
      className="flex items-center p-2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
    >
      <span className="text-gray-400 w-6 text-center">{index + 1}</span>
      <div className="w-12 h-12 mx-3">
        <img 
          src={app.icon || "/api/placeholder/48/48"} 
          alt={app.title} 
          className="w-12 h-12 rounded-xl"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium truncate">{app.title}</h3>
        <p className="text-xs text-gray-500 truncate">{app.developer}</p>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xs ${i < Math.round(app.rating || 0) ? "text-yellow-500" : "text-gray-300"}`}>★</span>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">{app.rating?.toFixed(1) || "N/A"}</span>
        </div>
      </div>
      <div className="ml-2 w-16 text-center">
        <button className="bg-gray-100 text-green-700 rounded-full py-1 px-3 text-sm font-medium">
          {app.price_text || "Free"}
        </button>
      </div>
    </motion.div>
  );
};

// App Grid Component
const AppGrid = ({ apps, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!apps || apps.length === 0) {
    return (
      <div className="flex justify-center py-8 text-gray-500">
        No apps found. Try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
      {apps?.map((app, index) => (
        <motion.div 
          key={app.package_name || index}
          className="bg-white rounded-lg shadow-sm p-3 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex">
            <img 
              src={app.icon || "/api/placeholder/64/64"} 
              alt={app.title} 
              className="w-16 h-16 rounded-xl"
            />
            <div className="ml-3 flex-1">
              <h3 className="font-medium text-sm truncate">{app.title}</h3>
              <p className="text-xs text-gray-500 truncate">{app.developer}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-yellow-500 mr-1">{app.rating?.toFixed(1) || "N/A"}</span>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.round(app.rating || 0) ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {app.downloads_text || `${Math.floor(Math.random() * 1000)}M+ downloads`}
            </span>
            <button className="bg-gray-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">
              {app.price_text || "Free"}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">
            {app.short_desc || app.description?.substring(0, 80) || "An amazing app for your Android device."}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// App Section Component
const AppSection = ({ title, apps, viewAll, horizontal = true }) => {
  if (!apps || apps.length === 0) return null;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2 px-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewAll && (
          <button className="text-green-700 font-medium">See all</button>
        )}
      </div>
      
      {horizontal ? (
        <div className="flex overflow-x-auto pb-4 hide-scrollbar">
          {apps.map((app, index) => (
            <AppCard key={app.package_name || index} app={app} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {apps.map((app, index) => (
            <AppRow key={app.package_name || index} app={app} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main PlayStoreHome Component
const PlayStoreHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedChartType, setSelectedChartType] = useState(chartTypes.TOPSELLING_FREE);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("charts");
  const [selectedContentRating, setSelectedContentRating] = useState("ALL");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods.LAST_MONTH);
  const queryClient = useQueryClient();
  
  // Function to fetch top charts
  const fetchTopCharts = useCallback(async () => {
    const result = await queryUtil.getTopChartApps(
      selectedChartType,
      selectedCategory === "ALL" ? "OVERALL" : selectedCategory,
      { limit: 20 }
    );
    return result.results;
  }, [selectedCategory, selectedChartType]);
  
  // Function to fetch top rated apps
  const fetchTopRated = useCallback(async () => {
    const result = await queryUtil.getTopRatedApps({
      category: selectedCategory === "ALL" ? null : selectedCategory,
      limit: 20,
      minRatings: 1000
    });
    return result.results;
  }, [selectedCategory]);
  
  // Function to fetch most downloaded apps
  const fetchMostDownloaded = useCallback(async () => {
    const result = await queryUtil.getMostDownloadedApps({
      category: selectedCategory === "ALL" ? null : selectedCategory,
      limit: 20
    });
    return result.results;
  }, [selectedCategory]);
  
  // Function to fetch newest apps
  const fetchNewest = useCallback(async () => {
    const result = await queryUtil.getNewestApps({
      category: selectedCategory === "ALL" ? null : selectedCategory,
      timePeriod: selectedTimePeriod,
      limit: 20
    });
    return result.results;
  }, [selectedCategory, selectedTimePeriod]);
  
  // Function to fetch search results
  const fetchSearchResults = useCallback(async () => {
    if (!searchTerm) return [];
    
    const result = await queryUtil.searchApps(searchTerm, {
      category: selectedCategory === "ALL" ? null : selectedCategory,
      limit: 30
    });
    return result.results;
  }, [searchTerm, selectedCategory]);
  
  // Function to fetch apps by content rating
  const fetchByContentRating = useCallback(async () => {
    if (selectedContentRating === "ALL") return [];
    
    const result = await queryUtil.getAppsByContentRating(selectedContentRating, {
      category: selectedCategory === "ALL" ? null : selectedCategory,
      limit: 20
    });
    return result.results;
  }, [selectedContentRating, selectedCategory]);
  
  // Queries
  const topChartsQuery = useQuery({
    queryKey: ['topCharts', selectedCategory, selectedChartType],
    queryFn: fetchTopCharts,
    enabled: activeTab === 'charts'
  });

  const topRatedQuery = useQuery({
    queryKey: ['topRated', selectedCategory],
    queryFn: fetchTopRated,
    enabled: activeTab === 'charts' || activeTab === 'forYou'
  });

  const mostDownloadedQuery = useQuery({
    queryKey: ['mostDownloaded', selectedCategory],
    queryFn: fetchMostDownloaded,
    enabled: activeTab === 'charts' || activeTab === 'forYou'
  });

  const newestQuery = useQuery({
    queryKey: ['newest', selectedCategory, selectedTimePeriod],
    queryFn: fetchNewest,
    enabled: activeTab === 'charts' || activeTab === 'forYou'
  });

  const searchQuery = useQuery({
    queryKey: ['search', searchTerm, selectedCategory],
    queryFn: fetchSearchResults,
    enabled: !!searchTerm && activeTab === 'search'
  });

  const contentRatingQuery = useQuery({
    queryKey: ['contentRating', selectedContentRating, selectedCategory],
    queryFn: fetchByContentRating,
    enabled: selectedContentRating !== "ALL" && activeTab === 'forYou'
  });
  
  // Debounced search handler
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    const timerId = setTimeout(() => {
      setSearchTerm(value);
      setActiveTab(value ? 'search' : 'charts');
    }, 500);
    
    return () => clearTimeout(timerId);
  }, []);
  
  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Invalidate relevant queries to trigger refetch
    queryClient.invalidateQueries(['topCharts']);
    queryClient.invalidateQueries(['topRated']);
    queryClient.invalidateQueries(['mostDownloaded']);
    queryClient.invalidateQueries(['newest']);
    if (searchTerm) {
      queryClient.invalidateQueries(['search']);
    }
  };
  
  // Handle chart type change
  const handleChartTypeChange = (e) => {
    setSelectedChartType(e.target.value);
    queryClient.invalidateQueries(['topCharts']);
  };
  
  // Handle content rating change
  const handleContentRatingChange = (e) => {
    setSelectedContentRating(e.target.value);
    queryClient.invalidateQueries(['contentRating']);
  };
  
  // Handle time period change
  const handleTimePeriodChange = (e) => {
    setSelectedTimePeriod(e.target.value);
    queryClient.invalidateQueries(['newest']);
  };
  
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-green-700">Play Store</h1>
            </div>
            
            <div className="flex-1 md:ml-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for apps & games"
                  className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={handleSearch}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 border-b">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'charts' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
              onClick={() => setActiveTab('charts')}
            >
              Top Charts
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'forYou' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
              onClick={() => setActiveTab('forYou')}
            >
              For You
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'categories' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters Bar */}
      <div className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto">
          <div className="flex items-center space-x-4">
            <div className="whitespace-nowrap">
              <label htmlFor="category" className="text-sm font-medium text-gray-700 mr-2">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="py-1 px-2 border border-gray-300 rounded text-sm"
              >
                {categoryOptions.map(cat => (
                  <option key={cat.key} value={cat.key}>{cat.label}</option>
                ))}
              </select>
            </div>
            
            {activeTab === 'charts' && (
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
                  <option value={chartTypes.MOVERS_SHAKERS}>Trending</option>
                </select>
              </div>
            )}
            
            {activeTab === 'forYou' && (
              <>
                <div className="whitespace-nowrap">
                  <label htmlFor="contentRating" className="text-sm font-medium text-gray-700 mr-2">Content Rating:</label>
                  <select
                    id="contentRating"
                    value={selectedContentRating}
                    onChange={handleContentRatingChange}
                    className="py-1 px-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="ALL">All Ratings</option>
                    {Object.entries(contentRatings).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="whitespace-nowrap">
                  <label htmlFor="timePeriod" className="text-sm font-medium text-gray-700 mr-2">Time Period:</label>
                  <select
                    id="timePeriod"
                    value={selectedTimePeriod}
                    onChange={handleTimePeriodChange}
                    className="py-1 px-2 border border-gray-300 rounded text-sm"
                  >
                    {Object.entries(timePeriods).map(([key, label]) => (
                      <option key={key} value={key}>{label.replace('_', ' ').toLowerCase()}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto pb-12">
        {activeTab === 'search' && searchTerm && (
          <div className="mb-8">
            <h2 className="text-xl font-bold px-4 mb-4">Search Results for "{searchTerm}"</h2>
            <AppGrid apps={searchQuery.data} isLoading={searchQuery.isLoading} />
          </div>
        )}
        
        {activeTab === 'charts' && (
          <>
            <AppSection
              title={`Top ${selectedChartType === chartTypes.TOPSELLING_FREE ? 'Free' : 
                      selectedChartType === chartTypes.TOPSELLING_PAID ? 'Paid' : 
                      selectedChartType === chartTypes.TOPGROSSING ? 'Grossing' : 'Trending'} Apps`}
              apps={topChartsQuery.data}
              viewAll={true}
              horizontal={false}
            />
            
            <AppSection
              title="Top Rated Apps"
              apps={topRatedQuery.data}
              viewAll={true}
            />
            
            <AppSection
              title="Most Downloaded Apps"
              apps={mostDownloadedQuery.data}
              viewAll={true}
            />
            
            <AppSection
              title="Newest Apps"
              apps={newestQuery.data}
              viewAll={true}
            />
          </>
        )}
        
        {activeTab === 'forYou' && (
          <>
            {selectedContentRating !== "ALL" && (
              <AppSection
                title={`${contentRatings[selectedContentRating]} Apps`}
                apps={contentRatingQuery.data}
                viewAll={true}
              />
            )}
            
            <AppSection
              title="Recommended for You"
              apps={topRatedQuery.data}
              viewAll={true}
            />
            
            <AppSection
              title={`New Apps (${Object.values(timePeriods).find(v => v === selectedTimePeriod)?.toLowerCase()})`}
              apps={newestQuery.data}
              viewAll={true}
            />
            
            <AppSection
              title="Popular Apps"
              apps={mostDownloadedQuery.data}
              viewAll={true}
            />
          </>
        )}
        
        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {categoryOptions.slice(1).map((category) => (
              <motion.div
                key={category.key}
                className="bg-white rounded-lg shadow-sm p-4 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setSelectedCategory(category.key);
                  setActiveTab('charts');
                }}
              >
                <h3 className="font-medium text-center">{category.label}</h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayStoreHome;