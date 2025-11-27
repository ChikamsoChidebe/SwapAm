export const APP_CONFIG = {
  name: 'SwapAm',
  version: '1.0.0',
  description: 'Campus Circular Economy Platform',
  tagline: 'Turn Student Waste Into Wealth',
  url: process.env.REACT_APP_URL || 'https://swapam.com',
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
  },
};

export const COLORS = {
  primary: '#00C853',
  primaryLight: '#5EFC82',
  primaryDark: '#009624',
  secondary: '#FF6D00',
  secondaryLight: '#FF9E40',
  secondaryDark: '#C43E00',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const ITEM_CATEGORIES = [
  { id: 'textbooks', label: 'Textbooks', icon: '📚' },
  { id: 'electronics', label: 'Electronics', icon: '💻' },
  { id: 'furniture', label: 'Furniture', icon: '🪑' },
  { id: 'clothing', label: 'Clothing', icon: '👕' },
  { id: 'sports', label: 'Sports & Recreation', icon: '⚽' },
  { id: 'kitchen', label: 'Kitchen & Dining', icon: '🍽️' },
  { id: 'stationery', label: 'Stationery', icon: '✏️' },
  { id: 'other', label: 'Other', icon: '📦' },
];

export const ITEM_CONDITIONS = [
  { value: 'excellent', label: 'Excellent', color: 'success' },
  { value: 'good', label: 'Good', color: 'primary' },
  { value: 'fair', label: 'Fair', color: 'warning' },
  { value: 'poor', label: 'Poor', color: 'error' },
];

export const DEMO_ACCOUNT = {
  email: 'demo@swapam.com',
  password: 'demo123',
  message: 'Use demo@swapam.com / demo123 to try the platform',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  BROWSE: '/browse',
  SEARCH: '/search',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};