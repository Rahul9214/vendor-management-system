import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contractService } from '@/services/contractService';
import type { ContractFilterParams, VendorContract } from '@/types';

export const contractKeys = {
  all: ['contracts'] as const,
  lists: () => [...contractKeys.all, 'list'] as const,
  list: (params: ContractFilterParams) => [...contractKeys.lists(), params] as const,
};

export function useContracts(params: ContractFilterParams = {}) {
  return useQuery({
    queryKey: contractKeys.list(params),
    queryFn: () => contractService.getContracts(params),
    staleTime: 2 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function useCreateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<VendorContract, 'id' | 'contractCode'>) =>
      contractService.createContract(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: contractKeys.all });
    },
  });
}
