import React, { createContext, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useWebSocket } from './WebSocketContext';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchNotifications } from '../store/slices/notificationsSlice';

interface NotificationContextType {
  requestPermission: () => Promise<NotificationPermission>;
  showNotification: (title: string, options?: NotificationOptions) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connected } = useWebSocket();
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector(state => state.notifications);

  useEffect(() => {
    if (connected) {
      dispatch(fetchNotifications());
    }
  }, [connected, dispatch]);

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    const permission = await Notification.requestPermission();
    return permission;
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/logo192.png',
        badge: '/logo192.png',
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  const value: NotificationContextType = {
    requestPermission,
    showNotification,
    showToast,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};