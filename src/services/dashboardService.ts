import type {
  ApiResponse,
  KPIData,
  PerformanceTrendPoint,
  CategoryData,
  MonthlyPurchaseData,
  RatingData,
} from '@/types';
import {
  MOCK_KPIS,
  MOCK_PERFORMANCE_TREND,
  MOCK_CATEGORY_DISTRIBUTION,
  MOCK_MONTHLY_PURCHASE,
  MOCK_RATING_DISTRIBUTION,
} from '@/constants/mockData';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Simulates realistic network latency */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Wraps a value in the standard API response envelope */
const ok = <T>(data: T): ApiResponse<T> => ({
  data,
  message: 'OK',
  success: true,
  timestamp: new Date().toISOString(),
});

// ─── Dashboard Service ────────────────────────────────────────────────────────
//
// NOTE: In production, replace each method body with:
//   return apiClient.get<ApiResponse<T>>(ENDPOINTS.dashboard.<key>)
//     .then((res) => res.data);
//
// The hook layer (useDashboard.ts) requires no changes when swapping to real API.

export const dashboardService = {
  /**
   * Fetches all KPI summary metrics for the dashboard header cards.
   */
  async getKPIs(): Promise<ApiResponse<KPIData>> {
    await delay(600);
    return ok(MOCK_KPIS);
  },

  /**
   * Fetches 12-month vendor performance trend data.
   * Includes actual score, target, and prior-year comparison.
   */
  async getPerformanceTrend(): Promise<ApiResponse<PerformanceTrendPoint[]>> {
    await delay(900);
    return ok(MOCK_PERFORMANCE_TREND);
  },

  /**
   * Fetches vendor count by category for the distribution pie chart.
   */
  async getCategoryDistribution(): Promise<ApiResponse<CategoryData[]>> {
    await delay(750);
    return ok(MOCK_CATEGORY_DISTRIBUTION);
  },

  /**
   * Fetches monthly purchase value vs. budget for the last 12 months.
   */
  async getMonthlyPurchase(): Promise<ApiResponse<MonthlyPurchaseData[]>> {
    await delay(850);
    return ok(MOCK_MONTHLY_PURCHASE);
  },

  /**
   * Fetches the star-rating breakdown across all active vendors.
   */
  async getRatingDistribution(): Promise<ApiResponse<RatingData[]>> {
    await delay(700);
    return ok(MOCK_RATING_DISTRIBUTION);
  },
};
