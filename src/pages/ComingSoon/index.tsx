import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Placeholder for modules 2–8 that will be implemented in subsequent sprints.
 */
export default function ComingSoonPage() {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
        <Construction className="h-10 w-10 text-indigo-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Coming Soon
        </h2>
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
          This module is under active development and will be available in the next sprint.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
