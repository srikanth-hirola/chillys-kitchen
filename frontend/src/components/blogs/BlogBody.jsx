/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BlogBody = () => {
  const data =[
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
    {
      img:"images/home/blog-1.webp",
      title:"7 ways to decor your home like a professional",
      date:"March , 16, 2024,"
    },
  ]
  return (
    <>
    <div className="blog-section">
      <div className="blog-section-sub">
        <div className="container">

          <div className="row">
          {
            data.map((blogData)=>(
             <>
             <div className="col-md-4">
             <Link to="">
             <div className="blog-sec-card">
                <div className="blog-sec-img">
                  <img src={blogData.img} alt="" />
                </div>
                <div className="blog-sec-text">
                  <h3>7 ways to decor your home like a professional</h3>
                  <p>March , 16, 2024</p>
                </div>
              </div>
             </Link>
            </div>
             </>
            ))
          }
           
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default BlogBody