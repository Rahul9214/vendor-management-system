// ─── Vendor Domain Types ──────────────────────────────────────────────────────

export type VendorStatus = 'active' | 'inactive' | 'blacklisted' | 'pending';

export type VendorCategory =
  | 'Technology'
  | 'Manufacturing'
  | 'Logistics'
  | 'Raw Materials'
  | 'Services'
  | 'Healthcare'
  | 'Finance'
  | 'Others';

export interface Vendor {
  id: string;
  code: string;
  name: string;
  logoUrl?: string;
  category: VendorCategory;
  status: VendorStatus;
  /** Overall rating, 0–5 */
  rating: number;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  city: string;
  address?: string;
  taxId?: string;
  website?: string;
  paymentTerms?: string;
  /** ISO date string */
  joinedAt: string;
  /** ISO date string */
  lastActivity: string;
  /** ISO date string of last transaction */
  lastTransactionDate: string;
  /** Last transaction purchase amount in USD */
  lastTransactionAmount: number;
  totalOrders: number;
  /** Total purchase value in USD */
  totalValue: number;
  /** Compliance score, 0–100 */
  complianceScore: number;
  notes?: string;
}

// ─── Filtering & Query Types ──────────────────────────────────────────────────

export interface VendorFilterParams {
  search?: string;
  categories?: VendorCategory[];
  statuses?: VendorStatus[];
  minRating?: number;
  maxRating?: number;
  minPurchaseValue?: number;
  maxPurchaseValue?: number;
  cities?: string[];
  page?: number;
  pageSize?: number;
  sortBy?: keyof Vendor;
  sortOrder?: 'asc' | 'desc';
}

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  isPreset?: boolean;
  filters: Omit<VendorFilterParams, 'page' | 'pageSize'>;
  columnVisibility?: Record<string, boolean>;
}

// ─── Dashboard KPI Types ──────────────────────────────────────────────────────

export interface KPITrends {
  totalVendors: number;
  activeVendors: number;
  blacklistedVendors: number;
  pendingApprovals: number;
  averageRating: number;
  activePurchaseOrders: number;
}

export interface KPIData {
  totalVendors: number;
  activeVendors: number;
  blacklistedVendors: number;
  pendingApprovals: number;
  averageRating: number;
  activePurchaseOrders: number;
  trends: KPITrends;
}

// ─── Chart Data Types ─────────────────────────────────────────────────────────

export interface PerformanceTrendPoint {
  month: string;
  score: number;
  target: number;
  previousYear: number;
}

export interface CategoryData {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface MonthlyPurchaseData {
  month: string;
  value: number;
  budget: number;
  orders: number;
}

export interface RatingData {
  label: string;
  stars: number;
  count: number;
  percentage: number;
  color: string;
}
