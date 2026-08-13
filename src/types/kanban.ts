export type KanbanStage =
  | 'draft_submitted'
  | 'under_review'
  | 'finance_audit'
  | 'on_hold_revisions'
  | 'approved_onboarded';

export interface KanbanColumn {
  id: KanbanStage;
  title: string;
  description: string;
  color: string;
}

export interface KanbanVendorCard {
  id: string;
  vendorCode: string;
  vendorName: string;
  category: string;
  contactPerson: string;
  city: string;
  country: string;
  complianceScore: number;
  submittedDate: string;
  stage: KanbanStage;
  priority: 'high' | 'medium' | 'low';
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'draft_submitted',
    title: 'Application Submitted',
    description: 'Initial registration received',
    color: 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400',
  },
  {
    id: 'under_review',
    title: 'Legal Screening',
    description: 'Under compliance verification',
    color: 'border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400',
  },
  {
    id: 'finance_audit',
    title: 'Financial & Tax Audit',
    description: 'Banking & W-9 audit stage',
    color: 'border-purple-500 bg-purple-50/40 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400',
  },
  {
    id: 'on_hold_revisions',
    title: 'Revisions Requested',
    description: 'On hold pending vendor updates',
    color: 'border-orange-500 bg-orange-50/40 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400',
  },
  {
    id: 'approved_onboarded',
    title: 'Approved & Onboarded',
    description: 'Active enterprise vendor',
    color: 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400',
  },
];
