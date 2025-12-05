import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';

const MyItems = () => {
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
        const data = await apiService.getMyItems();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to load items:', error);
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
          <button className="px-4 py-2 bg-[#137C5C] text-white rounded-lg hover:bg-[#0f5132]">
            + Add New Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id || item.id} className="bg-white rounded-xl shadow-sm border">
              <img
                src={item.images?.[0] || item.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                alt={item.itemName}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title || item.itemName}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                {(item.price || item.estimatedValue) && (
                  <p className="text-lg font-bold text-[#137C5C] mb-2">₦{item.price || item.estimatedValue}</p>
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-[#137C5C] text-white rounded-lg text-sm hover:bg-[#0f5132]">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50"
                  >
                    Delete
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

export default MyItems;