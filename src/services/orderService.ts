import type { ApiResponse, PurchaseOrder, POFilterParams } from '@/types';
import { MOCK_ORDERS } from '@/constants/mockOrders';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let ordersStore: PurchaseOrder[] = [...MOCK_ORDERS];

export const orderService = {
  async getOrders(params: POFilterParams = {}): Promise<ApiResponse<PurchaseOrder[]>> {
    await delay(200);
    let result = [...ordersStore];

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.poNumber.toLowerCase().includes(q) ||
          o.vendorName.toLowerCase().includes(q) ||
          o.itemsDescription.toLowerCase().includes(q),
      );
    }

    if (params.status && params.status !== 'all') {
      result = result.filter((o) => o.status === params.status);
    }

    return {
      data: result,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
