import { memo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartCard } from '@/components/shared/ChartCard';
import { CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';

const PERFORMANCE_DATA = [
  { month: 'Jan', slaScore: 92, deliveryRate: 95 },
  { month: 'Feb', slaScore: 94, deliveryRate: 96 },
  { month: 'Mar', slaScore: 91, deliveryRate: 93 },
  { month: 'Apr', slaScore: 96, deliveryRate: 98 },
  { month: 'May', slaScore: 95, deliveryRate: 97 },
  { month: 'Jun', slaScore: 98, deliveryRate: 99 },
  { month: 'Jul', slaScore: 97, deliveryRate: 98 },
  { month: 'Aug', slaScore: 99, deliveryRate: 100 },
];

export const PerformanceTab = memo(function PerformanceTab() {
  return (
    <div className="space-y-6">
      {/* SLA Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">SLA Fulfillment</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">98.4%</p>
          <span className="text-[10px] text-emerald-500 font-semibold">+1.2% vs target</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">On-Time Delivery</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">97.8%</p>
          <span className="text-[10px] text-emerald-500 font-semibold">Exceeds 95% threshold</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">Quality Defect Rate</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">0.2%</p>
          <span className="text-[10px] text-emerald-500 font-semibold">Under 1.0% limit</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">Avg. Response Time</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">2.4 hours</p>
          <span className="text-[10px] text-emerald-500 font-semibold">24h SLA target</span>
        </div>
      </div>

      {/* SLA Trend Chart */}
      <ChartCard
        title="Historical SLA & Quality Performance"
        description="Month-over-month SLA fulfillment and delivery accuracy scores"
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={PERFORMANCE_DATA} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="slaScore" name="SLA Score" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="deliveryRate" name="Delivery Rate" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
});
