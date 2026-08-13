/**
 * Centralised API endpoint registry.
 * Keep all paths here; never hardcode URLs in services.
 */
export const ENDPOINTS = {
  dashboard: {
    kpis:                 '/dashboard/kpis',
    performanceTrend:     '/dashboard/performance-trend',
    categoryDistribution: '/dashboard/category-distribution',
    monthlyPurchase:      '/dashboard/monthly-purchase',
    ratingDistribution:   '/dashboard/rating-distribution',
  },
  vendors: {
    list:      '/vendors',
    detail:    (id: string) => `/vendors/${id}`,
    create:    '/vendors',
    update:    (id: string) => `/vendors/${id}`,
    remove:    (id: string) => `/vendors/${id}`,
    approve:   (id: string) => `/vendors/${id}/approve`,
    blacklist: (id: string) => `/vendors/${id}/blacklist`,
  },
  onboarding: {
    submit:   '/onboarding/submit',
    status:   (id: string) => `/onboarding/${id}/status`,
    approve:  (id: string) => `/onboarding/${id}/approve`,
    reject:   (id: string) => `/onboarding/${id}/reject`,
  },
  purchaseOrders: {
    list:   '/purchase-orders',
    detail: (id: string) => `/purchase-orders/${id}`,
    create: '/purchase-orders',
    close:  (id: string) => `/purchase-orders/${id}/close`,
  },
} as const;
