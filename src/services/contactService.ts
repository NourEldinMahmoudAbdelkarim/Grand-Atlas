import apiClient from './apiClient';
import type { ContactRequest, ApiMessage } from '../types';

export const contactService = {
  send: async (data: ContactRequest): Promise<ApiMessage> => {
    const response = await apiClient.post<ApiMessage>('/contactus', data);
    return response.data;
  },
};
