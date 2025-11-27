const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Books', 'Electronics', 'Clothing', 'Furniture', 'Sports', 'Other']
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like-new', 'good', 'fair', 'poor']
  },
  images: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exchangeType: {
    type: String,
    required: true,
    enum: ['swap', 'sell', 'donate']
  },
  price: { type: Number, default: 0 },
  wantedItems: [{ type: String }],
  status: {
    type: String,
    default: 'available',
    enum: ['available', 'pending', 'swapped', 'sold']
  },
  location: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);