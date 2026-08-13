import { memo } from 'react';
import type { VendorStatus } from '@/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Ban, AlertCircle } from 'lucide-react';

interface VendorStatusBadgeProps {
  status: VendorStatus;
  className?: string;
  showIcon?: boolean;
}

export const VendorStatusBadge = memo(function VendorStatusBadge({
  status,
  className,
  showIcon = true,
}: VendorStatusBadgeProps) {
  const config = {
    active: {
      label: 'Active',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800',
      icon: CheckCircle2,
    },
    pending: {
      label: 'Pending',
      color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800',
      icon: Clock,
    },
    blacklisted: {
      label: 'Blacklisted',
      color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800',
      icon: Ban,
    },
    inactive: {
      label: 'Inactive',
      color: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
      icon: AlertCircle,
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
      {showIcon && <Icon className="h-3.5 w-3.5" />}
      <span>{config.label}</span>
    </span>
  );
});
