const express = require('express');
const swapController = require('../controllers/swapController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes
router.post('/', auth, swapController.createSwap);
router.get('/my-swaps', auth, swapController.getUserSwaps);
router.put('/:id/status', auth, swapController.updateSwapStatus);
router.post('/:id/rate', auth, swapController.rateSwap);

module.exports = router;