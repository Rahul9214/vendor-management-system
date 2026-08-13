import { memo } from 'react';
import type { ContractStatus } from '@/types';
import { CheckCircle2, Clock, FileText, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContractStatusBadgeProps {
  status: ContractStatus;
  className?: string;
}

export const ContractStatusBadge = memo(function ContractStatusBadge({
  status,
  className,
}: ContractStatusBadgeProps) {
  const config = {
    active: {
      label: 'Active',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800',
      icon: CheckCircle2,
    },
    expiring_soon: {
      label: 'Expiring Soon',
      color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800',
      icon: Clock,
    },
    draft: {
      label: 'Draft / In Review',
      color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      icon: FileText,
    },
    expired: {
      label: 'Expired',
      color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-400 dark:border-orange-800',
      icon: AlertTriangle,
    },
    terminated: {
      label: 'Terminated',
      color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800',
      icon: XCircle,
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors',
        config.color,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </span>
  );
});
