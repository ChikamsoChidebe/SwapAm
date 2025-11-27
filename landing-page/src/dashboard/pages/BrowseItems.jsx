import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';

const BrowseItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    exchangeType: '',
    search: ''
  });

  useEffect(() => {
    loadItems();
  }, [filters]);

  const loadItems = async () => {
    try {
      const data = await apiService.getItems(filters);
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Items</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search items..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            />
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            >
              <option value="">All Categories</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
            <select
              value={filters.exchangeType}
              onChange={(e) => setFilters({...filters, exchangeType: e.target.value})}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            >
              <option value="">All Types</option>
              <option value="swap">Swap</option>
              <option value="sell">Sell</option>
              <option value="donate">Donate</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <img
                src={item.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 bg-[#137C5C] text-white text-xs rounded-full">
                    {item.exchangeType}
                  </span>
                  <button 
                    onClick={() => navigate(`/dashboard/item/${item._id}`)}
                    className="px-4 py-2 bg-[#fdd835] text-black rounded-lg hover:bg-[#f9c74f] transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrowseItems;