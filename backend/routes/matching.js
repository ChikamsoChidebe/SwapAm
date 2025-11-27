const express = require('express');
const matchingController = require('../controllers/matchingController');
const auth = require('../middleware/auth');

const router = express.Router();

// Find matching items
router.post('/find', auth, matchingController.findMatches);

// Get personalized recommendations
router.get('/recommendations', auth, matchingController.getRecommendations);

// Get similar items
router.get('/similar/:id', matchingController.getSimilarItems);

module.exports = router;