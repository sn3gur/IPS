// Router - maps specific web urls to functions in our Controller

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST request to trigger user registration
router.post('/register', authController.registerUser);

// POST request to trigger user login
router.post('/login', authController.loginUser);

// POST request to trigger user logout
router.post('/logout', authController.logoutUser); 

// export the router to be used in server.js
module.exports = router;