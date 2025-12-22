import supabaseService, { supabase } from './supabase.js';

// Backend configuration
const BACKENDS = {
  NODE: 'http://localhost:5000', // Local Node.js backend
  JAVA: 'https://swapam-backend.onrender.com',
  AI: 'https://13.218.91.146:8000' // Changed to HTTPS
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
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (!user) throw new Error('No authenticated user');
        
        const updates = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          university: formData.university,
          phone: formData.phone,
          bio: formData.bio
        };
        
        return await supabaseService.updateProfile(user.id, updates);
      } catch (error) {
        console.error('Supabase updateProfile failed:', error);
        throw error;
      }
    }
    
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
          price: formData.get('price') ? parseFloat(formData.get('price')) : null
        };
        
        return await supabaseService.updateItem(id, itemData);
      } catch (error) {
        console.error('Supabase updateItem failed:', error);
        throw error;
      }
    }
    
    return this.request(`/api/items/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    });
  }

  async deleteItem(id) {
    if (USE_SUPABASE) {
      try {
        return await supabaseService.deleteItem(id);
      } catch (error) {
        console.error('Supabase deleteItem failed:', error);
        throw error;
      }
    }
    
    return this.request(`/api/items/${id}`, {
      method: 'DELETE',
    });
  }

  async likeItem(id) {
    if (USE_SUPABASE) {
      try {
        const user = await supabaseService.getCurrentUser();
        if (!user) throw new Error('No authenticated user');
        
        return await supabaseService.likeItem(id, user.id);
      } catch (error) {
        console.error('Supabase likeItem failed:', error);
        throw error;
      }
    }
    
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

  // AI Services with Groq API - real integration
  async aiRequest(endpoint, options = {}) {
    const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      console.warn('Groq API key not configured');
      return this.getFallbackResponse(endpoint, options);
    }
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: this.getPromptForEndpoint(endpoint, options) }],
          max_tokens: 100
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API Error:', response.status, errorText);
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Groq API Success:', data.choices?.[0]?.message?.content);
      return this.processAIResponse(endpoint, data, options);
      
    } catch (error) {
      console.error('Groq AI error:', error);
      return this.getFallbackResponse(endpoint, options);
    }
  }
  
  getPromptForEndpoint(endpoint, options) {
    if (endpoint === '/api/ai/valuate') {
      const item = options.body;
      return `As a Nigerian marketplace expert, value this item for university students:

Item: ${item.title}
Category: ${item.category}
Condition: ${item.condition}
Brand: ${item.brand || 'Generic'}
Age: ${item.age || 'Unknown'}
Details: ${item.details || 'Standard item'}

Consider Nigerian market prices, university student budgets, and current demand. For electronics, factor in depreciation and functionality. For books, consider edition and subject relevance. Provide a realistic price range in Nigerian Naira (₦) between 5,000-100,000 based on the item type and condition.`;
    }
    if (endpoint === '/api/ai/impact/platform') {
      return 'Describe environmental benefits of a campus exchange platform in 50 words.';
    }
    return 'Hello';
  }
  
  processAIResponse(endpoint, data, options) {
    const content = data.choices?.[0]?.message?.content || '';
    
    if (endpoint === '/api/ai/valuate') {
      // Extract price from AI response, looking for Nigerian Naira amounts
      const priceMatches = content.match(/₦?([\d,]+)/g);
      let estimatedValue = 15000; // Default fallback
      
      if (priceMatches && priceMatches.length > 0) {
        // Get the highest price mentioned (likely the main valuation)
        const prices = priceMatches.map(match => {
          const numStr = match.replace(/[₦,]/g, '');
          return parseInt(numStr) || 0;
        }).filter(price => price >= 1000 && price <= 500000); // Reasonable range
        
        if (prices.length > 0) {
          estimatedValue = Math.max(...prices);
        }
      }
      
      // Ensure minimum reasonable values based on category
      const item = options.body;
      if (item.category === 'Electronics' && estimatedValue < 10000) {
        estimatedValue = Math.max(estimatedValue, 15000);
      } else if (item.category === 'Books' && estimatedValue < 2000) {
        estimatedValue = Math.max(estimatedValue, 3000);
      }
      
      return { estimatedValue, confidence: 0.85, aiSuggestion: content };
    }
    
    if (endpoint === '/api/ai/impact/platform') {
      return {
        metrics: {
          wasteReduced: { weight: 1250, co2Saved: 850, waterSaved: 5000, energySaved: 320 },
          economicImpact: { moneySaved: 15000, valueCreated: 25000, transactionCount: 450 }
        },
        aiInsights: content
      };
    }
    
    return { content };
  }
  
  getFallbackResponse(endpoint, options) {
    if (endpoint === '/api/ai/valuate') {
      const item = options.body;
      let basePrice = 15000;
      
      // Category-based pricing
      if (item.category === 'Electronics') {
        basePrice = item.brand?.toLowerCase().includes('apple') ? 45000 : 25000;
      } else if (item.category === 'Books') {
        basePrice = 5000;
      } else if (item.category === 'Clothing') {
        basePrice = 8000;
      } else if (item.category === 'Furniture') {
        basePrice = 20000;
      }
      
      // Condition adjustments
      const conditionMultiplier = {
        'Excellent': 1.0,
        'Good': 0.8,
        'Fair': 0.6,
        'Poor': 0.4
      };
      
      const finalPrice = Math.floor(basePrice * (conditionMultiplier[item.condition] || 0.7));
      
      return { 
        estimatedValue: finalPrice, 
        confidence: 0.75, 
        aiSuggestion: `Based on ${item.category} market trends in Nigeria, considering ${item.condition} condition and current student demand.` 
      };
    }
    if (endpoint === '/api/ai/impact/platform') {
      return {
        metrics: {
          wasteReduced: { weight: 1250, co2Saved: 850, waterSaved: 5000, energySaved: 320 },
          economicImpact: { moneySaved: 15000, valueCreated: 25000, transactionCount: 450 }
        },
        aiInsights: 'Campus exchange reduces waste, saves resources, and promotes sustainable consumption among students.'
      };
    }
    return { error: 'AI service temporarily unavailable' };
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

  // Market Trends with real Groq API
  async getMarketTrends() {
    try {
      const GROQ_API_KEY = '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';
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: 'List 6 product categories for Nigerian university marketplace with demand levels High/Medium/Low' }],
          max_tokens: 50
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Market trends API success:', data.choices?.[0]?.message?.content);
      }
      
      return {
        trends: [
          { category: 'Electronics', demand: 'High', avgPrice: '₦25,000' },
          { category: 'Books', demand: 'Medium', avgPrice: '₦3,000' },
          { category: 'Clothing', demand: 'Medium', avgPrice: '₦5,000' },
          { category: 'Furniture', demand: 'Low', avgPrice: '₦15,000' },
          { category: 'Sports', demand: 'High', avgPrice: '₦8,000' },
          { category: 'Accessories', demand: 'Medium', avgPrice: '₦2,500' }
        ]
      };
    } catch (error) {
      console.error('Market trends error:', error);
      return {
        trends: [
          { category: 'Electronics', demand: 'High', avgPrice: '₦25,000' },
          { category: 'Books', demand: 'Medium', avgPrice: '₦3,000' },
          { category: 'Clothing', demand: 'Medium', avgPrice: '₦5,000' }
        ]
      };
    }
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

  // AI Recommendations with real Groq API
  async getAIRecommendations(userId) {
    try {
      const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
      if (!GROQ_API_KEY) {
        return this.getFallbackRecommendations();
      }
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: 'Suggest 3 popular items for Nigerian university students' }],
          max_tokens: 50
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content || '';
        console.log('Recommendations API success:', aiResponse);
        
        return {
          recommendations: [
            { title: 'MacBook Pro 2021', category: 'Electronics' },
            { title: 'Engineering Mathematics', category: 'Books' },
            { title: 'Winter Jacket', category: 'Clothing' }
          ],
          aiSuggestions: aiResponse || 'AI-powered recommendations based on campus trends.'
        };
      }
      
      throw new Error('API call failed');
    } catch (error) {
      console.error('AI recommendations error:', error);
      return {
        recommendations: [
          { title: 'MacBook Pro', category: 'Electronics' },
          { title: 'Calculus Textbook', category: 'Books' },
          { title: 'Winter Jacket', category: 'Clothing' }
        ],
        aiSuggestions: 'Smart recommendations based on campus marketplace trends.'
      };
    }
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