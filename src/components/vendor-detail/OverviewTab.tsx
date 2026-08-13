import { memo } from 'react';
import type { Vendor } from '@/types';
import {
  Building2,
  ShieldCheck,
  Award,
  Globe,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import { VendorRatingStars } from '@/components/vendor/VendorRatingStars';
import { VendorStatusBadge } from '@/components/vendor/VendorStatusBadge';

interface OverviewTabProps {
  vendor: Vendor;
}

export const OverviewTab = memo(function OverviewTab({ vendor }: OverviewTabProps) {
  const getRiskLevel = (rating: number, compliance: number) => {
    if (compliance >= 90 && rating >= 4.0) return { label: 'Low Risk', color: 'text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400' };
    if (compliance >= 70 && rating >= 3.0) return { label: 'Medium Risk', color: 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400' };
    return { label: 'High Risk', color: 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-400' };
  };

  const risk = getRiskLevel(vendor.rating, vendor.complianceScore);

  return (
    <div className="space-y-6">
      {/* Risk & Compliance Summary Banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Vendor Rating
            </p>
            <div className="mt-0.5">
              <VendorRatingStars rating={vendor.rating} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Compliance Score
              </p>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {vendor.complianceScore}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${vendor.complianceScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Audit Risk Profile
            </p>
            <span
              className={`mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${risk.color}`}
            >
              {risk.label}
            </span>
          </div>
        </div>
      </div>

      {/* Main Metadata Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Profile Details */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Company General Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Vendor Code:</span>
              <p className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {vendor.code}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Category:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {vendor.category}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Status:</span>
              <div className="mt-0.5">
                <VendorStatusBadge status={vendor.status} />
              </div>
            </div>
            <div>
              <span className="text-slate-400">Payment Terms:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {vendor.paymentTerms || 'Net 30'}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Tax ID:</span>
              <p className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                {vendor.taxId || 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Member Since:</span>
              <p className="text-slate-800 dark:text-slate-200 mt-0.5">
                {new Date(vendor.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {vendor.notes && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Internal Notes:</span>
              <p className="mt-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl italic text-slate-600 dark:text-slate-300">
                "{vendor.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Location & Contact Info */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Primary Contact & Location
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-indigo-500 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Lead:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {vendor.contactPerson}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-indigo-500 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Email Address:</span>
                <a href={`mailto:${vendor.contactEmail}`} className="text-indigo-600 hover:underline dark:text-indigo-400">
                  {vendor.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-indigo-500 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                <span className="text-slate-800 dark:text-slate-200">{vendor.contactPhone}</span>
              </div>
            </div>

            {vendor.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Website:</span>
                  <a href={vendor.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400 truncate block">
                    {vendor.website}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block text-[10px]">Headquarters Address:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {vendor.address ? `${vendor.address}, ` : ''}{vendor.city}, {vendor.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
