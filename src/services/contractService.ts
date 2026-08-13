import type {
  ApiResponse,
  VendorContract,
  ContractFilterParams,
} from '@/types';
import { MOCK_CONTRACTS } from '@/constants/mockContracts';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let contractsStore: VendorContract[] = [...MOCK_CONTRACTS];

export const contractService = {
  /**
   * Fetches vendor contracts with optional search & filter params.
   */
  async getContracts(
    params: ContractFilterParams = {},
  ): Promise<ApiResponse<VendorContract[]>> {
    await delay(250);
    let result = [...contractsStore];

    if (params.search) {
      const query = params.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.contractCode.toLowerCase().includes(query) ||
          c.vendorName.toLowerCase().includes(query),
      );
    }

    if (params.status && params.status !== 'all') {
      result = result.filter((c) => c.status === params.status);
    }

    if (params.type && params.type !== 'all') {
      result = result.filter((c) => c.type === params.type);
    }

    return {
      data: result,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Creates a new contract.
   */
  async createContract(
    data: Omit<VendorContract, 'id' | 'contractCode'>,
  ): Promise<ApiResponse<VendorContract>> {
    await delay(400);
    const newContract: VendorContract = {
      ...data,
      id: `ctr-${Date.now()}`,
      contractCode: `CTR-2026-${Math.floor(100 + Math.random() * 900)}`,
    };
    contractsStore = [newContract, ...contractsStore];
    return {
      data: newContract,
      message: 'Contract created successfully',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
