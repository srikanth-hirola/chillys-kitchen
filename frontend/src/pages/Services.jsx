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
<h2>Lorem, ipsum dolor.</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis beatae quos placeat quidem dolorem sit eaque voluptate, sint illo quasi doloribus culpa a asperiores provident!</p>
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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore illo sit consectetur soluta, recusandae laborum ipsum perspiciatis corporis maiores harum!</p>
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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore illo sit consectetur soluta, recusandae laborum ipsum perspiciatis corporis maiores harum!</p>
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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore illo sit consectetur soluta, recusandae laborum ipsum perspiciatis corporis maiores harum!</p>
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