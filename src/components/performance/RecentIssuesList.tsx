import { memo } from 'react';
import type { PerformanceIssue } from '@/types';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface RecentIssuesListProps {
  issues: PerformanceIssue[];
}

export const RecentIssuesList = memo(function RecentIssuesList({
  issues,
}: RecentIssuesListProps) {
  const getSeverityBadge = (severity: PerformanceIssue['severity']) => {
    switch (severity) {
      case 'high':
        return (
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800">
            High Severity
          </span>
        );
      case 'medium':
        return (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Medium Severity
          </span>
        );
      case 'low':
        return (
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Low Severity
          </span>
        );
    }
  };

  const getStatusBadge = (status: PerformanceIssue['status']) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Resolved
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-3 w-3" /> Under Review
          </span>
        );
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">
            <AlertTriangle className="h-3 w-3" /> Open SLA Breach
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Recent Performance Issues & SLA Breaches
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Showing {issues.length} active tickets
        </span>
      </div>

      <div className="space-y-3">
        {issues.map((iss) => (
          <div
            key={iss.id}
            className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {iss.issueCode}
                </span>
                <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                  {iss.category}
                </span>
                {getSeverityBadge(iss.severity)}
              </div>

              <div>{getStatusBadge(iss.status)}</div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {iss.title}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Vendor: <strong>{iss.vendorName}</strong> · Impact: {iss.impactScore}
              </p>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
              Logged Date: {new Date(iss.loggedDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
