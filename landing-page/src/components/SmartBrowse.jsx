import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function SmartBrowse() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
    maxPrice: '',
    keywords: ''
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getItems(filters);
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  };

  const findSmartMatches = async () => {
    try {
      setLoading(true);
      const preferences = {
        category: filters.category,
        keywords: filters.keywords ? filters.keywords.split(' ') : [],
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : null,
        condition: filters.condition ? [filters.condition] : []
      };

      const data = await apiService.findLocalMatches(preferences);
      setMatches(data.matches || []);
    } catch (error) {
      console.error('Smart matching failed:', error);
      // Fallback to regular search
      loadItems();
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Smart Browse & Match</h2>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={filters.condition}
            onChange={(e) => handleFilterChange('condition', e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Any Condition</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Search keywords"
            value={filters.keywords}
            onChange={(e) => handleFilterChange('keywords', e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={loadItems}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
          
          <button
            onClick={findSmartMatches}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            AI Smart Match
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(matches.length > 0 ? matches : items).map((item, index) => (
          <div key={item._id || index} className="bg-white rounded-lg shadow overflow-hidden">
            {item.images && item.images[0] && (
              <img
                src={`http://localhost:5000/uploads/${item.images[0]}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {item.category}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {item.condition}
                </span>
              </div>

              {item.matchScore && (
                <div className="mb-2">
                  <div className="text-xs text-gray-600">Match Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.matchScore}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-right">{item.matchScore}%</div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">
                  {item.exchangeType === 'sell' ? `₦${item.price}` : item.exchangeType}
                </span>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && matches.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No items found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}