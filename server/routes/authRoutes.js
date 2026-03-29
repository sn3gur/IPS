// Router - maps specific web urls to functions in our Controller

const express = require('express');
const router = express.Router();

//import authController class
const authController = require('../controllers/authController');

// POST request to trigger user registration
router.post('/register', authController.registerUser);

// export the router to be used in server.js
module.exports = router;