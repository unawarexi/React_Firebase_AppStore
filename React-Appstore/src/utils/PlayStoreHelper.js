import PlayStoreApi from '../api/PlayStoreApi';

/**
 * Enhanced utility for app queries with organized category support
 */
class AppQueryUtil {
  constructor() {
    this.api = new PlayStoreApi();
    
    // Main app categories
    this.APP_CATEGORIES = {
      OVERALL: "Overall",
      APPLICATION: "All apps",
      GAME: "All games",
      ART_AND_DESIGN: "Art & Design",
      AUTO_AND_VEHICLES: "Auto & Vehicles",
      BEAUTY: "Beauty",
      BOOKS_AND_REFERENCE: "Books & Reference",
      BUSINESS: "Business",
      COMICS: "Comics",
      COMMUNICATION: "Communication",
      DATING: "Dating",
      EDUCATION: "Education",
      ENTERTAINMENT: "Entertainment",
      EVENTS: "Events",
      FINANCE: "Finance",
      FOOD_AND_DRINK: "Food & Drink",
      HEALTH_AND_FITNESS: "Health & Fitness",
      HOUSE_AND_HOME: "House & Home",
      LIFESTYLE: "Lifestyle",
      MAPS_AND_NAVIGATION: "Maps & Navigation",
      MEDICAL: "Medical",
      MUSIC_AND_AUDIO: "Music & Audio",
      NEWS_AND_MAGAZINES: "News & Magazines",
      PARENTING: "Parenting",
      PERSONALIZATION: "Personalization",
      PHOTOGRAPHY: "Photography",
      PRODUCTIVITY: "Productivity",
      SHOPPING: "Shopping",
      SOCIAL: "Social",
      SPORTS: "Sports",
      TOOLS: "Tools",
      TRAVEL_AND_LOCAL: "Travel & Local",
      VIDEO_PLAYERS: "Video Players & Editors",
      WEATHER: "Weather",
      LIBRARIES_AND_DEMO: "Libraries & Demo",
      // Game subcategories
      GAME_ARCADE: "Arcade",
      GAME_PUZZLE: "Puzzle",
      GAME_CARD: "Cards",
      GAME_CASUAL: "Casual",
      GAME_RACING: "Racing",
      GAME_SPORTS: "Sport Games",
      GAME_ACTION: "Action",
      GAME_ADVENTURE: "Adventure",
      GAME_BOARD: "Board",
      GAME_CASINO: "Casino",
      GAME_EDUCATIONAL: "Educational",
      GAME_MUSIC: "Music Games",
      GAME_ROLE_PLAYING: "Role Playing",
      GAME_SIMULATION: "Simulation",
      GAME_STRATEGY: "Strategy",
      GAME_TRIVIA: "Trivia",
      GAME_WORD: "Word Games",
      ANDROID_WEAR: "Android Wear"
    };
    
    // Family filter categories
    this.FAMILY_CATEGORIES = {
      FAMILY: "Family All Ages",
      FAMILY_ACTION: "Family Action",
      FAMILY_BRAINGAMES: "Family Brain Games",
      FAMILY_CREATE: "Family Create",
      FAMILY_EDUCATION: "Family Education",
      FAMILY_MUSICVIDEO: "Family Music & Video",
      FAMILY_PRETEND: "Family Pretend Play"
    };
    
    // Chart types
    this.CHART_TYPES = {
      TOPSELLING_FREE: "topselling_free",
      TOPSELLING_PAID: "topselling_paid",
      TOPGROSSING: "topgrossing",
      MOVERS_SHAKERS: "movers_shakers"
    };
    
    // Time periods
    this.TIME_PERIODS = {
      LAST_DAY: "last_day",
      LAST_WEEK: "last_week",
      LAST_MONTH: "last_month",
      LAST_3_MONTHS: "last_3_months",
      LAST_6_MONTHS: "last_6_months",
      LAST_YEAR: "last_year"
    };
    
    // Content ratings
    this.CONTENT_RATINGS = {
      EVERYONE: "Everyone",
      EVERYONE_50_PLUS: "Everyone 50+",
      TEEN: "Teen",
      MATURE_17_PLUS: "Mature 17+",
      ADULTS_ONLY_18_PLUS: "Adults Only 18+"
    };
  }
  
  /**
   * Get top rated apps
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getTopRatedApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: "rating",
      sort_order: "desc",
      ratings_count_gte: options.minRatings || 5000,
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get most downloaded apps
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getMostDownloadedApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: "downloads",
      sort_order: "desc",
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get most rated apps (by number of ratings)
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getMostRatedApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: "number_ratings",
      sort_order: "desc",
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get newest apps
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getNewestApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: "released",
      sort_order: "desc",
      released_after_dynamic: options.timePeriod || this.TIME_PERIODS.LAST_MONTH,
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get recently updated apps
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getRecentlyUpdatedApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: "updated",
      sort_order: "desc",
      updated_after_dynamic: options.timePeriod || this.TIME_PERIODS.LAST_MONTH,
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get paid apps
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getPaidApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      price_flag: "paid",
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get free apps
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getFreeApps(options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      price_flag: "free",
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by content rating
   * @param {string} contentRating - Content rating key
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByContentRating(contentRating, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      content_rating: [contentRating],
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by developer
   * @param {string} developer - Developer name
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByDeveloper(developer, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      developer: developer,
      developer_exact_match: options.exactMatch !== false
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Search apps by keywords
   * @param {string} term - Search term
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  searchApps(term, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      full_text_term: term,
      ...this._applyCategoryFilter(options.category)
    };
    
    // Add search flags if specified
    if (options.wordsOnly) {
      queryParams.full_text_search_flag = "words_only";
    }
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get similar apps
   * @param {Array<string>} packageNames - Package names to find similar apps for
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getSimilarApps(packageNames, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      more_like_this: {
        like: Array.isArray(packageNames) ? packageNames : [packageNames]
      }
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by rating range
   * @param {number} minRating - Minimum rating
   * @param {number} maxRating - Maximum rating
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByRatingRange(minRating, maxRating, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      rating_gte: minRating,
      rating_lte: maxRating,
      ...this._applyCategoryFilter(options.category)
    };
    
    // Add minimum rating count if specified
    if (options.minRatingCount) {
      queryParams.ratings_count_gte = options.minRatingCount;
    }
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by download count range
   * @param {number} minDownloads - Minimum downloads
   * @param {number} maxDownloads - Maximum downloads
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByDownloadRange(minDownloads, maxDownloads, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score"
    };
    
    if (minDownloads) {
      queryParams.downloads_gte = minDownloads;
    }
    
    if (maxDownloads) {
      queryParams.downloads_lte = maxDownloads;
    }
    
    return this.api.advancedQuery({
      ...queryParams,
      ...this._applyCategoryFilter(options.category)
    });
  }
  
  /**
   * Get apps by SDK integration
   * @param {Array<string>} sdkNames - SDK names to filter by
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsBySdk(sdkNames, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      any_sdks: Array.isArray(sdkNames) ? sdkNames : [sdkNames],
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by required permissions
   * @param {Array<string>} permissions - Permission names to filter by
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByPermissions(permissions, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      any_permissions: Array.isArray(permissions) ? permissions : [permissions],
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by language availability
   * @param {Array<string>} includeLangs - Languages that must be included
   * @param {Array<string>} excludeLangs - Languages that must be excluded
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByLanguages(includeLangs, excludeLangs, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      i18n_lang: {}
    };
    
    if (includeLangs && includeLangs.length > 0) {
      queryParams.i18n_lang.all = {
        lang: includeLangs,
        only: options.onlyIncludedLangs === true
      };
    }
    
    if (excludeLangs && excludeLangs.length > 0) {
      queryParams.i18n_lang.none = {
        lang: excludeLangs
      };
    }
    
    return this.api.advancedQuery({
      ...queryParams,
      ...this._applyCategoryFilter(options.category)
    });
  }
  
  /**
   * Get apps by country availability
   * @param {Array<string>} includeCountries - Countries that must be included
   * @param {Array<string>} excludeCountries - Countries that must be excluded
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByCountryAvailability(includeCountries, excludeCountries, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      available_in: {}
    };
    
    if (includeCountries && includeCountries.length > 0) {
      queryParams.available_in.all = {
        country: includeCountries,
        only: options.onlyIncludedCountries === true
      };
    }
    
    if (excludeCountries && excludeCountries.length > 0) {
      queryParams.available_in.none = {
        country: excludeCountries
      };
    }
    
    return this.api.advancedQuery({
      ...queryParams,
      ...this._applyCategoryFilter(options.category)
    });
  }
  
  /**
   * Get apps by country of development
   * @param {Array<string>} countries - Developer countries
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByDeveloperCountry(countries, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      publisher_geo_context: {
        any: {
          country: Array.isArray(countries) ? countries : [countries]
        }
      },
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by monthly active users
   * @param {number} minMAU - Minimum monthly active users
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByMonthlyActiveUsers(minMAU, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      mau: {
        all: [{ gte: minMAU }]
      },
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps by recent download estimates
   * @param {number} minDownloads - Minimum downloads in period
   * @param {number} maxDownloads - Maximum downloads in period
   * @param {Array<string>} countries - Countries to consider
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByRecentDownloads(minDownloads, maxDownloads, countries, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      download_estimates: {
        all: []
      },
      ...this._applyCategoryFilter(options.category)
    };
    
    const downloadFilter = {};
    
    if (minDownloads) {
      downloadFilter.gte = minDownloads;
    }
    
    if (maxDownloads) {
      downloadFilter.lte = maxDownloads;
    }
    
    if (countries && countries.length > 0) {
      downloadFilter.country = countries;
    }
    
    queryParams.download_estimates.all.push(downloadFilter);
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps with specific privacy data sharing practices
   * @param {string} dataCategory - Data category being shared
   * @param {string} purpose - Purpose of data sharing
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getAppsByPrivacySharing(dataCategory, purpose, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      privacy: {
        any: [{
          type: "shared_data",
          purpose: purpose,
          data_category: dataCategory
        }]
      },
      ...this._applyCategoryFilter(options.category)
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get family apps with specific filter
   * @param {Array<string>} familyFilters - Family filter keys
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Query results
   */
  getFamilyApps(familyFilters, options = {}) {
    const queryParams = {
      from: options.from || 0,
      num: options.limit || 50,
      sort: options.sort || "score",
      family_filter: Array.isArray(familyFilters) ? familyFilters : [familyFilters]
    };
    
    return this.api.advancedQuery(queryParams);
  }
  
  /**
   * Get apps in Google Play top charts
   * @param {string} chartType - Chart type key
   * @param {string} categoryKey - Category key
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Top chart results
   */
  getTopChartApps(chartType = 'topselling_free', categoryKey = 'OVERALL', options = {}) {
    return this.api.getTopCharts(
      chartType,
      categoryKey,
      options.country || 'US',
      options.limit || 50
    );
  }
  
  /**
   * Advanced complex query for apps
   * @param {Object} queryOptions - Full query parameters object
   * @returns {Promise<Object>} Query results
   */
  advancedComplexQuery(queryOptions) {
    return this.api.advancedQuery(queryOptions);
  }
  
  /**
   * Helper method to apply category filter
   * @private
   * @param {string} category - Category key
   * @returns {Object} Category filter parameters
   */
  _applyCategoryFilter(category) {
    if (!category || category === 'ALL' || category === 'OVERALL') {
      return {};
    }
    
    return {
      cat_keys: [category]
    };
  }
  
  /**
   * Helper method to get all main app categories
   * @returns {Object} App categories
   */
  getAllCategories() {
    return {
      main: this.APP_CATEGORIES,
      family: this.FAMILY_CATEGORIES
    };
  }
  
  /**
   * Helper method to get all chart types
   * @returns {Object} Chart types
   */
  getChartTypes() {
    return this.CHART_TYPES;
  }
  
  /**
   * Helper method to get all time period options
   * @returns {Object} Time periods
   */
  getTimePeriods() {
    return this.TIME_PERIODS;
  }
  
  /**
   * Helper method to get all content ratings
   * @returns {Object} Content ratings
   */
  getContentRatings() {
    return this.CONTENT_RATINGS;
  }
}

export default AppQueryUtil;