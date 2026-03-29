/* 
1. opens the physical network port (5000) to receive traffic
2. turns on the security guards and translators for incoming traffic - middleware
3. connects the application to the MongoDB database
 */

// loads the secret variables from the .env file
require('dotenv').config();

const express = require('express'); // web framework (handles HTTP requests)
const mongoose = require('mongoose'); // translates JS into MongoDB queries
const cors = require('cors');   // allows React to connect

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* database connection */
const dbPromise = mongoose.connect(process.env.MONGO_URI);

dbPromise.then(function(){
    console.log('Database Connected to MongoDB');
});

dbPromise.catch(function(err){
    console.log('MongoDB error connection: ', err.message);
});

/* API routes */
// listens for requests at 'http://localhost:5000/api/health'
// listens for requests at 'http://localhost:5001'
app.get('/', function(req, res) {
    res.status(200).json({
        status: 'Server is alive',
    });
});

/* start the server */
const PORT = process.env.PORT || 5001;
//open port for incoming requests
app.listen(PORT, function() {
    console.log(`Server is running on port ` + PORT);
});