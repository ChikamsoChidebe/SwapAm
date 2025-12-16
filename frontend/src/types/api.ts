// Import statements for types from main index
import {
  User,
  Item,
  ItemCategory,
  ItemCondition,
  Swap,
  SwapStatus,
  Location,
  PriceRange,
  LocationFilter,
  SortOption,
  Pagination,
  SearchFilters,
  MessageType,
  MessageAttachment,
  RatingCategory,
  ValuationFactor,
  MarketComparison,
  DisputeReason,
  DisputeEvidence,
  DeliveryInfo,
  ApiError
} from './index';

// API Endpoint Types
export interface ApiEndpoints {
  // Authentication
  login: '/auth/login';
  register: '/auth/register';
  logout: '/auth/logout';
  refreshToken: '/auth/refresh';
  forgotPassword: '/auth/forgot-password';
  resetPassword: '/auth/reset-password';
  verifyEmail: '/auth/verify-email';
  
  // Users
  getProfile: '/users/profile';
  updateProfile: '/users/profile';
  getUserById: '/users/:id';
  uploadAvatar: '/users/avatar';
  getUserStats: '/users/stats';
  getUserAnalytics: '/users/analytics';
  
  // Items
  getItems: '/items';
  getItemById: '/items/:id';
  createItem: '/items';
  updateItem: '/items/:id';
  deleteItem: '/items/:id';
  uploadItemImages: '/items/:id/images';
  searchItems: '/items/search';
  getFeaturedItems: '/items/featured';
  getRecommendedItems: '/items/recommended';
  likeItem: '/items/:id/like';
  unlikeItem: '/items/:id/unlike';
  reportItem: '/items/:id/report';
  
  // Swaps
  getSwaps: '/swaps';
  getSwapById: '/swaps/:id';
  createSwap: '/swaps';
  updateSwap: '/swaps/:id';
  acceptSwap: '/swaps/:id/accept';
  rejectSwap: '/swaps/:id/reject';
  cancelSwap: '/swaps/:id/cancel';
  completeSwap: '/swaps/:id/complete';
  rateSwap: '/swaps/:id/rate';
  
  // Chat
  getChatRooms: '/chat/rooms';
  getChatRoom: '/chat/rooms/:id';
  sendMessage: '/chat/rooms/:id/messages';
  getMessages: '/chat/rooms/:id/messages';
  markAsRead: '/chat/rooms/:id/read';
  
  // Notifications
  getNotifications: '/notifications';
  markNotificationRead: '/notifications/:id/read';
  markAllNotificationsRead: '/notifications/read-all';
  updateNotificationSettings: '/notifications/settings';
  
  // Agents
  getAgents: '/agents';
  getAgentById: '/agents/:id';
  requestPickup: '/agents/pickup';
  trackDelivery: '/agents/track/:trackingCode';
  
  // Analytics
  getDashboardStats: '/analytics/dashboard';
  getSustainabilityImpact: '/analytics/sustainability';
  getCategoryStats: '/analytics/categories';
  getMonthlyStats: '/analytics/monthly';
  
  // Admin
  getUsers: '/admin/users';
  banUser: '/admin/users/:id/ban';
  unbanUser: '/admin/users/:id/unban';
  getReports: '/admin/reports';
  resolveReport: '/admin/reports/:id/resolve';
  getSystemStats: '/admin/stats';
  
  // Disputes
  createDispute: '/disputes';
  getDisputes: '/disputes';
  getDisputeById: '/disputes/:id';
  updateDispute: '/disputes/:id';
  resolveDispute: '/disputes/:id/resolve';
  
  // Payments
  getPaymentMethods: '/payments/methods';
  addPaymentMethod: '/payments/methods';
  removePaymentMethod: '/payments/methods/:id';
  processPayment: '/payments/process';
  getTransactionHistory: '/payments/transactions';
  
  // Campus
  getCampuses: '/campus';
  getCampusById: '/campus/:id';
  getCampusStats: '/campus/:id/stats';
  
  // Categories
  getCategories: '/categories';
  getSubcategories: '/categories/:category/subcategories';
  
  // Search
  globalSearch: '/search';
  searchSuggestions: '/search/suggestions';
  searchHistory: '/search/history';
  
  // AI
  valuateItem: '/ai/valuate';
  generateDescription: '/ai/description';
  categorizeItem: '/ai/categorize';
  detectDuplicates: '/ai/duplicates';
  
  // Upload
  uploadImage: '/upload/image';
  uploadVideo: '/upload/video';
  uploadDocument: '/upload/document';
}

// Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface CreateItemRequest {
  itemName: string;
  description: string;
  categoryId: number;
  imageUrl?: string;
  estimatedValue?: number;
}

export interface UpdateItemRequest extends Partial<CreateItemRequest> {
  id: string;
}

export interface SearchItemsRequest {
  query?: string;
  category?: ItemCategory;
  condition?: ItemCondition[];
  priceRange?: PriceRange;
  location?: LocationFilter;
  sortBy?: SortOption;
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
  page?: number;
  limit?: number;
}

export interface SearchItemsResponse {
  items: Item[];
  pagination: Pagination;
  filters: SearchFilters;
  suggestions?: string[];
}

export interface CreateSwapRequest {
  itemAId: number;
  itemBId: number;
}

export interface UpdateSwapRequest {
  status?: SwapStatus;
  message?: string;
  deliveryInfo?: Partial<DeliveryInfo>;
}

export interface RateSwapRequest {
  rating: number;
  comment?: string;
  categories: RatingCategory[];
}

export interface SendMessageRequest {
  content: string;
  type: MessageType;
  replyTo?: string;
  attachments?: MessageAttachment[];
}

export interface UploadRequest {
  file: File;
  type: 'image' | 'video' | 'document';
  metadata?: Record<string, any>;
}

export interface UploadResponse {
  url: string;
  thumbnail?: string;
  metadata: {
    size: number;
    type: string;
    dimensions?: {
      width: number;
      height: number;
    };
    duration?: number;
  };
}

export interface ValuateItemRequest {
  title: string;
  description: string;
  category: ItemCategory;
  condition: ItemCondition;
  images: string[];
  specifications?: Record<string, any>;
}

export interface ValuateItemResponse {
  suggestedPoints: number;
  confidence: number;
  factors: ValuationFactor[];
  marketComparison: MarketComparison[];
  explanation: string;
}

export interface CreateDisputeRequest {
  swapId: string;
  reason: DisputeReason;
  description: string;
  evidence: DisputeEvidence[];
}

export interface ResolveDisputeRequest {
  decision: string;
  compensation?: number;
  actionTaken: string;
}

// API Configuration
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
}

export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheTime?: number;
}

// Error Types
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: ApiError[];
  code: string;
  timestamp: Date;
  path: string;
}

export interface ValidationError extends ApiError {
  field: string;
  value: any;
  constraints: string[];
}

export interface AuthenticationError extends ApiError {
  code: 'INVALID_CREDENTIALS' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID' | 'ACCOUNT_LOCKED';
}

export interface AuthorizationError extends ApiError {
  code: 'INSUFFICIENT_PERMISSIONS' | 'RESOURCE_FORBIDDEN';
  requiredPermissions: string[];
}

export interface NotFoundError extends ApiError {
  code: 'RESOURCE_NOT_FOUND';
  resource: string;
  id: string;
}

export interface ConflictError extends ApiError {
  code: 'RESOURCE_CONFLICT' | 'DUPLICATE_ENTRY';
  conflictingField: string;
}

export interface RateLimitError extends ApiError {
  code: 'RATE_LIMIT_EXCEEDED';
  retryAfter: number;
  limit: number;
  remaining: number;
}

export interface ServerError extends ApiError {
  code: 'INTERNAL_SERVER_ERROR' | 'SERVICE_UNAVAILABLE' | 'DATABASE_ERROR';
  requestId: string;
}

// Webhook Types
export interface WebhookPayload {
  event: WebhookEvent;
  data: any;
  timestamp: Date;
  signature: string;
}

export enum WebhookEvent {
  USER_REGISTERED = 'user.registered',
  USER_VERIFIED = 'user.verified',
  ITEM_CREATED = 'item.created',
  ITEM_UPDATED = 'item.updated',
  ITEM_DELETED = 'item.deleted',
  SWAP_CREATED = 'swap.created',
  SWAP_ACCEPTED = 'swap.accepted',
  SWAP_COMPLETED = 'swap.completed',
  SWAP_CANCELLED = 'swap.cancelled',
  PAYMENT_PROCESSED = 'payment.processed',
  DELIVERY_STARTED = 'delivery.started',
  DELIVERY_COMPLETED = 'delivery.completed'
}

// Cache Types
export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  expiresAt: Date;
  key: string;
}

export interface CacheConfig {
  defaultTTL: number;
  maxSize: number;
  strategy: 'LRU' | 'FIFO' | 'TTL';
}