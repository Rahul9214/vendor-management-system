import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorDetailService } from '@/services/vendorDetailService';
import type { VendorDocument, VendorContactPerson, VendorIssue } from '@/types';

export const vendorDetailKeys = {
  all: ['vendor-details'] as const,
  detail: (vendorId: string) => [...vendorDetailKeys.all, vendorId] as const,
};

/** Returns full 9-tab details for vendor ID */
export function useVendorFullDetail(vendorId: string) {
  return useQuery({
    queryKey: vendorDetailKeys.detail(vendorId),
    queryFn: () => vendorDetailService.getFullVendorDetail(),
    enabled: Boolean(vendorId),
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });
}

/** Mutation to upload document */
export function useUploadDocument(vendorId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (doc: Omit<VendorDocument, 'id' | 'uploadedAt' | 'status' | 'downloadUrl'>) =>
      vendorDetailService.uploadDocument(vendorId, doc),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: vendorDetailKeys.detail(vendorId) });
    },
  });
}

/** Mutation to add contact */
export function useAddContact(vendorId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Omit<VendorContactPerson, 'id'>) =>
      vendorDetailService.addContact(vendorId, contact),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: vendorDetailKeys.detail(vendorId) });
    },
  });
}

/** Mutation to raise issue */
export function useRaiseIssue(vendorId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (issue: Omit<VendorIssue, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) =>
      vendorDetailService.raiseIssue(vendorId, issue),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: vendorDetailKeys.detail(vendorId) });
    },
  });
}
