// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Blogbanner from '../components/blogs/BlogBanner'
import BlogBody from '../components/blogs/BlogBody'

const Blog = () => {
  return (
    <>
      <div>
        <Navbar />
        <Blogbanner />
        <BlogBody />
        <Footer />
      </div>
    </>
  )
}

export default Blog