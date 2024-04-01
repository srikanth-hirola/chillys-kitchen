/* eslint-disable no-unused-vars */
import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="home-banner-sec" id='banner-sec'>
                <div className="home-banner-sec-sub" style={{ backgroundImage: `url(images/home/banner.webp)` }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="banner-text">
                                    <div className="banner-title">
                                        <strong>Best In Cafes</strong>
                                        <h1>Mom&apos;s  Food Is The Best<br />
                                            <strong>We Cook </strong> With The Same Care</h1>
                                    </div>
                                    <div className="banner-description">
                                        <p>Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.</p>
                                    </div>
                                    <div className="banner-actions">
                                        <button className="banner-action-one">Book A Table </button>
                                        <button className="banner-action-two">Explore Menu </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="banner-img">
                                    <img src="images/home/baner1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner