const User = require('../models/User');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = {
    //buy stock
    buyStock: async function(req, res) {
        try {
            const userId = req.user.id; 
            let ticker = req.body.ticker.toUpperCase().trim();
            console.log(`Processing BUY for ${ticker} by user ${userId}`);
        
            // Strip exchange prefix if present 
            if (ticker.includes(':')) {
                ticker = ticker.split(':').pop();
            }
            const quantity = Number(req.body.quantity);
            const priceResponse = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`);
            const executionPrice = priceResponse.data.c; 

            if (!executionPrice || executionPrice === 0) {
                return res.status(400).json({ message: `Could not find a price for ticker: ${ticker}` });
            }

            if (!ticker || quantity <= 0) {
                return res.status(400).json({ message: 'Invalid parameters' });
            }

            const totalCost = executionPrice * quantity;

            const user = await User.findById(userId);
            if (!user){
                return res.status(404).json({ message: 'User not found' });
            }

            const currentCash = parseFloat(user.availableCash.toString());
            if(currentCash < totalCost) {
                return res.status(400).json({ message: 'Insufficient funds', cash : currentCash, cost: totalCost });
            }

            user.availableCash = currentCash - totalCost;
            await user.save();

            const newTransaction = new Transaction({
                userId: userId,
                ticker: ticker,
                type: 'BUY',
                quantity: quantity,
                executionPrice: executionPrice
            });
            await newTransaction.save();

            res.status(201).json({
                message: `Bought ${quantity} shares of ${ticker} at $${executionPrice}`,
                newBalance: parseFloat(user.availableCash.toString()),
                transaction: newTransaction
            });
        } catch (err) {
            console.error('Error processing buy order:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    //sell stock
    sellStock: async function(req, res) {
        try {
            const userId = req.user.id;
            let ticker = req.body.ticker.toUpperCase().trim();
            console.log(`Processing SELL for ${ticker} by user ${userId}`);

            // strip exchange prefix if present
            if (ticker.includes(':')) {
                ticker = ticker.split(':').pop();
            }

            const quantity = Number(req.body.quantity);

            if (!ticker || quantity <= 0) {
                return res.status(400).json({ message: 'Invalid parameters' });
            }

            // Important: userId needs to be cast to ObjectId for aggregate
            const userObjectId = new mongoose.Types.ObjectId(userId);

            const portfolio = await Transaction.aggregate([
                { $match: { userId: userObjectId, ticker: ticker } },
                { $group: {
                    _id: '$ticker',
                    totalShares: { $sum: { 
                        $cond: [{ $eq: ['$type', 'BUY'] }, '$quantity', { $multiply: ['$quantity', -1] }] 
                    }}
                }}
            ]);

            const ownedShares = portfolio.length > 0 ? portfolio[0].totalShares : 0;
            console.log(`User ${userId} owns ${ownedShares} shares of ${ticker}`);

            if (ownedShares < quantity) {
                return res.status(400).json({ message: `Insufficient shares. You only own ${ownedShares} shares of ${ticker}.` });
            }

            const priceResponse = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`);
            const executionPrice = priceResponse.data.c;

            if (!executionPrice || executionPrice === 0) {
                return res.status(400).json({ message: `Could not find a price for ticker: ${ticker}` });
            }

            const totalRevenue = executionPrice * quantity;
            const user = await User.findById(userId);
            
            const currentCash = parseFloat(user.availableCash.toString());
            user.availableCash = currentCash + totalRevenue;
            await user.save();

            const newTransaction = new Transaction({
                userId: userId,
                ticker: ticker,
                type: 'SELL',
                quantity: quantity,
                executionPrice: executionPrice
            });
            await newTransaction.save();

            res.status(201).json({
                message: `Successfully sold ${quantity} shares of ${ticker} at $${executionPrice}`,
                newBalance: parseFloat(user.availableCash.toString()),
                transaction: newTransaction
            });

        } catch (err) {
            console.error('Error processing sell order:', err);
            res.status(500).json({ message: 'Server error processing sell order' });
        }
    },

    //get portfolio
    getPortfolio: async function(req, res) {
        try {
            const portfolio = await Transaction.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
                { $group: {
                    _id: '$ticker',
                    totalShares: { $sum: {
                        $cond: [
                            { $eq: ['$type', 'BUY'] }, '$quantity', { $multiply: ['$quantity', -1] }
                        ] } 
                    } 
                }},
                { $match: { totalShares: { $gt: 0 } } }
            ]);
            res.status(200).json({ portfolio: portfolio});
        } catch (err) {
            console.error('Error fetching portfolio:', err);
            res.status(500).json({ message: 'Server error compiling portfolio' });
        }
    },

    //reset poortfolio
    resetPortfolio: async function(req, res) {
        try {
            const userId = req.user.id;
            await Transaction.deleteMany({ userId: new mongoose.Types.ObjectId(req.user.id) });
            await User.findByIdAndUpdate(userId, { availableCash: 100000 });
            res.status(200).json({ message: 'Portfolio reset successful' });
        } catch (err) {
            console.error('Error resetting portfolio:', err);
            res.status(500).json({ message: 'Server error resetting portfolio' });
        }
    },

    //get recent transactions for activity feed
    getTransactions: async function(req, res) {
        try {
            //find all transcations for this user
            const transactions = await Transaction.find({ userId: req.user.id })
                                          .sort({ _id: -1 })
                                          .limit(10); 
            res.status(200).json(transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            res.status(500).json({ message: "Server error fetching transactions" });
        }
    }
};