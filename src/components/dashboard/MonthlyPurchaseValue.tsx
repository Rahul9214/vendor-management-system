import { memo, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartCard } from '@/components/shared/ChartCard';
import { ErrorState } from '@/components/shared/ErrorState';
import { ChartCardSkeleton } from '@/components/shared/Skeleton';
import { useMonthlyPurchase } from '@/hooks/useDashboard';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (value: number): string =>
  value >= 1000 ? `$${(value / 1000).toFixed(1)}M` : `$${value}K`;

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <span className="inline-block h-2 w-2 flex-shrink-0 rounded-sm" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-slate-600 dark:text-slate-300">{entry.name}</span>
          <span className="ml-auto text-xs font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MonthlyPurchaseValue = memo(function MonthlyPurchaseValue() {
  const { data, isLoading, isError, refetch } = useMonthlyPurchase();

  const chartData = useMemo(() => data ?? [], [data]);

  if (isLoading) return <ChartCardSkeleton />;
  if (isError) {
    return (
      <ChartCard title="Monthly Purchase Value">
        <ErrorState onRetry={() => void refetch()} />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Monthly Purchase Value"
      description="Actual spend vs. budget over the last 12 months (USD)"
    >
      <ResponsiveContainer width="100%" height={280} debounce={50}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -5, bottom: 5 }} barGap={4}>
          <defs>
            <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 4 }} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
            iconType="square"
            iconSize={8}
          />

          <Bar dataKey="budget" name="Budget"  fill="#e2e8f0" radius={[3, 3, 0, 0]} maxBarSize={20} />
          <Bar dataKey="value"  name="Actual"  fill="url(#valueGrad)" radius={[3, 3, 0, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});
