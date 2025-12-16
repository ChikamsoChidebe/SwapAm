import React, { useState } from 'react';
import { authAPI, categoriesAPI, itemsAPI } from '../../services/api';

const BackendTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready to test');
  const [token, setToken] = useState<string>('');

  const testLogin = async () => {
    try {
      setStatus('Testing login...');
      const response = await authAPI.login({
        email: 'ammy@gmail.com',
        password: '080808'
      });
      setToken(response.data.token);
      setStatus(`Login successful! Token: ${response.data.token.substring(0, 20)}...`);
    } catch (error: any) {
      setStatus(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const testCategories = async () => {
    try {
      setStatus('Testing categories...');
      const response = await categoriesAPI.getCategories();
      setStatus(`Categories loaded: ${response.data.length} categories found`);
    } catch (error: any) {
      setStatus(`Categories failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const testItems = async () => {
    try {
      setStatus('Testing items...');
      const response = await itemsAPI.getItems();
      setStatus(`Items loaded: ${response.data.length} items found`);
    } catch (error: any) {
      setStatus(`Items failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const testWhoAmI = async () => {
    try {
      setStatus('Testing whoami...');
      const response = await authAPI.whoami();
      setStatus(`WhoAmI: ${response.data}`);
    } catch (error: any) {
      setStatus(`WhoAmI failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Backend Connection Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">Status: {status}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={testLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Login
        </button>
        
        <button
          onClick={testCategories}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Categories
        </button>
        
        <button
          onClick={testItems}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Items
        </button>
        
        <button
          onClick={testWhoAmI}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          disabled={!token}
        >
          Test WhoAmI (requires login)
        </button>
      </div>

      {token && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="text-xs">Token: {token.substring(0, 50)}...</p>
        </div>
      )}
    </div>
  );
};

export default BackendTest;