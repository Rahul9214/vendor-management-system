import { memo, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Building2,
  CheckCircle2,
  Ban,
  Clock,
  Star,
  ShoppingCart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { KPICard } from '@/components/dashboard/KPICard';
import { VendorPerformanceTrend } from '@/components/dashboard/VendorPerformanceTrend';
import { CategoryDistribution } from '@/components/dashboard/CategoryDistribution';
import { MonthlyPurchaseValue } from '@/components/dashboard/MonthlyPurchaseValue';
import { RatingDistribution } from '@/components/dashboard/RatingDistribution';
import { KPICardSkeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { dashboardKeys, useKPIs } from '@/hooks/useDashboard';
import type { KPIData } from '@/types';

// ─── KPI Configuration ────────────────────────────────────────────────────────

interface KPIConfig {
  label: string;
  value: string;
  description: string;
  trend: number;
  icon: LucideIcon;
  iconClassName: string;
  invertTrend?: boolean;
}

function buildKPIConfig(kpis: KPIData): KPIConfig[] {
  return [
    {
      label:         'Total Vendors',
      value:         kpis.totalVendors.toLocaleString(),
      description:   'All registered vendors',
      trend:         kpis.trends.totalVendors,
      icon:          Building2,
      iconClassName: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      label:         'Active Vendors',
      value:         kpis.activeVendors.toLocaleString(),
      description:   'Currently engaged',
      trend:         kpis.trends.activeVendors,
      icon:          CheckCircle2,
      iconClassName: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      label:         'Blacklisted',
      value:         kpis.blacklistedVendors.toLocaleString(),
      description:   'Access suspended',
      trend:         kpis.trends.blacklistedVendors,
      icon:          Ban,
      iconClassName: 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400',
      invertTrend:   true,
    },
    {
      label:         'Pending Approvals',
      value:         kpis.pendingApprovals.toLocaleString(),
      description:   'Awaiting review',
      trend:         kpis.trends.pendingApprovals,
      icon:          Clock,
      iconClassName: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
    },
    {
      label:         'Avg. Rating',
      value:         kpis.averageRating.toFixed(1),
      description:   'Out of 5.0 stars',
      trend:         kpis.trends.averageRating,
      icon:          Star,
      iconClassName: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/60 dark:text-yellow-400',
    },
    {
      label:         'Active POs',
      value:         kpis.activePurchaseOrders.toLocaleString(),
      description:   'Open purchase orders',
      trend:         kpis.trends.activePurchaseOrders,
      icon:          ShoppingCart,
      iconClassName: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
    },
  ];
}

// ─── KPI Section ──────────────────────────────────────────────────────────────

const KPISection = memo(function KPISection() {
  const { data: kpis, isLoading, isError, refetch } = useKPIs();

  const cards = useMemo(
    () => (kpis ? buildKPIConfig(kpis) : []),
    [kpis],
  );

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <KPICard key={card.label} {...card} />
      ))}
    </div>
  );
});

// ─── Dashboard Page ───────────────────────────────────────────────────────────

const DashboardPage = memo(function DashboardPage() {
  const queryClient = useQueryClient();

  const handleRefreshAll = () => {
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
  };

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">

      {/* ── Page Hero Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-lg">
        {/* Dot-grid overlay for texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Vendor Dashboard
            </h2>
            <p className="mt-1 text-sm text-indigo-200">
              Real-time overview of your vendor ecosystem
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefreshAll}
            aria-label="Refresh dashboard data"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
        <KPISection />
      </section>

      {/* ── Charts Row 1: Performance Trend (full width) ── */}
      <section aria-label="Vendor performance trend">
        <VendorPerformanceTrend />
      </section>

      {/* ── Charts Row 2: Category + Monthly Purchase ── */}
      <section
        aria-label="Category distribution and monthly purchase value"
        className="grid gap-6 xl:grid-cols-5"
      >
        <div className="xl:col-span-2">
          <CategoryDistribution />
        </div>
        <div className="xl:col-span-3">
          <MonthlyPurchaseValue />
        </div>
      </section>

      {/* ── Charts Row 3: Rating Distribution ── */}
      <section
        aria-label="Vendor rating distribution"
        className="grid gap-6 xl:grid-cols-5"
      >
        <div className="xl:col-span-2">
          <RatingDistribution />
        </div>
        {/* Summary stats panel */}
        <div className="xl:col-span-3">
          <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Vendor Health Overview
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Quality metrics at a glance
            </p>
            <div className="mt-6 grid flex-1 grid-cols-2 gap-4">
              {[
                { label: 'On-time Delivery', value: '94.2%', sub: '+1.8% vs last month', color: 'bg-emerald-500' },
                { label: 'Contract Compliance', value: '88.7%', sub: '+0.5% vs last month', color: 'bg-blue-500' },
                { label: 'Quality Score', value: '91.3%', sub: '+2.1% vs last month', color: 'bg-indigo-500' },
                { label: 'Avg. Response Time', value: '3.2h', sub: '−0.4h vs last month', color: 'bg-violet-500' },
                { label: 'Open Disputes', value: '14', sub: '−3 vs last month', color: 'bg-amber-500' },
                { label: 'Renewals Due', value: '28', sub: 'Next 30 days', color: 'bg-orange-500' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <div className={`mb-2 h-1.5 w-8 rounded-full ${stat.color}`} />
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default DashboardPage;
