import { useQuery } from "@tanstack/react-query";

const defaultQueryOptions = {
  staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
  cacheTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
};

export function useAppDetails(playStoreApi, bundleId, params = {}, options = {}) {
  return useQuery({
    queryKey: ['appDetails', bundleId, params],
    queryFn: () => playStoreApi.fetchAppDetails(bundleId, params),
    ...defaultQueryOptions,
    ...options
  });
}

export function useAppReviews(playStoreApi, bundleId, params = {}, options = {}) {
  return useQuery({
    queryKey: ['appReviews', bundleId, params],
    queryFn: () => playStoreApi.fetchAppReviews(bundleId, params),
    ...defaultQueryOptions,
    ...options
  });
}

export function useTopFreeApps(playStoreApi, params = {}, options = {}) {
  return useQuery({
    queryKey: ['topFreeApps', params],
    queryFn: () => playStoreApi.fetchTopFreeApps(params),
    enabled: options.enabled ?? false,
    ...defaultQueryOptions,
    ...options
  });
}

export function useTopPaidApps(playStoreApi, params = {}, options = {}) {
  return useQuery({
    queryKey: ['topPaidApps', params],
    queryFn: () => playStoreApi.fetchTopPaidApps(params),
    enabled: options.enabled ?? false,
    ...defaultQueryOptions,
    ...options
  });
}

export function useTopGrossingApps(playStoreApi, params = {}, options = {}) {
  return useQuery({
    queryKey: ['topGrossingApps', params],
    queryFn: () => playStoreApi.fetchTopGrossingApps(params),
    enabled: options.enabled ?? false,
    ...defaultQueryOptions,
    ...options
  });
}

export function useTopTrendingApps(playStoreApi, params = {}, options = {}) {
  return useQuery({
    queryKey: ['topTrendingApps', params],
    queryFn: () => playStoreApi.fetchTopTrendingApps(params),
    enabled: options.enabled ?? false,
    ...defaultQueryOptions,
    ...options
  });
}

export function useNewFreeApps(playStoreApi, params = {}, options = {}) {
  return useQuery({
    queryKey: ['newFreeApps', params],
    queryFn: () => playStoreApi.fetchNewFreeApps(params),
    enabled: options.enabled ?? false,
    ...defaultQueryOptions,
    ...options
  });
}

export function useNewPaidApps(playStoreApi, params = {}, options = {}) {
  return useQuery({
    queryKey: ['newPaidApps', params],
    queryFn: () => playStoreApi.fetchNewPaidApps(params),
    enabled: options.enabled ?? false,
    ...defaultQueryOptions,
    ...options
  });
}

export function useCategories(playStoreApi, options = {}) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => playStoreApi.fetchCategories(),
    ...defaultQueryOptions,
    ...options
  });
}

export function useSearchApps(playStoreApi, query, params = {}, options = {}) {
  return useQuery({
    queryKey: ['searchApps', query, params],
    queryFn: () => playStoreApi.fetchSearchApps(query, params),
    enabled: !!query,
    ...defaultQueryOptions,
    ...options
  });
}