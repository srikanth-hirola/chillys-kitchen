// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Banner from '../components/menu/Banner'
// import Products from '../components/menu/Products'
import MenuMiddleware from '../components/menu/MenuMiddleware'

const Menu = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <MenuMiddleware />
      {/* <Products/> */}
      <Footer />
    </>
  )
}

export default Menu