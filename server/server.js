
/* 
1. opens the physical network port (5000) to receive traffic
2. turns on the security guards and translators for incoming traffic - middleware
3. connects the application to the MongoDB database
 */

// loads the secret variables from the .env file
require('dotenv').config();

// the key api to connect to finnhub
console.log("API KEY finnhub:", process.env.FINNHUB_API_KEY);

const express = require('express'); // web framework (handles HTTP requests)
const mongoose = require('mongoose'); // translates JS into MongoDB queries
const cors = require('cors');
const stockRoutes = require("./routes/stocks")   // allows React to connect

const app = express();


/* middleware */
app.use(cors());
app.use(express.json());

app.use("/api/stocks", stockRoutes);

/* database connection */
const dbPromise = mongoose.connect(process.env.MONGO_URI);

dbPromise.then(function(){
    console.log('Database Connected to MongoDB');
});

dbPromise.catch(function(err){
    console.log('MongoDB error connection: ', err.message);
});

// Health check route to verify server is alive
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running smoothly' });
});

//start listening for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Api is Running Right on http://localhost:${PORT}/api/stocks/AAPL`)
});
