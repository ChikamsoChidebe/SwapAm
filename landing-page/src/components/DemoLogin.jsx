import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DemoLogin() {
  const navigate = useNavigate();
  
  let demoLogin;
  try {
    const auth = useAuth();
    demoLogin = auth?.demoLogin;
  } catch (error) {
    // AuthProvider not available, render nothing
    return null;
  }

  const handleDemoLogin = async () => {
    if (!demoLogin) return;
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-gradient-to-br from-[#137C5C] to-[#0f5132] rounded-xl p-3 shadow-xl border border-white/20">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDemoLogin}
            className="bg-white/90 text-[#137C5C] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-white transition-all flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Demo
          </button>
          <button
            onClick={() => navigate('/ai-dashboard')}
            className="bg-white/90 text-purple-600 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-white transition-all flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            AI
          </button>
        </div>
      </div>
    </div>
  );
}