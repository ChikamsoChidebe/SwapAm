// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  campus: string;
  department?: string;
  year?: number;
  points: number;
  rating: number;
  totalSwaps: number;
  joinedAt: Date;
  isVerified: boolean;
  preferences: UserPreferences;
  location: Location;
  badges: Badge[];
  sustainabilityScore: number;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  categories: string[];
  maxDistance: number;
  language: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  swapUpdates: boolean;
  newMatches: boolean;
  promotions: boolean;
  sustainability: boolean;
}

export interface PrivacySettings {
  showProfile: boolean;
  showLocation: boolean;
  showRating: boolean;
  allowMessages: boolean;
}

// Item Types
export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  subcategory: string;
  condition: ItemCondition;
  images: ItemImage[];
  videos?: ItemVideo[];
  owner: User;
  points: number;
  estimatedValue: number;
  aiValuation: AIValuation;
  status: ItemStatus;
  location: Location;
  tags: string[];
  specifications: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  views: number;
  likes: number;
  isPromoted: boolean;
  sustainabilityImpact: SustainabilityImpact;
  swapHistory: SwapHistory[];
}

export interface ItemImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ItemVideo {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  size: number;
}

export interface AIValuation {
  confidence: number;
  factors: ValuationFactor[];
  suggestedPoints: number;
  marketComparison: MarketComparison[];
  depreciationRate: number;
  qualityScore: number;
}

export interface ValuationFactor {
  factor: string;
  impact: number;
  description: string;
}

export interface MarketComparison {
  platform: string;
  averagePrice: number;
  listings: number;
  lastUpdated: Date;
}

export interface SustainabilityImpact {
  co2Saved: number;
  wasteReduced: number;
  waterSaved: number;
  energySaved: number;
  circularityScore: number;
}

// Swap Types
export interface Swap {
  id: string;
  initiator: User;
  recipient: User;
  initiatorItems: Item[];
  recipientItems: Item[];
  pointsDifference: number;
  status: SwapStatus;
  messages: SwapMessage[];
  timeline: SwapTimeline[];
  deliveryInfo: DeliveryInfo;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  rating?: SwapRating;
  dispute?: Dispute;
}

export interface SwapMessage {
  id: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'offer' | 'system';
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'location';
  url: string;
  name: string;
  size: number;
}

export interface SwapTimeline {
  id: string;
  event: SwapEvent;
  timestamp: Date;
  description: string;
  actor: User;
  metadata?: Record<string, any>;
}

export interface DeliveryInfo {
  agent?: Agent;
  pickupLocation: Location;
  deliveryLocation: Location;
  scheduledPickup?: Date;
  scheduledDelivery?: Date;
  actualPickup?: Date;
  actualDelivery?: Date;
  trackingCode?: string;
  instructions?: string;
  fee: number;
}

export interface SwapRating {
  id: string;
  rater: User;
  rated: User;
  rating: number;
  comment?: string;
  categories: RatingCategory[];
  timestamp: Date;
}

export interface RatingCategory {
  category: string;
  rating: number;
}

// Agent Types
export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  rating: number;
  totalDeliveries: number;
  isActive: boolean;
  location: Location;
  workingHours: WorkingHours;
  vehicleType: string;
  maxCapacity: number;
  currentLoad: number;
  earnings: AgentEarnings;
}

export interface WorkingHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface AgentEarnings {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  pending: number;
}

// Location Types
export interface Location {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates: Coordinates;
  campus?: string;
  building?: string;
  room?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Enums
export enum ItemCategory {
  BOOKS = 'books',
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FURNITURE = 'furniture',
  SPORTS = 'sports',
  ACCESSORIES = 'accessories',
  STATIONERY = 'stationery',
  KITCHEN = 'kitchen',
  DECOR = 'decor',
  OTHER = 'other'
}

export enum ItemCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor'
}

export enum ItemStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SWAPPED = 'swapped',
  EXPIRED = 'expired',
  REMOVED = 'removed'
}

export enum SwapStatus {
  INITIATED = 'initiated',
  NEGOTIATING = 'negotiating',
  AGREED = 'agreed',
  PICKUP_SCHEDULED = 'pickup_scheduled',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed'
}

export enum SwapEvent {
  INITIATED = 'initiated',
  OFFER_MADE = 'offer_made',
  OFFER_ACCEPTED = 'offer_accepted',
  OFFER_REJECTED = 'offer_rejected',
  PICKUP_SCHEDULED = 'pickup_scheduled',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed'
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
  pagination?: Pagination;
  meta?: Record<string, any>;
}

export interface ApiError {
  field?: string;
  message: string;
  code: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: ItemCategory;
  condition?: ItemCondition[];
  priceRange?: PriceRange;
  location?: LocationFilter;
  sortBy?: SortOption;
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
  dateRange?: DateRange;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface LocationFilter {
  campus?: string;
  maxDistance?: number;
  coordinates?: Coordinates;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export enum SortOption {
  RELEVANCE = 'relevance',
  DATE = 'date',
  PRICE = 'price',
  DISTANCE = 'distance',
  POPULARITY = 'popularity',
  RATING = 'rating'
}

// Chat Types
export interface ChatRoom {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  type: 'swap' | 'general';
  relatedSwap?: string;
}

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  type: MessageType;
  timestamp: Date;
  isRead: boolean;
  reactions?: MessageReaction[];
  replyTo?: string;
  attachments?: MessageAttachment[];
  isEdited: boolean;
  editedAt?: Date;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  LOCATION = 'location',
  SWAP_OFFER = 'swap_offer',
  SYSTEM = 'system'
}

export interface MessageReaction {
  emoji: string;
  users: User[];
  count: number;
}

// Notification Types
export interface Notification {
  id: string;
  recipient: User;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  priority: NotificationPriority;
}

export enum NotificationType {
  SWAP_REQUEST = 'swap_request',
  SWAP_ACCEPTED = 'swap_accepted',
  SWAP_REJECTED = 'swap_rejected',
  SWAP_COMPLETED = 'swap_completed',
  NEW_MESSAGE = 'new_message',
  ITEM_LIKED = 'item_liked',
  ITEM_EXPIRED = 'item_expired',
  POINTS_EARNED = 'points_earned',
  AGENT_ASSIGNED = 'agent_assigned',
  DELIVERY_UPDATE = 'delivery_update',
  SYSTEM_UPDATE = 'system_update',
  PROMOTION = 'promotion'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Analytics Types
export interface UserAnalytics {
  totalSwaps: number;
  successfulSwaps: number;
  totalPointsEarned: number;
  totalPointsSpent: number;
  averageRating: number;
  sustainabilityImpact: SustainabilityImpact;
  categoryBreakdown: CategoryStats[];
  monthlyActivity: MonthlyStats[];
  achievements: Achievement[];
}

export interface CategoryStats {
  category: ItemCategory;
  itemsPosted: number;
  itemsSwapped: number;
  pointsEarned: number;
  pointsSpent: number;
}

export interface MonthlyStats {
  month: string;
  swaps: number;
  points: number;
  items: number;
  co2Saved: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
  level?: number;
}

// Dispute Types
export interface Dispute {
  id: string;
  swap: Swap;
  initiator: User;
  reason: DisputeReason;
  description: string;
  evidence: DisputeEvidence[];
  status: DisputeStatus;
  resolution?: DisputeResolution;
  createdAt: Date;
  resolvedAt?: Date;
  assignedTo?: User;
}

export enum DisputeReason {
  ITEM_NOT_AS_DESCRIBED = 'item_not_as_described',
  ITEM_DAMAGED = 'item_damaged',
  ITEM_NOT_RECEIVED = 'item_not_received',
  WRONG_ITEM = 'wrong_item',
  DELIVERY_ISSUE = 'delivery_issue',
  OTHER = 'other'
}

export interface DisputeEvidence {
  id: string;
  type: 'image' | 'document' | 'text';
  url?: string;
  content?: string;
  description: string;
  uploadedAt: Date;
}

export enum DisputeStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export interface DisputeResolution {
  decision: string;
  compensation?: number;
  actionTaken: string;
  resolvedBy: User;
  resolvedAt: Date;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  campus: string;
  department?: string;
  year?: number;
  phone?: string;
  agreeToTerms: boolean;
}

export interface ItemForm {
  title: string;
  description: string;
  category: ItemCategory;
  subcategory: string;
  condition: ItemCondition;
  images: File[];
  videos?: File[];
  tags: string[];
  specifications: Record<string, any>;
  location: Location;
  estimatedValue?: number;
}

export interface SwapOfferForm {
  items: string[];
  message?: string;
  pointsOffered?: number;
}

// UI State Types
export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  loading: boolean;
  error?: string;
  success?: string;
  modals: ModalState;
  notifications: NotificationState;
}

export interface ModalState {
  itemDetails: boolean;
  swapOffer: boolean;
  profile: boolean;
  settings: boolean;
  chat: boolean;
  imageViewer: boolean;
  confirmation: boolean;
}

export interface NotificationState {
  items: Notification[];
  unreadCount: number;
  lastFetched?: Date;
}

// WebSocket Types
export interface WebSocketMessage {
  type: WebSocketMessageType;
  payload: any;
  timestamp: Date;
  id: string;
}

export enum WebSocketMessageType {
  CHAT_MESSAGE = 'chat_message',
  SWAP_UPDATE = 'swap_update',
  NOTIFICATION = 'notification',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
  TYPING = 'typing',
  DELIVERY_UPDATE = 'delivery_update'
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface ItemCardProps extends BaseComponentProps {
  item: Item;
  onLike?: (itemId: string) => void;
  onSwap?: (itemId: string) => void;
  onView?: (itemId: string) => void;
  showOwner?: boolean;
  compact?: boolean;
}

export interface UserCardProps extends BaseComponentProps {
  user: User;
  showStats?: boolean;
  showContact?: boolean;
  compact?: boolean;
}

export interface SwapCardProps extends BaseComponentProps {
  swap: Swap;
  onAccept?: (swapId: string) => void;
  onReject?: (swapId: string) => void;
  onCancel?: (swapId: string) => void;
  showActions?: boolean;
}

// Hook Types
export interface UseApiOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  staleTime?: number;
  cacheTime?: number;
}

export interface UseInfiniteScrollOptions {
  threshold?: number;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface SwapHistory {
  id: string;
  previousOwner: User;
  swapDate: Date;
  pointsExchanged: number;
}

// Export all types
export * from './api';
export * from './components';
export * from './hooks';