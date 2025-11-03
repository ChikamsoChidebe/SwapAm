import { 
  User, 
  Item, 
  Swap, 
  ChatRoom, 
  Notification, 
  SearchFilters,
  WebSocketMessage,
  ApiResponse,
  Pagination
} from './index';

// API Hook Types
export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  mutate: (data: T) => void;
}

export interface UseApiOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchInterval?: number;
  retry?: number;
  retryDelay?: number;
  staleTime?: number;
  cacheTime?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: (data: any, error: any) => void;
  select?: (data: any) => any;
  suspense?: boolean;
  useErrorBoundary?: boolean;
}

export interface UseMutationResult<T, V> {
  mutate: (variables: V) => Promise<T>;
  mutateAsync: (variables: V) => Promise<T>;
  data: T | null;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}

export interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: any, variables: V) => void;
  onSettled?: (data: T | null, error: any, variables: V) => void;
  onMutate?: (variables: V) => void;
  retry?: number;
  retryDelay?: number;
  useErrorBoundary?: boolean;
}

export interface UseInfiniteQueryResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  refetch: () => Promise<void>;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
}

export interface UseInfiniteQueryOptions<T> extends UseApiOptions {
  getNextPageParam?: (lastPage: ApiResponse<T>, allPages: ApiResponse<T>[]) => any;
  getPreviousPageParam?: (firstPage: ApiResponse<T>, allPages: ApiResponse<T>[]) => any;
}

// Auth Hook Types
export interface UseAuthResult {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: () => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  campus: string;
  department?: string;
  year?: number;
  phone?: string;
}

// Items Hook Types
export interface UseItemsResult {
  items: Item[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export interface UseItemResult {
  item: Item | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateItem: (data: Partial<Item>) => Promise<void>;
  deleteItem: () => Promise<void>;
  likeItem: () => Promise<void>;
  unlikeItem: () => Promise<void>;
  reportItem: (reason: string, description: string) => Promise<void>;
}

export interface UseCreateItemResult {
  createItem: (data: CreateItemData) => Promise<Item>;
  loading: boolean;
  error: string | null;
  progress: number;
  reset: () => void;
}

export interface CreateItemData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  condition: string;
  images: File[];
  videos?: File[];
  tags: string[];
  specifications: Record<string, any>;
  location: any;
  estimatedValue?: number;
}

// Swaps Hook Types
export interface UseSwapsResult {
  swaps: Swap[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export interface UseSwapResult {
  swap: Swap | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  acceptSwap: () => Promise<void>;
  rejectSwap: (reason?: string) => Promise<void>;
  cancelSwap: (reason?: string) => Promise<void>;
  completeSwap: () => Promise<void>;
  rateSwap: (rating: number, comment?: string) => Promise<void>;
  disputeSwap: (reason: string, description: string) => Promise<void>;
}

export interface UseCreateSwapResult {
  createSwap: (data: CreateSwapData) => Promise<Swap>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export interface CreateSwapData {
  recipientId: string;
  initiatorItems: string[];
  recipientItems: string[];
  message?: string;
  pointsDifference?: number;
}

// Chat Hook Types
export interface UseChatRoomsResult {
  rooms: ChatRoom[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createRoom: (participantIds: string[]) => Promise<ChatRoom>;
  deleteRoom: (roomId: string) => Promise<void>;
}

export interface UseChatRoomResult {
  room: ChatRoom | null;
  messages: any[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  sendMessage: (content: string, type?: string, attachments?: File[]) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  markAsRead: () => Promise<void>;
  typing: string[];
  startTyping: () => void;
  stopTyping: () => void;
}

// Notifications Hook Types
export interface UseNotificationsResult {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

// WebSocket Hook Types
export interface UseWebSocketResult {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  send: (message: WebSocketMessage) => void;
  disconnect: () => void;
  reconnect: () => void;
}

export interface UseWebSocketOptions {
  url: string;
  protocols?: string[];
  onOpen?: (event: Event) => void;
  onMessage?: (message: WebSocketMessage) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  enabled?: boolean;
}

// Location Hook Types
export interface UseLocationResult {
  location: GeolocationPosition | null;
  loading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<GeolocationPosition>;
  watchLocation: () => void;
  stopWatching: () => void;
  isWatching: boolean;
}

export interface UseLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
  onSuccess?: (position: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
}

// Upload Hook Types
export interface UseUploadResult {
  upload: (files: File[], options?: UploadOptions) => Promise<UploadResponse[]>;
  uploading: boolean;
  progress: number;
  error: string | null;
  cancel: () => void;
  reset: () => void;
}

export interface UploadOptions {
  type?: 'image' | 'video' | 'document';
  maxSize?: number;
  quality?: number;
  resize?: {
    width: number;
    height: number;
  };
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onProgress?: (progress: number) => void;
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

// Form Hook Types
export interface UseFormResult<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  validateField: (field: keyof T) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (event?: React.FormEvent) => void;
  handleReset: () => void;
  resetForm: (values?: Partial<T>) => void;
}

export interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: any;
  validate?: (values: T) => Record<keyof T, string>;
  onSubmit?: (values: T) => void | Promise<void>;
  enableReinitialize?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
}

// Local Storage Hook Types
export interface UseLocalStorageResult<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

// Session Storage Hook Types
export interface UseSessionStorageResult<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

// Debounce Hook Types
export interface UseDebounceResult<T> {
  debouncedValue: T;
  cancel: () => void;
  flush: () => void;
}

// Throttle Hook Types
export interface UseThrottleResult<T> {
  throttledValue: T;
  cancel: () => void;
  flush: () => void;
}

// Intersection Observer Hook Types
export interface UseIntersectionObserverResult {
  ref: React.RefObject<Element>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  skip?: boolean;
}

// Infinite Scroll Hook Types
export interface UseInfiniteScrollResult {
  ref: React.RefObject<Element>;
  isFetching: boolean;
}

export interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
}

// Media Query Hook Types
export interface UseMediaQueryResult {
  matches: boolean;
}

// Window Size Hook Types
export interface UseWindowSizeResult {
  width: number;
  height: number;
}

// Previous Hook Types
export interface UsePreviousResult<T> {
  previous: T | undefined;
}

// Toggle Hook Types
export interface UseToggleResult {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

// Counter Hook Types
export interface UseCounterResult {
  count: number;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  reset: (value?: number) => void;
  set: (value: number) => void;
}

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

// Timer Hook Types
export interface UseTimerResult {
  time: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  isRunning: boolean;
  isPaused: boolean;
}

export interface UseTimerOptions {
  initialTime?: number;
  interval?: number;
  countdown?: boolean;
  onComplete?: () => void;
  autoStart?: boolean;
}

// Clipboard Hook Types
export interface UseClipboardResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: string | null;
  isSupported: boolean;
}

export interface UseClipboardOptions {
  timeout?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// Idle Hook Types
export interface UseIdleResult {
  isIdle: boolean;
  lastActive: Date;
  reset: () => void;
}

export interface UseIdleOptions {
  timeout?: number;
  events?: string[];
  initialState?: boolean;
  onIdle?: () => void;
  onActive?: () => void;
}

// Network Hook Types
export interface UseNetworkResult {
  online: boolean;
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
}

// Battery Hook Types
export interface UseBatteryResult {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  supported: boolean;
}

// Geolocation Hook Types
export interface UseGeolocationResult {
  location: GeolocationCoordinates | null;
  loading: boolean;
  error: GeolocationPositionError | null;
  getCurrentPosition: () => void;
  watchPosition: () => void;
  clearWatch: () => void;
}

export interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  when?: boolean;
}

// Permission Hook Types
export interface UsePermissionResult {
  state: PermissionState;
  supported: boolean;
  request: () => Promise<PermissionState>;
}

// Notification Permission Hook Types
export interface UseNotificationPermissionResult {
  permission: NotificationPermission;
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (title: string, options?: NotificationOptions) => Notification | null;
}

// Camera Hook Types
export interface UseCameraResult {
  stream: MediaStream | null;
  error: string | null;
  supported: boolean;
  start: (constraints?: MediaStreamConstraints) => Promise<void>;
  stop: () => void;
  takePhoto: () => string | null;
  isActive: boolean;
}

// Microphone Hook Types
export interface UseMicrophoneResult {
  stream: MediaStream | null;
  error: string | null;
  supported: boolean;
  start: (constraints?: MediaStreamConstraints) => Promise<void>;
  stop: () => void;
  isActive: boolean;
  volume: number;
}

// Screen Share Hook Types
export interface UseScreenShareResult {
  stream: MediaStream | null;
  error: string | null;
  supported: boolean;
  start: (options?: MediaStreamConstraints) => Promise<void>;
  stop: () => void;
  isActive: boolean;
}

// Fullscreen Hook Types
export interface UseFullscreenResult {
  isFullscreen: boolean;
  enter: (element?: Element) => Promise<void>;
  exit: () => Promise<void>;
  toggle: (element?: Element) => Promise<void>;
  supported: boolean;
}

// Page Visibility Hook Types
export interface UsePageVisibilityResult {
  isVisible: boolean;
  visibilityState: DocumentVisibilityState;
}

// Focus Hook Types
export interface UseFocusResult {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

// Hover Hook Types
export interface UseHoverResult {
  isHovered: boolean;
  ref: React.RefObject<Element>;
}

// Click Outside Hook Types
export interface UseClickOutsideResult {
  ref: React.RefObject<Element>;
}

// Key Press Hook Types
export interface UseKeyPressResult {
  isPressed: boolean;
}

// Event Listener Hook Types
export interface UseEventListenerOptions {
  target?: EventTarget | null;
  passive?: boolean;
  capture?: boolean;
}

// Resize Observer Hook Types
export interface UseResizeObserverResult {
  ref: React.RefObject<Element>;
  width: number;
  height: number;
  entry: ResizeObserverEntry | null;
}

// Mutation Observer Hook Types
export interface UseMutationObserverResult {
  ref: React.RefObject<Element>;
  mutations: MutationRecord[];
}

export interface UseMutationObserverOptions {
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}