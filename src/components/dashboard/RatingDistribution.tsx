import { memo, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { ChartCard } from '@/components/shared/ChartCard';
import { ErrorState } from '@/components/shared/ErrorState';
import { ChartCardSkeleton } from '@/components/shared/Skeleton';
import { useRatingDistribution } from '@/hooks/useDashboard';
import type { RatingData } from '@/types';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  payload: RatingData;
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
      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{item.label}</p>
      <p className="mt-1 text-xs text-slate-500">
        {item.count.toLocaleString()} vendors · {item.percentage}%
      </p>
    </div>
  );
}

// ─── Custom Label ─────────────────────────────────────────────────────────────

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number;
}

function CustomLabel({ x = 0, y = 0, width = 0, height = 0, value = 0 }: CustomLabelProps) {
  return (
    <text
      x={x + width + 6}
      y={y + height / 2 + 1}
      fill="#94a3b8"
      fontSize={10}
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const RatingDistribution = memo(function RatingDistribution() {
  const { data, isLoading, isError, refetch } = useRatingDistribution();

  const chartData = useMemo(
    () => (data ?? []).slice().sort((a, b) => b.stars - a.stars),
    [data],
  );

  if (isLoading) return <ChartCardSkeleton />;
  if (isError) {
    return (
      <ChartCard title="Vendor Rating Distribution">
        <ErrorState onRetry={() => void refetch()} />
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Vendor Rating Distribution"
      description="Star-rating breakdown across all active vendors"
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
          barSize={18}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

          <Bar dataKey="count" radius={[0, 4, 4, 0]} label={<CustomLabel />}>
            {chartData.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});
