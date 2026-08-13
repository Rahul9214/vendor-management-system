export type ApprovalStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'on_hold'
  | 'changes_requested';

export interface ApprovalStep {
  level: number;
  title: string;
  role: string;
  approverName?: string;
  status: ApprovalStatus;
  updatedAt?: string;
  comments?: string;
}

export interface ApprovalComment {
  id: string;
  authorName: string;
  authorRole: string;
  timestamp: string;
  action: 'approved' | 'rejected' | 'on_hold' | 'requested_changes' | 'commented';
  text: string;
  stepTitle?: string;
}

export interface ApprovalRequest {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCode: string;
  category: string;
  submittedAt: string;
  status: ApprovalStatus;
  currentLevel: number;
  totalLevels: number;
  priority: 'high' | 'medium' | 'low';
  taxId: string;
  city: string;
  country: string;
  complianceScore: number;
  timeline: ApprovalStep[];
  comments: ApprovalComment[];
}

export interface ApprovalActionPayload {
  requestId: string;
  action: 'approve' | 'reject' | 'hold' | 'request_changes';
  comment: string;
}
