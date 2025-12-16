// Backend configuration
const BACKENDS = {
  JAVA: 'https://swapam-backend.onrender.com',
  NODE: 'https://swapam-backend-9zqk.onrender.com',
  AI: 'http://13.218.91.146:8000'
};

// Use Java backend as primary
const API_BASE_URL = BACKENDS.JAVA; // Primary backend
const FALLBACK_URL = BACKENDS.NODE; // Alternative backend
const AI_BASE_URL = BACKENDS.AI; // AI services backend

class ApiService {
  constructor() {
    // Check for real JWT token first, fallback to old token key
    this.token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
    this.currentBackend = API_BASE_URL;
  }

  setToken(token) {
    // Only store real JWT tokens, not demo tokens
    if (token && token !== 'demo-token-123') {
      this.token = token;
      localStorage.setItem('jwtToken', token);
    } else {
      this.token = token; // Keep demo token in memory only
    }
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('token'); // Clean up old token key too
  }

  async request(endpoint, options = {}) {
    const url = `${this.currentBackend}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Only add Authorization header if we have a real token (not demo)
    if (this.token && this.token !== 'demo-token-123') {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    if (options.body && !(options.body instanceof FormData)) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Fallback to Node backend if Java backend fails
      if (this.currentBackend === API_BASE_URL && !options.skipFallback) {
        console.warn('Java backend failed, trying Node backend:', error.message);
        const originalBackend = this.currentBackend;
        this.currentBackend = FALLBACK_URL;
        try {
          const result = await this.request(endpoint, { ...options, skipFallback: true });
          return result;
        } catch (fallbackError) {
          this.currentBackend = originalBackend;
          throw error;
        }
      }
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        role: 'STUDENT'
      },
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return {
      token: response.token,
      user: {
        id: response.userId || response.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: response.role || 'STUDENT'
      }
    };
  }

  async login(email, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return {
      token: response.token,
      user: {
        id: response.userId || response.id,
        firstName: response.name || 'User',
        lastName: '',
        email: email,
        role: response.role || 'USER'
      }
    };
  }

  async verifyEmail(email, code) {
    return this.request('/api/auth/verify-email', {
      method: 'POST',
      body: { email, code },
    });
  }

  async forgotPassword(email) {
    return this.request('/api/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
  }

  async resetPassword(email, code, newPassword) {
    return this.request('/api/auth/reset-password', {
      method: 'POST',
      body: { email, code, newPassword },
    });
  }

  // User methods
  async getProfile() {
    return this.request('/api/users/profile');
  }

  async updateProfile(formData) {
    return this.request('/api/users/profile', {
      method: 'PUT',
      headers: {},
      body: formData,
    });
  }

  async getDashboardStats() {
    try {
      // Try Java backend endpoint first
      if (this.currentBackend === API_BASE_URL) {
        try {
          return await this.request('/api/users/stats', { skipFallback: true });
        } catch (javaError) {
          console.warn('Java backend stats endpoint failed, trying Node backend');
          // Switch to Node backend and try its endpoint
          const originalBackend = this.currentBackend;
          this.currentBackend = FALLBACK_URL;
          try {
            return await this.request('/api/users/dashboard-stats', { skipFallback: true });
          } catch (nodeError) {
            this.currentBackend = originalBackend;
            throw javaError;
          }
        }
      } else {
        return await this.request('/api/users/dashboard-stats');
      }
    } catch (error) {
      console.error('Failed to get dashboard stats:', error);
      // If both endpoints fail, return default stats
      return {
        totalItems: 0,
        activeItems: 0,
        completedSwaps: 0,
        campusPoints: 0,
        recentItems: []
      };
    }
  }

  async getMyItems(status = 'all') {
    const token = localStorage.getItem('token');
    if (token === 'demo-token-123') {
      return [];
    }
    try {
      // Try Java backend endpoint first
      if (this.currentBackend === API_BASE_URL) {
        try {
          return await this.request('/api/items/user', { skipFallback: true });
        } catch (javaError) {
          console.warn('Java backend my-items endpoint failed, trying Node backend');
          // Switch to Node backend and try its endpoint
          const originalBackend = this.currentBackend;
          this.currentBackend = FALLBACK_URL;
          try {
            return await this.request('/api/users/my-items', { skipFallback: true });
          } catch (nodeError) {
            this.currentBackend = originalBackend;
            throw javaError;
          }
        }
      } else {
        return await this.request('/api/users/my-items');
      }
    } catch (error) {
      console.error('Failed to get my items:', error);
      return [];
    }
  }

  // Items methods
  async getItems(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return this.request(`/api/items?${params}`);
  }

  async getItem(id) {
    return this.request(`/api/items/${id}`);
  }

  async createItem(formData) {
    return this.request('/api/items', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  async updateItem(id, formData) {
    return this.request(`/api/items/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    });
  }

  async deleteItem(id) {
    return this.request(`/api/items/${id}`, {
      method: 'DELETE',
    });
  }

  async likeItem(id) {
    return this.request(`/api/items/${id}/like`, {
      method: 'POST',
    });
  }

  async getCategories() {
    try {
      // Try Java backend endpoint first
      if (this.currentBackend === API_BASE_URL) {
        try {
          return await this.request('/api/categories', { skipFallback: true });
        } catch (javaError) {
          console.warn('Java backend categories endpoint failed, trying Node backend');
          // Switch to Node backend and try its endpoint
          const originalBackend = this.currentBackend;
          this.currentBackend = FALLBACK_URL;
          try {
            return await this.request('/api/items/categories', { skipFallback: true });
          } catch (nodeError) {
            this.currentBackend = originalBackend;
            throw javaError;
          }
        }
      } else {
        return await this.request('/api/items/categories');
      }
    } catch (error) {
      console.error('Failed to get categories:', error);
      return [
        { id: 1, name: 'Books' },
        { id: 2, name: 'Electronics' },
        { id: 3, name: 'Clothing' },
        { id: 4, name: 'Furniture' },
        { id: 5, name: 'Sports' },
        { id: 6, name: 'Other' }
      ];
    }
  }

  // Swaps methods
  async createSwap(swapData) {
    return this.request('/api/swaps', {
      method: 'POST',
      body: swapData,
    });
  }

  async getMySwaps(type = 'all') {
    return this.request(`/api/swaps/my-swaps?type=${type}`);
  }

  async updateSwapStatus(id, statusData) {
    return this.request(`/api/swaps/${id}/status`, {
      method: 'PUT',
      body: statusData,
    });
  }

  async rateSwap(id, rating) {
    return this.request(`/api/swaps/${id}/rate`, {
      method: 'POST',
      body: { rating },
    });
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.currentBackend}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // AI Services
  async aiRequest(endpoint, options = {}) {
    const url = `${AI_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (options.body && !(options.body instanceof FormData)) {
      config.body = JSON.stringify(options.body);
    } else if (options.body instanceof FormData) {
      delete config.headers['Content-Type']; // Let browser set multipart boundary
      config.body = options.body;
    }

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`AI API Error: ${response.status}`);
    }
    return await response.json();
  }

  // AI Health Check
  async aiHealthCheck() {
    return this.aiRequest('/api/ai/health');
  }

  // Analyze Item with Computer Vision
  async analyzeItem(images, metadata = null) {
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    if (metadata) formData.append('metadata', metadata);
    
    return this.aiRequest('/api/ai/analyze-item', {
      method: 'POST',
      body: formData
    });
  }

  // Item Valuation
  async valuateItem(itemData) {
    return this.aiRequest('/api/ai/valuate', {
      method: 'POST',
      body: itemData
    });
  }

  // Market Trends
  async getMarketTrends() {
    return this.aiRequest('/api/ai/market-trends');
  }

  // Impact Metrics
  async getUserImpact(userId) {
    return this.aiRequest(`/api/ai/impact/user/${userId}`);
  }

  async getPlatformImpact() {
    try {
      return await this.aiRequest('/api/ai/impact/platform');
    } catch (error) {
      // Return mock data if AI service fails
      return {
        metrics: {
          wasteReduced: {
            weight: 1250,
            co2Saved: 850,
            waterSaved: 5000,
            energySaved: 320
          },
          economicImpact: {
            moneySaved: 15000,
            valueCreated: 25000,
            transactionCount: 450
          }
        }
      };
    }
  }

  // AI Matching
  async findAIMatches(preferences) {
    return this.aiRequest('/api/ai/match', {
      method: 'POST',
      body: preferences
    });
  }

  async getAIRecommendations(userId) {
    return this.aiRequest(`/api/ai/recommendations/${userId}`);
  }

  // Matching methods (local backend)
  async findLocalMatches(preferences) {
    return this.request('/matching/find', {
      method: 'POST',
      body: preferences
    });
  }

  async getLocalRecommendations() {
    // Return mock data if demo mode
    if (this.token === 'demo-token-123') {
      return {
        recommendations: [
          { title: 'MacBook Pro', category: 'Electronics' },
          { title: 'Calculus Textbook', category: 'Books' },
          { title: 'Winter Jacket', category: 'Clothing' }
        ]
      };
    }
    return this.request('/matching/recommendations');
  }

  async getSimilarItems(itemId) {
    return this.request(`/matching/similar/${itemId}`);
  }

  // Get current backend info
  getBackendInfo() {
    return {
      current: this.currentBackend === API_BASE_URL ? 'Java' : 'Node',
      url: this.currentBackend,
      ai: AI_BASE_URL
    };
  }
}

export default new ApiService();