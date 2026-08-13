import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import type { POFilterParams } from '@/types';

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (params: POFilterParams) => [...orderKeys.lists(), params] as const,
};

export function useOrders(params: POFilterParams = {}) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => orderService.getOrders(params),
    staleTime: 3 * 60 * 1000,
    select: (res) => res.data,
  });
}
