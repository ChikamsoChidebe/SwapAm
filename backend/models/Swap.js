const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestedItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  offeredItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  offerType: {
    type: String,
    required: true,
    enum: ['swap', 'buy', 'request']
  },
  offerAmount: { type: Number, default: 0 },
  message: { type: String },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled']
  },
  meetingLocation: { type: String },
  meetingTime: { type: Date },
  rating: {
    requesterRating: { type: Number, min: 1, max: 5 },
    ownerRating: { type: Number, min: 1, max: 5 }
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

module.exports = mongoose.model('Swap', swapSchema);