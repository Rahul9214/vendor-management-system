export type ContractType =
  | 'Master Services Agreement (MSA)'
  | 'Service Level Agreement (SLA)'
  | 'Non-Disclosure Agreement (NDA)'
  | 'Software License & SaaS'
  | 'Supply & Procurement';

export type ContractStatus = 'active' | 'expiring_soon' | 'draft' | 'expired' | 'terminated';

export interface VendorContract {
  id: string;
  contractCode: string;
  title: string;
  vendorId: string;
  vendorName: string;
  category: string;
  type: ContractType;
  startDate: string;
  endDate: string;
  value: number;
  status: ContractStatus;
  autoRenewal: boolean;
  documentUrl?: string;
  signerName: string;
  notes?: string;
}

export interface ContractFilterParams {
  search?: string;
  status?: ContractStatus | 'all';
  type?: ContractType | 'all';
}
