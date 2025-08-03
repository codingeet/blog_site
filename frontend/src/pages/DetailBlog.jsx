
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetailBlog.css";

const DetailBlog = (props)=> {
  const { id } = useParams(); // 👈 get blog id from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog using the id
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);
console.log(blog,'>>>>>>>>>>>>>>>');
    return (
        <div className="detail-wrapper">
            <h3 className="blog-title">{blog?.title}</h3>
        </div>
    )
};

export default DetailBlog;