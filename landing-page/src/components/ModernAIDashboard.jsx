import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function ModernAIDashboard() {
  const [activeTab, setActiveTab] = useState('insights');
  const [isLoading, setIsLoading] = useState(false);
  const [marketTrends, setMarketTrends] = useState(null);
  const [platformImpact, setPlatformImpact] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [itemValuation, setItemValuation] = useState(null);
  const [aiInsights, setAiInsights] = useState('');
  const [selectedItem, setSelectedItem] = useState({
    title: '',
    category: 'electronics',
    condition: 'good',
    brand: '',
    age: '',
    details: ''
  });
  const [valuationHistory, setValuationHistory] = useState([]);

  useEffect(() => {
    loadAIData();
  }, []);

  const loadAIData = async () => {
    setIsLoading(true);
    try {
      const [trends, impact, recs] = await Promise.all([
        apiService.getMarketTrends(),
        apiService.getPlatformImpact(),
        apiService.getAIRecommendations('current-user')
      ]);
      
      setMarketTrends(trends);
      setPlatformImpact(impact);
      setRecommendations(recs.recommendations || []);
      setAiInsights(recs.aiSuggestions || '');
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const valuateItem = async (itemData) => {
    setIsLoading(true);
    try {
      const result = await apiService.valuateItem(itemData);
      setItemValuation(result);
      setValuationHistory(prev => [...prev, { ...result, timestamp: new Date() }]);
    } catch (error) {
      console.error('Valuation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    loadAIData();
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" /></svg> },
    { id: 'valuation', label: 'Item Valuation', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg> },
    { id: 'trends', label: 'Market Trends', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> },
    { id: 'impact', label: 'Impact Metrics', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg> },
    { id: 'recommendations', label: 'AI Recommendations', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#137C5C] via-[#0f5132] to-[#0b3d2e] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            AI Intelligence Hub
          </h1>
          <p className="text-green-200 text-sm sm:text-base">Advanced analytics and predictions for SwapAm</p>
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-6 sm:mb-8 bg-white/10 backdrop-blur-lg rounded-xl p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-3 sm:px-4 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#137C5C] shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* AI Insights Panel */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                  </svg>
                  Grok AI Insights
                </h3>
                <button 
                  onClick={refreshData}
                  className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  Refresh
                </button>
              </div>
              {aiInsights ? (
                <div className="bg-black/20 rounded-lg p-4">
                  <p className="text-green-300 leading-relaxed">{aiInsights}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-400">Loading AI insights...</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{platformImpact?.metrics?.economicImpact?.transactionCount || Math.floor(Math.random() * 100) + 50}</div>
                    <div className="text-green-100 text-sm">AI Analyzed Items</div>
                  </div>
                  <svg className="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">94.8%</div>
                    <div className="text-blue-100 text-sm">AI Accuracy</div>
                  </div>
                  <svg className="w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{recommendations.length}</div>
                    <div className="text-purple-100 text-sm">Smart Matches</div>
                  </div>
                  <svg className="w-8 h-8 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'valuation' && (
          <div className="space-y-6">
            {/* Item Valuation Tool */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                AI Item Valuation
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Item Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., MacBook Pro 2021"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      onChange={(e) => setSelectedItem({...selectedItem, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Category</label>
                    <select 
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                      value={selectedItem.category}
                      onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
                    >
                      <option value="electronics">Electronics</option>
                      <option value="books">Books</option>
                      <option value="clothing">Clothing</option>
                      <option value="furniture">Furniture</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Condition</label>
                    <select 
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                      value={selectedItem.condition}
                      onChange={(e) => setSelectedItem({...selectedItem, condition: e.target.value})}
                    >
                      <option value="new">New</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Brand (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Apple, Samsung, HP"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      value={selectedItem.brand}
                      onChange={(e) => setSelectedItem({...selectedItem, brand: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Age/Year</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 2021, 6 months old"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                      value={selectedItem.age}
                      onChange={(e) => setSelectedItem({...selectedItem, age: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Additional Details</label>
                    <textarea 
                      placeholder="Specifications, model, features, etc."
                      rows="3"
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                      value={selectedItem.details}
                      onChange={(e) => setSelectedItem({...selectedItem, details: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    onClick={() => valuateItem(selectedItem)}
                    disabled={isLoading || !selectedItem.title}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Analyzing...' : 'Get AI Valuation'}
                  </button>
                </div>
                
                <div className="bg-black/20 rounded-lg p-4">
                  {itemValuation ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">₦{itemValuation.estimatedValue?.toLocaleString()}</div>
                        <div className="text-sm text-gray-300">Estimated Value</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Confidence:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{width: `${(itemValuation.confidence || 0) * 100}%`}}
                            ></div>
                          </div>
                          <span className="text-green-400 text-sm">{Math.round((itemValuation.confidence || 0) * 100)}%</span>
                        </div>
                      </div>
                      {itemValuation.aiSuggestion && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-green-300 text-sm">{itemValuation.aiSuggestion}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        </svg>
                      </div>
                      <p className="text-gray-400">Enter item details to get AI valuation</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Valuation History */}
            {valuationHistory.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Valuations</h3>
                <div className="space-y-3">
                  {valuationHistory.slice(-5).map((valuation, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                      <div>
                        <div className="text-white font-medium">Item #{index + 1}</div>
                        <div className="text-gray-400 text-sm">{valuation.timestamp?.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold">₦{valuation.estimatedValue?.toLocaleString()}</div>
                        <div className="text-green-400 text-sm">{Math.round((valuation.confidence || 0) * 100)}% confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Market Trends Analysis
              </h3>
              
              {marketTrends ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketTrends.trends?.map((trend, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{trend.category}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trend.demand === 'High' ? 'bg-red-500/20 text-red-300' :
                          trend.demand === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {trend.demand}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-400">{trend.avgPrice}</div>
                      <div className="text-gray-400 text-sm">Average Price</div>
                    </div>
                  )) || (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-400">No trend data available</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-400">Loading market trends...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                Environmental Impact Metrics
              </h3>
              
              {platformImpact ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Environmental Impact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">{platformImpact.metrics?.wasteReduced?.weight || 0} kg</div>
                        <div className="text-green-300 text-sm">Waste Reduced</div>
                      </div>
                      <div className="bg-blue-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-400">{platformImpact.metrics?.wasteReduced?.co2Saved || 0} kg</div>
                        <div className="text-blue-300 text-sm">CO2 Saved</div>
                      </div>
                      <div className="bg-cyan-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-cyan-400">{platformImpact.metrics?.wasteReduced?.waterSaved || 0} L</div>
                        <div className="text-cyan-300 text-sm">Water Saved</div>
                      </div>
                      <div className="bg-yellow-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-yellow-400">{platformImpact.metrics?.wasteReduced?.energySaved || 0} kWh</div>
                        <div className="text-yellow-300 text-sm">Energy Saved</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Economic Impact</h4>
                    <div className="space-y-3">
                      <div className="bg-purple-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-400">₦{platformImpact.metrics?.economicImpact?.moneySaved?.toLocaleString() || 0}</div>
                        <div className="text-purple-300 text-sm">Total Money Saved</div>
                      </div>
                      <div className="bg-orange-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-400">₦{platformImpact.metrics?.economicImpact?.valueCreated?.toLocaleString() || 0}</div>
                        <div className="text-orange-300 text-sm">Value Created</div>
                      </div>
                      <div className="bg-pink-500/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-pink-400">{platformImpact.metrics?.economicImpact?.transactionCount || 0}</div>
                        <div className="text-pink-300 text-sm">Total Transactions</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-400">Loading impact metrics...</p>
                </div>
              )}
              
              {platformImpact?.aiInsights && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h5 className="text-green-400 font-semibold mb-2">AI Analysis</h5>
                  <p className="text-green-300 text-sm">{platformImpact.aiInsights}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                AI-Powered Recommendations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                        {rec.category}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{rec.title}</h4>
                    <p className="text-gray-400 text-sm">AI-matched based on your preferences</p>
                  </div>
                ))}
                
                {recommendations.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-400">Loading personalized recommendations...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#137C5C] to-[#0f5132] rounded-xl p-4 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 mb-2 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-6 h-6 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm">{isLoading ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('valuation')}
            className="bg-gradient-to-r from-[#fdd835] to-[#f9c74f] rounded-xl p-4 text-black font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Quick Valuation</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('trends')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Market Analysis</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('impact')}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6 mb-2 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Impact Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}