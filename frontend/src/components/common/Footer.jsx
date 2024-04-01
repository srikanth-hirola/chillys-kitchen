// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  PinterestOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <div className="footer">
        <footer>
          <div className="footer-sub">
            <div className="container-lg container-xl container-xxl">
              <div className="row">
                <div className="col-md-3">
                  <div className="footer-logo-sec">
                    <div className="footer-logo-img">
                      <img src="/images/logo.png" alt="" />
                    </div>
                    <div className="footer-logo-txt">
                      <p>In the new era of technology we look a in the future with certainty and pride to for our company and.</p>
                    </div>
                    <div className="footer-social">
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
                <div className="col-md-2 col-sm-6">
                  <div className="footer-logo-sec-one">
                    <h2>Pages</h2>
                    <ul>
                      <li>
                        <Link to='/' >Home</Link>
                      </li>
                      <li>
                        <Link to='/about'>About</Link>
                      </li>
                      <li>
                        <Link  to='/services'>Services</Link>
                      </li>
                      <li>
                        <Link to='/services'>Products</Link>
                      </li>
                      <li>
                        <Link to='/blog'>Blog</Link>
                      </li>
                      <li>
                        <Link  to='/contact-us'>Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="footer-logo-sec-two">
                    <h2>Utillity Pages</h2>
                    <ul>
                      <li>
                        <Link  to='/cart' >Cart</Link>
                      </li>
                      <li>
                        <Link  to='/wishlist'>Wishlist</Link>
                      </li>

                      <li>
                        <Link  to='/terms-and-conditions'>T&C</Link>
                      </li>
                      <li>
                        <Link  to='/refund-policy'>Refund Policy</Link>
                      </li>
                      <li>
                        <Link  to='/privacy-policy'>Privacy Policy</Link>
                      </li>
                      <li>
                        <Link  to='/contact-us'>Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="footer-logo-sec-insta">
                    <h2>Follow Us On Instagram</h2>
                    <div className="footer-logo-sec-image">
                      <div className="row">
                        <div className="col-md-6 col-sm-3 col-6 ">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-1.webp" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-6">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-2.webp" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-6">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-3.webp" alt="" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-6">
                          <div className="sec-imf-footer">
                            <img src="/images/home/footer-4.webp" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer