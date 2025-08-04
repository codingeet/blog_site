
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetailBlog.css";

const DetailBlog = (props) => {
    const { id } = useParams(); // 👈 get blog id from URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        // Fetch blog using the id
        fetch(`http://localhost:5000/api/blogs/${id}`)
            .then((res) => res.json())
            .then((data) => setBlog(data))
            .catch((err) => console.error("Error fetching blog:", err));
    }, [id]);
    console.log(blog, '>>>>>>>>>>>>>>>');
    return (
        <div className="detail-wrapper">
            <div className="meta-info">
                <span className="author">By {blog?.author}</span>
                <span className="date">
                    {new Date(blog?.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </span>
            </div>



            <h3 className="blog-title">{blog?.title}</h3>
            <div className="img-wrap">
                <img src={blog?.thumbnail}  alt="thumbnail" width="600" height={500}/>
            </div>
            <div className="content">
                <div dangerouslySetInnerHTML={{ __html: blog?.content }}>

                </div>
            </div>
        </div>
    )
};

export default DetailBlog;