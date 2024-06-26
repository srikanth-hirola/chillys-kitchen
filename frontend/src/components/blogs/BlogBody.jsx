/* eslint-disable no-unused-vars */
import { Pagination } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../../server';

const BlogBody = () => {

  const [blogData, setBlogData] = useState([]);
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

  const data = [
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
    {
      img: "images/home/blog-1.webp",
      title: "7 ways to decor your home like a professional",
      date: "March , 16, 2024,"
    },
  ]
  const itemsPerPage = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };
  return (
    <>
      <div className="blog-section">
        <div className="blog-section-sub">
          <div className="container-lg container-xl container-xxl">

            <div className="row">
              {currentItems.map((blogData, index) => (
                <div key={index} className="col-md-4 col-12 col-sm-6">
                  <Link to={`/blog/${blogData.slug}`}>
                    <div className="blog-sec-card">
                      <div className="blog-sec-img">
                        <img src={blogData?.large_thumb[0].url} alt="" />
                      </div>
                      <div className="blog-sec-text">
                        <h3>{blogData?.title}</h3>
                        <p>{blogData.date}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <div className='blog-post-pagination-details'>
                <Pagination
                  defaultCurrent={1}
                  total={data.length}
                  pageSize={itemsPerPage}
                  onChange={handleChangePage}
                  itemRender={itemRender}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogBody