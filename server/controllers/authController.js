// Service Layer - handles the business logic for user accounts

const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
    // receives email, password, validates, encrypts, and saves to MongoDB
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
                passwordHash: hashedPassword,
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
    },

    // receives email, password, validates, and returns JWT token if successful
    loginUser: async function(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            //checks if user exists
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            //compares password with hashed password in database
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            //creates jwt wristband
            const payload = {
                id: user._id,
            };

            //sign the token with secret and set expiration
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

            //return token to clien
            res.status(200).json({
                message: 'Login successful',
                token: token,
            });
    
        }catch (err) {
            console.error('Error logging in user: ', err);
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
}