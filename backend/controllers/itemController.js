const Item = require('../models/Item');
const User = require('../models/User');

class ItemController {
  async getAllItems(req, res) {
    try {
      const { category, exchangeType, search, page = 1, limit = 12, sortBy = 'createdAt' } = req.query;
      
      let query = { status: 'available' };
      
      if (category && category !== 'all') query.category = category;
      if (exchangeType && exchangeType !== 'all') query.exchangeType = exchangeType;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const sortOptions = {};
      sortOptions[sortBy] = -1;

      const items = await Item.find(query)
        .populate('owner', 'firstName lastName university rating')
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Item.countDocuments(query);

      res.json({
        items,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getItemById(req, res) {
    try {
      const item = await Item.findById(req.params.id)
        .populate('owner', 'firstName lastName university rating totalSwaps joinedAt avatar');
      
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      item.views += 1;
      await item.save();

      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async createItem(req, res) {
    try {
      const { title, description, category, condition, exchangeType, price, wantedItems, location } = req.body;
      
      const images = req.files ? req.files.map(file => file.filename) : [];

      const item = new Item({
        title,
        description,
        category,
        condition,
        exchangeType,
        price: exchangeType === 'sell' ? price : 0,
        wantedItems: wantedItems ? JSON.parse(wantedItems) : [],
        location,
        images,
        owner: req.user._id
      });

      await item.save();
      await item.populate('owner', 'firstName lastName university rating');

      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateItem(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      const updates = req.body;
      if (req.files && req.files.length > 0) {
        updates.images = req.files.map(file => file.filename);
      }

      Object.assign(item, updates);
      await item.save();

      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      await Item.findByIdAndDelete(req.params.id);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async toggleLike(req, res) {
    try {
      const item = await Item.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      const likeIndex = item.likes.indexOf(req.user._id);
      
      if (likeIndex > -1) {
        item.likes.splice(likeIndex, 1);
      } else {
        item.likes.push(req.user._id);
      }

      await item.save();
      res.json({ likes: item.likes.length, isLiked: likeIndex === -1 });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = ['Books', 'Electronics', 'Clothing', 'Furniture', 'Sports', 'Other'];
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new ItemController();