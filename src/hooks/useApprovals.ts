import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { approvalService } from '@/services/approvalService';
import type { ApprovalStatus, ApprovalActionPayload } from '@/types';
import { vendorKeys } from './useVendors';

export const approvalKeys = {
  all: ['approvals'] as const,
  lists: () => [...approvalKeys.all, 'list'] as const,
  list: (statusFilter?: string) => [...approvalKeys.lists(), statusFilter] as const,
  details: () => [...approvalKeys.all, 'detail'] as const,
  detail: (id: string) => [...approvalKeys.details(), id] as const,
};

export function useApprovalRequests(statusFilter: ApprovalStatus | 'all' = 'all') {
  return useQuery({
    queryKey: approvalKeys.list(statusFilter),
    queryFn: () => approvalService.getApprovalRequests(statusFilter),
    staleTime: 2 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function useApprovalRequestDetail(id: string | null) {
  return useQuery({
    queryKey: approvalKeys.detail(id ?? ''),
    queryFn: () => approvalService.getApprovalRequestById(id!),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
}

export function useProcessApprovalAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApprovalActionPayload) =>
      approvalService.processAction(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: approvalKeys.all });
      void queryClient.invalidateQueries({ queryKey: vendorKeys.all });
    },
  });
}
