const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    //this will be handled in pre save hook in user model

    // Save new user
    const newUser = new User({ name, email, password });
     // 🔑 Generate tokens for login instatntly 
    const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: newUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    newUser.refreshToken = refreshToken;
    await newUser.save();
       // Set cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    // Return access token + user info
    res.status(201).json({
      message: "User registered & logged in",
      accessToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error("Registration error:", err); // Log actual error
    res.status(500).json({ error: err.message || "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    let accessToken, refreshToken;
    try {
      accessToken = jwt.sign(
        { id: user._id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      refreshToken = jwt.sign(
        { id: user._id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "15d" }
      );
    } catch (signErr) {
      console.error("JWT SIGN ERROR:", signErr);
      return res.status(500).json({ error: signErr.message });
    }
    // Store refresh token in DB or cache
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Login failed, user not found" });
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;  
  if (!refreshToken) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken: newAccessToken });
  });
};


exports.getLoggedInUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken; // HttpOnly cookie
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    });
  } catch (err) {
    console.error("Error in getLoggedInUser:", err);
    res.status(500).json({ error: "Server error" });
  }
};