import apiClient from './apiClient';
import type { Unit, UnitFilters } from '../types';

export const unitService = {
  /** GET /api/v1/unit — default sort=asc; filters.sort overrides */
  getAll: async (filters?: UnitFilters): Promise<Unit[]> => {
    const response = await apiClient.get<Unit[]>('/unit', {
      params: { sort: 'asc', ...filters },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Unit> => {
    const response = await apiClient.get<Unit>(`/unit/${id}`);
    return response.data;
  },

  create: async (data: FormData): Promise<Unit> => {
    const response = await apiClient.post<Unit>('/unit/create', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: string, data: FormData): Promise<Unit> => {
    const response = await apiClient.patch<Unit>(`/unit/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/unit/${id}`);
  },
};
