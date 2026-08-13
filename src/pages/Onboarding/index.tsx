import { CreateVendorForm } from '@/components/vendor-form/CreateVendorForm';
import { UserPlus } from 'lucide-react';

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Vendor Onboarding & Registration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Submit new enterprise supplier profiles, verified GSTIN/PAN tax details, banking info, and compliance files.
            </p>
          </div>
        </div>
      </div>

      {/* Multi-step Onboarding Form Component */}
      <CreateVendorForm />
    </div>
  );
}
