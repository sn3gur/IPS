
const express = require("express")
const router = express.Router()
const User = require("../models/User")


router.post("/register", async function (req, res){
  try {

    const { email, password } = req.body;

    // Checks if both fields are filled
    if ( !email || !password) {
      return res.status(400).json({
        message: "Missing data"
      })
    }

    // Checks if the email has already been used
    const existingUser = await User.findOne({ email });

    if (existingUser){
      return res.status(400).json({
        message: "User already exist"
      })
    }

    // Creates new user
    const user = new User({
      email,
      password
    })

    await user.save()
    
    // Message back confirmation
    res.status(201).json({ message: "User registered" })

  }
  catch (error){
    console.error(error)
    res.status(500).json({
      message: "Server error"
    })
  }
})

// export the router to be used in server.js
module.exports = router;