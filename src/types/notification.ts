export type NotificationCategory =
  | 'approval_pending'
  | 'document_expiring'
  | 'low_vendor_rating'
  | 'delayed_delivery'
  | 'payment_due';

export type NotificationPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface VendorNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  vendorId?: string;
  vendorName?: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationFilterParams {
  category?: NotificationCategory | 'all';
  unreadOnly?: boolean;
}
