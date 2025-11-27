import React from 'react';

const DemoBanner = () => {
  const token = localStorage.getItem('token');
  
  if (token !== 'demo-token-123') return null;

  return (
    <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white px-4 py-2 text-center text-sm">
      <span className="font-medium">🚀 Demo Mode Active</span>
      <span className="ml-2 opacity-90">You're using a demo account with sample data</span>
    </div>
  );
};

export default DemoBanner;