export interface VendorPerformanceScorecard {
  vendorId: string;
  vendorName: string;
  vendorCode: string;
  category: string;
  qualityScore: number;       // e.g. 96.8 (%)
  deliveryScore: number;      // e.g. 98.2 (%)
  responseTimeHours: number;  // e.g. 2.4 (hours)
  paymentAccuracyRate: number;// e.g. 99.1 (%)
  riskScore: number;          // e.g. 14 (out of 100, lower is better)
  riskLevel: 'low' | 'medium' | 'high';
  rating: number;             // e.g. 4.8 (out of 5)
  totalEvaluatedOrders: number;
}

export interface VendorPerformanceTrendPoint {
  period: string; // e.g. "Jan 2026", "Feb 2026"
  qualityScore: number;
  deliveryScore: number;
  slaCompliance: number;
  targetBenchmark: number;
}

export interface PerformanceIssue {
  id: string;
  issueCode: string;
  title: string;
  vendorName: string;
  category: 'Quality Defect' | 'Late Delivery' | 'SLA Breach' | 'Packaging Damage' | 'Invoice Error';
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'under_review' | 'resolved';
  loggedDate: string;
  impactScore: string;
}

export interface PaymentFulfillmentHistory {
  totalInvoices: number;
  paidOnTimePercentage: number;
  avgPaymentCycleDays: number;
  earlyPaymentDiscountCaptured: number;
}

export interface PerformanceFilterParams {
  vendorId?: string;
  timeRange?: '30_days' | '90_days' | '12_months' | 'ytd';
}
