import React from 'react';

const DemoBanner = () => {
  const token = localStorage.getItem('token');
  
  if (token !== 'demo-token-123') return null;

  return (
    <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white px-3 py-1 text-center text-xs">
      <span className="font-medium">🚀 Demo Mode</span>
      <span className="ml-1 opacity-90">Sample data</span>
    </div>
  );
};

export default DemoBanner;