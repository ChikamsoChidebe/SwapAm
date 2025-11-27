import React, { useState } from 'react';
import apiService from '../services/api';

export default function AIItemUpload({ onItemAnalyzed }) {
  const [images, setImages] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [valuation, setValuation] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setAnalysis(null);
    setValuation(null);
  };

  const analyzeWithAI = async () => {
    if (images.length === 0) return;

    try {
      setAnalyzing(true);
      
      // Step 1: Analyze images with computer vision
      const analysisResult = await apiService.analyzeItem(images);
      setAnalysis(analysisResult);

      // Step 2: Get detailed valuation
      if (analysisResult.success) {
        const valuationData = {
          item: {
            category: analysisResult.category,
            condition: analysisResult.condition_label,
            originalPrice: analysisResult.base_swaps * 10, // Convert swaps to price estimate
            age: 6, // Default 6 months
            brand: 'Unknown',
            description: `${analysisResult.category} in ${analysisResult.condition_label} condition`,
            images: []
          },
          market: {
            demandScore: 75,
            supplyCount: 10,
            avgPrice: analysisResult.preliminary_swaps * 10,
            recentSales: [analysisResult.base_swaps * 8, analysisResult.base_swaps * 12]
          }
        };

        const valuationResult = await apiService.valuateItem(valuationData);
        setValuation(valuationResult);

        // Callback with combined data
        if (onItemAnalyzed) {
          onItemAnalyzed({
            analysis: analysisResult,
            valuation: valuationResult,
            suggestedData: {
              title: `${analysisResult.category} Item`,
              category: analysisResult.category,
              condition: analysisResult.condition_label,
              estimatedValue: valuationResult.estimatedValue
            }
          });
        }
      }
    } catch (error) {
      console.error('AI Analysis failed:', error);
      alert('AI analysis failed. Please try again or fill manually.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">AI-Powered Item Analysis</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Item Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload multiple images for better analysis
          </p>
        </div>

        {images.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">
              {images.length} image(s) selected
            </p>
            <button
              onClick={analyzeWithAI}
              disabled={analyzing}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {analyzing ? 'Analyzing with AI...' : 'Analyze with AI'}
            </button>
          </div>
        )}

        {analysis && (
          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-medium text-blue-800 mb-2">AI Analysis Results</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Category: <span className="font-medium">{analysis.category}</span></div>
              <div>Condition: <span className="font-medium">{analysis.condition_label}</span></div>
              <div>Confidence: <span className="font-medium">{Math.round(analysis.confidence * 100)}%</span></div>
              <div>Base Swaps: <span className="font-medium">{analysis.base_swaps}</span></div>
              <div>Tier: <span className="font-medium">{analysis.tier}</span></div>
              <div>Trust Factor: <span className="font-medium">{analysis.trust_factor}</span></div>
            </div>
            
            {analysis.flags && analysis.flags.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-blue-600">Flags:</div>
                <div className="flex flex-wrap gap-1">
                  {analysis.flags.map((flag, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {valuation && (
          <div className="bg-green-50 p-4 rounded">
            <h4 className="font-medium text-green-800 mb-2">Valuation Results</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Estimated Value: <span className="font-bold">${valuation.estimatedValue}</span></div>
              <div>Confidence: <span className="font-medium">{valuation.confidence}%</span></div>
            </div>
            
            <div className="mt-2">
              <div className="text-xs text-green-600 mb-1">Valuation Factors:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>Condition: {valuation.factors.condition}</div>
                <div>Demand: {valuation.factors.demand}</div>
                <div>Rarity: {valuation.factors.rarity}</div>
                <div>Depreciation: {valuation.factors.depreciation}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}