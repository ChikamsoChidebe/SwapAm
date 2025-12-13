import React, { useState } from 'react';
import apiService from '../services/api';

const BackendTest = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const testEndpoint = async (name, testFn) => {
    try {
      const result = await testFn();
      setTestResults(prev => ({
        ...prev,
        [name]: { success: true, data: result }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [name]: { success: false, error: error.message }
      }));
    }
  };

  const runTests = async () => {
    setTesting(true);
    setTestResults({});

    await testEndpoint('health', () => apiService.healthCheck());
    await testEndpoint('categories', () => apiService.getCategories());
    await testEndpoint('items', () => apiService.getItems());
    
    setTesting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Backend Integration Test</h3>
      
      <button
        onClick={runTests}
        disabled={testing}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Run Tests'}
      </button>

      <div className="space-y-2">
        {Object.entries(testResults).map(([name, result]) => (
          <div key={name} className="flex items-center justify-between p-2 border rounded">
            <span className="font-medium">{name}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {result.success ? 'Pass' : 'Fail'}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="text-sm text-gray-600">
          Backend URL: {apiService.getBackendInfo().url}
        </p>
      </div>
    </div>
  );
};

export default BackendTest;