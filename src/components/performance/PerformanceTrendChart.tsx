import { memo } from 'react';
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
import type { VendorPerformanceTrendPoint } from '@/types';

interface PerformanceTrendChartProps {
  trends: VendorPerformanceTrendPoint[];
}

export const PerformanceTrendChart = memo(function PerformanceTrendChart({
  trends,
}: PerformanceTrendChartProps) {
  return (
    <ChartCard
      title="Performance Trend Analysis Graph"
      description="Historical Quality Score %, Delivery Score %, and SLA Compliance over time vs 95% target"
    >
      <ResponsiveContainer width="100%" height={320} debounce={50}>
        <LineChart data={trends} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[85, 100]}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val: number) => `${val}%`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '12px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            iconType="circle"
            iconSize={8}
          />

          <ReferenceLine y={95} stroke="#f97316" strokeDasharray="4 4" label={{ value: 'Target 95%', fill: '#f97316', fontSize: 10 }} />

          <Line
            type="monotone"
            dataKey="qualityScore"
            name="Quality Score"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6366f1' }}
          />
          <Line
            type="monotone"
            dataKey="deliveryScore"
            name="Delivery Score"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#10b981' }}
          />
          <Line
            type="monotone"
            dataKey="slaCompliance"
            name="SLA Compliance"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
});
