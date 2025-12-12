const express = require('express');
const multer = require('multer');
const path = require('path');
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Routes
router.get('/', itemController.getAllItems);
router.get('/categories', itemController.getCategories);
router.get('/:id', itemController.getItemById);
router.post('/', auth, upload.array('images', 5), itemController.createItem);
router.put('/:id', auth, upload.array('images', 5), itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);
router.post('/:id/like', auth, itemController.toggleLike);

module.exports = router;