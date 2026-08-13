import { useQuery } from '@tanstack/react-query';
import { performanceService } from '@/services/performanceService';
import type { PerformanceFilterParams } from '@/types';

export const performanceKeys = {
  all: ['performance'] as const,
  scorecard: (params: PerformanceFilterParams) => [...performanceKeys.all, 'scorecard', params] as const,
  trends: (params: PerformanceFilterParams) => [...performanceKeys.all, 'trends', params] as const,
  issues: (params: PerformanceFilterParams) => [...performanceKeys.all, 'issues', params] as const,
  payments: () => [...performanceKeys.all, 'payments'] as const,
};

export function usePerformanceScorecard(params: PerformanceFilterParams = {}) {
  return useQuery({
    queryKey: performanceKeys.scorecard(params),
    queryFn: () => performanceService.getScorecard(params),
    staleTime: 3 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function usePerformanceTrends(params: PerformanceFilterParams = {}) {
  return useQuery({
    queryKey: performanceKeys.trends(params),
    queryFn: () => performanceService.getPerformanceTrends(params),
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function useRecentIssues(params: PerformanceFilterParams = {}) {
  return useQuery({
    queryKey: performanceKeys.issues(params),
    queryFn: () => performanceService.getRecentIssues(params),
    staleTime: 2 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function usePaymentFulfillment() {
  return useQuery({
    queryKey: performanceKeys.payments(),
    queryFn: () => performanceService.getPaymentFulfillment(),
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });
}
