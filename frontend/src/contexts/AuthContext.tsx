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
      if (token) {
        try {
          const response = await authAPI.getProfile();
          dispatch(setUser(response.data));
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
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
    await dispatch(logoutAction()).unwrap();
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