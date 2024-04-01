/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <>
    <div className="home-services">
        <div className="home-services-sub">
            <div className="container">
                <div className="home-services-title">
                <strong>Our Services</strong>
                    <h3>We also offer unique services for your events</h3>
                </div>
                <div className="home-services-cards">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to='/catering'>
                            <div className="home-services-sec-card">
                                <div className="home-services-sec-card-img">
                                    <img src="images/home/browse-2.webp" alt="" />
                                </div>
                                <div className="home-services-sec-card-text">
                                    <h3>Caterings</h3>
                                    <p>In the new era of technology we look in the future with certainty for life.</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        <div className="col-md-4">
                           <Link to='/catering'>
                           <div className="home-services-sec-card">
                                <div className="home-services-sec-card-img">
                                    <img src="images/home/browse-1.webp" alt="" />
                                </div>
                                <div className="home-services-sec-card-text">
                                    <h3>Birthdays</h3>
                                    <p>In the new era of technology we look in the future with certainty for life.</p>
                                </div>
                            </div>
                           </Link>
                        </div>
                        <div className="col-md-4">
                           <Link to='/catering'>
                           <div className="home-services-sec-card">
                                <div className="home-services-sec-card-img">
                                    <img src="images/home/browse-3.webp" alt="" />
                                </div>
                                <div className="home-services-sec-card-text">
                                    <h3>Weddings</h3>
                                    <p>In the new era of technology we look in the future with certainty for life.</p>
                                </div>
                            </div>
                           </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Services