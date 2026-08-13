import type { ComponentType } from 'react';
import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ComponentType<{ className?: string }>;
}

export function EmptyState({
  title   = 'No data available',
  message = 'There is nothing to display here yet.',
  icon: Icon = InboxIcon,
}: EmptyStateProps) {
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center dark:border-slate-700 dark:bg-slate-900/40">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Icon className="h-7 w-7 text-slate-400 dark:text-slate-500" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="max-w-[280px] text-xs text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}
