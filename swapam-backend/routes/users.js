const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer configuration for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get current user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put('/profile', auth, upload.single('avatar'), userController.updateProfile);

// Get user's items
router.get('/my-items', auth, userController.getUserItems);

// Get user dashboard stats
router.get('/dashboard-stats', auth, userController.getDashboardStats);

// Get user by ID
router.get('/:id', userController.getUserById);

// Search users
router.get('/search', userController.searchUsers);

module.exports = router;