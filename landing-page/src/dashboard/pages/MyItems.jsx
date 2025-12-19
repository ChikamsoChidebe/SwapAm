import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';
import ItemCard from '../../components/ItemCard';

const MyItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyItems();
  }, []);

  const loadMyItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token === 'demo-token-123') {
        const demoItems = [
          {
            id: 1,
            itemName: 'Calculus Textbook',
            description: 'Engineering Mathematics textbook, excellent condition',
            status: 'AVAILABLE',
            estimatedValue: 8000,
            imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            itemName: 'Gaming Headset',
            description: 'Wireless Bluetooth headset, barely used',
            status: 'AVAILABLE',
            estimatedValue: 12000,
            imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop',
            createdAt: new Date().toISOString()
          },
          {
            id: 3,
            itemName: 'Study Lamp',
            description: 'LED desk lamp with adjustable brightness',
            status: 'SOLD',
            estimatedValue: 3500,
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setItems(demoItems);
      } else {
        // Real mode - fetch from backend
        const data = await apiService.getMyItems();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to load items:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Delete this item?')) {
      try {
        await apiService.deleteItem(itemId);
        setItems(items.filter(item => (item._id || item.id) !== itemId));
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Items</h1>
          <button 
            onClick={() => navigate('/dashboard/add-item')}
            className="px-4 py-2 bg-[#137C5C] text-white rounded-lg hover:bg-[#0f5132]"
          >
            + Add New Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard 
              key={item._id || item.id} 
              item={item} 
              showActions={true}
              onEdit={(item) => console.log('Edit item:', item)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyItems;