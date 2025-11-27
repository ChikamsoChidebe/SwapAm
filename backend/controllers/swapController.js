const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');

class SwapController {
  async createSwap(req, res) {
    try {
      const { requestedItemId, offeredItemId, offerType, offerAmount, message } = req.body;

      const requestedItem = await Item.findById(requestedItemId);
      if (!requestedItem) {
        return res.status(404).json({ message: 'Requested item not found' });
      }

      if (requestedItem.owner.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'Cannot swap with yourself' });
      }

      const swap = new Swap({
        requester: req.user._id,
        owner: requestedItem.owner,
        requestedItem: requestedItemId,
        offeredItem: offeredItemId,
        offerType,
        offerAmount: offerType === 'buy' ? offerAmount : 0,
        message
      });

      await swap.save();
      await swap.populate([
        { path: 'requester', select: 'firstName lastName university rating' },
        { path: 'owner', select: 'firstName lastName university rating' },
        { path: 'requestedItem', select: 'title images' },
        { path: 'offeredItem', select: 'title images' }
      ]);

      res.status(201).json(swap);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getUserSwaps(req, res) {
    try {
      const { type = 'all' } = req.query;
      
      let query = {
        $or: [
          { requester: req.user._id },
          { owner: req.user._id }
        ]
      };

      if (type !== 'all') {
        query.status = type;
      }

      const swaps = await Swap.find(query)
        .populate('requester', 'firstName lastName university rating')
        .populate('owner', 'firstName lastName university rating')
        .populate('requestedItem', 'title images category')
        .populate('offeredItem', 'title images category')
        .sort({ createdAt: -1 });

      res.json(swaps);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateSwapStatus(req, res) {
    try {
      const { status, meetingLocation, meetingTime } = req.body;
      
      const swap = await Swap.findById(req.params.id);
      if (!swap) {
        return res.status(404).json({ message: 'Swap not found' });
      }

      if (status === 'accepted' || status === 'rejected') {
        if (swap.owner.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'Not authorized' });
        }
      }

      swap.status = status;
      if (meetingLocation) swap.meetingLocation = meetingLocation;
      if (meetingTime) swap.meetingTime = meetingTime;

      if (status === 'accepted') {
        await Item.findByIdAndUpdate(swap.requestedItem, { status: 'pending' });
        if (swap.offeredItem) {
          await Item.findByIdAndUpdate(swap.offeredItem, { status: 'pending' });
        }
      }

      if (status === 'completed') {
        swap.completedAt = new Date();
        
        const newStatus = swap.offerType === 'buy' ? 'sold' : 'swapped';
        await Item.findByIdAndUpdate(swap.requestedItem, { status: newStatus });
        if (swap.offeredItem) {
          await Item.findByIdAndUpdate(swap.offeredItem, { status: newStatus });
        }

        await User.findByIdAndUpdate(swap.requester, { 
          $inc: { totalSwaps: 1, campusPoints: 10 } 
        });
        await User.findByIdAndUpdate(swap.owner, { 
          $inc: { totalSwaps: 1, campusPoints: 10 } 
        });
      }

      await swap.save();
      res.json(swap);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async rateSwap(req, res) {
    try {
      const { rating } = req.body;
      
      const swap = await Swap.findById(req.params.id);
      if (!swap) {
        return res.status(404).json({ message: 'Swap not found' });
      }

      if (swap.status !== 'completed') {
        return res.status(400).json({ message: 'Can only rate completed swaps' });
      }

      const isRequester = swap.requester.toString() === req.user._id.toString();
      const isOwner = swap.owner.toString() === req.user._id.toString();

      if (!isRequester && !isOwner) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      if (isRequester) {
        swap.rating.requesterRating = rating;
      } else {
        swap.rating.ownerRating = rating;
      }

      await swap.save();
      res.json(swap);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new SwapController();