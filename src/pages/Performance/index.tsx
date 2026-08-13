import { useState } from 'react';
import type { PerformanceFilterParams } from '@/types';
import {
  usePerformanceScorecard,
  usePerformanceTrends,
  useRecentIssues,
  usePaymentFulfillment,
} from '@/hooks/usePerformance';
import { VendorSelectorBar } from '@/components/performance/VendorSelectorBar';
import { PerformanceKpiCards } from '@/components/performance/PerformanceKpiCards';
import { PerformanceTrendChart } from '@/components/performance/PerformanceTrendChart';
import { RecentIssuesList } from '@/components/performance/RecentIssuesList';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';
import { BarChart3, CheckCircle2, DollarSign, ShieldCheck } from 'lucide-react';

export default function PerformancePage() {
  const [filters, setFilters] = useState<PerformanceFilterParams>({
    vendorId: 'all',
    timeRange: '12_months',
  });

  const { data: scorecard, isLoading: isScorecardLoading, isError: isScorecardError } = usePerformanceScorecard(filters);
  const { data: trends, isLoading: isTrendsLoading } = usePerformanceTrends();
  const { data: issues, isLoading: isIssuesLoading } = useRecentIssues();
  const { data: paymentFulfillment } = usePaymentFulfillment();

  if (isScorecardLoading || isTrendsLoading || isIssuesLoading) {
    return <LoadingScreen />;
  }

  if (isScorecardError || !scorecard) {
    return (
      <div className="p-6">
        <ErrorState title="Failed to load performance metrics" message="Could not retrieve scorecard analytics." />
      </div>
    );
  }

  const handleExportPerformancePDF = () => {
    const text = `VENDOR PERFORMANCE SCORECARD REPORT\nVendor: ${scorecard.vendorName}\nQuality Score: ${scorecard.qualityScore}%\nDelivery Score: ${scorecard.deliveryScore}%\nResponse Time: ${scorecard.responseTimeHours}h\nRisk Level: ${scorecard.riskLevel.toUpperCase()} (${scorecard.riskScore}/100)\nRating: ${scorecard.rating}/5.0\n`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `vendor_performance_report_${scorecard.vendorCode}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Vendor Performance Analytics & SLA Scorecard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive evaluation of supplier quality conformance, on-time delivery rates, response times, and operational risk metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Top Selector Controls */}
      <VendorSelectorBar
        filters={filters}
        onFilterChange={setFilters}
        onExportReport={handleExportPerformancePDF}
      />

      {/* 6 Required KPI Cards: Quality, Delivery, Response Time, Risk, Rating, Payment */}
      <section aria-label="Performance KPI Metrics">
        <PerformanceKpiCards scorecard={scorecard} />
      </section>

      {/* Multi-metric Trend Graph (Recharts) */}
      <section aria-label="Performance Trend Graph">
        <PerformanceTrendChart trends={trends || []} />
      </section>

      {/* Issues & Payment Compliance Grid */}
      <section className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentIssuesList issues={issues || []} />
        </div>

        {/* Payment Fulfillment Compliance Panel */}
        <div className="xl:col-span-2 flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-500" />
              Invoicing & Payment Compliance
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Fulfillment statistics across evaluated billing cycles
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  On-Time Paid Invoices:
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {paymentFulfillment?.paidOnTimePercentage}%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Avg. Payment Settlement Cycle:
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {paymentFulfillment?.avgPaymentCycleDays} days
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Early Payment Discounts:
                </span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                +${paymentFulfillment?.earlyPaymentDiscountCaptured.toLocaleString()} saved
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 text-[11px] text-indigo-900 dark:border-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200">
            <p className="font-semibold mb-0.5">Audit Recommendation:</p>
            <p>Vendor maintains exceptional payment compliance with zero legal holds or dispute locks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
