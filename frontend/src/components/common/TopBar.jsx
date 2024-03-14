/* eslint-disable no-unused-vars */
import React from 'react'
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  PinterestOutlined
} from '@ant-design/icons';

const TopBar = () => {
  return (
    <>
        <div className="top-bar">
            <div className="top-bar-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="top-bar-sec-one">
                                <ul>
                                    <li>
                                        <span><PhoneOutlined /></span>
                                        <p><a href="tel:+91 9874563210">+91 9874563210</a></p>
                                    </li>
                                    <li>
                                        <span><MailOutlined /></span>
                                        <p><a href="mailto:chille@gmail.com">chille@gmail.com</a></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="top-bar-sec-two">
                                <ul>
                                    <li>
                                        <span><InstagramOutlined /></span>
                                    </li>
                                    <li>
                                        <span><FacebookOutlined /></span>
                                    </li>
                                    <li>
                                        <span><TwitterOutlined /></span>
                                    </li>
                                    <li>
                                        <span><PinterestOutlined /></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TopBar