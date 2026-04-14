/* This file sets up the Express server, connects to MongoDB, and defines the API routes. */

// loads the secret variables from the .env file
require('dotenv').config();

const express = require('express'); // web framework (handles HTTP requests)
const cors = require('cors');   // allows React to connect
const connectDB = require('./config/db');

const app = express();
connectDB();

/* middleware */
app.use(cors()); //communtication between React and Express
app.use(express.json()); //allows server to parse JSON bodies in requests

// register API Routes by linking URL paths to route files
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));
app.use('/api/user', require('./routes/authRoutes'));


// Health check route to verify server is alive
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running smoothly' });
});

//start listening for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});