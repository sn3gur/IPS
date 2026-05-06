const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const authMiddleware = require('../middleware/auth');

//POST /api/trades/buy
router.post('/buy', authMiddleware, tradeController.buyStock);

// POST /api/trades/sell
router.post('/sell', authMiddleware, tradeController.sellStock);

//GET /api/trades/portfolio
router.get('/portfolio', authMiddleware, tradeController.getPortfolio);

// DELETE /api/trades/reset
router.delete('/reset', authMiddleware, tradeController.resetPortfolio);

//GET /api/trades/transactions
router.get('/transactions', authMiddleware, tradeController.getTransactions);

module.exports = router;