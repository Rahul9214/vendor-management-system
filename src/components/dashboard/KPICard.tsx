import { memo } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface KPICardProps {
  label: string;
  value: string | number;
  description: string;
  /** % change from the previous period */
  trend: number;
  icon: LucideIcon;
  /** Tailwind classes for icon container (bg + text color) */
  iconClassName: string;
  /**
   * When true, a negative trend is rendered green (fewer = better).
   * Use for metrics like "Blacklisted Vendors".
   */
  invertTrend?: boolean;
}

// ─── Trend Badge ──────────────────────────────────────────────────────────────

interface TrendBadgeProps {
  trend: number;
  invert: boolean;
}

function TrendBadge({ trend, invert }: TrendBadgeProps) {
  const isPositive = invert ? trend <= 0 : trend >= 0;
  const isNeutral  = trend === 0;

  const colorClass = isNeutral
    ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    : isPositive
    ? 'bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/60 dark:text-emerald-300'
    : 'bg-red-50 text-red-700 font-bold dark:bg-red-950/60 dark:text-red-300';

  const Icon = isNeutral ? Minus : isPositive ? ArrowUp : ArrowDown;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
        colorClass,
      )}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(trend).toFixed(1)}%
    </span>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

export const KPICard = memo(function KPICard({
  label,
  value,
  description,
  trend,
  icon: Icon,
  iconClassName,
  invertTrend = false,
}: KPICardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Icon + Trend row */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110',
            iconClassName,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <TrendBadge trend={trend} invert={invertTrend} />
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </article>
  );
});
