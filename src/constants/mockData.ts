import type {
  KPIData,
  PerformanceTrendPoint,
  CategoryData,
  MonthlyPurchaseData,
  RatingData,
} from '@/types';

// ─── KPI Mock Data ────────────────────────────────────────────────────────────

export const MOCK_KPIS: KPIData = {
  totalVendors: 1284,
  activeVendors: 986,
  blacklistedVendors: 47,
  pendingApprovals: 128,
  averageRating: 4.2,
  activePurchaseOrders: 342,
  trends: {
    totalVendors: 5.2,
    activeVendors: 3.8,
    blacklistedVendors: -2.1, // negative = fewer blacklisted (improvement)
    pendingApprovals: 12.5,
    averageRating: 0.3,
    activePurchaseOrders: 8.7,
  },
};

// ─── Performance Trend (12 months) ───────────────────────────────────────────

export const MOCK_PERFORMANCE_TREND: PerformanceTrendPoint[] = [
  { month: 'Jan', score: 74, target: 80, previousYear: 68 },
  { month: 'Feb', score: 76, target: 80, previousYear: 70 },
  { month: 'Mar', score: 79, target: 82, previousYear: 72 },
  { month: 'Apr', score: 81, target: 82, previousYear: 75 },
  { month: 'May', score: 80, target: 83, previousYear: 77 },
  { month: 'Jun', score: 83, target: 83, previousYear: 79 },
  { month: 'Jul', score: 85, target: 85, previousYear: 80 },
  { month: 'Aug', score: 84, target: 85, previousYear: 82 },
  { month: 'Sep', score: 87, target: 86, previousYear: 83 },
  { month: 'Oct', score: 88, target: 86, previousYear: 84 },
  { month: 'Nov', score: 86, target: 87, previousYear: 85 },
  { month: 'Dec', score: 89, target: 87, previousYear: 86 },
];

// ─── Category Distribution ────────────────────────────────────────────────────

export const MOCK_CATEGORY_DISTRIBUTION: CategoryData[] = [
  { category: 'Technology',    count: 312, percentage: 24.3, color: '#6366f1' },
  { category: 'Manufacturing', count: 256, percentage: 19.9, color: '#8b5cf6' },
  { category: 'Logistics',     count: 198, percentage: 15.4, color: '#3b82f6' },
  { category: 'Raw Materials', count: 187, percentage: 14.6, color: '#06b6d4' },
  { category: 'Services',      count: 143, percentage: 11.1, color: '#22c55e' },
  { category: 'Healthcare',    count:  89, percentage:  6.9, color: '#f97316' },
  { category: 'Finance',       count:  67, percentage:  5.2, color: '#eab308' },
  { category: 'Others',        count:  32, percentage:  2.5, color: '#94a3b8' },
];

// ─── Monthly Purchase Value ($K) ──────────────────────────────────────────────

export const MOCK_MONTHLY_PURCHASE: MonthlyPurchaseData[] = [
  { month: 'Jan', value: 2100, budget: 2500, orders: 42 },
  { month: 'Feb', value: 2450, budget: 2500, orders: 48 },
  { month: 'Mar', value: 3100, budget: 3000, orders: 61 },
  { month: 'Apr', value: 2780, budget: 3000, orders: 55 },
  { month: 'May', value: 3240, budget: 3200, orders: 67 },
  { month: 'Jun', value: 3890, budget: 3500, orders: 74 },
  { month: 'Jul', value: 4100, budget: 3800, orders: 82 },
  { month: 'Aug', value: 3750, budget: 4000, orders: 71 },
  { month: 'Sep', value: 4320, budget: 4000, orders: 86 },
  { month: 'Oct', value: 4580, budget: 4200, orders: 91 },
  { month: 'Nov', value: 4820, budget: 4500, orders: 96 },
  { month: 'Dec', value: 4200, budget: 4500, orders: 84 },
];

// ─── Rating Distribution ──────────────────────────────────────────────────────

export const MOCK_RATING_DISTRIBUTION: RatingData[] = [
  { label: '5 Stars', stars: 5, count: 284, percentage: 28.8, color: '#22c55e' },
  { label: '4 Stars', stars: 4, count: 451, percentage: 45.7, color: '#86efac' },
  { label: '3 Stars', stars: 3, count: 156, percentage: 15.8, color: '#fbbf24' },
  { label: '2 Stars', stars: 2, count:  58, percentage:  5.9, color: '#f97316' },
  { label: '1 Star',  stars: 1, count:  35, percentage:  3.5, color: '#ef4444' },
];
