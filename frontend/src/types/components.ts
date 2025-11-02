import React from 'react';
import { 
  User, 
  Item, 
  Swap, 
  ChatRoom, 
  Notification, 
  Agent,
  ItemCategory,
  ItemCondition,
  SwapStatus,
  SearchFilters,
  Location
} from './index';

// Base Component Props
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  testId?: string;
}

// Layout Component Props
export interface LayoutProps extends BaseProps {
  sidebar?: boolean;
  header?: boolean;
  footer?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export interface HeaderProps extends BaseProps {
  user?: User;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  transparent?: boolean;
  fixed?: boolean;
}

export interface SidebarProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  user?: User;
  items: SidebarItem[];
  variant?: 'permanent' | 'temporary' | 'persistent';
  width?: number;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  children?: SidebarItem[];
  onClick?: () => void;
}

export interface FooterProps extends BaseProps {
  links: FooterLink[];
  social: SocialLink[];
  copyright?: string;
  newsletter?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

// Item Component Props
export interface ItemCardProps extends BaseProps {
  item: Item;
  variant?: 'default' | 'compact' | 'detailed' | 'grid' | 'list';
  showOwner?: boolean;
  showActions?: boolean;
  showStats?: boolean;
  onLike?: (itemId: string) => void;
  onSwap?: (itemId: string) => void;
  onView?: (itemId: string) => void;
  onShare?: (itemId: string) => void;
  onReport?: (itemId: string) => void;
  loading?: boolean;
  selected?: boolean;
  onSelect?: (itemId: string) => void;
}

export interface ItemGridProps extends BaseProps {
  items: Item[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  columns?: number;
  gap?: number;
  onItemClick?: (item: Item) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  variant?: 'grid' | 'masonry';
}

export interface ItemListProps extends BaseProps {
  items: Item[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  onItemClick?: (item: Item) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  showFilters?: boolean;
  filters?: SearchFilters;
  onFiltersChange?: (filters: SearchFilters) => void;
}

export interface ItemDetailsProps extends BaseProps {
  item: Item;
  onSwap?: (itemId: string) => void;
  onLike?: (itemId: string) => void;
  onShare?: (itemId: string) => void;
  onReport?: (itemId: string) => void;
  onContact?: (ownerId: string) => void;
  showSimilar?: boolean;
  showOwnerInfo?: boolean;
}

export interface ItemFormProps extends BaseProps {
  item?: Item;
  onSubmit: (data: ItemFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
  mode?: 'create' | 'edit';
}

export interface ItemFormData {
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

// User Component Props
export interface UserCardProps extends BaseProps {
  user: User;
  variant?: 'default' | 'compact' | 'detailed';
  showStats?: boolean;
  showContact?: boolean;
  showRating?: boolean;
  showBadges?: boolean;
  onContact?: (userId: string) => void;
  onView?: (userId: string) => void;
  onFollow?: (userId: string) => void;
  onBlock?: (userId: string) => void;
}

export interface UserProfileProps extends BaseProps {
  user: User;
  isOwner?: boolean;
  onEdit?: () => void;
  onContact?: () => void;
  onFollow?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  showItems?: boolean;
  showStats?: boolean;
  showReviews?: boolean;
}

export interface UserAvatarProps extends BaseProps {
  user: User;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showOnline?: boolean;
  showBadge?: boolean;
  onClick?: () => void;
  editable?: boolean;
  onUpload?: (file: File) => void;
}

// Swap Component Props
export interface SwapCardProps extends BaseProps {
  swap: Swap;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  showTimeline?: boolean;
  onAccept?: (swapId: string) => void;
  onReject?: (swapId: string) => void;
  onCancel?: (swapId: string) => void;
  onView?: (swapId: string) => void;
  onChat?: (swapId: string) => void;
  onRate?: (swapId: string) => void;
}

export interface SwapListProps extends BaseProps {
  swaps: Swap[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  filter?: SwapStatus[];
  onFilterChange?: (filter: SwapStatus[]) => void;
  onSwapClick?: (swap: Swap) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export interface SwapDetailsProps extends BaseProps {
  swap: Swap;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  onDispute?: () => void;
  onRate?: () => void;
  onChat?: () => void;
  showTimeline?: boolean;
  showDelivery?: boolean;
}

export interface SwapOfferProps extends BaseProps {
  recipientId: string;
  recipientItems: Item[];
  onSubmit: (offer: SwapOfferData) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
}

export interface SwapOfferData {
  initiatorItems: string[];
  message?: string;
  pointsDifference?: number;
}

// Chat Component Props
export interface ChatRoomProps extends BaseProps {
  room: ChatRoom;
  onSendMessage: (content: string, type: string) => void;
  onTyping?: () => void;
  onMarkRead?: () => void;
  showParticipants?: boolean;
  showAttachments?: boolean;
  height?: number;
}

export interface ChatListProps extends BaseProps {
  rooms: ChatRoom[];
  selectedRoom?: string;
  onRoomSelect: (roomId: string) => void;
  onRoomDelete?: (roomId: string) => void;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
}

export interface MessageProps extends BaseProps {
  message: ChatMessage;
  isOwn?: boolean;
  showAvatar?: boolean;
  showTime?: boolean;
  onReply?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
  onEdit?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
}

export interface MessageInputProps extends BaseProps {
  onSend: (content: string, type: string, attachments?: File[]) => void;
  onTyping?: () => void;
  placeholder?: string;
  disabled?: boolean;
  showAttachments?: boolean;
  showEmoji?: boolean;
  maxLength?: number;
  replyTo?: ChatMessage;
  onCancelReply?: () => void;
}

// Form Component Props
export interface FormProps extends BaseProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string;
  success?: string;
  resetOnSubmit?: boolean;
}

export interface InputProps extends BaseProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export interface SelectProps extends BaseProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
}

export interface CheckboxProps extends BaseProps {
  name: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export interface RadioProps extends BaseProps {
  name: string;
  label?: string;
  value: any;
  checked?: boolean;
  onChange?: (value: any) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export interface FileUploadProps extends BaseProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onUpload: (files: File[]) => void;
  onRemove?: (index: number) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  preview?: boolean;
  dragDrop?: boolean;
  showProgress?: boolean;
  variant?: 'button' | 'dropzone' | 'avatar';
}

// UI Component Props
export interface ButtonProps extends BaseProps {
  variant?: 'contained' | 'outlined' | 'text' | 'fab';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  download?: boolean;
}

export interface IconButtonProps extends BaseProps {
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  tooltip?: string;
  badge?: number | string;
}

export interface CardProps extends BaseProps {
  variant?: 'elevation' | 'outlined';
  elevation?: number;
  square?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  padding?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export interface ModalProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  centered?: boolean;
  footer?: React.ReactNode;
  loading?: boolean;
  destroyOnClose?: boolean;
}

export interface DrawerProps extends BaseProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: number | string;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  footer?: React.ReactNode;
  loading?: boolean;
  destroyOnClose?: boolean;
}

export interface TooltipProps extends BaseProps {
  title: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click' | 'manual';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  arrow?: boolean;
  delay?: number;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface PopoverProps extends BaseProps {
  content: React.ReactNode;
  title?: string;
  trigger?: 'hover' | 'focus' | 'click' | 'manual';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  arrow?: boolean;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
}

export interface AlertProps extends BaseProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  banner?: boolean;
}

export interface ProgressProps extends BaseProps {
  value: number;
  max?: number;
  variant?: 'linear' | 'circular';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

export interface SkeletonProps extends BaseProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  lines?: number;
}

export interface EmptyStateProps extends BaseProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface LoadingProps extends BaseProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse';
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
}

// Navigation Component Props
export interface BreadcrumbProps extends BaseProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  showHome?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface TabsProps extends BaseProps {
  items: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  variant?: 'line' | 'card' | 'editable-card';
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  animated?: boolean;
}

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
}

export interface PaginationProps extends BaseProps {
  current: number;
  total: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  size?: 'sm' | 'md' | 'lg';
  simple?: boolean;
  disabled?: boolean;
}

// Search Component Props
export interface SearchProps extends BaseProps {
  value?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled';
  showSuggestions?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  debounceMs?: number;
  maxLength?: number;
  clearable?: boolean;
  enterButton?: boolean | string;
}

export interface FilterProps extends BaseProps {
  filters: FilterItem[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onReset?: () => void;
  onApply?: () => void;
  variant?: 'sidebar' | 'dropdown' | 'inline';
  collapsible?: boolean;
  showReset?: boolean;
  showApply?: boolean;
}

export interface FilterItem {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'checkbox' | 'radio' | 'date' | 'text';
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  group?: string;
}

// Data Display Component Props
export interface TableProps extends BaseProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  pagination?: PaginationConfig;
  selection?: SelectionConfig;
  sorting?: SortingConfig;
  filtering?: FilteringConfig;
  expandable?: ExpandableConfig;
  scroll?: ScrollConfig;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  sticky?: boolean;
}

export interface TableColumn {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  copyable?: boolean;
  editable?: boolean;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
}

export interface SelectionConfig {
  type: 'checkbox' | 'radio';
  selectedRowKeys: string[];
  onChange: (selectedRowKeys: string[], selectedRows: any[]) => void;
  onSelect?: (record: any, selected: boolean, selectedRows: any[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: any[], changeRows: any[]) => void;
  getCheckboxProps?: (record: any) => any;
}

export interface SortingConfig {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  multiple?: boolean;
}

export interface FilteringConfig {
  filters: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
}

export interface ExpandableConfig {
  expandedRowKeys: string[];
  onExpand: (expanded: boolean, record: any) => void;
  onExpandedRowsChange: (expandedRowKeys: string[]) => void;
  expandedRowRender: (record: any, index: number) => React.ReactNode;
  expandRowByClick?: boolean;
  expandIcon?: (props: any) => React.ReactNode;
}

export interface ScrollConfig {
  x?: number | string;
  y?: number | string;
}

// Import ChatMessage type
import { ChatMessage } from './index';