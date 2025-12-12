const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const Swap = require('../models/Swap');
const auth = require('../middleware/auth');
const router = express.Router();

// Get platform analytics
router.get('/platform', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();
    const totalSwaps = await Swap.countDocuments({ status: 'completed' });
    const activeItems = await Item.countDocuments({ status: 'available' });

    const categoryStats = await Item.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const exchangeTypeStats = await Item.aggregate([
      { $group: { _id: '$exchangeType', count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalItems,
      totalSwaps,
      activeItems,
      categoryStats,
      exchangeTypeStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user analytics
router.get('/user', auth, async (req, res) => {
  try {
    const userItems = await Item.countDocuments({ owner: req.user._id });
    const userSwaps = await Swap.countDocuments({
      $or: [{ requester: req.user._id }, { owner: req.user._id }],
      status: 'completed'
    });

    const itemViews = await Item.aggregate([
      { $match: { owner: req.user._id } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    res.json({
      totalItems: userItems,
      totalSwaps: userSwaps,
      totalViews: itemViews[0]?.totalViews || 0,
      campusPoints: req.user.campusPoints,
      rating: req.user.rating
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;