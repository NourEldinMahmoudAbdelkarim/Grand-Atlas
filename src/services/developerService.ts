import apiClient from './apiClient';
import type { Developer } from '../types';

export const developerService = {
  /** GET /api/v1/developer */
  getAll: async (): Promise<Developer[]> => {
    const response = await apiClient.get<Developer[]>('/developer');
    return response.data;
  },

  getById: async (id: string): Promise<Developer> => {
    const response = await apiClient.get<Developer>(`/developer/${id}`);
    return response.data;
  },

  create: async (data: FormData): Promise<Developer> => {
    const response = await apiClient.post<Developer>('/developer/create-developer', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: string, data: FormData): Promise<Developer> => {
    const response = await apiClient.patch<Developer>(`/developer/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/developer/${id}`);
  },
};
