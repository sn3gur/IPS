const mongoose = require('mongoose');
const { exec } = require('node:child_process');
const { type } = require('node:os');

const transactionSchema = new mongoose.Schema({

    // FOREIGN KEY:  links of transaction to a specific user
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ticker: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    
    type: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
    },

    executionPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    }
}, 
{     timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);