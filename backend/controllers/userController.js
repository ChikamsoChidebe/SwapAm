const User = require('../models/User');
const Item = require('../models/Item');
const Swap = require('../models/Swap');

class UserController {
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const updates = req.body;
      
      if (req.file) {
        updates.avatar = req.file.filename;
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true }
      ).select('-password');

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getUserItems(req, res) {
    try {
      const { status = 'all' } = req.query;
      
      let query = { owner: req.user._id };
      if (status !== 'all') {
        query.status = status;
      }

      const items = await Item.find(query).sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getDashboardStats(req, res) {
    try {
      const totalItems = await Item.countDocuments({ owner: req.user._id });
      const activeItems = await Item.countDocuments({ owner: req.user._id, status: 'available' });
      const completedSwaps = await Item.countDocuments({ 
        owner: req.user._id, 
        status: { $in: ['swapped', 'sold'] } 
      });

      const recentItems = await Item.find({ owner: req.user._id })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title status createdAt views likes');

      res.json({
        totalItems,
        activeItems,
        completedSwaps,
        campusPoints: req.user.campusPoints,
        rating: req.user.rating,
        recentItems
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password -verificationCode');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userItems = await Item.find({ owner: req.params.id, status: 'available' })
        .limit(6)
        .sort({ createdAt: -1 });

      res.json({ user, items: userItems });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async searchUsers(req, res) {
    try {
      const { q, university } = req.query;
      
      let query = {};
      if (q) {
        query.$or = [
          { firstName: { $regex: q, $options: 'i' } },
          { lastName: { $regex: q, $options: 'i' } }
        ];
      }
      if (university) {
        query.university = { $regex: university, $options: 'i' };
      }

      const users = await User.find(query)
        .select('firstName lastName university rating totalSwaps avatar')
        .limit(20);

      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new UserController();