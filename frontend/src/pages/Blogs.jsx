 import React, { useEffect } from "react";
import "../styles/Blogs.css";


const blogPosts = [
  {
    id: 1,
    title: "Why JavaScript is Still the King of Web",
    excerpt: "JavaScript continues to dominate web development in 2025. Here's why it still matters...",
    author: "Mukesh Maurya",
    date: "June 20, 2025",
  },
  {
    id: 2,
    title: "Mastering React Hooks in 15 Minutes",
    excerpt: "Hooks like useState, useEffect, and useContext are powerful tools. Learn them fast...",
    author: "Aisha Sharma",
    date: "June 18, 2025",
  },
  {
    id: 3,
    title: "Deploy Your Node App with Ease",
    excerpt: "Discover simple ways to deploy your Node.js and Express apps on modern platforms...",
    author: "Rahul Singh",
    date: "June 15, 2025",
  },
];

const Blogs = () => {
   useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        // setBlogs(data);
        // setLoading(false);
        console.log(">>>>>>>>>>>>>>>",data);
        
      } catch (err) {
        // setError("Failed to load blogs");
        // setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <div className="blogs-page">
      <h1 className="blogs-title">Latest Blog Posts</h1>
      <div className="blogs-grid">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <h2 className="blog-title">{post.title}</h2>
            <div className="blog-meta">
              <span className="blog-author">By {post.author}</span>
              <span className="blog-date">{post.date}</span>
            </div>
            <button className="btn btn-primary">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
