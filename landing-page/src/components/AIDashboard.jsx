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
    { id: 'analyze', label: 'AI Analysis', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg> },
    { id: 'impact', label: 'Impact Metrics', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg> },
    { id: 'matching', label: 'Smart Matching', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg> },
    { id: 'trends', label: 'Market Trends', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> },
    { id: 'testing', label: 'API Testing', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" /></svg> }
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
                      <div>Money Saved: ₦{userImpact.economicImpact.moneySaved}</div>
                      <div>Value Created: ₦{userImpact.economicImpact.valueCreated}</div>
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
                  <div className="text-4xl mb-2">
                    <svg className="w-16 h-16 mx-auto text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                  </div>
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