import type {
  ApiResponse,
  VendorPerformanceScorecard,
  VendorPerformanceTrendPoint,
  PerformanceIssue,
  PaymentFulfillmentHistory,
  PerformanceFilterParams,
} from '@/types';
import {
  MOCK_OVERALL_SCORECARD,
  MOCK_VENDOR_SCORECARDS,
  MOCK_PERFORMANCE_TRENDS,
  MOCK_RECENT_PERFORMANCE_ISSUES,
  MOCK_PAYMENT_FULFILLMENT,
} from '@/constants/mockPerformance';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const performanceService = {
  /**
   * Fetches performance scorecard metrics for a specific vendor or overall fleet average.
   */
  async getScorecard(
    params: PerformanceFilterParams = {},
  ): Promise<ApiResponse<VendorPerformanceScorecard>> {
    await delay(300);
    const scorecard =
      params.vendorId && params.vendorId !== 'all'
        ? MOCK_VENDOR_SCORECARDS[params.vendorId] || MOCK_OVERALL_SCORECARD
        : MOCK_OVERALL_SCORECARD;

    return {
      data: scorecard,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetches performance trend points over time.
   */
  async getPerformanceTrends(): Promise<ApiResponse<VendorPerformanceTrendPoint[]>> {
    await delay(400);
    return {
      data: MOCK_PERFORMANCE_TRENDS,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetches recent performance issues and SLA breaches.
   */
  async getRecentIssues(): Promise<ApiResponse<PerformanceIssue[]>> {
    await delay(250);
    return {
      data: MOCK_RECENT_PERFORMANCE_ISSUES,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetches payment fulfillment compliance metrics.
   */
  async getPaymentFulfillment(): Promise<ApiResponse<PaymentFulfillmentHistory>> {
    await delay(200);
    return {
      data: MOCK_PAYMENT_FULFILLMENT,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
