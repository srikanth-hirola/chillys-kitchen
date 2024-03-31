/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../../server";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  console.log("blogData", blogData);
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${server}/blogs/blogs-list`);
      setBlogData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="blog-home">
        <div className="blog-home-sub">
          <div className="container">
            <div className="blog-home-title">
              <h2>Our Blog & Articles</h2>
              <button>Read All Services</button>
            </div>
            <div className="row">
              <div className="col-md-6">
                {blogData.length > 0 && (
                  <div className="blog-card-home">
                    <Link to={`/blog/${blogData[0].slug}`}>
                      <div className="blog-card-home-image-one">
                        <img src={blogData[0].large_thumb[0].url} alt="" />
                      </div>
                      <div className="blog-card-home-text">
                        <strong>{formatDate(blogData[0]?.createdAt)}</strong>
                        <h3>{blogData[0].title}</h3>
                        <p>{blogData[0].excerpt}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <div className="row">
                  {blogData.slice(1).map((blog, index) => (
                    <div key={index} className="col-md-6">
                      <div className="blog-card-home">
                        <Link to={`/blog/${blog.slug}`}>
                          <div className="blog-card-home-image">
                            <img src={blog.large_thumb[0].url} alt="" />
                          </div>
                          <div className="blog-card-home-text">
                            <strong>{formatDate(blog.createdAt)}</strong>
                            <h3>{blog.title}</h3>
                            <p>{blog.excerpt}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
