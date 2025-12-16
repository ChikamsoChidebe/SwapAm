import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('/auth/refresh', {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('token', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API service classes
export class AuthAPI {
  async login(data: { email: string; password: string }) {
    return api.post('/auth/login', data);
  }

  async register(data: { name: string; email: string; password: string; role?: string }) {
    return api.post('/auth/register', data);
  }

  async whoami() {
    return api.get('/swaps/whoami');
  }
}

export class ItemsAPI {
  async getItems() {
    return api.get('/items');
  }

  async getItemById(id: string) {
    return api.get(`/items/${id}`);
  }

  async createItem(data: { itemName: string; description: string; categoryId: number; imageUrl?: string; estimatedValue?: number }) {
    return api.post('/items', data);
  }

  async deleteItem(id: string) {
    return api.delete(`/items/${id}`);
  }

  async getItemsByUserId(userId: string) {
    return api.get(`/items/user/${userId}`);
  }
}

export class CategoriesAPI {
  async getCategories() {
    return api.get('/categories');
  }

  async getCategoryById(id: string) {
    return api.get(`/categories/${id}`);
  }

  async createCategory(data: { name: string; description: string }) {
    return api.post('/categories', data);
  }

  async updateCategory(id: string, data: { name: string; description: string }) {
    return api.put(`/categories/${id}`, data);
  }

  async deleteCategory(id: string) {
    return api.delete(`/categories/${id}`);
  }
}

export class SwapsAPI {
  async requestSwap(data: { itemAId: number; itemBId: number }) {
    return api.post('/swaps/request', data);
  }

  async acceptSwap(id: string) {
    return api.put(`/swaps/${id}/accept`);
  }

  async rejectSwap(id: string) {
    return api.put(`/swaps/${id}/reject`);
  }

  async cancelSwap(id: string) {
    return api.delete(`/swaps/${id}`);
  }

  async getOutgoingSwaps() {
    return api.get('/swaps/outgoing');
  }

  async getIncomingSwaps() {
    return api.get('/swaps/incoming');
  }

  async getPendingIncomingSwaps() {
    return api.get('/swaps/incoming/pending');
  }
}

// Note: Chat, Notifications, Upload, and AI APIs are not implemented in the Java backend yet
// These can be added when the corresponding backend endpoints are created

// Export API instances
export const authAPI = new AuthAPI();
export const itemsAPI = new ItemsAPI();
export const categoriesAPI = new CategoriesAPI();
export const swapsAPI = new SwapsAPI();

export default api;