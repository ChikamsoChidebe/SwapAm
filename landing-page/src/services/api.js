import supabaseService, { supabase } from './supabase.js';

// Backend configuration
const BACKENDS = {
  NODE: 'http://localhost:5000', // Local Node.js backend
  JAVA: 'https://swapam-backend.onrender.com',
  AI: 'http://13.218.91.146:8000'
};

// Use Supabase as primary, Node backend as fallback
const USE_SUPABASE = true;
const API_BASE_URL = BACKENDS.NODE; // Fallback backend
const FALLBACK_URL = BACKENDS.JAVA; // Second fallback
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
    if (USE_SUPABASE) {
      try {
        const { user, session } = await supabaseService.signUp(
          userData.email,
          userData.password,
          {
            firstName: userData.firstName,
            lastName: userData.lastName,
            university: userData.university || 'Default University'
          }
        );
        
        if (session?.access_token) {
          this.setToken(session.access_token);
        }
        
        return {
          token: session?.access_token,
          user: {
            id: user?.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          }
        };
      } catch (error) {
        console.error('Supabase registration failed:', error);
        throw error;
      }
    }
    
    // Fallback to Node.js backend
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        university: userData.university || 'Default University'
      },
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return {
      token: response.token,
      user: response.user || {
        id: response.userId || response.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email
      }
    };
  }

  async login(email, password) {
    if (USE_SUPABASE) {
      try {
        const { user, session } = await supabaseService.signIn(email, password);
        
        if (session?.access_token) {
          this.setToken(session.access_token);
        }
        
        return {
          token: session?.access_token,
          user: {
            id: user?.id,
            firstName: user?.user_metadata?.first_name || 'User',
            lastName: user?.user_metadata?.last_name || '',
            email: user?.email
          }
        };
      } catch (error) {
        console.error('Supabase login failed:', error);
        throw error;
      }
    }
    
    // Fallback to Node.js backend
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return {
      token: response.token,
      user: response.user || {
        id: response.userId || response.id,
        firstName: response.firstName || response.name || 'User',
        lastName: response.lastName || '',
        email: email
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
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (user) {
          return await supabaseService.getProfile(user.id);
        }
        throw new Error('No authenticated user');
      } catch (error) {
        console.error('Supabase getProfile failed:', error);
        throw error;
      }
    }
    
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
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (user) {
          return await supabaseService.getDashboardStats(user.id);
        }
        throw new Error('No authenticated user');
      } catch (error) {
        console.error('Supabase getDashboardStats failed:', error);
        return {
          totalItems: 0,
          activeItems: 0,
          completedSwaps: 0,
          campusPoints: 0,
          recentItems: []
        };
      }
    }
    
    try {
      return await this.request('/api/users/dashboard-stats');
    } catch (error) {
      console.error('Failed to get dashboard stats:', error);
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
    
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (user) {
          return await supabaseService.getMyItems(user.id);
        }
        return [];
      } catch (error) {
        console.error('Supabase getMyItems failed:', error);
        return [];
      }
    }
    
    try {
      return await this.request('/api/users/my-items');
    } catch (error) {
      console.error('Failed to get my items:', error);
      return [];
    }
  }

  // Items methods
  async getItems(filters = {}) {
    if (USE_SUPABASE) {
      try {
        return await supabaseService.getItems(filters);
      } catch (error) {
        console.error('Supabase getItems failed:', error);
        return [];
      }
    }
    
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return this.request(`/api/items?${params}`);
  }

  async getItem(id) {
    if (USE_SUPABASE) {
      try {
        const { data, error } = await supabase
          .from('items')
          .select(`
            *,
            owner:users(id, first_name, last_name)
          `)
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Supabase getItem failed:', error);
        throw error;
      }
    }
    
    return this.request(`/api/items/${id}`);
  }

  async createItem(formData) {
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (!user) throw new Error('No authenticated user');
        
        // Extract form data
        const itemData = {
          title: formData.get('title'),
          description: formData.get('description'),
          category: formData.get('category'),
          condition: formData.get('condition'),
          exchange_type: formData.get('exchangeType'),
          price: formData.get('price') ? parseFloat(formData.get('price')) : null,
          owner_id: user.id
        };
        
        // Handle image uploads
        const imageFiles = formData.getAll('images');
        if (imageFiles.length > 0) {
          const imageUrls = [];
          for (const file of imageFiles) {
            if (file.size > 0) {
              const url = await supabaseService.uploadImage(file);
              imageUrls.push(url);
            }
          }
          itemData.images = imageUrls;
        }
        
        return await supabaseService.createItem(itemData);
      } catch (error) {
        console.error('Supabase createItem failed:', error);
        throw error;
      }
    }
    
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
      return await this.request('/api/items/categories');
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
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (!user) throw new Error('No authenticated user');
        
        return await supabaseService.createSwap({
          requesterId: user.id,
          ownerId: swapData.ownerId,
          itemId: swapData.itemId,
          message: swapData.message
        });
      } catch (error) {
        console.error('Supabase createSwap failed:', error);
        throw error;
      }
    }
    
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
    
    if (USE_SUPABASE) {
      try {
        // Get recent items from Supabase as recommendations
        const { data, error } = await supabase
          .from('items')
          .select('title, category')
          .eq('status', 'available')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        
        return {
          recommendations: data || []
        };
      } catch (error) {
        console.error('Failed to load recommendations from Supabase:', error);
        // Return empty recommendations on error
        return { recommendations: [] };
      }
    }
    
    // Fallback - don't call the Java backend endpoint that doesn't exist
    return { recommendations: [] };
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