// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import AboutBanner from '../components/about/AboutBanner'
import AboutSectionTwo from '../components/about/AboutSectionTwo'
import AboutTiming from '../components/about/AboutTiming'
import AboutNew from '../components/about/AboutNew'
// import AboutGallery from '../components/about/AboutGallery'

const About = () => {
  return (
    <>
<Navbar/>
<AboutBanner/>
<AboutNew/>
<AboutTiming/>
<AboutSectionTwo/>
{/* <AboutGallery/> */}
<Footer/>
    </>
  )
}

export default About