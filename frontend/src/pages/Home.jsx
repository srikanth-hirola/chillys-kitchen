/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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
import { useSelector } from 'react-redux'
import axios from 'axios'
import { server } from '../server'

const Home = () => {

  const { success, error, siteConfigData } = useSelector(
    (state) => state.siteConfig
  );

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

  const bannerContent = siteConfigData.bannerContent;
  const menuContent = siteConfigData.menuContent;
  const aboutUsOneContent = siteConfigData.aboutUsOneContent;
  const serviceContent = siteConfigData.serviceContent;
  const deliverySectionContent = siteConfigData.deliverySectionContent;
  const testimonialsContent = siteConfigData.testimonialsContent;
  const clientImages = siteConfigData.clientImages;
 
  return (
    <>
      <Navbar />
      <Banner bannerContent={bannerContent} />
      <BrowseMenu menuContent={menuContent} />
      <AboutUs aboutUsOneContent={aboutUsOneContent} />
      <Services serviceContent={serviceContent} />
      <OurMenu />
      <Delivery deliverySectionContent={deliverySectionContent} />
      <Testimonal testimonialsContent={testimonialsContent} />
      <HomeLogo clientImages={clientImages} />
      <Blog blogData={blogData} />
      <NewsLetterInput />
      <Footer />
    </>
  )
}

export default Home