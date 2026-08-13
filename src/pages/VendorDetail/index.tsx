import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Users,
  BarChart3,
  ShoppingCart,
  FileText,
  CreditCard,
  Briefcase,
  AlertTriangle,
  History,
} from 'lucide-react';
import { useVendorDetail } from '@/hooks/useVendors';
import {
  useVendorFullDetail,
  useUploadDocument,
  useAddContact,
  useRaiseIssue,
} from '@/hooks/useVendorDetails';
import { VendorStatusBadge } from '@/components/vendor/VendorStatusBadge';
import { VendorRatingStars } from '@/components/vendor/VendorRatingStars';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';

// Tab Components
import { OverviewTab } from '@/components/vendor-detail/OverviewTab';
import { ContactsTab } from '@/components/vendor-detail/ContactsTab';
import { PerformanceTab } from '@/components/vendor-detail/PerformanceTab';
import { PurchaseHistoryTab } from '@/components/vendor-detail/PurchaseHistoryTab';
import { DocumentsTab } from '@/components/vendor-detail/DocumentsTab';
import { PaymentsTab } from '@/components/vendor-detail/PaymentsTab';
import { ProjectsTab } from '@/components/vendor-detail/ProjectsTab';
import { IssuesTab } from '@/components/vendor-detail/IssuesTab';
import { AuditTimelineTab } from '@/components/vendor-detail/AuditTimelineTab';

type DetailTab =
  | 'overview'
  | 'contacts'
  | 'performance'
  | 'purchase-history'
  | 'documents'
  | 'payments'
  | 'projects'
  | 'issues'
  | 'audit-timeline';

const TABS: { id: DetailTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview',          label: 'Overview',            icon: Building2 },
  { id: 'contacts',          label: 'Contacts',            icon: Users },
  { id: 'performance',       label: 'Performance',         icon: BarChart3 },
  { id: 'purchase-history',  label: 'Purchase History',    icon: ShoppingCart },
  { id: 'documents',         label: 'Documents',           icon: FileText },
  { id: 'payments',          label: 'Payments',            icon: CreditCard },
  { id: 'projects',          label: 'Projects Associated', icon: Briefcase },
  { id: 'issues',            label: 'Issues Raised',       icon: AlertTriangle },
  { id: 'audit-timeline',    label: 'Audit Timeline',      icon: History },
];

export default function VendorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  const { data: vendor, isLoading: isVendorLoading, isError: isVendorError } = useVendorDetail(id || 'vnd-001');
  const { data: fullDetail, isLoading: isDetailLoading } = useVendorFullDetail(id || 'vnd-001');

  const uploadDocMutation = useUploadDocument(id || 'vnd-001');
  const addContactMutation = useAddContact(id || 'vnd-001');
  const raiseIssueMutation = useRaiseIssue(id || 'vnd-001');

  if (isVendorLoading || isDetailLoading) {
    return <LoadingScreen />;
  }

  if (isVendorError || !vendor) {
    return (
      <div className="p-6">
        <ErrorState title="Vendor Not Found" message="The requested vendor profile could not be found." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            to="/vendors"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            title="Back to Vendor Directory"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white text-lg shadow-md">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                  {vendor.name}
                </h2>
                <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {vendor.code}
                </span>
                <VendorStatusBadge status={vendor.status} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {vendor.category} · {vendor.city}, {vendor.country} · Member since {new Date(vendor.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <VendorRatingStars rating={vendor.rating} />
        </div>
      </div>

      {/* 9 Tabs Horizontal Bar */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 rounded-2xl p-2 shadow-xs overflow-x-auto">
        <nav className="flex space-x-1 no-scrollbar min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Panel Body */}
      <div className="min-h-[450px]">
        {activeTab === 'overview' && <OverviewTab vendor={vendor} />}

        {activeTab === 'contacts' && (
          <ContactsTab
            contacts={fullDetail?.contacts || []}
            onAddContact={(contact) => addContactMutation.mutate(contact)}
          />
        )}

        {activeTab === 'performance' && <PerformanceTab />}

        {activeTab === 'purchase-history' && (
          <PurchaseHistoryTab purchaseOrders={fullDetail?.purchaseOrders || []} />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab
            documents={fullDetail?.documents || []}
            onUpload={(doc) => uploadDocMutation.mutate(doc)}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentsTab payments={fullDetail?.payments || []} />
        )}

        {activeTab === 'projects' && (
          <ProjectsTab projects={fullDetail?.projects || []} />
        )}

        {activeTab === 'issues' && (
          <IssuesTab
            issues={fullDetail?.issues || []}
            onRaiseIssue={(issue) => raiseIssueMutation.mutate(issue)}
          />
        )}

        {activeTab === 'audit-timeline' && (
          <AuditTimelineTab auditLogs={fullDetail?.auditLogs || []} />
        )}
      </div>
    </div>
  );
}
