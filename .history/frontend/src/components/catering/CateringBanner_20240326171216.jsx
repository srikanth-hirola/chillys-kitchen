/* eslint-disable no-unused-vars */
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const CateringBanner = () => {
<<<<<<< HEAD
    return (
        <>
            <div className="catering-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="catering-banner-sec">
                                <h3>Planning Fabulous</h3>
                                <strong>Book Us for your
                                    Dream Event</strong>
                                <p>Find out professional caterers in your city for your Dream Events,
                                    long established fact a reader will be distracted the readable.</p>
                                <div className="buttons-sec">
                                    <Button >Know More</Button>
                                    <Button >Know More</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="catering-banner-img">
                                <img src="/images/home/banner-catering.webp" alt="" />
                            </div>
                        </div>
=======
  return (
    <>
    <div className="catering-banner">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="catering-banner-sec">
                       <div className="cb-sec">
                       <h3>Planning Fabulous</h3>
                       </div>
                        <strong>Book Us for your
Dream Event</strong>
<p>Find out professional caterers in your city for your Dream Events,
long established fact a reader will be distracted the readable.</p>
<div className="buttons-sec">
    <Link to='' >Know More</Link>
    <Link to='' >Know More</Link>
</div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="catering-banner-img">
                        <img src="/images/home/banner-catering.webp" alt="" />
>>>>>>> ea331c1437a5e5fe0391bc4dfbaf136cdba2b9ac
                    </div>
                </div>
            </div>
        </>
    )
}

export default CateringBanner