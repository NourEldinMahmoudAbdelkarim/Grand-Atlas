import apiClient from './apiClient';
import type { Zone } from '../types';

export const zoneService = {
  getAll: async (): Promise<Zone[]> => {
    const response = await apiClient.get<Zone[]>('/zone');
    return response.data;
  },

  getById: async (id: string): Promise<Zone> => {
    const response = await apiClient.get<Zone>(`/zone/${id}`);
    return response.data;
  },

  create: async (data: FormData): Promise<Zone> => {
    const response = await apiClient.post<Zone>('/zone', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: string, data: FormData): Promise<Zone> => {
    const response = await apiClient.patch<Zone>(`/zone/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/zone/${id}`);
  },
};
