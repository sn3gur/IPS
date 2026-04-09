/* handles stock buying and selling operations */
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

module.exports = {
    buyStock: async function(req, res) {
        try {
            //extraxt user ID from middleware
            const userId = req.user.id; 
            const ticker = req.body.ticker.toUpperCase();
            const quantity = Number(req.body.quantity);

            //mock price
            const executionPrice = 150.00;

            if (!ticker || quantity <= 0) {
                return res.status(400).json({ message: 'Invalid parameters' });
            }

            const totalCost = executionPrice * quantity;

            //fetch user balance
            const user = await User.findById(userId);
            if (!user){
                return res.status(404).json({ message: 'User not found' });
            }

            //validation math
            if(user.availableCash < totalCost) {
                return res.status(400).json({ message: 'Insufficient funds',
                    cash : user.availableCash,
                    cost: totalCost
                 });
            }

            //deduct cost from user balance
            user.availableCash -= totalCost;
            await user.save();

            //record the transaction
            const newTransaction = new Transaction({
                userId: req.user.id,
                ticker: ticker,
                type: 'BUY',
                quantity: quantity,
                executionPrice: executionPrice
            });
            await newTransaction.save();

            //respond with new state
            res.status(201).json({
                message: 'Bought ${quantity} shares of ${ticker} at $${executionPrice}',
                newBalance: user.availableCash,
                transaction: newTransaction
            });
        } catch (err) {
            console.error('Error processing buy order:', err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    getPortfolio: async function(req, res) {
        try {
            const userId = req.user.id;
            //aggregate transactions to calculate current holdings
            const portfolio = await Transaction.aggregate([
                {
                    $match: { userId: new mongoose.Types.ObjectId(req.user.id) } //checks transactions of current user
                },
                //groups by ticker and sums shares
                {
                    $group: {
                        _id: '$ticker',
                        totalShares: { $sum: {
                            $cond: [
                                { $eq: ['$type', 'BUY'] }, //if it's a buy, add quantity
                                '$quantity',
                                { $multiply: ['$quantity', -1] } //if it's a sell, subtract quantity
                             ] } 
                        } 
                    }
                },
                {
                    $match: { totalShares: { $gt: 0 } } //only include positive shares
                }

            ]);
            //if no trades, return empty array
            res.status(200).json({ portfolio: portfolio});
        }catch (err) {
            console.error('Error fetching portfolio:', err);
            res.status(500).json({ message: 'Server error compiling portfolio' });
        }
    }
};