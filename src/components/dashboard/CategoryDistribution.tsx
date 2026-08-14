import { memo, useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartCard } from '@/components/shared/ChartCard';
import { ErrorState } from '@/components/shared/ErrorState';
import { ChartCardSkeleton } from '@/components/shared/Skeleton';
import { useCategoryDistribution } from '@/hooks/useDashboard';
import type { CategoryData } from '@/types';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name: string;
  value: number;
  payload: CategoryData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
        {item.category}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {item.count.toLocaleString()} vendors · {item.percentage}%
      </p>
    </div>
  );
}

// ─── Custom Legend ────────────────────────────────────────────────────────────

interface LegendPayloadEntry {
  value: string;
  color: string;
  payload: CategoryData;
}

interface CustomLegendProps {
  payload?: LegendPayloadEntry[];
}

function CustomLegend({ payload }: CustomLegendProps) {
  if (!payload?.length) return null;
  return (
    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
      {payload.map((entry) => (
        <li key={entry.value} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <span
            className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="truncate">{entry.value}</span>
          <span className="ml-auto font-semibold text-slate-800 dark:text-slate-200">
            {entry.payload.percentage}%
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CategoryDistribution = memo(function CategoryDistribution() {
  const { data, isLoading, isError, refetch } = useCategoryDistribution();

  const chartData = useMemo(() => data ?? [], [data]);
  const totalVendors = useMemo(
    () => chartData.reduce((sum, d) => sum + d.count, 0),
    [chartData],
  );

  if (isLoading) return <ChartCardSkeleton />;
  if (isError) {
    return (
      <ChartCard title="Category Distribution">
        <ErrorState onRetry={() => void refetch()} />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Category Distribution"
      description={`${totalVendors.toLocaleString()} vendors across ${chartData.length} categories`}
    >
      <ResponsiveContainer width="100%" height={220} debounce={50}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            strokeWidth={0}
          >
            {chartData.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});
