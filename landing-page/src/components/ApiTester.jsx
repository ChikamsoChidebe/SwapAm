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
    <div className="fixed top-20 left-4 bg-white p-4 rounded-lg shadow-lg max-w-md z-50">
      <h3 className="font-bold mb-3">API Endpoint Tester</h3>
      
      <button
        onClick={testEndpoints}
        disabled={testing}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Test All Endpoints'}
      </button>

      <div className="max-h-60 overflow-y-auto space-y-2">
        {results.map((result, index) => (
          <div key={index} className={`p-2 rounded text-xs ${
            result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <div className="font-medium">{result.test}</div>
            <div className="text-xs opacity-75">{result.timestamp}</div>
            {result.error && (
              <div className="text-xs mt-1">{result.error}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}