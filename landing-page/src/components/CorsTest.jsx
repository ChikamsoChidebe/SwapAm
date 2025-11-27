import React, { useState } from 'react';

export default function CorsTest() {
  const [results, setResults] = useState({});

  const testCors = async () => {
    const endpoints = [
      'https://swapam-backend.onrender.com/api/health',
      'http://localhost:5000/api/health'
    ];

    for (const url of endpoints) {
      try {
        const response = await fetch(url);
        setResults(prev => ({
          ...prev,
          [url]: { success: true, status: response.status }
        }));
      } catch (error) {
        setResults(prev => ({
          ...prev,
          [url]: { success: false, error: error.message }
        }));
      }
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded shadow-lg z-50">
      <h3 className="font-bold mb-2">CORS Test</h3>
      <button 
        onClick={testCors}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
      >
        Test Backends
      </button>
      
      {Object.entries(results).map(([url, result]) => (
        <div key={url} className="text-xs mb-1">
          <div className="font-medium">{url.includes('render') ? 'Java' : 'Node'}</div>
          <div className={result.success ? 'text-green-600' : 'text-red-600'}>
            {result.success ? `✓ ${result.status}` : `✗ ${result.error}`}
          </div>
        </div>
      ))}
    </div>
  );
}