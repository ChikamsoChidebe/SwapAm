import React, { useState } from 'react';
import apiService from '../services/api';

export default function AIEndpointTester() {
  const [results, setResults] = useState({});
  const [testing, setTesting] = useState(false);

  const testEndpoint = async (name, testFn) => {
    setResults(prev => ({ ...prev, [name]: { status: 'testing' } }));
    
    try {
      const result = await testFn();
      setResults(prev => ({ 
        ...prev, 
        [name]: { status: 'success', data: result, time: new Date().toLocaleTimeString() }
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [name]: { status: 'error', error: error.message, time: new Date().toLocaleTimeString() }
      }));
    }
  };

  const runAllTests = async () => {
    setTesting(true);
    setResults({});

    const tests = [
      {
        name: 'AI Health Check',
        test: () => apiService.aiHealthCheck()
      },
      {
        name: 'Platform Impact',
        test: () => apiService.getPlatformImpact()
      },
      {
        name: 'User Impact',
        test: () => apiService.getUserImpact('demo-user')
      },
      {
        name: 'Market Trends',
        test: () => apiService.getMarketTrends()
      },
      {
        name: 'AI Recommendations',
        test: () => apiService.getAIRecommendations('demo-user')
      },
      {
        name: 'Item Valuation',
        test: () => apiService.valuateItem({
          item: {
            category: 'Electronics',
            condition: 'good',
            originalPrice: 500,
            age: 12,
            brand: 'Apple',
            description: 'Test item',
            images: []
          },
          market: {
            demandScore: 80,
            supplyCount: 15,
            avgPrice: 400,
            recentSales: [380, 420, 390]
          }
        })
      },
      {
        name: 'AI Matching',
        test: () => apiService.findAIMatches({
          userPreferences: {
            categories: ['Electronics'],
            priceRange: [0, 500],
            condition: ['good'],
            location: 'Campus',
            radius: 10
          },
          itemWanted: {
            keywords: ['laptop'],
            category: 'Electronics',
            maxPrice: 400
          }
        })
      }
    ];

    for (const { name, test } of tests) {
      await testEndpoint(name, test);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
    }

    setTesting(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'testing': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">AI Endpoint Tester</h3>
        <button
          onClick={runAllTests}
          disabled={testing}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test All Endpoints'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(results).map(([name, result]) => (
          <div key={name} className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{name}</h4>
              <span className="text-lg">{getStatusIcon(result.status)}</span>
            </div>
            
            <div className="text-sm">
              <div>Status: {result.status}</div>
              {result.time && <div>Time: {result.time}</div>}
              
              {result.error && (
                <div className="mt-2 p-2 bg-red-50 rounded text-red-700 text-xs">
                  {result.error}
                </div>
              )}
              
              {result.data && (
                <div className="mt-2">
                  <details className="cursor-pointer">
                    <summary className="text-xs font-medium">View Response</summary>
                    <pre className="mt-1 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-32">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(results).length === 0 && !testing && (
        <div className="text-center py-8 text-gray-500">
          Click "Test All Endpoints" to start testing AI services
        </div>
      )}
    </div>
  );
}