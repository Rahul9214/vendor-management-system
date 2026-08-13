import { useState } from 'react';
import type { NotificationCategory, NotificationFilterParams } from '@/types';
import {
  useNotifications,
  useUnreadNotificationsCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  useDeleteNotification,
} from '@/hooks/useNotifications';
import { NotificationCard } from '@/components/notification/NotificationCard';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';
import { Bell, CheckCheck, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationsPage() {
  const [filters, setFilters] = useState<NotificationFilterParams>({
    category: 'all',
    unreadOnly: false,
  });

  const { data: notifications = [], isLoading, isError, refetch } = useNotifications(filters);
  const unreadCount = useUnreadNotificationsCount();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllMutation = useMarkAllNotificationsAsRead();
  const deleteMutation = useDeleteNotification();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState
          title="Failed to load notifications"
          message="Could not retrieve system alerts."
          onRetry={() => void refetch()}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                Notifications & Alert Center
              </h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Stay updated on pending approvals, document expirations, delivery delays, payment due alerts, and vendor rating changes.
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllMutation.mutate()}
            className="gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400 text-xs font-semibold"
          >
            <CheckCheck className="h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: 'All Categories', val: 'all' },
            { label: 'Approval Pending', val: 'approval_pending' },
            { label: 'Document Expiring', val: 'document_expiring' },
            { label: 'Low Vendor Rating', val: 'low_vendor_rating' },
            { label: 'Delayed Delivery', val: 'delayed_delivery' },
            { label: 'Payment Due', val: 'payment_due' },
          ].map((cat) => {
            const isSelected = (filters.category || 'all') === cat.val;
            return (
              <button
                key={cat.val}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    category: cat.val as NotificationCategory | 'all',
                  })
                }
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            setFilters((prev) => ({ ...prev, unreadOnly: !prev.unreadOnly }))
          }
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
            filters.unreadOnly
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>{filters.unreadOnly ? 'Showing Unread Only' : 'Filter Unread'}</span>
        </button>
      </div>

      {/* Notifications List Stream */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Bell className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              No notifications found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              You are all caught up! There are no alerts matching your selected category.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={(id) => markAsReadMutation.mutate(id)}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
