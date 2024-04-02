/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Banner from '../components/menu/Banner'
import { Link } from 'react-router-dom'

const Services = ({ title }) => {
    console.log("title",title)
  return (
    <>
    <Navbar/>
    <Banner
        title="Services"
        text1="Home"
        text2="Services"
    />
        <div className="services-main" style={{backgroundImage:`url('/images/home/ser-banner.png')`}} >
            <div className="services-sub">
                <div className="container">
<div className="services-main-title">
<h2>Epicurean Elegance: Chilly&apos;s Culinary Collective</h2>
                <p>Experience culinary excellence with Chilly's Kitchen: cloud kitchen creations, bespoke catering for any occasion, and tailored corporate meal solutions. Elevate every meal into an unforgettable epicurean adventure. </p>
</div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="service-card">
                              <Link to='/catering'>
                              <div className="service-image">
                                    <img src="/images/about/info.webp" alt="" />
                                </div>
                                <div className="service-main-text">
                                    <div className="title">
                                        <h3>Catering</h3>
                                    </div>
                                    <p>Celebrate life's moments with Chilly's bespoke catering—where every dish is a masterpiece and every event is a cherished memory. Let us elevate your occasion with unparalleled culinary delights</p>
                                </div>
                              </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="service-card">
                              <Link to='/menu?category=Cloud%20Kitchen'>
                              <div className="service-image">
                                    <img src="/images/about/info.webp" alt="" />
                                </div>
                                <div className="service-main-text">
                                    <div className="title">
                                        <h3>Cloud Kitchen</h3>
                                    </div>
                                    <p>Indulge in our cloud kitchen delights—crafted with passion and delivered with care. From comforting classics to exotic flavors, savor culinary excellence at your doorstep</p>
                                </div>
                              </Link>
                            </div>
                        </div> <div className="col-md-4">
                            <div className="service-card">
                              <Link to='/menu?category=Corporate%20Meal'>
                              <div className="service-image">
                                    <img src="/images/about/info.webp" alt="" />
                                </div>
                                <div className="service-main-text">
                                    <div className="title">
                                        <h3>Corporate Meals</h3>
                                    </div>
                                    <p>Fuel success with Chilly's corporate meal solutions—designed to nourish minds and inspire productivity. From boardroom meetings to company-wide events, we cater to your team's unique tastes and preferences.</p>
                                </div>
                              </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </>
  )
}

export default Services