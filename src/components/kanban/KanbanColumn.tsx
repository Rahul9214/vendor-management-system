import { memo } from 'react';
import type { KanbanColumn as IKanbanColumn, KanbanVendorCard, KanbanStage } from '@/types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  column: IKanbanColumn;
  cards: KanbanVendorCard[];
  onMoveCard: (cardId: string, newStage: KanbanStage) => void;
}

export const KanbanColumn = memo(function KanbanColumn({
  column,
  cards,
  onMoveCard,
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onMoveCard(cardId, column.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-4 min-w-[280px] w-full dark:border-slate-800 dark:bg-slate-950/60 space-y-4"
    >
      {/* Column Header */}
      <div className={`flex items-center justify-between border-b pb-3 ${column.color.split(' ')[0]}`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {column.title}
            </h3>
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {cards.length}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">{column.description}</p>
        </div>
      </div>

      {/* Cards List / Drop Target */}
      <div className="flex-1 space-y-3 min-h-[300px]">
        {cards.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 p-4 text-center text-[11px] text-slate-400 dark:border-slate-800">
            Drag cards here
          </div>
        ) : (
          cards.map((card) => (
            <KanbanCard key={card.id} card={card} onMoveStage={onMoveCard} />
          ))
        )}
      </div>
    </div>
  );
});
