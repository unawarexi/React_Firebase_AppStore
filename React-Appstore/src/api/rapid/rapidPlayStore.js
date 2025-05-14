import axios from 'axios';

class PlayStoreApi {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://app-store-and-google-play-api.p.rapidapi.com/v1/google-play';
    this.defaultParams = {
      language: options.language || 'en',
      country: options.country || 'us',
      limit: options.limit || '50'
    };
    
    this.headers = {
      'x-rapidapi-host': 'app-store-and-google-play-api.p.rapidapi.com',
      'x-rapidapi-key': this.apiKey
    };
    
    // Default cache settings
    this.cacheTime = options.cacheTime || 1000 * 60 * 60 * 24 * 7; // 1 week
    this.staleTime = options.staleTime || 1000 * 60 * 60 * 24; // 1 day
  }

  fetchAppDetails(bundleId, params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/app-details/${bundleId}`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchAppReviews(bundleId, params = {}) {
    const reviewParams = {
      device: 'phone',
      sort: 'newest',
      limit: '100',
      ...this.defaultParams,
      ...params
    };
    
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/app-reviews/${bundleId}`,
      params: reviewParams,
      headers: this.headers
    }).then(response => response.data);
  }

  fetchTopFreeApps(params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/top-free-apps`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchTopPaidApps(params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/top-paid-apps`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchTopGrossingApps(params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/top-grossing-apps`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchTopTrendingApps(params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/top-trending-apps`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchNewFreeApps(params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/new-free-apps`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchNewPaidApps(params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/new-paid-apps`,
      params: { ...this.defaultParams, ...params },
      headers: this.headers
    }).then(response => response.data);
  }

  fetchCategories() {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/categories/`,
      headers: this.headers
    }).then(response => response.data);
  }

  fetchSearchApps(query, params = {}) {
    return axios({
      method: 'GET',
      url: `${this.baseUrl}/search`,
      params: { 
        query, 
        ...this.defaultParams, 
        ...params 
      },
      headers: this.headers
    }).then(response => response.data);
  }
}

export default PlayStoreApi;