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
  async login(data: { email: string; password: string; rememberMe?: boolean }) {
    return api.post('/auth/login', data);
  }

  async register(data: any) {
    return api.post('/auth/register', data);
  }

  async logout() {
    return api.post('/auth/logout');
  }

  async refreshToken(data: { refreshToken: string }) {
    return api.post('/auth/refresh', data);
  }

  async forgotPassword(data: { email: string }) {
    return api.post('/auth/forgot-password', data);
  }

  async resetPassword(data: { token: string; password: string }) {
    return api.post('/auth/reset-password', data);
  }

  async verifyEmail(data: { token: string }) {
    return api.post('/auth/verify-email', data);
  }

  async getProfile() {
    return api.get('/users/profile');
  }

  async updateProfile(data: any) {
    return api.put('/users/profile', data);
  }
}

export class ItemsAPI {
  async getItems(params?: any) {
    return api.get('/items', { params });
  }

  async getItemById(id: string) {
    return api.get(`/items/${id}`);
  }

  async createItem(data: any) {
    return api.post('/items', data);
  }

  async updateItem(id: string, data: any) {
    return api.put(`/items/${id}`, data);
  }

  async deleteItem(id: string) {
    return api.delete(`/items/${id}`);
  }

  async likeItem(id: string) {
    return api.post(`/items/${id}/like`);
  }

  async unlikeItem(id: string) {
    return api.delete(`/items/${id}/like`);
  }

  async searchItems(filters: any) {
    return api.post('/items/search', filters);
  }

  async uploadImages(id: string, files: FormData) {
    return api.post(`/items/${id}/images`, files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export class SwapsAPI {
  async getSwaps(params?: any) {
    return api.get('/swaps', { params });
  }

  async getSwapById(id: string) {
    return api.get(`/swaps/${id}`);
  }

  async createSwap(data: any) {
    return api.post('/swaps', data);
  }

  async updateSwap(id: string, data: any) {
    return api.put(`/swaps/${id}`, data);
  }

  async acceptSwap(id: string) {
    return api.post(`/swaps/${id}/accept`);
  }

  async rejectSwap(id: string) {
    return api.post(`/swaps/${id}/reject`);
  }

  async cancelSwap(id: string) {
    return api.post(`/swaps/${id}/cancel`);
  }

  async completeSwap(id: string) {
    return api.post(`/swaps/${id}/complete`);
  }

  async rateSwap(id: string, data: any) {
    return api.post(`/swaps/${id}/rate`, data);
  }
}

export class ChatAPI {
  async getChatRooms() {
    return api.get('/chat/rooms');
  }

  async getChatRoom(id: string) {
    return api.get(`/chat/rooms/${id}`);
  }

  async sendMessage(roomId: string, data: any) {
    return api.post(`/chat/rooms/${roomId}/messages`, data);
  }

  async getMessages(roomId: string, params?: any) {
    return api.get(`/chat/rooms/${roomId}/messages`, { params });
  }

  async markAsRead(roomId: string) {
    return api.post(`/chat/rooms/${roomId}/read`);
  }
}

export class NotificationsAPI {
  async getNotifications() {
    return api.get('/notifications');
  }

  async markNotificationRead(id: string) {
    return api.put(`/notifications/${id}/read`);
  }

  async markAllNotificationsRead() {
    return api.put('/notifications/read-all');
  }

  async updateNotificationSettings(data: any) {
    return api.put('/notifications/settings', data);
  }
}

export class UploadAPI {
  async uploadImage(file: File, options?: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async uploadVideo(file: File, options?: any) {
    const formData = new FormData();
    formData.append('file', file);
    if (options) {
      formData.append('options', JSON.stringify(options));
    }

    return api.post('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export class AIAPI {
  async valuateItem(data: any) {
    return api.post('/ai/valuate', data);
  }

  async generateDescription(data: any) {
    return api.post('/ai/description', data);
  }

  async categorizeItem(data: any) {
    return api.post('/ai/categorize', data);
  }

  async detectDuplicates(data: any) {
    return api.post('/ai/duplicates', data);
  }
}

// Export API instances
export const authAPI = new AuthAPI();
export const itemsAPI = new ItemsAPI();
export const swapsAPI = new SwapsAPI();
export const chatAPI = new ChatAPI();
export const notificationsAPI = new NotificationsAPI();
export const uploadAPI = new UploadAPI();
export const aiAPI = new AIAPI();

export default api;