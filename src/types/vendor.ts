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
  name: string;
  category: VendorCategory;
  status: VendorStatus;
  /** Overall rating, 0–5 */
  rating: number;
  contactEmail: string;
  contactPhone: string;
  country: string;
  city: string;
  /** ISO date string */
  joinedAt: string;
  /** ISO date string */
  lastActivity: string;
  totalOrders: number;
  /** Total contract value in USD */
  totalValue: number;
  /** Compliance score, 0–100 */
  complianceScore: number;
}

// ─── Dashboard KPI Types ──────────────────────────────────────────────────────

export interface KPITrends {
  /** % change from previous period */
  totalVendors: number;
  activeVendors: number;
  /** Negative = fewer blacklisted (improvement) */
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
  /** Average rating, 0–5 */
  averageRating: number;
  activePurchaseOrders: number;
  trends: KPITrends;
}

// ─── Chart Data Types ─────────────────────────────────────────────────────────

export interface PerformanceTrendPoint {
  month: string;
  /** Actual vendor performance score (0–100) */
  score: number;
  /** Target score for the month */
  target: number;
  /** Same month, previous year */
  previousYear: number;
}

export interface CategoryData {
  category: string;
  count: number;
  /** Percentage of total vendors */
  percentage: number;
  /** Hex color for chart rendering */
  color: string;
}

export interface MonthlyPurchaseData {
  month: string;
  /** Actual spend in USD thousands */
  value: number;
  /** Budgeted spend in USD thousands */
  budget: number;
  /** Number of purchase orders */
  orders: number;
}

export interface RatingData {
  /** Display label, e.g. "5 Stars" */
  label: string;
  stars: number;
  count: number;
  percentage: number;
  /** Hex color for bar */
  color: string;
}
