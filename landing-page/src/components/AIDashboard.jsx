import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import AIItemUpload from './AIItemUpload';
import AIIntegration from './AIIntegration';
import AIEndpointTester from './AIEndpointTester';

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [marketTrends, setMarketTrends] = useState(null);
  const [userImpact, setUserImpact] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadMarketTrends();
    loadUserImpact();
  }, []);

  const loadMarketTrends = async () => {
    try {
      const trends = await apiService.getMarketTrends();
      setMarketTrends(trends);
    } catch (error) {
      console.error('Failed to load market trends:', error);
    }
  };

  const loadUserImpact = async () => {
    try {
      const impact = await apiService.getUserImpact('demo-user');
      setUserImpact(impact.metrics);
    } catch (error) {
      console.error('Failed to load user impact:', error);
    }
  };

  const findAIMatches = async () => {
    try {
      const preferences = {
        userPreferences: {
          categories: ['Electronics', 'Books'],
          priceRange: [0, 500],
          condition: ['good', 'like-new'],
          location: 'Campus',
          radius: 10
        },
        itemWanted: {
          keywords: ['laptop', 'textbook'],
          category: 'Electronics',
          maxPrice: 400
        }
      };

      const result = await apiService.findAIMatches(preferences);
      setMatches(result.matches || []);
    } catch (error) {
      console.error('AI matching failed:', error);
    }
  };

  const tabs = [
    { id: 'analyze', label: 'AI Analysis', icon: '🔍' },
    { id: 'impact', label: 'Impact Metrics', icon: '🌱' },
    { id: 'matching', label: 'Smart Matching', icon: '🎯' },
    { id: 'trends', label: 'Market Trends', icon: '📈' },
    { id: 'testing', label: 'API Testing', icon: '🧪' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI-Powered SwapAm Dashboard</h1>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'analyze' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIItemUpload onItemAnalyzed={(data) => console.log('Item analyzed:', data)} />
            <AIIntegration />
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userImpact && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-4">Your Environmental Impact</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded">
                    <h4 className="font-medium text-green-800">Waste Reduced</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>Weight: {userImpact.wasteReduced.weight} kg</div>
                      <div>CO₂ Saved: {userImpact.wasteReduced.co2Saved} kg</div>
                      <div>Water Saved: {userImpact.wasteReduced.waterSaved} L</div>
                      <div>Energy Saved: {userImpact.wasteReduced.energySaved} kWh</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded">
                    <h4 className="font-medium text-blue-800">Economic Impact</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>Money Saved: ${userImpact.economicImpact.moneySaved}</div>
                      <div>Value Created: ${userImpact.economicImpact.valueCreated}</div>
                      <div>Transactions: {userImpact.economicImpact.transactionCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Impact Visualization</h3>
              <div className="space-y-4">
                <div className="text-center p-8 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg">
                  <div className="text-4xl mb-2">🌍</div>
                  <div className="text-lg font-bold text-green-700">
                    Making a Difference
                  </div>
                  <div className="text-sm text-gray-600">
                    Every swap contributes to a sustainable future
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matching' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">AI-Powered Matching</h3>
                <button
                  onClick={findAIMatches}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Find AI Matches
                </button>
              </div>
              
              {matches.length > 0 && (
                <div className="space-y-3">
                  {matches.map((match, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">Item ID: {match.itemId}</div>
                          <div className="text-sm text-gray-600">
                            Distance: {match.distance || 'N/A'} km
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {match.score}% Match
                          </div>
                        </div>
                      </div>
                      
                      {match.reasons && match.reasons.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">Match Reasons:</div>
                          <div className="flex flex-wrap gap-1">
                            {match.reasons.map((reason, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Market Trends Analysis</h3>
            {marketTrends ? (
              <div className="text-gray-600">
                <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(marketTrends, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Loading market trends...
              </div>
            )}
          </div>
        )}

        {activeTab === 'testing' && (
          <AIEndpointTester />
        )}
      </div>
    </div>
  );
}