// Service Layer - handles the business logic for user accounts

const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 

module.exports = {
    // receives email/password, validates, encrypts, and saves to MongoDB
    registerUser: async function(req, res) {
        try {
            //takes data from frontend request body
            const email = req.body.email;
            const password = req.body.password;

            // checks if user with same email already exists and waits response from database
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            //password encryption
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //saves new user object to database
            const newUser = new User({
                email: email,
                password: hashedPassword,
            });
            await newUser.save();

            //responds to frontend with success or error message 
            res.status(201).json({ 
                message: 'User registered successfully',
                userId: newUser._id
            });
        } catch (err) {
            console.error('Error registering user: ', err);
            res.status(500).json({ message: 'Server error' , error: err.message});
        }
    }
};