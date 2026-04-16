
/* 
1. opens the physical network port (5000) to receive traffic
2. turns on the security guards and translators for incoming traffic - middleware
3. connects the application to the MongoDB database
 */

// loads the secret variables from the .env file
require('dotenv').config();

const express = require('express'); // web framework (handles HTTP requests)
const mongoose = require('mongoose'); // translates JS into MongoDB queries
const cors = require('cors');

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* routes */
app.use("/api/stocks", require("./routes/stocks")); // connects stock routes to server
app.use("/api/trades", require("./routes/tradeRoutes")); //trade engine routes
app.use('/api/users', require('./routes/authRoutes'));

//health check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running smoothly' });
});

/* database connection */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error: ', err.message));


/* start server */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Trade API : http://localhost:${PORT}/api/trades/portfolio`);
});
