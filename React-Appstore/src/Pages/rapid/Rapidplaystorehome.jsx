import React, { useState } from 'react';
import PlayStoreApi from '../../api/rapid/rapidPlayStore'; // Correct import for PlayStoreApi
import {
  useAppDetails,
  useAppReviews,
  useTopFreeApps,
  useTopPaidApps,
  useTopGrossingApps,
  useTopTrendingApps,
  useNewFreeApps,
  useNewPaidApps,
  useCategories,
  useSearchApps
} from '../../hooks/apps/rapid/RapidUseApps'; // Import all hooks
import { Smartphone, DollarSign, TrendingUp, Star, Calendar, Search, Info, MessageSquare, Package } from 'lucide-react';

const RapidPlayStoreHome = () => {
  const [selectedApi, setSelectedApi] = useState('topFreeApps');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  // Initialize API with your key
  const api = new PlayStoreApi('b435739c48msh5ace7ef41ff506dp1d58dfjsn1cd283659574', {
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  // Only enable the query for the selected API tab
  const topFreeAppsQuery = useTopFreeApps(api, { primary_category: selectedCategory }, { enabled: selectedApi === 'topFreeApps' });
  const topPaidAppsQuery = useTopPaidApps(api, { primary_category: selectedCategory }, { enabled: selectedApi === 'topPaidApps' });
  const topGrossingAppsQuery = useTopGrossingApps(api, { primary_category: selectedCategory }, { enabled: selectedApi === 'topGrossingApps' });
  const topTrendingAppsQuery = useTopTrendingApps(api, { primary_category: selectedCategory }, { enabled: selectedApi === 'topTrendingApps' });
  const newFreeAppsQuery = useNewFreeApps(api, { primary_category: selectedCategory }, { enabled: selectedApi === 'newFreeApps' });
  const newPaidAppsQuery = useNewPaidApps(api, { primary_category: selectedCategory }, { enabled: selectedApi === 'newPaidApps' });
  const categoriesQuery = useCategories(api);
  const searchAppsQuery = useSearchApps(api, searchQuery, {}, { enabled: selectedApi === 'search' && !!searchQuery });

  // App details and reviews queries (only enabled when an app is selected)
  const appDetailsQuery = useAppDetails(api, selectedApp?.app_id, {}, { enabled: !!selectedApp });
  const appReviewsQuery = useAppReviews(api, selectedApp?.app_id, {}, { enabled: !!selectedApp });

  // Helper function to get the current data based on the selected API
  const getCurrentData = () => {
    switch (selectedApi) {
      case 'topFreeApps':
        return topFreeAppsQuery.data?.data?.top_apps || [];
      case 'topPaidApps':
        return topPaidAppsQuery.data?.data?.top_apps || [];
      case 'topGrossingApps':
        return topGrossingAppsQuery.data?.data?.top_apps || [];
      case 'topTrendingApps':
        return topTrendingAppsQuery.data?.data?.top_apps || [];
      case 'newFreeApps':
        return newFreeAppsQuery.data?.data?.top_apps || [];
      case 'newPaidApps':
        return newPaidAppsQuery.data?.data?.top_apps || [];
      case 'search':
        return searchAppsQuery.data?.data?.searched_apps || [];
      default:
        return [];
    }
  };

  // Helper function to check if the current API is loading
  const isLoading = () => {
    switch (selectedApi) {
      case 'topFreeApps':
        return topFreeAppsQuery.isLoading;
      case 'topPaidApps':
        return topPaidAppsQuery.isLoading;
      case 'topGrossingApps':
        return topGrossingAppsQuery.isLoading;
      case 'topTrendingApps':
        return topTrendingAppsQuery.isLoading;
      case 'newFreeApps':
        return newFreeAppsQuery.isLoading;
      case 'newPaidApps':
        return newPaidAppsQuery.isLoading;
      case 'search':
        return searchAppsQuery.isLoading;
      default:
        return false;
    }
  };

  // Handle app selection
  const handleAppSelect = (app) => {
    setSelectedApp(app);
  };

  // Handle closing app details
  const handleCloseAppDetails = () => {
    setSelectedApp(null);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedApi('search');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      {/*
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for apps..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <Search size={18} className="mr-1" /> Search
          </button>
        </form>
      </div>
      */}
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1 rounded ${
              selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          {categoriesQuery.isSuccess && 
            Object.keys(categoriesQuery.data?.data || {}).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-b">
        <div className="flex flex-wrap -mb-px">
          <button
            onClick={() => setSelectedApi('topFreeApps')}
            className={`mr-2 py-2 px-4 flex items-center ${
              selectedApi === 'topFreeApps'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <Smartphone size={18} className="mr-1" /> Top Free Apps
          </button>
          <button
            onClick={() => setSelectedApi('topPaidApps')}
            className={`mr-2 py-2 px-4 flex items-center ${
              selectedApi === 'topPaidApps'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <DollarSign size={18} className="mr-1" /> Top Paid Apps
          </button>
          <button
            onClick={() => setSelectedApi('topGrossingApps')}
            className={`mr-2 py-2 px-4 flex items-center ${
              selectedApi === 'topGrossingApps'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <Star size={18} className="mr-1" /> Top Grossing Apps
          </button>
          <button
            onClick={() => setSelectedApi('topTrendingApps')}
            className={`mr-2 py-2 px-4 flex items-center ${
              selectedApi === 'topTrendingApps'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <TrendingUp size={18} className="mr-1" /> Top Trending Apps
          </button>
          <button
            onClick={() => setSelectedApi('newFreeApps')}
            className={`mr-2 py-2 px-4 flex items-center ${
              selectedApi === 'newFreeApps'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <Calendar size={18} className="mr-1" /> New Free Apps
          </button>
          <button
            onClick={() => setSelectedApi('newPaidApps')}
            className={`mr-2 py-2 px-4 flex items-center ${
              selectedApi === 'newPaidApps'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            <Package size={18} className="mr-1" /> New Paid Apps
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-8">
        {/* App List */}
        {!selectedApp && (
          <div>
            <h1 className="text-2xl font-bold mb-4">
              {selectedApi === 'topFreeApps' && 'Top Free Apps for Android'}
              {selectedApi === 'topPaidApps' && 'Top Paid Apps for Android'}
              {selectedApi === 'topGrossingApps' && 'Top Grossing Apps for Android'}
              {selectedApi === 'topTrendingApps' && 'Top Trending Apps for Android'}
              {selectedApi === 'newFreeApps' && 'New Free Apps for Android'}
              {selectedApi === 'newPaidApps' && 'New Paid Apps for Android'}
              {selectedApi === 'search' && 'Search Results'}
            </h1>
            
            {isLoading() ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getCurrentData().map((app, index) => (
                  <div
                    key={app.app_id || index}
                    className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleAppSelect(app)}
                  >
                    <div className="flex items-center mb-2">
                      {app.icon ? (
                        <img
                          src={app.icon}
                          alt={app.title}
                          className="w-12 h-12 rounded-lg mr-3"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                          <Smartphone size={24} />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{app.title}</h3>
                        <p className="text-sm text-gray-600">{app.developer_name}</p>
                      </div>
                    </div>
                    {app.rank && (
                      <div className="mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-block">
                        Rank: #{app.rank}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {!isLoading() && getCurrentData().length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No apps found. Try changing your filters or search query.
              </div>
            )}
          </div>
        )}

        {/* App Details and Reviews (shown when an app is selected) */}
        {selectedApp && (
          <div>
            <button
              onClick={handleCloseAppDetails}
              className="mb-4 flex items-center text-blue-500"
            >
              ← Back to list
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* App Details Section */}
              <div>
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                  <Info size={24} className="mr-2" /> App Details
                </h1>
                
                {appDetailsQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : appDetailsQuery.isError ? (
                  <div className="bg-red-100 text-red-700 p-4 rounded">
                    Error loading app details
                  </div>
                ) : (
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center mb-6">
                      {appDetailsQuery.data?.icon ? (
                        <img
                          src={appDetailsQuery.data.icon}
                          alt={selectedApp.title}
                          className="w-20 h-20 rounded-lg mr-4"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                          <Smartphone size={36} />
                        </div>
                      )}
                      <div>
                        <h2 className="text-xl font-bold">{selectedApp.title}</h2>
                        <p className="text-gray-600">{selectedApp.developer_name}</p>
                        {appDetailsQuery.data?.category && (
                          <div className="mt-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-block">
                            {appDetailsQuery.data.category}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {appDetailsQuery.data?.rating && (
                      <div className="mb-4">
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{appDetailsQuery.data.rating}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                fill={star <= Math.round(appDetailsQuery.data.rating) ? "gold" : "none"}
                                stroke={star <= Math.round(appDetailsQuery.data.rating) ? "gold" : "gray"}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-500">
                            ({appDetailsQuery.data.reviews_count} reviews)
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {appDetailsQuery.data?.description && (
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-gray-700">
                          {appDetailsQuery.data.description.substring(0, 300)}
                          {appDetailsQuery.data.description.length > 300 ? '...' : ''}
                        </p>
                      </div>
                    )}
                    
                    <a
                      href={selectedApp.google_play_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View on Google Play
                    </a>
                  </div>
                )}
              </div>
              
              {/* App Reviews Section */}
              <div>
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                  <MessageSquare size={24} className="mr-2" /> App Reviews
                </h1>
                
                {appReviewsQuery.isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : appReviewsQuery.isError ? (
                  <div className="bg-red-100 text-red-700 p-4 rounded">
                    Error loading app reviews
                  </div>
                ) : (
                  <div className="border rounded-lg p-6">
                    {(appReviewsQuery.data?.data?.reviews || []).length > 0 ? (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {appReviewsQuery.data.data.reviews.map((review, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center mb-2">
                              <div className="flex mr-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={14}
                                    fill={star <= review.rating ? "gold" : "none"}
                                    stroke={star <= review.rating ? "gold" : "gray"}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date || 'Unknown date'}
                              </span>
                            </div>
                            <p className="text-sm font-semibold">{review.username || 'Anonymous'}</p>
                            <p className="text-sm text-gray-700 mt-1">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No reviews available for this app.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RapidPlayStoreHome;