const mongoose = require('mongoose');

// define the schema 
const userSchema = new mongoose.Schema({
  
  // column definitions 
  email: {
    type: String,
    required: [true, 'Email is required for the MERN assignment'], // Server-side validation
    unique: true, 
    lowercase: true,
    trim: true,
    // regex validation in database model
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  
  //hashing the password
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  
  //user current  cash balance
  availableCash: {
    type: mongoose.Schema.Types.Decimal128, //math library
    default: 100000.00, 
    min: [1, 'Insufficient funds: Cash balance cannot drop below 0'] 
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'], 
      default: 'dark'
    }
  }
}, { 
  //adds 'createdAt' and 'updatedAt' timestamps to every row
  timestamps: true 
});

//export the model to other files
module.exports = mongoose.model('User', userSchema);