import type {
  ApiResponse,
  VendorNotification,
  NotificationFilterParams,
} from '@/types';
import { MOCK_NOTIFICATIONS } from '@/constants/mockNotifications';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let notificationsStore: VendorNotification[] = [...MOCK_NOTIFICATIONS];

export const notificationService = {
  /**
   * Fetches notifications list with category and read status filters.
   */
  async getNotifications(
    params: NotificationFilterParams = {},
  ): Promise<ApiResponse<VendorNotification[]>> {
    await delay(200);
    let result = [...notificationsStore];

    if (params.category && params.category !== 'all') {
      result = result.filter((n) => n.category === params.category);
    }

    if (params.unreadOnly) {
      result = result.filter((n) => !n.isRead);
    }

    return {
      data: result,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Marks single notification as read.
   */
  async markAsRead(id: string): Promise<ApiResponse<VendorNotification>> {
    await delay(150);
    const item = notificationsStore.find((n) => n.id === id);
    if (item) {
      item.isRead = true;
    }
    return {
      data: item!,
      message: 'Notification marked as read',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Marks all notifications as read.
   */
  async markAllAsRead(): Promise<ApiResponse<boolean>> {
    await delay(200);
    notificationsStore = notificationsStore.map((n) => ({
      ...n,
      isRead: true,
    }));
    return {
      data: true,
      message: 'All notifications marked as read',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Deletes a notification item.
   */
  async deleteNotification(id: string): Promise<ApiResponse<boolean>> {
    await delay(150);
    notificationsStore = notificationsStore.filter((n) => n.id !== id);
    return {
      data: true,
      message: 'Notification deleted',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
