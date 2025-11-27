const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Mock notification model (replace with actual model)
const notifications = [];

// Get user notifications
router.get('/', auth, async (req, res) => {
  try {
    const userNotifications = notifications.filter(n => n.userId === req.user._id.toString());
    res.json(userNotifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = notifications.find(n => n.id === req.params.id && n.userId === req.user._id.toString());
    if (notification) {
      notification.read = true;
    }
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark all notifications as read
router.put('/mark-all-read', auth, async (req, res) => {
  try {
    notifications.forEach(n => {
      if (n.userId === req.user._id.toString()) {
        n.read = true;
      }
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;