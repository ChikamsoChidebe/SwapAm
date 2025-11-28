import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DemoLogin() {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-lg">
        <div className="text-sm font-medium text-yellow-800 mb-2">
          Quick Demo Access
        </div>
        <div className="space-y-2">
          <button
            onClick={handleDemoLogin}
            className="w-full bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Demo Login
          </button>
          <button
            onClick={() => navigate('/ai-dashboard')}
            className="w-full bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
          >
            AI Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}