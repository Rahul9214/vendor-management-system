import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kanbanService } from '@/services/kanbanService';
import type { KanbanStage } from '@/types';

export const kanbanKeys = {
  all: ['kanban'] as const,
};

export function useKanbanCards() {
  return useQuery({
    queryKey: kanbanKeys.all,
    queryFn: () => kanbanService.getKanbanCards(),
    staleTime: 1 * 60 * 1000,
    select: (res) => res.data,
  });
}

export function useMoveKanbanCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, newStage }: { cardId: string; newStage: KanbanStage }) =>
      kanbanService.moveCard(cardId, newStage),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: kanbanKeys.all });
    },
  });
}
