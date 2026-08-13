import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorService } from '@/services/vendorService';
import type { VendorFilterParams, VendorStatus } from '@/types';
import { dashboardKeys } from './useDashboard';

// ─── Query Key Factory ────────────────────────────────────────────────────────

export const vendorKeys = {
  all:     ['vendors'] as const,
  lists:   () => [...vendorKeys.all, 'list'] as const,
  list:    (params: VendorFilterParams) => [...vendorKeys.lists(), params] as const,
  details: () => [...vendorKeys.all, 'detail'] as const,
  detail:  (id: string) => [...vendorKeys.details(), id] as const,
  cities:  () => [...vendorKeys.all, 'cities'] as const,
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Returns paginated, filtered vendor list with TanStack Query caching & refetching.
 */
export function useVendors(params: VendorFilterParams = {}) {
  return useQuery({
    queryKey: vendorKeys.list(params),
    queryFn: () => vendorService.getVendors(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    select: (res) => res.data,
  });
}

/**
 * Returns single vendor detail by ID.
 */
export function useVendorDetail(id: string | null) {
  return useQuery({
    queryKey: vendorKeys.detail(id ?? ''),
    queryFn: () => vendorService.getVendorById(id!),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
}

/**
 * Mutation for batch updating status (e.g. Blacklist, Activate, Pending).
 */
export function useBatchUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: VendorStatus }) =>
      vendorService.batchUpdateStatus(ids, status),
    onSuccess: () => {
      // Invalidate vendor list queries & dashboard metrics
      void queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

/**
 * Returns list of available cities for filtering.
 */
export function useAvailableCities() {
  return useQuery({
    queryKey: vendorKeys.cities(),
    queryFn: () => vendorService.getAvailableCities(),
    staleTime: 10 * 60 * 1000,
  });
}
