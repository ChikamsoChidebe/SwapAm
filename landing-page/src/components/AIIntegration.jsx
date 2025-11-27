import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function AIIntegration() {
  const [aiStatus, setAiStatus] = useState('checking');
  const [impactData, setImpactData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    checkAIStatus();
    loadImpactData();
    loadRecommendations();
  }, []);

  const checkAIStatus = async () => {
    try {
      const health = await apiService.aiHealthCheck();
      setAiStatus(health.model_loaded ? 'online' : 'loading');
    } catch {
      setAiStatus('offline');
    }
  };

  const loadImpactData = async () => {
    try {
      const data = await apiService.getPlatformImpact();
      setImpactData(data.metrics);
    } catch (error) {
      console.error('Failed to load impact data:', error);
    }
  };

  const loadRecommendations = async () => {
    try {
      const data = await apiService.getLocalRecommendations();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    }
  };

  const testValuation = async () => {
    try {
      const testData = {
        item: {
          category: 'Electronics',
          condition: 'good',
          originalPrice: 500,
          age: 12,
          brand: 'Apple',
          description: 'iPhone 12 in good condition',
          images: []
        },
        market: {
          demandScore: 80,
          supplyCount: 15,
          avgPrice: 400,
          recentSales: [380, 420, 390]
        }
      };
      
      const valuation = await apiService.valuateItem(testData);
      alert(`Estimated Value: $${valuation.estimatedValue} (Confidence: ${valuation.confidence}%)`);
    } catch (error) {
      alert('Valuation failed: ' + error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">AI Integration Status</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            aiStatus === 'online' ? 'bg-green-500' : 
            aiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }`}></div>
          <span>AI Backend: {aiStatus}</span>
        </div>

        {impactData && (
          <div className="bg-green-50 p-4 rounded">
            <h4 className="font-medium text-green-800">Platform Impact</h4>
            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
              <div>CO₂ Saved: {impactData.wasteReduced?.co2Saved || 0} kg</div>
              <div>Waste Reduced: {impactData.wasteReduced?.weight || 0} kg</div>
              <div>Money Saved: ${impactData.economicImpact?.moneySaved || 0}</div>
              <div>Transactions: {impactData.economicImpact?.transactionCount || 0}</div>
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Smart Recommendations</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {recommendations.slice(0, 3).map((item, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                <div className="font-medium">{item.title}</div>
                <div className="text-gray-600">{item.category}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={testValuation}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Test AI Valuation
        </button>
      </div>
    </div>
  );
}