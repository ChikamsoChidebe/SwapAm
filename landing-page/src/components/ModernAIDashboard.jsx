import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import AIAnalytics from './AIAnalytics';
import AI3DVisualization from './AI3DVisualization';
import AIItemUpload from './AIItemUpload';
import AIIntegration from './AIIntegration';
import AIEndpointTester from './AIEndpointTester';

export default function ModernAIDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalAnalyses: 1247,
    accuracy: 94.8,
    predictions: 856,
    savings: 15420
  });
  const [isLoading, setIsLoading] = useState(false);
  const [marketTrends, setMarketTrends] = useState(null);
  const [userImpact, setUserImpact] = useState(null);
  const [matches, setMatches] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

  const runAnalysis = async () => {
    setIsLoading(true);
    try {
      const trends = await apiService.getMarketTrends();
      setMarketTrends(trends);
      setAnalysisResults({ status: 'complete', timestamp: new Date() });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePredictions = async () => {
    setIsLoading(true);
    try {
      const impact = await apiService.getUserImpact('demo-user');
      setUserImpact(impact.metrics);
    } catch (error) {
      console.error('Predictions failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportReport = () => {
    const report = {
      stats,
      marketTrends,
      userImpact,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-dashboard-report.json';
    a.click();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg> },
    { id: 'analytics', label: 'Analytics', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> },
    { id: 'predictions', label: 'Predictions', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg> },
    { id: 'insights', label: 'Insights', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" /></svg> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
            AI Intelligence Hub
          </h1>
          <p className="text-purple-200">Advanced analytics and predictions for SwapAm</p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-purple-900 shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stats.totalAnalyses.toLocaleString()}</div>
                  <div className="text-blue-100 text-sm">Total Analyses</div>
                </div>
              </div>
              <div className="w-full bg-blue-400 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-3/4"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stats.accuracy}%</div>
                  <div className="text-green-100 text-sm">Accuracy Rate</div>
                </div>
              </div>
              <div className="w-full bg-green-400 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-5/6"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-8 h-8 text-purple-200" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stats.predictions}</div>
                  <div className="text-purple-100 text-sm">Predictions Made</div>
                </div>
              </div>
              <div className="w-full bg-purple-400 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-2/3"></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-8 h-8 text-orange-200" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>
                <div className="text-right">
                  <div className="text-2xl font-bold">₦{stats.savings.toLocaleString()}</div>
                  <div className="text-orange-100 text-sm">Cost Savings</div>
                </div>
              </div>
              <div className="w-full bg-orange-400 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIItemUpload onItemAnalyzed={setAnalysisResults} />
            <AIIntegration />
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {userImpact && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Impact Predictions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{userImpact.wasteReduced?.weight || 0} kg</div>
                    <div className="text-sm text-green-300">Waste Reduced</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">₦{userImpact.economicImpact?.moneySaved || 0}</div>
                    <div className="text-sm text-blue-300">Money Saved</div>
                  </div>
                </div>
              </div>
            )}
            <AIEndpointTester />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Market Trends</h3>
              {marketTrends ? (
                <pre className="text-green-300 text-sm overflow-auto max-h-64">
                  {JSON.stringify(marketTrends, null, 2)}
                </pre>
              ) : (
                <div className="text-gray-400">Run analysis to see trends</div>
              )}
            </div>
            <AI3DVisualization />
          </div>
        )}

        {/* 3D Visualization Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Real-time Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AIAnalytics />
            <AI3DVisualization />
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={runAnalysis}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50">
            {isLoading ? (
              <div className="w-8 h-8 mb-2 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-8 h-8 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
            )}
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </button>
          
          <button 
            onClick={generatePredictions}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50">
            <svg className="w-8 h-8 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
            Generate Predictions
          </button>
          
          <button 
            onClick={exportReport}
            className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <svg className="w-8 h-8 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}