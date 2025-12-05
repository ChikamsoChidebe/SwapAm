import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSwapModal, setShowSwapModal] = useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo item data
        const demoItem = {
          _id: id,
          title: 'MacBook Pro 13" 2020',
          description: 'Excellent condition MacBook Pro, perfect for students. Includes charger and original box.',
          category: 'Electronics',
          exchangeType: 'sell',
          price: 85000,
          condition: 'like-new',
          location: 'University of Lagos, Akoka',
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop'],
          owner: {
            firstName: 'John',
            lastName: 'Doe',
            university: 'University of Lagos',
            rating: 4.8
          },
          createdAt: new Date().toISOString()
        };
        setItem(demoItem);
      } else {
        const data = await apiService.getItem(id);
        setItem(data);
      }
    } catch (error) {
      console.error('Failed to load item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapRequest = async () => {
    try {
      await apiService.createSwap({
        itemId: item._id,
        message: 'Interested in swapping!'
      });
      alert('Swap request sent!');
      setShowSwapModal(false);
    } catch (error) {
      console.error('Failed to send swap request:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#137C5C]"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!item) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Item not found</p>
          <button onClick={() => navigate('/dashboard/browse')} className="mt-4 px-4 py-2 bg-[#137C5C] text-white rounded-lg">
            Back to Browse
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <img
                src={item.images?.[0] || 'https://via.placeholder.com/400x300'}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.exchangeType === 'sell' ? 'bg-green-100 text-green-800' :
                    item.exchangeType === 'swap' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.exchangeType}
                  </span>
                </div>
                {item.price && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <span className="text-xl font-bold text-[#137C5C]">₦{item.price}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Condition:</span>
                  <span className="font-medium capitalize">{item.condition}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <h3 className="font-semibold mb-2">Owner</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#137C5C] rounded-full flex items-center justify-center text-white font-bold">
                    {item.owner?.firstName?.[0]}{item.owner?.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-medium">{item.owner?.firstName} {item.owner?.lastName}</p>
                    <p className="text-sm text-gray-500">{item.owner?.university}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full py-3 bg-[#137C5C] text-white rounded-lg hover:bg-[#0f5132]"
                >
                  {item.exchangeType === 'swap' ? 'Request Swap' : 'Contact Owner'}
                </button>
                <button
                  onClick={() => navigate('/dashboard/browse')}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back to Browse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Send Swap Request</h3>
            <textarea
              placeholder="Write a message to the owner..."
              className="w-full px-3 py-2 border rounded-lg h-24 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSwapRequest}
                className="flex-1 py-2 bg-[#137C5C] text-white rounded-lg"
              >
                Send Request
              </button>
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ItemDetails;