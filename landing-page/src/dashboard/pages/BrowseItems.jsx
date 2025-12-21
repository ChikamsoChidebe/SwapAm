import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';
import ItemCard from '../../components/ItemCard';

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
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo mode - show mock data with proper IDs
        const mockItems = [
          {
            id: '1',
            _id: '1',
            title: 'MacBook Pro 13" 2020',
            description: 'Excellent condition, barely used. Perfect for students.',
            category: 'Electronics',
            exchange_type: 'sell',
            price: 85000,
            condition: 'like-new',
            images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'],
            owner: { first_name: 'John', last_name: 'Doe' }
          }
        ];
        setItems(mockItems);
      } else {
        // Real mode - load from Supabase
        const data = await apiService.getItems(filters);
        setItems(Array.isArray(data) ? data : []);
      }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <ItemCard 
              key={item.id || item._id} 
              item={item} 
              onViewDetails={() => navigate(`/dashboard/item/${item.id || item._id}`)}
            />
          ))}}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrowseItems;