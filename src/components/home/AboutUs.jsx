/* eslint-disable no-unused-vars */
import React from 'react'
import {
  PhoneOutlined,
  MailOutlined,
  AimOutlined
} from '@ant-design/icons';
const AboutUs = () => {
  return (
    <>
        <div className="home-about">
            <div className="home-about-sub">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="home-about-img">
                                <div className="home-about-img-sec-one">
                                    <img src="/images/home/provide-1.webp" alt="" />
                                </div>
                                <div className="home-about-img-text-sec">
                                    <div className="home-about-img-text-sec-sub">
                                   <h4> Come and visit us</h4>
                                   <ul>
                                    <li>
                                        <span><PhoneOutlined/></span>
                                        <p><a href="tel:+91 9874563210">+91 9874563210</a></p>
                                    </li>
                                    <li>
                                        <span><MailOutlined/></span>
                                        <p><a href="mainto:chilles@gmail.com">chilles@gmail.com</a></p>
                                    </li>
                                    <li>
                                        <span><AimOutlined /></span>
                                        <p>837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles</p>
                                    </li>
                                   </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="home-about-text">
                                <h3>We provide healthy food for your family.</h3>
                                <p className='text-p-one' >Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city rich culinary culture, we aim to honor our local roots while infusing a global palate.</p>
                                <p className='text-p-two'>At place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.</p>
                                <button>More About Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AboutUs