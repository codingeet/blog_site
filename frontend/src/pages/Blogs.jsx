 import React, { useEffect, useState } from "react";
import "../styles/Blogs.css";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogPosts, setBlogPosts]= useState([]);
   useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        console.log(">>>>>>>>>>>>>>>",data);
        setBlogPosts(data);
        
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
        {blogPosts.map((post) => {
          const blogTime = new Date(post.createdAt);
          const readableTime = blogTime.toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          });

          return (<div className="blog-card" key={post._id}>
            
            <h2 className="blog-title">{post.title}</h2>
            <div className="blog-meta">
              <span className="blog-author">By {post.author?.name}</span>
              <span className="blog-date">{readableTime}</span>
            </div>
            <Link to={`/blogs/${post._id}`} className="btn btn-primary">Read More</Link>
          </div>)
        }
        )}
      </div>
    </div>
  );
};

export default Blogs;
