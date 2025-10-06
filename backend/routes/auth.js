const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// 🧂 A secret key should always be in .env file, not hardcoded
const JWT_SECRET = process.env.JWT_SECRET || "secretkeyappearshere";

 
//SIGNUP ROUTE
 
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    //create new user
    const newUser = new User({ name, email, password });

    await newUser.save();

    //create JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      data: {
        userId: newUser._id,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error! Something went wrong." });
  }
});

 
//LOGIN ROUTE
 
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ✅ check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // ✅ compare password
    if (existingUser.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ generate token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      data: {
        userId: existingUser._id,
        email: existingUser.email,
        token,
        message:"Logged in successfully"
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error! Something went wrong." });
  }
});

// ---------------------------
// 🔓 ACCESS RESOURCE ROUTE
// ---------------------------
router.get("/accessResource", (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Error! Token was not provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);

    res.status(200).json({
      success: true,
      data: {
        userId: decodedToken.userId,
        email: decodedToken.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});

module.exports = router;
