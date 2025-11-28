import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function BackendStatus() {
  const [backendInfo, setBackendInfo] = useState(null);
  const [isHealthy, setIsHealthy] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      const info = apiService.getBackendInfo();
      const healthy = await apiService.healthCheck();
      setBackendInfo(info);
      setIsHealthy(healthy);
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!backendInfo) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${
        isHealthy 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isHealthy ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span>{backendInfo.current} Backend</span>
          <span className={isHealthy ? 'text-green-600' : 'text-red-600'}>
            {isHealthy ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
}