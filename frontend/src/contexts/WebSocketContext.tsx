import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { WebSocketMessage, WebSocketMessageType } from '../types';
import { useAuth } from './AuthContext';
import { useAppDispatch } from '../store';
import { addMessage } from '../store/slices/chatSlice';
import { addNotification } from '../store/slices/notificationsSlice';
import { updateSwapStatus } from '../store/slices/swapsSlice';

interface WebSocketContextType {
  socket: Socket | null;
  connected: boolean;
  send: (message: WebSocketMessage) => void;
  subscribe: (event: string, callback: (data: any) => void) => void;
  unsubscribe: (event: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io(process.env.REACT_APP_WS_URL || 'ws://localhost:3001', {
        auth: {
          token: localStorage.getItem('token'),
        },
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        console.log('WebSocket connected');
        setConnected(true);
        reconnectAttempts.current = 0;
      });

      newSocket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        setConnected(false);
        
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          setTimeout(() => {
            newSocket.connect();
          }, Math.pow(2, reconnectAttempts.current) * 1000);
        }
      });

      // Handle incoming messages
      newSocket.on('message', (data: WebSocketMessage) => {
        switch (data.type) {
          case WebSocketMessageType.CHAT_MESSAGE:
            dispatch(addMessage(data.payload));
            break;
          case WebSocketMessageType.NOTIFICATION:
            dispatch(addNotification(data.payload));
            break;
          case WebSocketMessageType.SWAP_UPDATE:
            dispatch(updateSwapStatus(data.payload));
            break;
          default:
            console.log('Unhandled message type:', data.type);
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
        setConnected(false);
      };
    }
  }, [isAuthenticated, user, dispatch]);

  const send = (message: WebSocketMessage) => {
    if (socket && connected) {
      socket.emit('message', message);
    }
  };

  const subscribe = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const unsubscribe = (event: string) => {
    if (socket) {
      socket.off(event);
    }
  };

  const value: WebSocketContextType = {
    socket,
    connected,
    send,
    subscribe,
    unsubscribe,
  };

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};