import { memo } from 'react';
import type { ApprovalStatus } from '@/types';
import {
  Clock,
  CheckCircle2,
  XCircle,
  PauseCircle,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
  className?: string;
}

export const ApprovalStatusBadge = memo(function ApprovalStatusBadge({
  status,
  className,
}: ApprovalStatusBadgeProps) {
  const config = {
    pending: {
      label: 'Pending Approval',
      color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800',
      icon: Clock,
    },
    approved: {
      label: 'Approved',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800',
      icon: CheckCircle2,
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800',
      icon: XCircle,
    },
    on_hold: {
      label: 'On Hold',
      color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800',
      icon: PauseCircle,
    },
    changes_requested: {
      label: 'Changes Requested',
      color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800',
      icon: HelpCircle,
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        config.color,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </span>
  );
});
