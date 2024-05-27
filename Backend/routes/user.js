const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const User = require("../databsae/UserModal");

router.post("/login", async (req, res, next) => {
  console.log("runing");
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }
    console.log("login user ", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    
    let userId = user._id.toString()
    let phoneNo = user.phoneNo
    res.status(200).json({ token, email, userId, phoneNo });
  } catch (error) {
    next(error);
  }
});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// User Signup
router.post("/signup", async (req, res, next) => {
  console.log("running");
  const { email, phoneNumber, password } = req.body;
  
  console.log("login dat ", email, password)
  // Validate request body
  if (!email || !phoneNumber || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user
    const newUser = new User({
      email,
      phoneNo: phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user data and token
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        phoneNo: savedUser.phoneNumber,
      },
    });
  } catch (error) {
    console.log("login error ", error)
    next(error); // Pass errors to the error handler middleware
  }
});
module.exports = router;
