import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';

// ─── Query Key Factory ────────────────────────────────────────────────────────
// Hierarchical key factory ensures targeted cache invalidation.
// e.g. invalidating dashboardKeys.all clears every dashboard query.

export const dashboardKeys = {
  all:                  ['dashboard']                               as const,
  kpis:                 () => [...dashboardKeys.all, 'kpis']        as const,
  performanceTrend:     () => [...dashboardKeys.all, 'perf-trend']  as const,
  categoryDistribution: () => [...dashboardKeys.all, 'categories']  as const,
  monthlyPurchase:      () => [...dashboardKeys.all, 'monthly-po']  as const,
  ratingDistribution:   () => [...dashboardKeys.all, 'ratings']     as const,
} as const;

// Cache stays fresh for 5 minutes; revalidates silently in background
const STALE_TIME = 5 * 60 * 1000;

// ─── Individual Query Hooks ───────────────────────────────────────────────────

/** Returns all KPI summary metrics. */
export function useKPIs() {
  return useQuery({
    queryKey:  dashboardKeys.kpis(),
    queryFn:   dashboardService.getKPIs,
    staleTime: STALE_TIME,
    retry:     2,
    select:    (res) => res.data,
  });
}

/** Returns 12-month performance trend data. */
export function usePerformanceTrend() {
  return useQuery({
    queryKey:  dashboardKeys.performanceTrend(),
    queryFn:   dashboardService.getPerformanceTrend,
    staleTime: STALE_TIME,
    retry:     2,
    select:    (res) => res.data,
  });
}

/** Returns vendor-count breakdown by category. */
export function useCategoryDistribution() {
  return useQuery({
    queryKey:  dashboardKeys.categoryDistribution(),
    queryFn:   dashboardService.getCategoryDistribution,
    staleTime: STALE_TIME,
    retry:     2,
    select:    (res) => res.data,
  });
}

/** Returns monthly purchase value vs. budget for last 12 months. */
export function useMonthlyPurchase() {
  return useQuery({
    queryKey:  dashboardKeys.monthlyPurchase(),
    queryFn:   dashboardService.getMonthlyPurchase,
    staleTime: STALE_TIME,
    retry:     2,
    select:    (res) => res.data,
  });
}

/** Returns star-rating distribution across active vendors. */
export function useRatingDistribution() {
  return useQuery({
    queryKey:  dashboardKeys.ratingDistribution(),
    queryFn:   dashboardService.getRatingDistribution,
    staleTime: STALE_TIME,
    retry:     2,
    select:    (res) => res.data,
  });
}
