const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("./models/Blog"); // path to your model

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedBlogs = [
  {
    title: "Why JavaScript is Still the King of Web",
    excerpt: "JavaScript continues to dominate web development in 2025. Here's why it still matters...",
    author: "Mukesh Maurya",
    content: "Full content of the blog...",
  },
  {
    title: "Mastering React Hooks in 15 Minutes",
    excerpt: "Hooks like useState, useEffect, and useContext are powerful tools. Learn them fast...",
    author: "Aisha Sharma",
    content: "Detailed guide to mastering hooks...",
  },
  {
    title: "Deploy Your Node App with Ease",
    excerpt: "Discover simple ways to deploy your Node.js and Express apps on modern platforms...",
    author: "Rahul Singh",
    content: "Deployment tips for Heroku, Render, etc...",
  },
];

const seedDB = async () => {
  await Blog.deleteMany(); // optional: clears existing blogs
  await Blog.insertMany(seedBlogs);
  console.log("Database seeded!");
  mongoose.disconnect();
};

seedDB();
