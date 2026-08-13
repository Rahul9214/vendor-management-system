import { memo } from 'react';
import type { NotificationCategory } from '@/types';
import {
  Clock,
  FileWarning,
  TrendingDown,
  Truck,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationCategoryBadgeProps {
  category: NotificationCategory;
  className?: string;
}

export const NotificationCategoryBadge = memo(function NotificationCategoryBadge({
  category,
  className,
}: NotificationCategoryBadgeProps) {
  const config = {
    approval_pending: {
      label: 'Approval Pending',
      color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800',
      icon: Clock,
    },
    document_expiring: {
      label: 'Document Expiring',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-800',
      icon: FileWarning,
    },
    low_vendor_rating: {
      label: 'Low Rating Alert',
      color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800',
      icon: TrendingDown,
    },
    delayed_delivery: {
      label: 'Delayed Delivery',
      color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800',
      icon: Truck,
    },
    payment_due: {
      label: 'Payment Due',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800',
      icon: DollarSign,
    },
  }[category];

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
