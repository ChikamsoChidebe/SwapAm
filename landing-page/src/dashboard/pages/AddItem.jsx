import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import apiService from '../../services/api';

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    exchangeType: '',
    price: '',
    condition: '',
    location: '',
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('exchangeType', formData.exchangeType);
      submitData.append('price', formData.price);
      submitData.append('condition', formData.condition);
      submitData.append('location', formData.location);
      
      imageFiles.forEach((file, index) => {
        submitData.append('images', file);
      });
      
      await apiService.createItem(submitData);
      navigate('/dashboard/my-items');
    } catch (error) {
      console.error('Failed to create item:', error);
      alert('Failed to create item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
          <input
            type="text"
            placeholder="Item Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            required
          />
          
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C] h-32"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
              required
            >
              <option value="">Select Category</option>
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
            
            <select
              value={formData.exchangeType}
              onChange={(e) => setFormData({...formData, exchangeType: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
              required
            >
              <option value="">Exchange Type</option>
              <option value="swap">Swap</option>
              <option value="sell">Sell</option>
              <option value="donate">Donate</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price ($)"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            />
            
            <select
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
              required
            >
              <option value="">Condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          
          <input
            type="text"
            placeholder="Location (e.g., Campus Library, Hostel Block A)"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#137C5C]"
            />
            <p className="text-sm text-gray-500 mt-1">Upload up to 5 images</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#137C5C] text-white font-semibold rounded-lg hover:bg-[#0f5132] disabled:opacity-50"
          >
            {loading ? 'Adding Item...' : 'Add Item'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddItem;