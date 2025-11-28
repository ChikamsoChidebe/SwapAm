import React from 'react';

export default function AI3DVisualization() {
  return (
    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-white/20">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        AI Insights
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white">High demand for electronics detected</span>
          </div>
          <div className="mt-2 text-xs text-green-300">Confidence: 94%</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-white">Price optimization recommended</span>
          </div>
          <div className="mt-2 text-xs text-yellow-300">Potential savings: 15%</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white">New matching algorithm deployed</span>
          </div>
          <div className="mt-2 text-xs text-blue-300">Accuracy improved by 8%</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-white">Trend analysis complete</span>
          </div>
          <div className="mt-2 text-xs text-purple-300">Next update in 2 hours</div>
        </div>
      </div>
    </div>
  );
}