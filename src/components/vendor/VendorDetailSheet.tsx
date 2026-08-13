import { memo } from 'react';
import {
  X,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import type { Vendor } from '@/types';
import { VendorStatusBadge } from './VendorStatusBadge';
import { VendorRatingStars } from './VendorRatingStars';

interface VendorDetailSheetProps {
  vendor: Vendor | null;
  onClose: () => void;
}

export const VendorDetailSheet = memo(function VendorDetailSheet({
  vendor,
  onClose,
}: VendorDetailSheetProps) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-lg transform border-l border-slate-200 bg-white shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-md">
                {vendor.name.charAt(0)}
              </div>
              <div>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {vendor.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {vendor.name}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="h-[calc(100vh-70px)] overflow-y-auto p-6 space-y-6">
            {/* Status & Rating Banner */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Account Status
                </span>
                <div>
                  <VendorStatusBadge status={vendor.status} />
                </div>
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Performance Score
                </span>
                <div>
                  <VendorRatingStars rating={vendor.rating} />
                </div>
              </div>
            </div>

            {/* Financial Overview Cards */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Financial Metrics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs font-semibold text-slate-500">
                      Total Purchase Spend
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    ${vendor.totalValue.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {vendor.totalOrders} total purchase orders
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-semibold text-slate-500">
                      Last Transaction
                    </span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    ${vendor.lastTransactionAmount.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {new Date(vendor.lastTransactionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Bar */}
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Compliance & Audit Score
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {vendor.complianceScore}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${vendor.complianceScore}%` }}
                />
              </div>
            </div>

            {/* Primary Contact Details */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Primary Contact Information
              </h4>
              <div className="rounded-xl border border-slate-100 bg-white p-4 space-y-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 text-xs">
                  <Building2 className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {vendor.contactPerson}
                  </span>
                  <span className="ml-auto text-[10px] rounded bg-indigo-50 px-2 py-0.5 font-medium text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    {vendor.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <a
                    href={`mailto:${vendor.contactEmail}`}
                    className="hover:underline text-indigo-600 dark:text-indigo-400"
                  >
                    {vendor.contactEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span>{vendor.contactPhone}</span>
                </div>

                {vendor.website && (
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-indigo-600 dark:text-indigo-400 truncate"
                    >
                      {vendor.website}
                    </a>
                  </div>
                )}

                <div className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {vendor.address ? `${vendor.address}, ` : ''}
                    {vendor.city}, {vendor.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Terms & Notes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Contract & Vendor Notes
              </h4>
              <div className="rounded-xl border border-slate-100 bg-white p-4 space-y-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Payment Terms:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {vendor.paymentTerms || 'Net 30'}
                  </span>
                </div>

                {vendor.taxId && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Tax ID:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {vendor.taxId}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Vendor Since:</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {new Date(vendor.joinedAt).toLocaleDateString()}
                  </span>
                </div>

                {vendor.notes && (
                  <div className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-500 dark:border-slate-800">
                    <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Notes:
                    </p>
                    <p className="italic bg-slate-50 p-2 rounded text-slate-600 dark:bg-slate-800/60 dark:text-slate-400">
                      "{vendor.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
