import type { ApiResponse, KanbanVendorCard, KanbanStage } from '@/types';
import { MOCK_KANBAN_CARDS } from '@/constants/mockKanban';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let kanbanStore: KanbanVendorCard[] = [...MOCK_KANBAN_CARDS];

export const kanbanService = {
  async getKanbanCards(): Promise<ApiResponse<KanbanVendorCard[]>> {
    await delay(150);
    return {
      data: [...kanbanStore],
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async moveCard(cardId: string, newStage: KanbanStage): Promise<ApiResponse<KanbanVendorCard>> {
    await delay(200);
    const cardIndex = kanbanStore.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) {
      throw new Error(`Kanban card ${cardId} not found.`);
    }

    const updatedCard = { ...kanbanStore[cardIndex], stage: newStage };
    kanbanStore[cardIndex] = updatedCard;

    return {
      data: updatedCard,
      message: `Card moved to ${newStage}`,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
