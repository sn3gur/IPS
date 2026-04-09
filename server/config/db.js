/* connect to a MongoDB database using Mongoose */
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Uses the secret key from your .env file to talk to Atlas
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ Database Connection Error: ${err.message}`);
        // Exit the process with failure if we can't connect
        process.exit(1);
    }
};

module.exports = connectDB;