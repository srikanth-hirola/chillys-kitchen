/* eslint-disable no-unused-vars */
import { Button } from 'antd'
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Link } from 'react-router-dom'

const OrderPlaced = () => {
  return (
    <>
    <Navbar/>
    <div className="order-placed">
        <div className="order-placed-sub">
            <div className="container">
                <div className="order-confirm">
                    <p>Thank you! 🎉</p>
                    <h4>Your order has been received</h4>
                    <div className="order-list">
                        <ul>
                            <li>
                                <p>Order Code </p>
                                <p>#0123_45678</p>
                            </li>
                            <li>
                                <p>Order Code </p>
                                <p>#0123_45678</p>
                            </li>
                            <li>
                                <p>Order Code </p>
                                <p>#0123_45678</p>
                            </li>
                            <li>
                                <p>Order Code </p>
                                <p>#0123_45678</p>
                            </li>
                        </ul>
                    </div>
                    <div className="redirect-btns">
                        <Link to='' >Continue Shopping</Link>
                        <Link to='' >View Orders</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default OrderPlaced