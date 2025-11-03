import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';
import { useAppDispatch, useAppSelector } from '../store';
import { login as loginAction, logout as logoutAction, setUser } from '../store/slices/authSlice';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector(state => state.auth);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const isDemo = localStorage.getItem('isDemo');
      
      if (token) {
        try {
          if (isDemo === 'true') {
            // Mock demo user
            const mockUser = {
              id: 'demo-user-1',
              email: 'demo@swapam.com',
              firstName: 'Demo',
              lastName: 'User',
              username: 'demouser',
              avatar: null,
              campus: 'University of Lagos',
              department: 'Computer Science',
              year: 3,
              points: 1250,
              rating: 4.8,
              totalSwaps: 15,
              joinedAt: new Date('2024-01-15'),
              isVerified: true,
              preferences: {
                notifications: {
                  email: true,
                  push: true,
                  sms: false,
                  swapUpdates: true,
                  newMatches: true,
                  promotions: false,
                  sustainability: true,
                },
                privacy: {
                  showProfile: true,
                  showLocation: true,
                  showRating: true,
                  allowMessages: true,
                },
                categories: ['Electronics', 'Books', 'Clothing'],
                maxDistance: 10,
                language: 'en',
                theme: 'light' as const,
              },
              location: {
                name: 'Akoka, Lagos',
                address: 'University of Lagos, Akoka',
                city: 'Lagos',
                state: 'Lagos',
                country: 'Nigeria',
                zipCode: '101017',
                coordinates: {
                  latitude: 6.5158,
                  longitude: 3.3894,
                },
                campus: 'University of Lagos',
              },
              badges: [],
              sustainabilityScore: 85,
              role: 'student' as const,
            };
            dispatch(setUser(mockUser));
          } else {
            const response = await authAPI.getProfile();
            dispatch(setUser(response.data));
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('isDemo');
          dispatch(setUser(null));
        }
      }
      setInitialLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    await dispatch(loginAction({ email, password, rememberMe })).unwrap();
  };

  const register = async (userData: any) => {
    const response = await authAPI.register(userData);
    dispatch(setUser(response.data.user));
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  };

  const logout = async () => {
    try {
      const isDemo = localStorage.getItem('isDemo');
      if (isDemo !== 'true') {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isDemo');
      dispatch(setUser(null));
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    const response = await authAPI.updateProfile(data);
    dispatch(setUser(response.data));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading: loading || initialLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};