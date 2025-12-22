import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';
import supabaseService from '../../services/supabase';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    // Guard against undefined ID
    if (!id || id === 'undefined') {
      console.error('Invalid item ID:', id);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo item data
        const demoItem = {
          id: id,
          _id: id,
          title: 'MacBook Pro 13" 2020',
          description: 'Excellent condition MacBook Pro, perfect for students. Includes charger and original box.',
          category: 'Electronics',
          exchange_type: 'sell',
          price: 85000,
          condition: 'like-new',
          location: 'University of Lagos, Akoka',
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop'],
          owner: {
            first_name: 'John',
            last_name: 'Doe',
            university: 'University of Lagos'
          },
          created_at: new Date().toISOString(),
          views: 42,
          likes: ['user1', 'user2', 'user3']
        };
        setItem(demoItem);
        setViews(42);
        setLikesCount(3);
      } else {
        // Real mode - load from Supabase
        const data = await apiService.getItem(id);
        setItem(data);
        setViews(data.views || 0);
        setLikesCount(data.likes?.length || 0);
        
        // Check if current user has liked this item
        const user = await supabaseService.getCurrentUser();
        if (user && data.likes?.includes(user.id)) {
          setLiked(true);
        }
      }
    } catch (error) {
      console.error('Failed to load item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo mode - just toggle locally
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
        return;
      }
      
      // Real mode - call Supabase API
      const result = await apiService.likeItem(item.id);
      setLiked(result.liked);
      setLikesCount(result.likes);
    } catch (error) {
      console.error('Failed to like item:', error);
    }
  };

  const handleSwapRequest = async () => {
    try {
      await apiService.createSwap({
        itemId: item.id || item._id,
        ownerId: item.owner_id || item.owner?.id,
        message: 'Interested in swapping!'
      });
      alert('Swap request sent!');
      setShowSwapModal(false);
    } catch (error) {
      console.error('Failed to send swap request:', error);
      alert('Failed to send swap request. Please try again.');
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
              
              {/* Item Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>{views} views</span>
                <span>•</span>
                <span>{likesCount} likes</span>
              </div>
              
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    (item.exchange_type || item.exchangeType) === 'sell' ? 'bg-green-100 text-green-800' :
                    (item.exchange_type || item.exchangeType) === 'swap' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.exchange_type || item.exchangeType}
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
                    {(item.owner?.first_name || item.owner?.firstName)?.[0]}{(item.owner?.last_name || item.owner?.lastName)?.[0]}
                  </div>
                  <div>
                    <p className="font-medium">{item.owner?.first_name || item.owner?.firstName} {item.owner?.last_name || item.owner?.lastName}</p>
                    <p className="text-sm text-gray-500">{item.owner?.university}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      liked 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <svg className={`w-5 h-5 ${liked ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {liked ? 'Liked' : 'Like'}
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
                
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full py-3 bg-[#137C5C] text-white rounded-lg hover:bg-[#0f5132]"
                >
                  {(item.exchange_type || item.exchangeType) === 'swap' ? 'Request Swap' : 'Contact Owner'}
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