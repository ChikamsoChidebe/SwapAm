import React from 'react';

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-xl' },
    lg: { width: 50, height: 50, text: 'text-2xl' },
    xl: { width: 60, height: 60, text: 'text-3xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <img 
          src="/SWAPAM LOGO.jpg" 
          alt="SwapAm Logo" 
          width={currentSize.width} 
          height={currentSize.height}
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <span className={`font-bold text-[#2E7D32] ${currentSize.text}`}>
          SwapAm
        </span>
        <div className="text-xs text-gray-600 font-medium leading-none">
          Campus Economy
        </div>
      </div>
    </div>
  );
};

export default Logo;