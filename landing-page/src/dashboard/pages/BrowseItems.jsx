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
      const token = localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo mode - use mock data with real images
        const mockItems = [
          {
            _id: '1',
            title: 'MacBook Pro 13" 2020',
            description: 'Excellent condition, barely used. Perfect for students.',
            category: 'Electronics',
            exchangeType: 'sell',
            price: 85000,
            condition: 'like-new',
            images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'],
            owner: { firstName: 'John', lastName: 'Doe' }
          },
          {
            _id: '2',
            title: 'Calculus Textbook',
            description: 'Mathematics textbook for engineering students.',
            category: 'Books',
            exchangeType: 'swap',
            condition: 'good',
            images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop'],
            owner: { firstName: 'Sarah', lastName: 'Johnson' }
          },
          {
            _id: '3',
            title: 'Nike Air Force 1',
            description: 'Size 42, white sneakers in great condition.',
            category: 'Clothing',
            exchangeType: 'sell',
            price: 12000,
            condition: 'good',
            images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop'],
            owner: { firstName: 'Mike', lastName: 'Chen' }
          },
          {
            _id: '4',
            title: 'Study Desk',
            description: 'Wooden study desk with drawers. Perfect for dorm room.',
            category: 'Furniture',
            exchangeType: 'sell',
            price: 15000,
            condition: 'good',
            images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
            owner: { firstName: 'Emma', lastName: 'Wilson' }
          },
          {
            _id: '5',
            title: 'Guitar (Acoustic)',
            description: 'Yamaha acoustic guitar, great for beginners.',
            category: 'Music',
            exchangeType: 'swap',
            condition: 'good',
            images: ['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop'],
            owner: { firstName: 'David', lastName: 'Brown' }
          },
          {
            _id: '6',
            title: 'iPhone 12',
            description: 'Unlocked iPhone 12, 128GB storage. Minor scratches.',
            category: 'Electronics',
            exchangeType: 'sell',
            price: 45000,
            condition: 'fair',
            images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'],
            owner: { firstName: 'Lisa', lastName: 'Garcia' }
          }
        ];
        setItems(mockItems);
      } else {
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
              key={item._id} 
              item={item} 
              onViewDetails={() => navigate(`/dashboard/item/${item._id}`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrowseItems;