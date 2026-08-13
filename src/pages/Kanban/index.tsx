import { useState } from 'react';
import type { KanbanStage } from '@/types';
import { KANBAN_COLUMNS } from '@/types/kanban';
import { useKanbanCards, useMoveKanbanCard } from '@/hooks/useKanban';
import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';
import { Layers, Plus, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function KanbanPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const { data: cards = [], isLoading, isError, refetch } = useKanbanCards();
  const moveCardMutation = useMoveKanbanCard();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState
          title="Failed to load onboarding pipeline"
          message="Could not retrieve kanban board cards."
          onRetry={() => void refetch()}
        />
      </div>
    );
  }

  const handleMoveCard = (cardId: string, newStage: KanbanStage) => {
    moveCardMutation.mutate({ cardId, newStage });
  };

  const filteredCards = cards.filter((c) => {
    const matchesSearch =
      c.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      c.vendorCode.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                Vendor Onboarding Kanban Pipeline
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <Sparkles className="h-3 w-3" /> Bonus Challenge
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Drag and drop candidate cards across 5 onboarding stages: Submitted → Legal Screening → Finance Audit → Revisions → Approved.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => navigate('/onboarding')}
          className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add Candidate Vendor
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="Services">Services</option>
          <option value="Logistics">Logistics</option>
          <option value="Technology">Technology</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Raw Materials">Raw Materials</option>
        </select>
      </div>

      {/* 5-Column Drag and Drop Kanban Board Grid */}
      <div className="flex items-start gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar">
        {KANBAN_COLUMNS.map((column) => {
          const colCards = filteredCards.filter((c) => c.stage === column.id);
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              cards={colCards}
              onMoveCard={handleMoveCard}
            />
          );
        })}
      </div>
    </div>
  );
}
