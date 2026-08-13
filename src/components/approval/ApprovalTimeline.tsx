import { memo } from 'react';
import type { ApprovalStep } from '@/types';
import { CheckCircle2, Clock, XCircle, PauseCircle, HelpCircle } from 'lucide-react';

interface ApprovalTimelineProps {
  timeline: ApprovalStep[];
  currentLevel: number;
}

export const ApprovalTimeline = memo(function ApprovalTimeline({
  timeline,
  currentLevel,
}: ApprovalTimelineProps) {
  const getStepIcon = (status: ApprovalStep['status'], level: number) => {
    if (status === 'approved') {
      return <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
    }
    if (status === 'rejected') {
      return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    }
    if (status === 'on_hold') {
      return <PauseCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
    }
    if (status === 'changes_requested') {
      return <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
    if (level === currentLevel) {
      return <Clock className="h-4 w-4 text-amber-500 animate-pulse" />;
    }
    return <Clock className="h-4 w-4 text-slate-300 dark:text-slate-700" />;
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Multi-Level Approval Timeline & Gates
      </h4>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timeline.map((step) => {
          const isCurrent = step.level === currentLevel && step.status === 'pending';

          return (
            <div key={step.level} className="relative flex items-start gap-4">
              {/* Step Circle Node */}
              <div
                className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border bg-white shadow-xs transition-all dark:bg-slate-900 ${
                  step.status === 'approved'
                    ? 'border-emerald-500 bg-emerald-50'
                    : step.status === 'rejected'
                    ? 'border-red-500 bg-red-50'
                    : isCurrent
                    ? 'border-amber-500 bg-amber-50 ring-4 ring-amber-100 dark:ring-amber-950'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {getStepIcon(step.status, step.level)}
              </div>

              {/* Step Card Content */}
              <div
                className={`flex-1 rounded-2xl border p-4 shadow-xs transition-all ${
                  isCurrent
                    ? 'border-indigo-200 bg-indigo-50/40 dark:border-indigo-900/60 dark:bg-indigo-950/20'
                    : 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      Level {step.level}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {step.title}
                    </h5>
                  </div>

                  {step.updatedAt && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(step.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Role: <strong>{step.role}</strong>
                  {step.approverName && ` · Approver: ${step.approverName}`}
                </p>

                {step.comments && (
                  <p className="mt-2 text-xs italic bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-slate-700 dark:text-slate-300">
                    "{step.comments}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
