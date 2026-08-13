import { memo } from 'react';
import type { KanbanVendorCard, KanbanStage } from '@/types';
import { KANBAN_COLUMNS } from '@/types/kanban';
import { Building2, MapPin, ShieldCheck, GripVertical } from 'lucide-react';

interface KanbanCardProps {
  card: KanbanVendorCard;
  onMoveStage: (cardId: string, newStage: KanbanStage) => void;
}

export const KanbanCard = memo(function KanbanCard({
  card,
  onMoveStage,
}: KanbanCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group relative cursor-grab active:cursor-grabbing rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-3"
    >
      {/* Top Header: Code + Priority + Drag Handle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <GripVertical className="h-4 w-4 text-slate-300 group-hover:text-indigo-500" />
          <span className="font-mono text-[10px] font-bold text-slate-500">
            {card.vendorCode}
          </span>
        </div>

        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
          card.priority === 'high'
            ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400'
            : card.priority === 'medium'
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
            : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
        }`}>
          {card.priority} priority
        </span>
      </div>

      {/* Title & Category */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {card.vendorName}
        </h4>
        <span className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          {card.category}
        </span>
      </div>

      {/* Contact & Location */}
      <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 pt-2 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 text-slate-400" />
          <span>{card.contactPerson}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span>{card.city}, {card.country}</span>
        </div>
      </div>

      {/* Compliance Score Bar */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500" /> Compliance
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {card.complianceScore}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${card.complianceScore}%` }}
          />
        </div>
      </div>

      {/* Quick Move Stage Select (Click Fallback) */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">Move stage:</span>
        <select
          value={card.stage}
          onChange={(e) => onMoveStage(card.id, e.target.value as KanbanStage)}
          className="h-6 rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-semibold text-slate-700 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {KANBAN_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
