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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration error:", err); // Log actual error
    res.status(500).json({ error: err.message || "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
       const hash = await bcrypt.hash(password, 10);
       console.log("Hash:", hash);
     console.log("Login email:", email, (await bcrypt.compare("password123", user.password)));
console.log("Login raw password:", password);
console.log("Stored hashed password:", user.password);
    if (!user || !(await bcrypt.compare("password123", user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    // Store refresh token in DB or cache
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // only over HTTPS in prod
      sameSite: "strict"
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });
  });
};
