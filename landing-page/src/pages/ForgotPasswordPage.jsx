import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10 p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <img src="/SWAPAM LOGO.jpg" alt="SwapAm" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-[#2E7D32]">SwapAm</span>
          </button>
          <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      {/* Left Side - Green Section with Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="mb-8">
            <button onClick={() => navigate('/')} className="hover:scale-105 transition-transform">
              <img 
                src="/SWAPAM LOGO.jpg" 
                alt="SwapAm Logo" 
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Reset Password</h1>
            <p className="text-xl opacity-90 mb-6">Secure account recovery</p>
            <p className="text-lg opacity-75 max-w-md">We'll help you get back into your SwapAm account safely and securely.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <svg width="48" height="48" className="mx-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-600">Please enter your email to reset the password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@student.unilag.edu.ng" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#fdd835] hover:bg-[#f9c74f] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Reset Password
            </button>

            <div className="text-center">
              <a href="/login" className="text-sm text-[#2E7D32] hover:underline font-medium flex items-center justify-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;