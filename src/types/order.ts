export type POStatus = 'delivered' | 'in_transit' | 'pending' | 'delayed' | 'cancelled';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  category: string;
  itemsDescription: string;
  quantity: number;
  totalAmount: number;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  status: POStatus;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
}

export interface POFilterParams {
  search?: string;
  status?: POStatus | 'all';
}
