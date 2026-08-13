import { memo, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { ChartCard } from '@/components/shared/ChartCard';
import { ErrorState } from '@/components/shared/ErrorState';
import { ChartCardSkeleton } from '@/components/shared/Skeleton';
import { usePerformanceTrend } from '@/hooks/useDashboard';

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
      <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <span
            className="inline-block h-2 w-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-slate-600 dark:text-slate-300">{entry.name}</span>
          <span className="ml-auto text-xs font-bold text-slate-900 dark:text-slate-100">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const VendorPerformanceTrend = memo(function VendorPerformanceTrend() {
  const { data, isLoading, isError, refetch } = usePerformanceTrend();

  // Memoize to avoid re-transforming on every render
  const chartData = useMemo(() => data ?? [], [data]);

  if (isLoading) return <ChartCardSkeleton />;
  if (isError) {
    return (
      <ChartCard title="Vendor Performance Trend">
        <ErrorState onRetry={() => void refetch()} />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Vendor Performance Trend"
      description="Monthly performance score vs. target and prior year (0–100 scale)"
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
            domain={[60, 100]}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
            iconType="circle"
            iconSize={8}
          />

          {/* Target reference band */}
          <ReferenceLine y={85} stroke="#e2e8f0" strokeDasharray="4 4" />

          <Line
            type="monotone"
            dataKey="previousYear"
            name="Prev. Year"
            stroke="#cbd5e1"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#f97316"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="6 3"
          />
          <Line
            type="monotone"
            dataKey="score"
            name="Performance"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#6366f1', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});
