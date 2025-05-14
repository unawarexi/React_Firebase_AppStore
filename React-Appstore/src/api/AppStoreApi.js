import axios from 'axios';

const BASE_URL = 'https://data.42matters.com/api';
const ACCESS_TOKEN = 'b23c2989117226a9777133be140b6ccfc80d9ed9';

/**
 * AppStore API client for 42matters API
 */
class AppStoreApi {
  constructor(accessToken = ACCESS_TOKEN) {
    this.accessToken = accessToken;
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
  }

  /**
   * Get app details by app ID
   * @param {string} appId - The app ID (e.g., '284882215')
   * @returns {Promise<Object>} App details
   */
  async getAppDetails(appId) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/lookup.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app details:', error);
      throw error;
    }
  }

  /**
   * Request recrawl of an app
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} Recrawl response
   */
  async requestRecrawl(appId) {
    try {
      const response = await this.axios.get(`/1/ios/apps/recrawl.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error requesting recrawl:', error);
      throw error;
    }
  }

  /**
   * Get app reviews
   * @param {string} appId - The app ID
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Reviews data
   */
  async getAppReviews(appId, options = {}) {
    try {
      const response = await this.axios.get(`/v4.0/ios/apps/reviews.json`, {
        params: {
          id: appId,
          access_token: this.accessToken,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app reviews:', error);
      throw error;
    }
  }

  /**
   * Get app review analysis/topics
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} Review analysis data
   */
  async getReviewAnalysis(appId) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/topics.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching review analysis:', error);
      throw error;
    }
  }

  /**
   * Get app country availability
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} Country availability data
   */
  async getCountryAvailability(appId) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/availability.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching country availability:', error);
      throw error;
    }
  }

  /**
   * Get app IAB category
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} Category data
   */
  async getIabCategory(appId) {
    try {
      const response = await this.axios.get(`/v5.0/ios/apps/category.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching IAB category:', error);
      throw error;
    }
  }

  /**
   * Get app-ads.txt information
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} App-ads.txt data
   */
  async getAppAdsTxt(appId) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/app_ads_txt.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app-ads.txt:', error);
      throw error;
    }
  }

  /**
   * Get app changelog history
   * @param {string} appId - The app ID
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Object>} Changelog data
   */
  async getChangelog(appId, startDate, endDate) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/changelog.json`, {
        params: {
          id: appId,
          start_date: startDate,
          end_date: endDate,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching changelog:', error);
      throw error;
    }
  }

  /**
   * Search for app changelogs
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @param {Object} options - Additional search parameters
   * @returns {Promise<Object>} Changelog search results
   */
  async searchChangelog(startDate, endDate, options = {}) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/changelog_search.json`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          access_token: this.accessToken,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching changelog:', error);
      throw error;
    }
  }

  /**
   * Get matching apps
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} Matching apps data
   */
  async getMatchingApps(appId) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/matching.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching matching apps:', error);
      throw error;
    }
  }

  /**
   * Search for apps by query
   * @param {string} query - Search query
   * @param {number} limit - Results limit
   * @param {Object} options - Additional search parameters
   * @returns {Promise<Object>} Search results
   */
  async searchApps(query, limit = 10, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/search.json`, {
        params: {
          q: query,
          limit,
          access_token: this.accessToken,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching apps:', error);
      throw error;
    }
  }

  /**
   * Advanced query for apps
   * @param {Object} queryParams - Query parameters
   * @returns {Promise<Object>} Query results
   */
  async advancedQuery(queryParams) {
    try {
      const response = await this.axios.post(`/v2.0/ios/apps/query.json`, {
        query: {
          query_params: queryParams
        }
      }, {
        params: {
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error performing advanced query:', error);
      throw error;
    }
  }

  /**
   * Get app integrated SDKs
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} SDKs data
   */
  async getIntegratedSdks(appId) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/sdks.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching integrated SDKs:', error);
      throw error;
    }
  }

  /**
   * Search apps by SDK
   * @param {string} sdkName - SDK name
   * @param {number} limit - Results limit
   * @param {Object} options - Additional search parameters
   * @returns {Promise<Object>} Search results
   */
  async searchBySdk(sdkName, limit = 10, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/by_sdk.json`, {
        params: {
          any_sdks: sdkName,
          limit,
          access_token: this.accessToken,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching by SDK:', error);
      throw error;
    }
  }

  /**
   * Search apps by web domain
   * @param {string} domain - Web domain
   * @param {number} limit - Results limit
   * @param {Object} options - Additional search parameters
   * @returns {Promise<Object>} Search results
   */
  async searchByDomain(domain, limit = 10, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/by_domain.json`, {
        params: {
          domain_search_term: domain,
          limit,
          access_token: this.accessToken,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching by domain:', error);
      throw error;
    }
  }

  /**
   * Search apps by permission
   * @param {string} permission - Permission name
   * @param {number} limit - Results limit
   * @param {Object} options - Additional search parameters
   * @returns {Promise<Object>} Search results
   */
  async searchByPermission(permission, limit = 10, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/by_permission.json`, {
        params: {
          any_permissions: permission,
          limit,
          access_token: this.accessToken,
          ...options
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching by permission:', error);
      throw error;
    }
  }

  /**
   * Get Apple App Store top charts
   * @param {string} listName - List name (e.g., 'topselling_free')
   * @param {string} genreId - Primary genre ID
   * @param {string} deviceType - Device type (e.g., 'iphone')
   * @param {string} country - Country code
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} Top charts data
   */
  async getTopCharts(listName = 'topselling_free', genreId = '36', deviceType = 'iphone', country = 'US', limit = 10) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/top_appstore_charts.json`, {
        params: {
          list_name: listName,
          primaryGenreId: genreId,
          device_type: deviceType,
          country,
          limit,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top charts:', error);
      throw error;
    }
  }

  /**
   * Get app rank history
   * @param {string} appId - The app ID
   * @param {number} days - Number of days
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} Rank history data
   */
  async getAppRankHistory(appId, days = 10, limit = 10) {
    try {
      const response = await this.axios.get(`/v4.0/ios/apps/ranks.json`, {
        params: {
          id: appId,
          days,
          limit,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app rank history:', error);
      throw error;
    }
  }

  /**
   * Get app download estimates history
   * @param {string} appId - The app ID
   * @param {number} days - Number of days
   * @returns {Promise<Object>} Download estimates data
   */
  async getDownloadEstimates(appId, days = 10) {
    try {
      const response = await this.axios.get(`/v5.0/ios/apps/download_estimates.json`, {
        params: {
          id: appId,
          days,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching download estimates:', error);
      throw error;
    }
  }

  /**
   * Get SKAdNetwork attribution data
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} Attribution data
   */
  async getSKAdNetworkAttribution(appId) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/attribution.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching SKAdNetwork attribution:', error);
      throw error;
    }
  }

  /**
   * Get app ratings history
   * @param {string} appId - The app ID
   * @param {number} days - Number of days
   * @returns {Promise<Object>} Ratings history data
   */
  async getAppRatingsHistory(appId, days = 30) {
    try {
      const response = await this.axios.get(`/v2.0/ios/apps/ratings.json`, {
        params: {
          id: appId,
          days,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app ratings history:', error);
      throw error;
    }
  }

  /**
   * Get app ASO keywords
   * @param {string} appId - The app ID
   * @param {string} country - Country code
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} ASO keywords data
   */
  async getAsoAppKeywords(appId, country = 'US', limit = 5) {
    try {
      const response = await this.axios.get(`/v2.0/ios/aso/app_keywords.json`, {
        params: {
          id: appId,
          country,
          limit,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ASO app keywords:', error);
      throw error;
    }
  }

  /**
   * Search ASO keywords
   * @param {string} appId - The app ID
   * @param {string} term - Search term
   * @param {string} country - Country code
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} Keyword search results
   */
  async searchAsoKeywords(appId, term, country = 'US', limit = 5) {
    try {
      const response = await this.axios.get(`/v2.0/ios/aso/keyword_search.json`, {
        params: {
          id: appId,
          term,
          country,
          limit,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching ASO keywords:', error);
      throw error;
    }
  }

  /**
   * Get ASO keyword stats
   * @param {string} appId - The app ID
   * @param {string} keywords - Comma-separated list of keywords
   * @param {string} country - Country code
   * @returns {Promise<Object>} Keyword stats data
   */
  async getAsoKeywordStats(appId, keywords, country = 'US') {
    try {
      const response = await this.axios.get(`/v2.0/ios/aso/keyword_stats.json`, {
        params: {
          id: appId,
          keywords,
          country,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ASO keyword stats:', error);
      throw error;
    }
  }

  /**
   * Get app keyword ranking
   * @param {string} appId - The app ID
   * @param {string} country - Country code
   * @param {string} keywords - Comma-separated list of keywords
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Object>} Keyword ranking data
   */
  async getAppKeywordRanking(appId, country, keywords, startDate, endDate) {
    try {
      const response = await this.axios.get(`/v2.0/ios/aso/app_keyword_ranking.json`, {
        params: {
          id: appId,
          country,
          keywords,
          start_date: startDate,
          end_date: endDate,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app keyword ranking:', error);
      throw error;
    }
  }

  /**
   * Get app monthly active users estimates history
   * @param {string} appId - The app ID
   * @returns {Promise<Object>} MAU estimates data
   */
  async getMonthlyActiveUsers(appId) {
    try {
      const response = await this.axios.get(`/v3.0/ios/apps/mau.json`, {
        params: {
          id: appId,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly active users:', error);
      throw error;
    }
  }
}

export default AppStoreApi;