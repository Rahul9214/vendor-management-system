import { memo, useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
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
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 z-50">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: item.color }}
        />
        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
          {item.category}
        </p>
      </div>
      <p className="mt-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
        <span className="font-bold text-slate-900 dark:text-white">
          {item.count.toLocaleString()}
        </span>{' '}
        vendors ({item.percentage}%)
      </p>
    </div>
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
      <div className="flex flex-col h-full justify-between space-y-3">
        {/* Dedicated Pie Chart Container (Zero DOM Overlap) */}
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                strokeWidth={0}
                isAnimationActive={false}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={entry.color}
                    className="transition-all duration-200 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Clean Categorized Legend Grid Below Chart */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {chartData.map((item) => (
              <li
                key={item.category}
                className="flex items-center justify-between gap-1.5 text-xs rounded-lg px-1.5 py-1 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                  {item.percentage}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChartCard>
  );
});
