import axios from 'axios';

const BASE_URL = 'https://data.42matters.com/api';
const ACCESS_TOKEN = 'b23c2989117226a9777133be140b6ccfc80d9ed9';

/**
 * PlayStore API client for 42matters API
 */
class PlayStoreApi {
  constructor(accessToken = ACCESS_TOKEN) {
    this.accessToken = accessToken;
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
  }

  /**
   * Get app details by package name
   * @param {string} packageName - The app package name (e.g., 'com.facebook.katana')
   * @returns {Promise<Object>} App details
   */
  async getAppDetails(packageName) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/lookup.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} Recrawl response
   */
  async requestRecrawl(packageName) {
    try {
      const response = await this.axios.get(`/1/apps/recrawl.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Reviews data
   */
  async getAppReviews(packageName, options = {}) {
    try {
      const response = await this.axios.get(`/v4.0/android/apps/reviews.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} Review analysis data
   */
  async getReviewAnalysis(packageName) {
    try {
      const response = await this.axios.get(`/v3.0/android/apps/topics.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} Country availability data
   */
  async getCountryAvailability(packageName) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/availability.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} Category data
   */
  async getIabCategory(packageName) {
    try {
      const response = await this.axios.get(`/v5.0/android/apps/category.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} App-ads.txt data
   */
  async getAppAdsTxt(packageName) {
    try {
      const response = await this.axios.get(`/v3.0/android/apps/app_ads_txt.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Object>} Changelog data
   */
  async getChangelog(packageName, startDate, endDate) {
    try {
      const response = await this.axios.get(`/v3.0/android/apps/changelog.json`, {
        params: {
          p: packageName,
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
      const response = await this.axios.get(`/v3.0/android/apps/changelog_search.json`, {
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} Matching apps data
   */
  async getMatchingApps(packageName) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/matching.json`, {
        params: {
          p: packageName,
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
  async searchApps(query, limit = 50, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/search.json`, {
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
      const response = await this.axios.post(`/v2.0/android/apps/query.json`, {
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
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} SDKs data
   */
  async getIntegratedSdks(packageName) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/sdks.json`, {
        params: {
          p: packageName,
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
  async searchBySdk(sdkName, limit = 50, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/by_sdk.json`, {
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
  async searchByDomain(domain, limit = 50, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/by_domain.json`, {
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
  async searchByPermission(permission, limit = 50, options = {}) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/by_permission.json`, {
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
   * Get Google Play top charts
   * @param {string} listName - List name (e.g., 'topselling_free')
   * @param {string} category - Category key
   * @param {string} country - Country code
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} Top charts data
   */
  async getTopCharts(listName = 'topselling_free', category = 'OVERALL', country = 'US', limit = 50) {
    try {
      const response = await this.axios.get(`/v3.0/android/apps/top_google_charts.json`, {
        params: {
          list_name: listName,
          cat_key: category,
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
   * @param {string} packageName - The app package name
   * @param {number} days - Number of days in history
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} Rank history data
   */
  async getAppRankHistory(packageName, days = 50, limit =50) {
    try {
      const response = await this.axios.get(`/v4.0/android/apps/ranks.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @param {number} days - Number of days in history
   * @returns {Promise<Object>} Download estimates data
   */
  async getDownloadEstimates(packageName, days = 10) {
    try {
      const response = await this.axios.get(`/v5.0/android/apps/download_estimates.json`, {
        params: {
          p: packageName,
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
   * Get app ratings history
   * @param {string} packageName - The app package name
   * @param {number} days - Number of days in history
   * @returns {Promise<Object>} Ratings history data
   */
  async getRatingsHistory(packageName, days = 30) {
    try {
      const response = await this.axios.get(`/v2.0/android/apps/ratings.json`, {
        params: {
          p: packageName,
          days,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ratings history:', error);
      throw error;
    }
  }

  /**
   * Get app monthly active users estimates
   * @param {string} packageName - The app package name
   * @returns {Promise<Object>} MAU estimates data
   */
  async getMonthlyActiveUsers(packageName) {
    try {
      const response = await this.axios.get(`/v3.0/android/apps/mau.json`, {
        params: {
          p: packageName,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly active users:', error);
      throw error;
    }
  }

  /**
   * Get ASO app keywords
   * @param {string} packageName - The app package name
   * @param {string} country - Country code
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} ASO keywords data
   */
  async getAsoKeywords(packageName, country = 'US', limit = 5) {
    try {
      const response = await this.axios.get(`/v2.0/android/aso/app_keywords.json`, {
        params: {
          p: packageName,
          country,
          limit,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ASO keywords:', error);
      throw error;
    }
  }

  /**
   * Search ASO keywords
   * @param {string} packageName - The app package name
   * @param {string} term - Search term
   * @param {string} country - Country code
   * @param {number} limit - Results limit
   * @returns {Promise<Object>} Keyword search results
   */
  async searchAsoKeywords(packageName, term, country = 'US', limit = 5) {
    try {
      const response = await this.axios.get(`/v2.0/android/aso/keyword_search.json`, {
        params: {
          p: packageName,
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
   * @param {string} packageName - The app package name
   * @param {string} keywords - Comma-separated keywords
   * @param {string} country - Country code
   * @returns {Promise<Object>} Keyword stats data
   */
  async getAsoKeywordStats(packageName, keywords, country = 'US') {
    try {
      const response = await this.axios.get(`/v2.0/android/aso/keyword_stats.json`, {
        params: {
          p: packageName,
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
   * Get ASO app keyword ranking history
   * @param {string} packageName - The app package name
   * @param {string} country - Country code
   * @param {string} keywords - Comma-separated keywords
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Object>} Keyword ranking data
   */
  async getAsoKeywordRanking(packageName, country = 'US', keywords, startDate, endDate) {
    try {
      const response = await this.axios.get(`/v2.0/android/aso/app_keyword_ranking.json`, {
        params: {
          p: packageName,
          country,
          keywords,
          start_date: startDate,
          end_date: endDate,
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ASO keyword ranking:', error);
      throw error;
    }
  }
}

export default PlayStoreApi;