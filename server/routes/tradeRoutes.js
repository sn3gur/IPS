const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const authMiddleware = require('../middleware/auth');

//POST /api/trades/buy
router.post('/buy', authMiddleware, tradeController.buyStock);

//GET /api/trades/portfolio
router.get('/portfolio', authMiddleware, tradeController.getPortfolio);

// DELETE /api/trades/reset
router.delete('/reset', authMiddleware, tradeController.resetPortfolio);

module.exports = router;