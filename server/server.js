/* This file sets up the Express server, connects to MongoDB, and defines the API routes. */

// loads the secret variables from the .env file
require('dotenv').config();

const express = require('express'); // web framework (handles HTTP requests)
const cors = require('cors');   // allows React to connect
const session = require('express-session'); // manages user sessions 
const MongoStore = require('connect-mongo'); // stores session data in MongoDB

const connectDB = require('./config/db');

const app = express();
connectDB();

/* middleware */
app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true // allow cookies to be sent
})); //communtication between React and Express
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret-key', // secret key for signing session ID cookies
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI, 
        collectionName: 'sessions' 
    }),
    cookie:{
        secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in production
        httpOnly: true, // prevent client-side JavaScript from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// register API Routes by linking URL paths to route files
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));

// Health check route to verify server is alive
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running smoothly' });
});

//start listening for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});