import React, { useState, useEffect } from 'react';

export default function AIAnalytics() {
  const [metrics, setMetrics] = useState({
    realTimeUsers: 1247,
    predictions: 856,
    accuracy: 94.8,
    processing: 23
  });

  return (
    <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Real-time Analytics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{metrics.realTimeUsers}</div>
          <div className="text-sm text-gray-300">Active Users</div>
          <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
            <div className="bg-blue-400 h-1 rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{metrics.predictions}</div>
          <div className="text-sm text-gray-300">Predictions</div>
          <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
            <div className="bg-green-400 h-1 rounded-full w-5/6 animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{metrics.accuracy}%</div>
          <div className="text-sm text-gray-300">Accuracy</div>
          <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
            <div className="bg-purple-400 h-1 rounded-full w-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{metrics.processing}</div>
          <div className="text-sm text-gray-300">Processing</div>
          <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
            <div className="bg-orange-400 h-1 rounded-full w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}