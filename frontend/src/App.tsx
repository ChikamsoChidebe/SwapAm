import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Store
import { store } from './store';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

// Components
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Pages - Lazy loaded for code splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const VerifyEmailPage = React.lazy(() => import('./pages/auth/VerifyEmailPage'));

const BrowsePage = React.lazy(() => import('./pages/items/BrowsePage'));
const ItemDetailsPage = React.lazy(() => import('./pages/items/ItemDetailsPage'));
const UploadItemPage = React.lazy(() => import('./pages/items/UploadItemPage'));
const EditItemPage = React.lazy(() => import('./pages/items/EditItemPage'));
const MyItemsPage = React.lazy(() => import('./pages/items/MyItemsPage'));

const SwapsPage = React.lazy(() => import('./pages/swaps/SwapsPage'));
const SwapDetailsPage = React.lazy(() => import('./pages/swaps/SwapDetailsPage'));
const CreateSwapPage = React.lazy(() => import('./pages/swaps/CreateSwapPage'));

const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));
const ChatRoomPage = React.lazy(() => import('./pages/chat/ChatRoomPage'));

const ProfilePage = React.lazy(() => import('./pages/profile/ProfilePage'));
const EditProfilePage = React.lazy(() => import('./pages/profile/EditProfilePage'));
const UserProfilePage = React.lazy(() => import('./pages/profile/UserProfilePage'));
const SettingsPage = React.lazy(() => import('./pages/profile/SettingsPage'));

const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const SustainabilityPage = React.lazy(() => import('./pages/SustainabilityPage'));
const HelpPage = React.lazy(() => import('./pages/HelpPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));

const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminItemsPage = React.lazy(() => import('./pages/admin/AdminItemsPage'));
const AdminSwapsPage = React.lazy(() => import('./pages/admin/AdminSwapsPage'));
const AdminReportsPage = React.lazy(() => import('./pages/admin/AdminReportsPage'));
const AdminAnalyticsPage = React.lazy(() => import('./pages/admin/AdminAnalyticsPage'));

const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Create MUI theme
const createAppTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#00C853',
      light: '#5EFC82',
      dark: '#009624',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6D00',
      light: '#FF9E40',
      dark: '#C43E00',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: mode === 'light' ? '#F8F9FA' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#212121' : '#FFFFFF',
      secondary: mode === 'light' ? '#757575' : '#AAAAAA',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 200, 83, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #009624 0%, #388E3C 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 2px 12px rgba(0, 0, 0, 0.08)' 
            : '0 2px 12px rgba(255, 255, 255, 0.05)',
          '&:hover': {
            boxShadow: mode === 'light' 
              ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
              : '0 8px 24px rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
  },
});

// Global styles
const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        height: '100%',
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        lineHeight: 1.6,
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
      },
      '#root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      a: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
      },
      '.loading-screen': {
        display: 'none',
      },
      // Custom scrollbar
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: theme.palette.mode === 'light' ? '#f1f1f1' : '#2b2b2b',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'light' ? '#c1c1c1' : '#555',
        borderRadius: '4px',
        '&:hover': {
          background: theme.palette.mode === 'light' ? '#a8a8a8' : '#777',
        },
      },
      // Animation classes
      '.fade-in': {
        animation: 'fadeIn 0.3s ease-in-out',
      },
      '.slide-up': {
        animation: 'slideUp 0.3s ease-out',
      },
      '.scale-in': {
        animation: 'scaleIn 0.2s ease-out',
      },
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      '@keyframes slideUp': {
        from: { 
          opacity: 0,
          transform: 'translateY(20px)',
        },
        to: { 
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      '@keyframes scaleIn': {
        from: { 
          opacity: 0,
          transform: 'scale(0.9)',
        },
        to: { 
          opacity: 1,
          transform: 'scale(1)',
        },
      },
      // Utility classes
      '.text-gradient': {
        background: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
      '.glass-effect': {
        background: theme.palette.mode === 'light' 
          ? 'rgba(255, 255, 255, 0.8)' 
          : 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'light' 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'rgba(255, 255, 255, 0.1)'}`,
      },
    })}
  />
);

const App: React.FC = () => {
  useEffect(() => {
    // Remove loading screen after app loads
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.remove();
      }, 1000);
    }

    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Performance monitoring
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
              {({ theme }) => (
                <ThemeProvider theme={createAppTheme(theme)}>
                  <CssBaseline />
                  {globalStyles}
                  <AuthProvider>
                    <WebSocketProvider>
                      <NotificationProvider>
                        <Router>
                          <div className="App">
                            <Suspense fallback={<LoadingScreen />}>
                              <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Layout />}>
                                  <Route index element={<HomePage />} />
                                  <Route path="about" element={<AboutPage />} />
                                  <Route path="contact" element={<ContactPage />} />
                                  <Route path="sustainability" element={<SustainabilityPage />} />
                                  <Route path="help" element={<HelpPage />} />
                                  <Route path="privacy" element={<PrivacyPage />} />
                                  <Route path="terms" element={<TermsPage />} />
                                  <Route path="categories" element={<CategoriesPage />} />
                                  <Route path="search" element={<SearchPage />} />
                                  <Route path="items/:id" element={<ItemDetailsPage />} />
                                  <Route path="users/:id" element={<UserProfilePage />} />
                                  <Route path="browse" element={<BrowsePage />} />
                                </Route>

                                {/* Auth Routes - Only accessible when not authenticated */}
                                <Route element={<PublicRoute />}>
                                  <Route path="/login" element={<LoginPage />} />
                                  <Route path="/register" element={<RegisterPage />} />
                                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                                </Route>

                                {/* Protected Routes - Only accessible when authenticated */}
                                <Route element={<ProtectedRoute />}>
                                  {/* Redirect shortcuts */}
                                  <Route path="/upload" element={<Navigate to="/dashboard/upload" replace />} />
                                  <Route path="/my-items" element={<Navigate to="/dashboard/my-items" replace />} />
                                  <Route path="/swaps" element={<Navigate to="/dashboard/swaps" replace />} />
                                  <Route path="/chat" element={<Navigate to="/dashboard/chat" replace />} />
                                  <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
                                  
                                  <Route path="/dashboard" element={<Layout />}>
                                    <Route index element={<Navigate to="profile" replace />} />
                                    
                                    {/* Profile Routes */}
                                    <Route path="profile" element={<ProfilePage />} />
                                    <Route path="profile/edit" element={<EditProfilePage />} />
                                    <Route path="settings" element={<SettingsPage />} />
                                    
                                    {/* Item Management Routes */}
                                    <Route path="upload" element={<UploadItemPage />} />
                                    <Route path="my-items" element={<MyItemsPage />} />
                                    <Route path="items/:id/edit" element={<EditItemPage />} />
                                    
                                    {/* Swap Routes */}
                                    <Route path="swaps" element={<SwapsPage />} />
                                    <Route path="swaps/:id" element={<SwapDetailsPage />} />
                                    <Route path="swaps/create" element={<CreateSwapPage />} />
                                    
                                    {/* Chat Routes */}
                                    <Route path="chat" element={<ChatPage />} />
                                    <Route path="chat/:roomId" element={<ChatRoomPage />} />
                                    
                                    {/* Notifications */}
                                    <Route path="notifications" element={<NotificationsPage />} />
                                  </Route>
                                </Route>

                                {/* Admin Routes - Only accessible by admins */}
                                <Route element={<ProtectedRoute requiredRole="admin" />}>
                                  <Route path="/admin" element={<Layout />}>
                                    <Route index element={<AdminDashboard />} />
                                    <Route path="users" element={<AdminUsersPage />} />
                                    <Route path="items" element={<AdminItemsPage />} />
                                    <Route path="swaps" element={<AdminSwapsPage />} />
                                    <Route path="reports" element={<AdminReportsPage />} />
                                    <Route path="analytics" element={<AdminAnalyticsPage />} />
                                  </Route>
                                </Route>

                                {/* 404 Route */}
                                <Route path="*" element={<NotFoundPage />} />
                              </Routes>
                            </Suspense>
                          </div>
                        </Router>
                      </NotificationProvider>
                    </WebSocketProvider>
                  </AuthProvider>
                  
                  {/* Toast Notifications */}
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                      className: '',
                      duration: 4000,
                      style: {
                        background: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#212121',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        border: `1px solid ${theme === 'dark' ? '#333' : '#E0E0E0'}`,
                      },
                      success: {
                        iconTheme: {
                          primary: '#4CAF50',
                          secondary: '#FFFFFF',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#F44336',
                          secondary: '#FFFFFF',
                        },
                      },
                    }}
                  />
                </ThemeProvider>
              )}
            </ThemeContextProvider>
            
            {/* React Query Devtools - Only in development */}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;