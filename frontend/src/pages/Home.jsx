/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Banner from '../components/home/Banner'
import BrowseMenu from '../components/home/BrowseMenu'
import AboutUs from '../components/home/AboutUs'
import Services from '../components/home/Services'
import Delivery from '../components/home/Delivery'
import Testimonal from '../components/home/Testimonal'
import Blog from '../components/home/Blog'
import OurMenu from '../components/home/OurMenu'
import HomeLogo from '../components/home/HomeLogo'
import NewsLetterInput from '../components/NewsLetter/NewsLetterInput'

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <BrowseMenu />
      <AboutUs />
      <Services />
      <OurMenu />
      <Delivery />
      <Testimonal />
      {/* <HomeLogo /> */}
      <Blog />
      <NewsLetterInput />
      <Footer />
    </>
  )
}

export default Home