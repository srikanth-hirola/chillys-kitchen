/* eslint-disable no-unused-vars */
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const CateringBanner = () => {
    return (
        <>
            <div className="catering-banner">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="catering-banner-sec">
                                <h3>Planning Fabulous</h3>
                                <strong>Book Us for your
                                    Dream Event</strong>
                                <p>Find out professional caterers in your city for your Dream Events,
                                    long established fact a reader will be distracted the readable.</p>
                                <div className="buttons-sec">
                                    <Button className='' >
                                        <a href="#cateringForm">Get Started</a>
                                    </Button>
                                    {/* <Button className='mx-2' >Know More</Button> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="catering-banner-img">
                                <img src="/images/home/banner-catering.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CateringBanner