import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  /** Calls the TanStack Query refetch() to retry the failed request */
  onRetry?: () => void;
}

export function ErrorState({
  title   = 'Failed to load data',
  message = 'An error occurred while fetching data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50/60 p-8 text-center dark:border-red-900/30 dark:bg-red-950/20">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
        <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="max-w-[280px] text-xs text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
}
