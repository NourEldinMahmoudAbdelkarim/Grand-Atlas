// API Types — images are plain URL strings from the API

export type Role = 'ADMIN' | 'SALES_ADMIN' | 'MARKETING';
export type UnitStatus = 'AVAILABLE' | 'SOLD' | 'RENTED';

export interface User {
  id: string;
  name_en: string;
  name_ar: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface Project {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  developerId: string;
  zoneId: string;
  developer?: { name_en: string; name_ar: string };
  zone?: { name_en: string; name_ar: string; city_en?: string; city_ar?: string };
  images: string[];          // plain URL strings
  createdAt: string;
  updatedAt: string;
}

export interface Developer {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  images: string[];          // plain URL strings
  createdAt: string;
  updatedAt: string;
}

export interface Zone {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  city_en: string;
  city_ar: string;
  images: string[];          // plain URL strings
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  city_en: string;
  city_ar: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  projectId: string;
  project?: {
    id: string;
    name_en: string;
    name_ar: string;
    developer?: { name_en: string; name_ar: string };
    zone?: { name_en: string; name_ar: string };
  };
  status: UnitStatus;
  images: string[];          // plain URL strings
  // flattened fields from API
  zoneName_en?: string;
  zoneName_ar?: string;
  developerName_en?: string;
  developerName_ar?: string;
  projectName_en?: string;
  projectName_ar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name_en: string;
  name_ar: string;
  email: string;
  password: string;
  phone: string;
}

export interface CreateUserRequest {
  name_en: string;
  name_ar: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
}

export interface UnitFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  bedrooms?: number;
  bathrooms?: number;
  developerName?: string;
  zoneName?: string;
  projectName?: string;
  status?: UnitStatus;
  sort?: 'asc' | 'desc';
}

export interface ApiMessage {
  message: string;
}
