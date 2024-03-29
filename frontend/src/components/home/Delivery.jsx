/* eslint-disable no-unused-vars */
import React from 'react'
import {ClockCircleOutlined,ShoppingCartOutlined,ContainerOutlined} from '@ant-design/icons'
const Delivery = () => {
  return (
    <>
    <div className="home-delivery">
        <div className="home-delivery-sub">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <div className="home-delivery-img-sec">
                            <div className="row">
                                <div className=" col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <div className="home-delivery-img-sec-img-one">
                                        <img src="images/home/fast-1.webp" alt="" />
                                    </div>
                                </div>
                                <div className=" col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                     <div className="home-delivery-img-sec-img-two">
                                        <img src="images/home/fast-2.webp" alt="" />
                                    </div>
                                    <div className="home-delivery-img-sec-img-three">
                                        <img src="images/home/fast-3.webp" alt="" />
                                    </div>
                    </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <div className="home-delivery-sec-text">
                                        <div className="home-delivery-sec-text">
                                            <h3>Fastest Food Delivery in City</h3>
                                            <p>Our visual designer lets you quickly and of drag a down your way to customapps for both keep desktop. </p>
                                            <ul>
                                                <li>
                                                    <span><ClockCircleOutlined /></span>
                                                    <p>Delivery within 30 minutes</p>
                                                </li>
                                                <li>
                                                    <span><ContainerOutlined /></span>
                                                    <p>Best Offer & Prices</p>
                                                </li>
                                                <li>
                                                    <span><ShoppingCartOutlined /></span>
                                                    <p>Online Services Available</p>
                                                </li>
                                            </ul>
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

export default Delivery