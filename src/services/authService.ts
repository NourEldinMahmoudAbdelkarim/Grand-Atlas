import apiClient from './apiClient';
import type { LoginRequest, LoginResponse, CreateUserRequest, User } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: {
    name_en: string;
    name_ar: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  createUser: async (data: CreateUserRequest) => {
    const response = await apiClient.post('/auth/create-user', data);
    return response.data;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/auth/users');
    return response.data;
  },
};
