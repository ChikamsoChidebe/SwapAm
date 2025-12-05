import React, { useState } from 'react';
import apiService from '../services/api';

export default function ApiTester() {
  const [results, setResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const addResult = (test, success, data, error) => {
    setResults(prev => [...prev, {
      test,
      success,
      data: success ? data : null,
      error: success ? null : error,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testEndpoints = async () => {
    setTesting(true);
    setResults([]);

    const tests = [
      {
        name: 'Health Check',
        test: () => apiService.healthCheck()
      },
      {
        name: 'Get Categories',
        test: () => apiService.getCategories()
      },
      {
        name: 'Get Items',
        test: () => apiService.getItems({ page: 1, limit: 5 })
      },
      {
        name: 'Register User',
        test: () => apiService.register({
          firstName: 'Test',
          lastName: 'User',
          email: `test${Date.now()}@university.edu`,
          password: 'password123',
          university: 'Test University'
        })
      }
    ];

    for (const { name, test } of tests) {
      try {
        const result = await test();
        addResult(name, true, result);
      } catch (error) {
        addResult(name, false, null, error.message);
      }
    }

    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#137C5C] via-[#0f5132] to-[#0b3d2e] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Testing Dashboard</h1>
          <p className="text-green-100 text-lg">Test SwapAm backend endpoints and monitor system health</p>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Endpoint Tests</h2>
            <button
              onClick={testEndpoints}
              disabled={testing}
              className="bg-gradient-to-r from-[#137C5C] to-[#0f5132] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              {testing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Testing...
                </div>
              ) : (
                'Run All Tests'
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((result, index) => (
              <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                result.success 
                  ? 'bg-green-50 border-green-200 hover:border-green-300' 
                  : 'bg-red-50 border-red-200 hover:border-red-300'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{result.test}</h3>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    result.success ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {result.success ? (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Time:</span> {result.timestamp}
                </div>
                
                {result.error && (
                  <div className="bg-red-100 border border-red-200 rounded-lg p-3 mt-3">
                    <p className="text-red-800 text-sm font-medium">Error:</p>
                    <p className="text-red-700 text-sm mt-1">{result.error}</p>
                  </div>
                )}
                
                {result.success && result.data && (
                  <div className="bg-green-100 border border-green-200 rounded-lg p-3 mt-3">
                    <p className="text-green-800 text-sm font-medium">Success</p>
                    <p className="text-green-700 text-xs mt-1">Response received</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {results.length === 0 && !testing && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Click "Run All Tests" to start testing endpoints</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}