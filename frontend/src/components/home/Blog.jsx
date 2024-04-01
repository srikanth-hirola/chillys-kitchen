/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../../server';

const Blog = () => {

    const [blogData, setBlogData] = useState([]);
    console.log("blogData", blogData)
    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${server}/blogs/blogs-list`);
            setBlogData(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <>
        <div className="blog-home">
            <div className="blog-home-sub">
                <div className="container">
                    <div className="blog-home-title">
                        <h2>Our Blog & Articles</h2>
                        <Link to='/blog'>All Blogs</Link>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="blog-card-home">
                               <Link to=''>
                               <div className="blog-card-home-image-one">
                                    <img src="images/home/blog-1.webp" alt="" />
                                </div>
                                <div className="blog-card-home-text">
                                    <strong>January 3, 2023</strong>
                                    <h3>The secret tips & tricks to prepare a perfect burger & pizza for our customers  </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.</p>
                                </div>
                               </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                <div className="blog-card-home">
                               <Link to=''>
                               <div className="blog-card-home-image">
                                    <img src="images/home/blog-2.webp" alt="" />
                                </div>
                                <div className="blog-card-home-text">
                                    <strong>January 3, 2023</strong>
                                    <h3>The secret tips & tricks to prepare a perfect burger & pizza for our customers  </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.</p>
                                </div>
                               </Link>
                            </div>
                                </div>
                                <div className="col-md-6">
                                <div className="blog-card-home">
                               <Link to=''>
                               <div className="blog-card-home-image">
                                    <img src="images/home/blog-2.webp" alt="" />
                                </div>
                                <div className="blog-card-home-text">
                                    <strong>January 3, 2023</strong>
                                    <h3>The secret tips & tricks to prepare a perfect burger & pizza for our customers  </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.</p>
                                </div>
                               </Link>
                            </div>
                                </div>
                                <div className="col-md-6">
                                <div className="blog-card-home">
                               <Link to=''>
                               <div className="blog-card-home-image">
                                    <img src="images/home/blog-2.webp" alt="" />
                                </div>
                                <div className="blog-card-home-text">
                                    <strong>January 3, 2023</strong>
                                    <h3>The secret tips & tricks to prepare a perfect burger & pizza for our customers  </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.</p>
                                </div>
                               </Link>
                            </div>
                                </div>
                                <div className="col-md-6">
                                <div className="blog-card-home">
                               <Link to=''>
                               <div className="blog-card-home-image">
                                    <img src="images/home/blog-2.webp" alt="" />
                                </div>
                                <div className="blog-card-home-text">
                                    <strong>January 3, 2023</strong>
                                    <h3>The secret tips & tricks to prepare a perfect burger & pizza for our customers  </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.</p>
                                </div>
                               </Link>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blog