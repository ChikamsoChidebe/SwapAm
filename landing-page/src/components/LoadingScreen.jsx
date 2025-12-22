import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#137C5C] via-[#0f5132] to-[#0b3d2e] flex items-center justify-center z-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#fdd835]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/3 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            {/* Logo Background Circle */}
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-white/30 rounded-full animate-pulse"></div>
            
            {/* Logo */}
            <img 
              src="/SWAPAM LOGO.jpg" 
              alt="SwapAm Logo" 
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/50 shadow-2xl"
            />
            
            {/* Rotating Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-white/60 rounded-full animate-spin"></div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
            SwapAm
          </h1>
          <p className="text-white/80 text-lg font-medium">
            Campus Exchange Platform
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* Loading Text */}
        <p className="text-white/70 text-sm font-medium animate-pulse">
          Loading your sustainable journey...
        </p>

        {/* Progress Bar */}
        <div className="mt-6 w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-white to-[#fdd835] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-white/50 text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
          </svg>
          <span>Connecting students, reducing waste</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;