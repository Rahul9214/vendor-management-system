import type {
  Vendor,
  VendorFilterParams,
  PaginatedResponse,
  ApiResponse,
  VendorStatus,
} from '@/types';
import { MOCK_VENDORS } from '@/constants/mockVendors';

// Simulated delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mutable array for stateful demo changes during session
let vendorStore: Vendor[] = [...MOCK_VENDORS];

export const vendorService = {
  /**
   * Fetches paginated, filtered, searched, and sorted list of vendors.
   */
  async getVendors(
    params: VendorFilterParams = {},
  ): Promise<ApiResponse<PaginatedResponse<Vendor>>> {
    await delay(350); // Fast, realistic API response

    let result = [...vendorStore];

    // 1. Search filter (multi-field)
    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.code.toLowerCase().includes(q) ||
          v.contactPerson.toLowerCase().includes(q) ||
          v.contactEmail.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q),
      );
    }

    // 2. Category filter
    if (params.categories && params.categories.length > 0) {
      result = result.filter((v) => params.categories!.includes(v.category));
    }

    // 3. Status filter
    if (params.statuses && params.statuses.length > 0) {
      result = result.filter((v) => params.statuses!.includes(v.status));
    }

    // 4. Rating filter
    if (params.minRating !== undefined) {
      result = result.filter((v) => v.rating >= params.minRating!);
    }
    if (params.maxRating !== undefined) {
      result = result.filter((v) => v.rating <= params.maxRating!);
    }

    // 5. Purchase value filter
    if (params.minPurchaseValue !== undefined) {
      result = result.filter((v) => v.totalValue >= params.minPurchaseValue!);
    }
    if (params.maxPurchaseValue !== undefined) {
      result = result.filter((v) => v.totalValue <= params.maxPurchaseValue!);
    }

    // 6. Cities filter
    if (params.cities && params.cities.length > 0) {
      result = result.filter((v) => params.cities!.includes(v.city));
    }

    // 7. Sorting
    if (params.sortBy) {
      const field = params.sortBy;
      const isAsc = params.sortOrder === 'asc';

      result.sort((a: Vendor, b: Vendor) => {
        let valA = a[field] as unknown;
        let valB = b[field] as unknown;

        if (typeof valA === 'string') {
          valA = (valA as string).toLowerCase();
          valB = ((valB as string) || '').toLowerCase();
        }

        if ((valA as string | number) < (valB as string | number)) return isAsc ? -1 : 1;
        if ((valA as string | number) > (valB as string | number)) return isAsc ? 1 : -1;
        return 0;
      });
    } else {
      // Default sort by joinedAt desc
      result.sort(
        (a, b) =>
          new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
      );
    }

    // 8. Pagination
    const total = result.length;
    const page = params.page ?? 1;
    const limit = params.pageSize ?? 10;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = result.slice(startIndex, startIndex + limit);

    return {
      data: {
        data: paginatedData,
        total,
        page,
        limit,
        totalPages,
      },
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetches single vendor details by ID.
   */
  async getVendorById(id: string): Promise<ApiResponse<Vendor>> {
    await delay(250);
    const vendor = vendorStore.find((v) => v.id === id);
    if (!vendor) {
      throw new Error(`Vendor with ID ${id} not found.`);
    }
    return {
      data: vendor,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Bulk updates vendor status (e.g., Blacklist or Approve selected).
   */
  async batchUpdateStatus(
    ids: string[],
    newStatus: VendorStatus,
  ): Promise<ApiResponse<{ updatedCount: number }>> {
    await delay(400);
    let count = 0;
    vendorStore = vendorStore.map((v) => {
      if (ids.includes(v.id)) {
        count++;
        return {
          ...v,
          status: newStatus,
          lastActivity: new Date().toISOString(),
        };
      }
      return v;
    });

    return {
      data: { updatedCount: count },
      message: `Successfully updated ${count} vendors to ${newStatus}`,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Returns list of unique cities for filtering.
   */
  async getAvailableCities(): Promise<string[]> {
    const cities = Array.from(new Set(vendorStore.map((v) => v.city))).sort();
    return cities;
  },
};
