const Item = require('../models/Item');
const User = require('../models/User');

class MatchingController {
  async findMatches(req, res) {
    try {
      const { category, keywords, maxPrice, condition } = req.body;
      const userId = req.user._id;

      let query = { 
        status: 'available',
        owner: { $ne: userId }
      };

      if (category) query.category = category;
      if (maxPrice) query.price = { $lte: maxPrice };
      if (condition) query.condition = { $in: condition };
      
      if (keywords) {
        query.$or = [
          { title: { $regex: keywords.join('|'), $options: 'i' } },
          { description: { $regex: keywords.join('|'), $options: 'i' } }
        ];
      }

      const matches = await Item.find(query)
        .populate('owner', 'firstName lastName university rating')
        .limit(20)
        .sort({ createdAt: -1 });

      // Calculate match scores
      const scoredMatches = matches.map(item => ({
        ...item.toObject(),
        matchScore: this.calculateMatchScore(item, req.body)
      })).sort((a, b) => b.matchScore - a.matchScore);

      res.json({ matches: scoredMatches });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  calculateMatchScore(item, preferences) {
    let score = 50; // Base score

    // Category match
    if (preferences.category === item.category) score += 30;

    // Price preference
    if (preferences.maxPrice && item.price <= preferences.maxPrice) score += 20;

    // Condition preference
    if (preferences.condition && preferences.condition.includes(item.condition)) score += 15;

    // Keyword relevance
    if (preferences.keywords) {
      const text = `${item.title} ${item.description}`.toLowerCase();
      const matches = preferences.keywords.filter(keyword => 
        text.includes(keyword.toLowerCase())
      );
      score += matches.length * 10;
    }

    return Math.min(100, score);
  }

  async getRecommendations(req, res) {
    try {
      const userId = req.user._id;

      // Get user's item categories and preferences
      const userItems = await Item.find({ owner: userId });
      const userCategories = [...new Set(userItems.map(item => item.category))];

      // Find items in similar categories
      const recommendations = await Item.find({
        category: { $in: userCategories },
        status: 'available',
        owner: { $ne: userId }
      })
      .populate('owner', 'firstName lastName university rating')
      .limit(10)
      .sort({ views: -1, createdAt: -1 });

      res.json({ recommendations });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getSimilarItems(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      const similar = await Item.find({
        category: item.category,
        _id: { $ne: id },
        status: 'available'
      })
      .populate('owner', 'firstName lastName university rating')
      .limit(6)
      .sort({ createdAt: -1 });

      res.json({ similar });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new MatchingController();