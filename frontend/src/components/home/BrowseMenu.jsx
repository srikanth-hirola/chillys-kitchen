/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BrowseMenu = () => {
  return (
    <>
    <div className="home-browse">
        <div className="home-browse-sub">
            <div className="container">
                <div className="home-browse-title">
                <strong>Special Menu</strong>
                    <h2>Our Specials Menu </h2>
                </div>
                <div className="home-browse-cards">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="home-browse-cards-sec">
                                <div className="home-browse-cards-sec-img">
                                    <img src="images/home/browse-1.webp" alt="" />
                                </div>
                                <div className="home-browse-cards-sec-text">
                                    <h3>Breakfast</h3>
                                    <p>In the new era of technology we look in the future with certainty and pride for our life.</p>
                                    <Link to='/services'>Explore Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="home-browse-cards-sec">
                                <div className="home-browse-cards-sec-img">
                                    <img src="images/home/browse-2.webp" alt="" />
                                </div>
                                <div className="home-browse-cards-sec-text">
                                    <h3>Main Dishes</h3>
                                    <p>In the new era of technology we look in the future with certainty and pride for our life.</p>
                                    <Link to='/services'>Explore Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="home-browse-cards-sec">
                                <div className="home-browse-cards-sec-img">
                                    <img src="images/home/browse-3.webp" alt="" />
                                </div>
                                <div className="home-browse-cards-sec-text">
                                    <h3>Drinks</h3>
                                    <p>In the new era of technology we look in the future with certainty and pride for our life.</p>
                                    <Link to='/services'>Explore Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="home-browse-cards-sec">
                                <div className="home-browse-cards-sec-img">
                                    <img src="images/home/browse-1.webp" alt="" />
                                </div>
                                <div className="home-browse-cards-sec-text">
                                    <h3>Desserts</h3>
                                    <p>In the new era of technology we look in the future with certainty and pride for our life.</p>
                                    <Link to='/services'>Explore Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default BrowseMenu