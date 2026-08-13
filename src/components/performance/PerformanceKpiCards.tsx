import { memo } from 'react';
import type { VendorPerformanceScorecard } from '@/types';
import {
  ShieldCheck,
  Truck,
  Clock,
  AlertTriangle,
  Award,
  CreditCard,
} from 'lucide-react';
import { VendorRatingStars } from '@/components/vendor/VendorRatingStars';

interface PerformanceKpiCardsProps {
  scorecard: VendorPerformanceScorecard;
}

export const PerformanceKpiCards = memo(function PerformanceKpiCards({
  scorecard,
}: PerformanceKpiCardsProps) {
  const getRiskBadge = (level: VendorPerformanceScorecard['riskLevel']) => {
    switch (level) {
      case 'low':
        return (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Low Risk ({scorecard.riskScore}/100)
          </span>
        );
      case 'medium':
        return (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Medium Risk ({scorecard.riskScore}/100)
          </span>
        );
      case 'high':
        return (
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800">
            High Risk ({scorecard.riskScore}/100)
          </span>
        );
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* 1. Quality Score */}
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            +2.4% vs benchmark
          </span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scorecard.qualityScore}%
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Quality Conformance Score
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Based on ISO quality audit pass rate & defect index
          </p>
        </div>
      </div>

      {/* 2. Delivery Score */}
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Truck className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            Exceeds 95% SLA
          </span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scorecard.deliveryScore}%
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            On-Time Delivery Rate
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {scorecard.totalEvaluatedOrders} purchase order shipments evaluated
          </p>
        </div>
      </div>

      {/* 3. Response Time */}
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            Fast Resolution
          </span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scorecard.responseTimeHours} hrs
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Average Response Time
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Inquiry & dispatch turnaround SLA limit (24h target)
          </p>
        </div>
      </div>

      {/* 4. Payment History Score */}
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            Verified Invoicing
          </span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scorecard.paymentAccuracyRate}%
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Payment & Invoice Accuracy
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Zero-dispute invoice settlement compliance
          </p>
        </div>
      </div>

      {/* 5. Risk Score */}
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          {getRiskBadge(scorecard.riskLevel)}
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scorecard.riskScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Operational Risk Index
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Calculated from financial stability & audit compliance
          </p>
        </div>
      </div>

      {/* 6. Overall Rating */}
      <div className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 dark:bg-yellow-950/60 dark:text-yellow-400">
            <Award className="h-5 w-5" />
          </div>
          <VendorRatingStars rating={scorecard.rating} />
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {scorecard.rating.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Overall Performance Rating
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Aggregated supplier score across all categories
          </p>
        </div>
      </div>
    </div>
  );
});
