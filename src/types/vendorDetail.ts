// ─── Vendor Detail Sub-domain Models ──────────────────────────────────────────

export interface VendorContactPerson {
  id: string;
  name: string;
  role: string; // e.g. "Primary Contact", "Billing Lead", "Legal Officer"
  email: string;
  phone: string;
  isPrimary?: boolean;
  avatarUrl?: string;
}

export interface VendorPurchaseOrder {
  id: string;
  poNumber: string;
  description: string;
  issueDate: string;
  deliveryDate: string;
  amount: number;
  currency: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  itemsCount: number;
}

export interface VendorDocument {
  id: string;
  title: string;
  category: 'Tax (W-9/GST)' | 'ISO Certification' | 'Insurance' | 'NDA' | 'Contract' | 'Bank Detail';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  expiresAt?: string;
  status: 'verified' | 'expiring_soon' | 'pending_verification' | 'expired';
  downloadUrl: string;
}

export interface VendorPaymentRecord {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: 'ACH Direct' | 'Wire Transfer' | 'Credit Card' | 'Check';
}

export interface VendorProject {
  id: string;
  projectName: string;
  code: string;
  role: string;
  contractValue: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'on_hold';
  completionPercentage: number;
}

export interface VendorIssue {
  id: string;
  ticketNumber: string;
  title: string;
  category: 'Quality Audit' | 'Late Delivery' | 'Billing Dispute' | 'Compliance' | 'Communication';
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'under_review' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
  description: string;
  reportedBy: string;
}

export interface VendorAuditLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details: string;
  type: 'status_change' | 'document_upload' | 'rating_update' | 'audit_passed' | 'contract_renewed';
}

export interface FullVendorDetail {
  contacts: VendorContactPerson[];
  purchaseOrders: VendorPurchaseOrder[];
  documents: VendorDocument[];
  payments: VendorPaymentRecord[];
  projects: VendorProject[];
  issues: VendorIssue[];
  auditLogs: VendorAuditLog[];
}
