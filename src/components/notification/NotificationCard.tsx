import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { VendorNotification } from '@/types';
import { NotificationCategoryBadge } from './NotificationCategoryBadge';
import { CheckCircle2, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationCardProps {
  notification: VendorNotification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationCard = memo(function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const navigate = useNavigate();

  const handleActionClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div
      className={`group relative flex flex-col sm:flex-row items-start justify-between gap-4 rounded-2xl border p-4 transition-all shadow-xs ${
        !notification.isRead
          ? 'border-indigo-200 bg-indigo-50/30 dark:border-indigo-900/60 dark:bg-indigo-950/20'
          : 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      {/* Unread Pill Indicator */}
      {!notification.isRead && (
        <span className="absolute -left-1 top-4 h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
      )}

      {/* Main Body */}
      <div className="space-y-1.5 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <NotificationCategoryBadge category={notification.category} />

          {notification.vendorName && (
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {notification.vendorName}
            </span>
          )}

          <span className="text-[10px] text-slate-400 font-mono ml-auto">
            {new Date(notification.timestamp).toLocaleString()}
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {notification.title}
        </h4>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          {notification.message}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:self-center">
        {notification.actionUrl && (
          <Button
            size="xs"
            onClick={handleActionClick}
            className="gap-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
          >
            <span>{notification.actionLabel || 'View Details'}</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        )}

        {!notification.isRead && (
          <button
            type="button"
            onClick={() => onMarkAsRead(notification.id)}
            title="Mark as read"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(notification.id)}
          title="Delete notification"
          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});
