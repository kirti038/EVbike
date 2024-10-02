const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registernewuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Existing user check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newuser.save();

    // Generate JWT token and set cookie
    const payload = { email: newuser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.signupuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Find user in the database
    const user = await userModel.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // Send the token back in an HTTP-Only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure for production environment
      maxAge: 3600000, // Match the expiration time of JWT (1 hour)
    });

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.logoutuser = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  return res.status(200).json({ message: 'Logged out successfully' });
};
