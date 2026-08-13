import { memo } from 'react';
import type { VendorProject } from '@/types';
import { Briefcase, CheckCircle2, Clock } from 'lucide-react';

interface ProjectsTabProps {
  projects: VendorProject[];
}

export const ProjectsTab = memo(function ProjectsTab({ projects }: ProjectsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Associated Enterprise Projects
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Corporate initiatives and contracts where this vendor is an active partner.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {proj.code}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {proj.projectName}
                  </h4>
                </div>
              </div>

              {proj.status === 'completed' ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <Clock className="h-3 w-3" /> Active
                </span>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Vendor Role:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{proj.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contract Value:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">${proj.contractValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Project Timeline:</span>
                <span className="text-slate-600 dark:text-slate-300">
                  {new Date(proj.startDate).toLocaleDateString()} – {new Date(proj.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-medium text-slate-500">Project Completion:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{proj.completionPercentage}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-indigo-600" style={{ width: `${proj.completionPercentage}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
