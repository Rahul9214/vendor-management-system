import { useState } from 'react';
import {
  Sliders,
  Moon,
  Sun,
  Bell,
  CheckCircle2,
  Save,
  Building2,
  DollarSign,
  Clock,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useTheme, useToggleTheme } from '@/hooks/useUIStore';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  // Procurement System Preferences
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [defaultPaymentTerms, setDefaultPaymentTerms] = useState('Net 30');
  const [autoApprovalThreshold, setAutoApprovalThreshold] = useState('10000');

  // VMS Notification Preferences
  const [notifications, setNotifications] = useState({
    approvalPending: true,
    documentExpiring: true,
    lowRatingAlert: true,
    delayedDelivery: true,
    paymentDue: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    setToastMessage('Vendor Management preferences saved successfully!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="mx-auto max-w-screen-xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              System Settings & Preferences
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Configure procurement defaults, theme preferences, and vendor governance notifications.
            </p>
          </div>
        </div>
      </div>

      {/* User & Organization Context Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-bold dark:bg-slate-800 dark:text-slate-200">
              <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Rahul Ranjan
                </h3>
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                  Senior Procurement Lead
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Enterprise Supply Chain & Vendor Governance · <span className="font-semibold text-slate-700 dark:text-slate-300">FieldNerve Intelligence</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60 self-start sm:self-auto">
            <ShieldCheck className="h-4 w-4" />
            <span>Procurement Admin Verified</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Procurement Defaults Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Procurement & Financial Defaults
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Default settings for POs and vendor contracts</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Base Currency */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Default Base Currency
              </label>
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="USD">USD ($) - US Dollar (Default)</option>
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            {/* Payment Terms */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" /> Standard Payment Terms
              </label>
              <select
                value={defaultPaymentTerms}
                onChange={(e) => setDefaultPaymentTerms(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="Net 30">Net 30 Days (Standard Enterprise)</option>
                <option value="Net 60">Net 60 Days (Extended Term)</option>
                <option value="Net 15">Net 15 Days (Accelerated)</option>
                <option value="Immediate">Immediate / Due on Receipt</option>
              </select>
            </div>

            {/* Auto Approval Threshold */}
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-400" /> Level 1 Auto-Approval Cap ($)
              </label>
              <input
                type="number"
                value={autoApprovalThreshold}
                onChange={(e) => setAutoApprovalThreshold(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Purchase orders below this value auto-route to Level 1 Manager approval.
              </p>
            </div>
          </div>
        </section>

        {/* Appearance & Theme Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4 text-indigo-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
              Interface Theme & Appearance
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Customize your portal display theme</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50/50 font-bold text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600'
              }`}
            >
              <Sun className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold">Light Mode</p>
                <p className="text-[10px] text-slate-400">Clean white UI</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50/50 font-bold text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600'
              }`}
            >
              <Moon className="h-5 w-5 text-indigo-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold">Dark Mode</p>
                <p className="text-[10px] text-slate-400">Sleek dark UI</p>
              </div>
            </button>
          </div>
        </section>
      </div>

      {/* VMS Alert & Notification Subscriptions */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-500" />
            Vendor Alert & Notification Preferences
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Select which procurement alerts trigger navbar bell notifications</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          <label className="flex items-center justify-between cursor-pointer rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Vendor Approval Pending</p>
              <p className="text-[10px] text-slate-400">Alert when onboarding candidate awaits screening</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.approvalPending}
              onChange={(e) =>
                setNotifications({ ...notifications, approvalPending: e.target.checked })
              }
              className="h-4 w-4 rounded accent-indigo-600"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Document Expiry Warnings</p>
              <p className="text-[10px] text-slate-400">Warn 30 days prior to GST / ISO / NDA expiration</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.documentExpiring}
              onChange={(e) =>
                setNotifications({ ...notifications, documentExpiring: e.target.checked })
              }
              className="h-4 w-4 rounded accent-indigo-600"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Low Rating & Quality Defect Alerts</p>
              <p className="text-[10px] text-slate-400">Notify if vendor score drops below 3.5 stars</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.lowRatingAlert}
              onChange={(e) =>
                setNotifications({ ...notifications, lowRatingAlert: e.target.checked })
              }
              className="h-4 w-4 rounded accent-indigo-600"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">Delayed Delivery & SLA Breaches</p>
              <p className="text-[10px] text-slate-400">Alert on late PO delivery fulfillment</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.delayedDelivery}
              onChange={(e) =>
                setNotifications({ ...notifications, delayedDelivery: e.target.checked })
              }
              className="h-4 w-4 rounded accent-indigo-600"
            />
          </label>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          size="sm"
          onClick={handleSave}
          className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20"
        >
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-900 px-4 py-3 text-white shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
