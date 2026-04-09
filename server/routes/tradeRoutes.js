const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const authMiddleware = require('../middleware/auth');

//POST /api/trade/buy
router.post('/buy', authMiddleware, tradeController.buyStock);

//GET /api/trade/portfolio
router.get('/portfolio', authMiddleware, tradeController.getPortfolio);

module.exports = router;