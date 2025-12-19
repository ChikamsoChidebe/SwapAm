import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import supabaseService from '../services/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (token === 'demo-token-123') {
        // Handle demo mode
        const demoUserData = localStorage.getItem('user');
        if (demoUserData) {
          setUser(JSON.parse(demoUserData));
        }
        setLoading(false);
      } else {
        // Check if using Supabase
        checkSupabaseAuth();
      }
    } else {
      // Check Supabase session on app start
      checkSupabaseAuth();
    }
  }, []);

  const checkSupabaseAuth = async () => {
    try {
      const currentUser = await supabaseService.getCurrentUser();
      if (currentUser) {
        const profile = await supabaseService.getProfile(currentUser.id);
        setUser({
          id: currentUser.id,
          firstName: profile?.first_name || currentUser.user_metadata?.first_name || 'User',
          lastName: profile?.last_name || currentUser.user_metadata?.last_name || '',
          email: currentUser.email,
          university: profile?.university,
          campusPoints: profile?.campus_points || 0,
          totalSwaps: profile?.total_swaps || 0
        });
      }
    } catch (error) {
      console.error('Supabase auth check failed:', error);
      // Fallback to traditional token check
      const token = localStorage.getItem('token');
      if (token && token !== 'demo-token-123') {
        apiService.setToken(token);
        loadUser();
      }
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const userData = await apiService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await apiService.login(email, password);
    apiService.setToken(response.token);
    setUser(response.user);
    return response;
  };

  const demoLogin = async () => {
    // Sign out from Supabase first
    try {
      await supabaseService.signOut();
    } catch (error) {
      console.log('No Supabase session to sign out');
    }
    
    // Create demo user data
    const demoUser = {
      id: 'demo-user',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@university.edu',
      university: 'Demo University',
      avatar: '',
      rating: 4.5,
      totalSwaps: 15,
      campusPoints: 250
    };
    
    const demoToken = 'demo-token-123';
    
    // Store in localStorage
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    
    // Set in API service
    apiService.setToken(demoToken);
    setUser(demoUser);
    
    return { token: demoToken, user: demoUser };
  };

  const register = async (userData) => {
    const response = await apiService.register(userData);
    if (response.token) {
      apiService.setToken(response.token);
      setUser(response.user);
    }
    return response;
  };

  const verifyEmail = async (userId, code) => {
    const response = await apiService.verifyEmail(userId, code);
    apiService.setToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    const token = localStorage.getItem('token');
    if (token === 'demo-token-123') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } else {
      // Sign out from Supabase
      supabaseService.signOut().catch(console.error);
      apiService.removeToken();
    }
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    loading,
    login,
    demoLogin,
    register,
    verifyEmail,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};