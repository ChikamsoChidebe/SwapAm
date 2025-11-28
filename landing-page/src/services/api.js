// Backend configuration
const BACKENDS = {
  JAVA: 'https://swapam-backend.onrender.com',
  NODE: 'http://localhost:5000',
  AI: 'http://13.218.91.146:8000'
};

// Use Java backend as primary
const API_BASE_URL = BACKENDS.JAVA; // Primary backend
const FALLBACK_URL = BACKENDS.NODE; // Alternative backend
const AI_BASE_URL = BACKENDS.AI; // AI services backend

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.currentBackend = API_BASE_URL;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
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

    if (this.token) {
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
      if (this.currentBackend === API_BASE_URL) {
        console.warn('Java backend failed, trying Node backend:', error.message);
        this.currentBackend = FALLBACK_URL;
        return this.request(endpoint, options);
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
    
    return {
      token: response.token,
      user: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: response.role
      }
    };
  }

  async login(email, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    return {
      token: response.token,
      user: {
        firstName: 'User',
        lastName: '',
        email: email,
        role: response.role
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
    return this.request('/api/users/dashboard-stats');
  }

  async getMyItems(status = 'all') {
    return this.request(`/api/users/my-items?status=${status}`);
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
    return this.request('/api/categories');
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